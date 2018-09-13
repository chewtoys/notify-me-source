<template>
    <div class="topnav_container">
        <ul v-if="channelHeaderOpened" class="topnav">
                <div v-shortkey="['esc']" @shortkey="closeChannelHeader" @click.prevent="closeChannelHeader" class="nav_back_button"><i class="fa fa-times"></i></div>

            <router-link :to="'/channel/' + channelData.username + '/about'">
                <li class="tab_button"><i class="fa fa-user"></i> <span> About</span></li>
            </router-link>
            <router-link :to="'/channel/' + channelData.username">
                <li class="tab_button"><i class="fa fa-th-large"></i> <span>Content</span></li>
            </router-link>
            <router-link :to="'/channel/' + channelData.username + '/history'">
                <li class="tab_button"><i class="fa fa-history"></i> <span>Notification History</span></li>
            </router-link>
            <router-link :to="'/channel/' + channelData.username + '/shows'">
                <li class="tab_button"><i class="fa fa-tv"></i> <span>Shows</span></li>
            </router-link>
        </ul>
        <ul v-else class="topnav">
            <router-link to="/discover/">
                <li class="tab_button"><i class="fa fa-eye"></i> <span>Discover</span></li>
            </router-link>
            <router-link to="/subscriptions">
                <li class="tab_button"><i class="fa fa-clipboard-list"></i> <span>Subscriptions</span></li>
            </router-link>
            <router-link to="/trending">
                <li class="tab_button"><i class="fa fa-fire"></i> <span>Trending</span></li>
            </router-link>
            <!-- <router-link to="#favorites">
                <li class="tab_button"><i class="fa fa-heart"></i> <span>Favorites</span></li>
            </router-link> -->
            <!-- <router-link to="#news">
                <li class="tab_button"><i class="fa fa-newspaper"></i> <span>News</span></li>
            </router-link> -->
        </ul>


    </div>
</template>
<script>
import * as methods from '@/utils/methods'
import Channel from '@/core/channel.core'

import { create } from 'vue-modal-dialogs'
import Confirm from '@/components/modals/confirm'

const confirm = create(Confirm, 'title', 'content', 'buttonLabel')

export default {
    data() {
        return {
            subscriptionWaiting: false
        }
    },
    methods: {
        createSubscription(channel) {
            this.subscriptionWaiting = true
            Channel.subscribe(channel)
                .then(res => {
                    this.subscriptionWaiting = false
                    this.$root.$emit('alert', 'success', `You subscribed to @${channel.username}`)
                })
                .catch(e => {
                    this.subscriptionWaiting = false
                    this.$root.$emit('alert', 'error', e.error)
                })
        },
        async unsubscribe(channel) {
            if (await confirm(`Are you sure you unsubscribe from ${channel.displayName}?`, '', 'Unsubscribe')) {
                this.subscriptionWaiting = true
                Channel.unsubscribe(channel)
                    .then(postsToDelete => {
                        this.subscriptionWaiting = false
                        // send message to shuffle instance to update
                        // this.$root.$emit('removePostsFromShuffle', postsToDelete)
                        this.$root.$emit('alert', 'success', `Successfully unsubscribed from ${channel.username}`)
                    })
                    .catch(e => {
                        this.subscriptionWaiting = false
                        this.$root.$emit('alert', 'error', e.error)
                    })
            }
        },

        isMyChannel() {
            return Channel.isMyChannel()
        }
    },
    computed: {
        channelHeaderOpened() {
            return this.$store.state.channel.channelOpened
        },
        isSubscribed() {
            if (this.$store.state.channel.subscriptions.includes(this.channelSidebar.id)) return true
            return false
        },
        channelSidebar() {
            return this.$store.getters.getchannelData
        },
        channelData() {
            return this.$store.getters.getchannelData
        }
    }
}
</script>

<style lang="scss">
.nav_back_button {
    margin: 13px 34px 0 24px;
    float: left;
    opacity: 0.5;
    transition: 200ms;
    &:hover {
        opacity: 1;
    }
}
</style>
