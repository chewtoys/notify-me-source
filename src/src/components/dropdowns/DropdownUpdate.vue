<template>
    <div class="dropdown-menu mini dropdown-menu-right" aria-labelledby="dropdownMenuButton">
        <a v-if="isSubscribed(i.channel)" @click.prevent='unsubscribe(i)' class="dropdown-item" href="#">Unsubscribe</a>
        <a v-else-if="!isSubscribed(i.channel)" @click.prevent='createSubscription(i.channel)' class="dropdown-item" href="#">Subscribe</a>
        <a @click.prevent='notathingyet' class="dropdown-item" href="#">Mute</a>
        <div class="dropdown-divider"></div>
        <a @click.prevent='notathingyet' class="dropdown-item tip" href="#">Send Tip</a>
        <div v-if="canModify(i.owner)">
            <div class="dropdown-divider"></div>
            <a @click.prevent='deletePost(i.id)' class="dropdown-item" href="#">Delete</a>
            <a class="dropdown-item" href="#">Resend Notification</a>

        </div>
    </div>
</template>

<script>
import { create } from 'vue-modal-dialogs'
import Confirm from '@/components/modals/confirm'

import Post from '@/core/post.core'

import Channel from '@/core/channel.core'

const confirm = create(Confirm, 'title', 'content')

export default {
    props: ['i'],
    data() {
        return {
            subscriptionWaiting: false
        }
    },
    methods: {
        unsubscribe(i) {
            Channel.unsubscribe(i.channel)
                .then(() => {
                    this.$root.$emit('alert', 'success', `Successfully unsubscribed from @${i.channel.username}`)
                })
                .catch(e => {
                    this.$root.$emit('alert', 'error', `Rats, couldn't unsubscribe from @${i.channel.username}`)
                })
        },
        notathingyet() {
            alert('This function is not available yet')
        },
        canModify(id) {
            return !!(this.isSuperUser || Channel.isMyChannel(id))
        },
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
        isSubscribed(channel) {
            return Channel.isSubscribed(channel.id)
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
