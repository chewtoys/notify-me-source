import * as store from '@/core/store'
import * as methods from '@/utils/methods'
import * as api from '@/core/api'

import Post from '@/core/post.core'

const Channel = {
    /**
     * Create a channel
     *
     * @param {*} channel
     */
    create(channel) {
        return api.createChannel(channel).then(res => {
            channel.id = res.data.id
            store.commit('addNewChannel', channel)
            setTimeout(() => {
                this.subscribe(channel)
            }, 0)
            return channel
        })
    },
    /**
     * Update the selected channel
     *
     * @param {*} editedChannel
     */
    update(editedChannel, id) {
        console.log(editedChannel)
        return api.editChannel(editedChannel, id).then(req => {
            store.commit('updateMyChannel', editedChannel)
            return req
        })
    },
    /**
     * Delete a channel
     *
     * @param {*} channelID
     */
    delete(channelID) {
        return api.deleteChannel(channelID).then(() => {
            store.commit('deleteChannel', channelID)
            this.switch()
            return true
        })
    },
    /**
     * Subsribe to a channel
     *
     * @param {*} channel
     */
    subscribe(channel) {
        // console.log('THE CHANNEL WE SUB TO:', channel)
        return api.subscribe(channel.id).then(response => {
            store.commit('addSubscription', channel.id)
            store.commit('addNewPosts', response.data.posts)
            store.commit('updateColumnContent', {
                columnID: 1,
                things: channel.id
            })
        })
    },
    /**
     * Unsubscribe from the channel
     *
     * @param {*} channel
     */
    unsubscribe(channel) {
        return api.unsubscribe(channel.id).then(() => {
            store.commit('removeSubscription', channel.id)
            store.commit('removeColumnContent', {
                columnID: 0,
                things: channel.id
            })
        })
    },
    /**
     * Mute a channel
     *
     * @param {*} id
     */
    mute(id) {
        return api.mute(id)
    },
    /**
     * Unmute a channel
     *
     * @param {*} id
     */
    unmute(id) {
        store.commit('removeColumnContent', {
            columnID: 3,
            things: id
        })
        return api.unmute(id)
    },
    /**
     * Switch to a channel
     *
     * @param {*} id
     */
    switch (id) {
        const channels = store.getter('getUserChannels')
        let channel = {}
        if (!id) channel = channels[0]
        else channel = channels.find(channel => channel.id === id)

        if (channel) {
            localStorage.setItem('channel', id)
            store.commit('switchChannel', channel)
            return Promise.resolve('switched channel')
        }
        return Promise.reject('Failed to switch channel')
    },
    /**
     * Check if the username exists
     *
     * @param {*} username
     */
    checkUsername(username) {
        store.commit('requestStack', 'checkUsername')
        return api.check(username)
    },
    /**
     * Check if the user owns the channel
     *
     * @param {*} id
     */
    isMyChannel(id) {
        const channelID = id || store.getter('getChannelSidebarID')
        const channels = store.getter('getUserChannels')
        const test = channels.filter(channel => channel.id === channelID)
        return test.length !== 0
    },
    /**
     * Check if the user is subscribed to the channel
     *
     * @param {*} id
     */
    isSubscribed(id) {
        const channelID = id || store.getter('getChannelSidebarID')
        const subscriptions = store.getter('getSubscriptions')
        const lol = subscriptions.filter(channel => channel.id === channelID)
        return lol.length !== 0
    },
    /**
     * Verify the channel
     *
     * @param {*} username
     */
    verify(username) {
        //console.log(`verifying channel id: ${username}`)
        return api.verifyChannel(username).then(() => {})
    },
    /**
     * Unverify the channel
     *
     * @param {*} username
     */
    unVerify(username) {
        //console.log(`unverifying channel id: ${username}`)
        return api.unVerifyChannel(username).then(() => {})
    },
    /**
     * Get a channel by their username
     *
     * @param {*} username
     */
    getByUsername(username) {
        const channels = store.getter('getAllChannels', username)
        const weHaveChannelAlready = channels.find(channel => channel.username === username)
        if (weHaveChannelAlready) {
            return Promise.resolve({
                data: {
                    channel: weHaveChannelAlready
                }
            })
        }
        return api.getByUsername(username)
    },
    /**
     * Transfer a channel
     *
     * @param {*} owner
     * @param {*} id
     */
    transfer(owner, id) {
        return api.transferChannel({
            owner: owner,
            id: id
        })
    }
}

export default Channel