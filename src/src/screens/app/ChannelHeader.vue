<template>
    <div class="channel_header_container">
        <!-- <transition name="fade">
            <button v-if="channelOpened" v-shortkey="['esc']" @shortkey="closeChannelHeader"
                    @click="closeChannelHeader" class="coolbtn borderless top_channel_close clear_button"
                    type="button"><i class="fa fa-times"></i></button>
        </transition> -->
        <div class="channel_header">
            <div class="channel-header-container">

                <div class="channel-meta">
                    <div v-if="channelSidebar.avatar"
                         v-bind:style="{ 'background-image': 'url(' + channelSidebar.avatar + ')' }"
                         class="avatar avatar_larger"></div>
                    <div v-else
                         v-bind:style="{ 'background-image': 'url(' + defaultAvatar() + ')' }"
                         class="avatar avatar_larger"></div>

                    <div class="channel-info">
                        <h4 class="display_name" :class="(channelSidebar.username === 'Jack') ? 'rainbow' : ''">{{ trimmedString(channelSidebar.displayName, 30) }} <span
                                v-if="channelSidebar.verified === 'true'" class="verified verified_tick"></span></h4>
                        <a class="display_name username" style="cursor: pointer;" v-clipboard:copy="'https://notify.me/' + this.channelSidebar.username" @click.prevent="coppied()"><span>notify.me/</span>{{channelSidebar.username}}</a>
                    </div>


                    <div class="stats">
                        <div class="stat_item">
                            <div class="stat_number">{{channelSidebar.subCount || 0}}</div>
                            <div class="stat_label">SUBS</div>
                        </div>
                        <div class="stat_item">
                            <div class="stat_number">{{channelSidebar.subCount || 0}}</div>
                            <div class="stat_label">NOTIFIED</div>
                        </div>
                        <div class="stat_item">
                            <div class="stat_number">1</div>
                            <div class="stat_label">PER DAY</div>
                        </div>
                        <!-- <div class="stat_item">
                            <div class="stat_number">{{channelSidebar.postCount}}</div>
                            <div class="stat_label">Posts</div>
                        </div> -->
                    </div>

                    <div :class="{ subscribed: isSubscribed }" class="options">
                        <button v-if="isSubscribed" @click="unsubscribe(channelSidebar)"
                                :class="{ 'subscriptionWaiting': subscriptionWaiting }" type="button"
                                class="coolbtn sub_button ">&#x2713; SUBSCRIBED
                        </button>
                        <button v-else @click="createSubscription(channelSidebar)"
                                :class="{ 'subscriptionWaiting': subscriptionWaiting }" type="button"
                                class="coolbtn sub_button unsubscribed">GET NOTIFIED
                        </button>
                        <button class="coolbtn borderless channelsettings clear_button" type="button" id="channelMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-cog"></i></button>

            		<DropdownChannel/>
                    </div>
					

                </div><!-- .channel-meta -->

            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Channel from '@/core/channel.core.js'
import { setTimeout } from 'timers'
import * as methods from '@/utils/methods'

import { create } from 'vue-modal-dialogs'
import Confirm from '@/components/modals/confirm'
import DropdownChannel from '@/components/dropdowns/DropdownChannel'

const confirm = create(Confirm, 'title', 'content', 'buttonLabel')
export default {
    components: {
        DropdownChannel
    },
    data() {
        return {
            subscriptionWaiting: false,
            scroll: 0
        }
    },
    mounted() {},
    methods: {
        coppied() {
            this.$root.$emit('alert', 'success', `The channel link has been coppied to your clipboard`)
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
                        this.channelSidebar.subCount--
                    })
                    .catch(e => {
                        console.log(e)
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
        ...mapGetters({
            channelSidebar: 'getchannelData',
            channelSidebarOpened: 'channelSidebarOpened',
            channelOpened: 'channelOpened'
        }),

        isSubscribed() {
            return this.$store.state.channel.subscriptions.includes(this.channelSidebar.id)
        },
        channelSidebar() {
            return this.$store.getters.getchannelData
        }
    }
}
</script>


<style lang="scss" scoped>
.verified {
    width: 18px;
    height: 14px;
    display: inline-block;
    opacity: 0.6;
}
.channel_header_container .borderless {
    margin-top: -2px;
    opacity: 0.3;
}

.verified svg {
    margin-top: 5px;
}

.avatar_larger {
    // transition: 200ms;
    position: absolute;
    width: 100px;
    height: 100px;
    margin-top: 6px;
    display: inline-block;
}

.channel-meta {
    width: 100%;
}

.channel-info {
    text-align: left;
    transition: 200ms;
    float: left;
    margin-left: 140px;
    margin-top: 31px;
    margin-right: 60px;
}

.channel-meta .stats {
    display: block;
    transition: 200ms;
    position: relative;
    margin-left: 20px;
    float: left;
    margin-left: 59px;
    margin-top: 38px;
}

.channel-meta .options {
    margin-top: 43px;
    // float: left;
    // position: absolute;
    transition: 200ms;
    right: 0;
}

.channel-meta .stats .stat_item {
    min-width: 40px;
    float: left;
    text-align: left;
    margin-right: 40px;
}

.channel-info .display_name,
.channel-info .username {
    text-align: left;
}

.channel-info .display_name {
    font-size: 25px;
    margin-bottom: 0px;
}

.channel-info .username {
    font-size: 14px;
    margin-top: 10px;
}
</style>
