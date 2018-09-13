<template>
    <div class="dropdown-menu mini" aria-labelledby="channelMenuButton">
        <a v-if="isSubscribed()" @click.prevent='unsubscribe(channelSidebar)' class="dropdown-item"
           href="#">Unsubscribe</a>
        <a v-else @click.prevent='createSubscription(channelSidebar)' class="dropdown-item" href="#">Subscribe</a>
        <a @click.prevent='notathingyet()' class="dropdown-item" href="#">Mute</a>
        <a @click.prevent='notathingyet()' class="dropdown-item" href="#">Favorite</a>
        <a @click.prevent='notathingyet()' class="dropdown-item" href="#">Add To List</a>
        <div class="dropdown-divider"></div>
        <a @click.prevent='notathingyet()' class="dropdown-item tip" href="#">Send Tip</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#" v-clipboard:copy="'https://notify.me/' + this.channelSidebar.username" @click.prevent="coppied()">Copy Share Link</a>
        <div v-if="this.isSuperUser">
            <div class="dropdown-divider"></div>
            <a @click.prevent='notathingyet()' class="dropdown-item" href="#">Transfer Ownership</a>
            <a @click.prevent='deleteChannel()' class="dropdown-item" href="#">Delete</a>
			<a @click.prevent='editChannel' class="dropdown-item" href="#">Edit Channel</a>
            <div class="dropdown-divider"></div>
            <a @click.prevent='notathingyet()' class="dropdown-item" href="#">Switch To Channel</a>
            <a @click.prevent='notathingyet()' class="dropdown-item" href="#">View Owner Info</a>
            <a @click.prevent='toggleVerify()' class="dropdown-item gold" href="#" v-if="channelSidebar.verified === 'false'">Verify Channel</a>
            <a @click.prevent='toggleVerify()' class="dropdown-item gold" href="#" v-if="channelSidebar.verified === 'true'">Unverify Channel</a>
        </div>
        <div v-else-if="isMyChannel()">
            <div class="dropdown-divider"></div>
            <a @click.prevent='deleteNotification(i.id)' class="dropdown-item" href="#">Transfer Ownership</a>
            <a @click.prevent='deleteChannel()' class="dropdown-item red" href="#">Delete</a>
        </div>
    </div>
</template>

<script>
import Post from '@/core/post.core'

import Channel from '@/core/channel.core'

import { create } from 'vue-modal-dialogs'
import Confirm from '@/components/modals/confirm'

const confirm = create(Confirm, 'title', 'content', 'buttonLabel')

export default {
    props: ['i'],

    methods: {
        /**
         * The thing is not a feature yet
         */
        notathingyet() {
            alert('This function is not available yet')
        },
        /**
         * The user coppied a link
         */
        coppied() {
            this.$root.$emit('alert', 'success', `The channel link has been coppied to your clipboard`)
        },
        /**
         * Unsubscibe the user from the channel
         */
        async unsubscribe(i) {
            if (await confirm(`Are you sure you unsubscribe from ${i.displayName}?`, '', 'Unsubscribe')) {
                Channel.unsubscribe(i.channel)
                    .then(postsToDelete => {
                        // send message to shuffle instance to update
                        // this.$root.$emit('removePostsFromShuffle', postsToDelete)
                        if (!this.channelOpened) this.$root.$emit('removePostsFromShuffle', postsToDelete)

                        this.$root.$emit('alert', 'success', `Successfully unsubscribed from @${i.channel.username}`)
                    })
                    .catch(e => {
                        this.$root.$emit('alert', 'error', `Rats, couldn't unsubscribe from @${i.channel.username}`)
                    })
            }
        },
        /**
         * Check if the channel is owned by the user
         */
        isMyChannel() {
            return Channel.isMyChannel()
        },
        /**
         * Check if the user can modify the channel
         */
        canModify(id) {
            if (this.isSuperUser || this.isMyChannel()) return true
            return false
        },
        /**
         * Check if the user is subsribed to the channel
         */
        isSubscribed() {
            // not passing in a param, just flexing that it checks the current channel data if no param passed
            return Channel.isSubscribed()
        },
        /**
         * Toggle the channels verification status
         */
        toggleVerify() {
            if (this.channelSidebar.verified === 'false') {
                Channel.verify(this.channelSidebar.username).then(() => {
                    this.$root.$emit('alert', 'success', `@${this.channelSidebar.username} is now verified!`)
                    this.channelSidebar.verified = 'true'
                })
            } else if (this.channelSidebar.verified === 'true') {
                Channel.unVerify(this.channelSidebar.username).then(() => {
                    this.$root.$emit('alert', 'success', `@${this.channelSidebar.username} is now unverified!`)
                    this.channelSidebar.verified = 'false'
                })
            }
        },
        /**
         * Delete a channels post
         */
        async deletePost(id) {
            console.log(id)
            if (await confirm('Are you sure you want to delete this post?', 'This is permanent')) {
                Post.deletePost(id)
                    .then(response => {
                        this.$root.$emit('removePostsFromShuffleByID', id)
                        this.$root.$emit('alert', 'success', 'Post deleted!')
                    })
                    .catch(err => {
                        this.$root.$emit('alert', 'error', 'Failed to delete post!')
                    })
            }
        },
        /**
         * Delete the channel
         */
        async deleteChannel() {
            if (await confirm('Are you sure you want to delete this channel?', 'This is permanent')) {
                Channel.delete(this.channelSidebar.id)
                    .then(res => {
                        this.$root.$emit('alert', 'success', 'Channel deleted!')
                        this.$store.state.channel.channelOpened = false
                        this.$router.push({ path: `/subscriptions` })
                    })
                    .catch(e => {
                        this.$root.$emit('alert', 'error', 'Failed to delete channel!')
                    })
            }
        }
    },
    computed: {
        channelOpened() {
            return this.$store.getters.channelOpened
        },

        channelSidebar() {
            return this.$store.getters.getchannelData
        }
    }
}
</script>
