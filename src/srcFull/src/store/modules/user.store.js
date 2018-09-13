import Channel from '@/core/channel.core'

export default {
    state: {
        // the full user object returned from server
        user: {},
        // accounts channels
        channels: [],
        // the current channel data object for the channel that the user is currently using Notify as
        currentChannel: {},
        // the verfied username string sent to the component that handles the form submission
        freeUsername: false
    },
    mutations: {
        populateUser: (state, payload) => {
            // grab the default channel from local storage and switch to that channel.
            const lastChnnel = localStorage.getItem('channel')

            state.user = payload
            state.channels = payload.channels
            state.currentChannel = {}

            // Switch the users channel to the one they were on last.
            if (lastChnnel) {
                Channel.switch(parseInt(lastChnnel))
                    .then(res => {
                        console.log('Default Channel: ' + res)
                    })
                    .catch(err => {
                        console.error('Error: ' + err)
                    })
            } else {
                if (payload.channels.length > 0)
                    Channel.switch(payload.channels[0].id)
                    .then(res => {
                        console.log('No Default Channel: ' + res)
                    })
                    .catch(err => {
                        console.error('Error: ' + err)
                    })
            }
        },
        // switch channel
        switchChannel: (state, payload) => (state.currentChannel = payload),
        // used for creating a new channel
        addNewChannel: (state, payload) => state.channels.push(payload),
        // used for editing current channel
        updateMyChannel: (state, editedChannel) => {
            state.currentChannel = Object.assign({}, state.currentChannel, editedChannel)
        },
        deleteChannel: (state, channelID) => {
            state.channels = state.channels.filter(channel => channel.id !== channelID)
            state.channelData = null
        },

        //misc
        freeUsername: (state, payload) => (state.freeUsername = payload)
    },
    actions: {},
    getters: {
        // account getters
        getUserID: state => state.user.id,
        getUser: state => state.user,
        isSuperUser: state => state.user.status === 'dev',

        // user channels
        getUserChannels: state => state.channels,
        userHasChannel: state => !!state.currentChannel.id,
        getCurrentChannel: state => state.currentChannel,
        getTopicsForChannel: state => {
            if (state.currentChannel) return state.currentChannel.topics
        },

        //columns
        getMutedChannels: state => state.user.muted || [],
        getFavoriteChannels: state => state.user.favorites || [],
        // misc
        freeUsername: state => state.freeUsername
    }
}