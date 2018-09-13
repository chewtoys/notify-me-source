<template>
    <div id="profile_column" class="profile_column" :class="{'opened': channelSidebarOpened}">
        <div class="profile_container">
            <button v-shortkey="['esc']" @shortkey="closeChannel" @click="closeChannel"
                    class="coolbtn borderless channel_close clear_button" type="button"><i class="fa fa-times"></i>
            </button>
            <button @click="openChannel" class="coolbtn borderless channel_close clear_button" type="button"><i
                    class="fa fa-expand"></i></button>
            <div v-if="channelSidebar.avatar"
                 v-bind:style="{ 'background-image': 'url(' + channelSidebar.avatar + ')' }"
                 class="avatar avatar_large"></div>
            <div v-else v-bind:style="{ 'background-image': 'url(' + defaultAvatar() + ')' }"
                 class="avatar avatar_large"></div>
            <h4 class="display_name">{{channelSidebar.displayName}}</h4>
            <div class="display_name username"><span>notify.me/</span>{{channelSidebar.username}}</div>

            <div :class="{ subscribed: isSubscribed }" class="options">

                <button v-if="isSubscribed" @click="unsubscribe(channelSidebar)" type="button"
                        class="coolbtn sub_button ">&#x2713; SUBSCRIBED
                </button>
                <button v-else @click="createSubscription(channelSidebar)" type="button"
                        class="coolbtn sub_button unsubscribed">SUBSCRIBE
                </button>

                <button class="coolbtn borderless clear_button" type="button" id="channelMenuButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-cog"></i>
                </button>

                <div class="dropdown-menu mini" aria-labelledby="channelMenuButton">

                    <a v-if="isSubscribed" @click.prevent='unsubscribe(channelSidebar)' class="dropdown-item" href="#">Unsubscribe</a>
                    <a v-else @click.prevent='createSubscription(channelSidebar)' class="dropdown-item" href="#">Subscribe</a>
                    <a @click.prevent='createNotification' class="dropdown-item" href="#">Mute</a>
                    <a @click.prevent='addFavorite(channelSidebar)' class="dropdown-item" href="#">Favorite</a>
                    <div class="dropdown-divider"></div>
                    <a @click.prevent='createNotification' class="dropdown-item tip" href="#"><i
                            class="fa fa-dollar-sign"></i> Send Tip</a>
                    <div class="dropdown-divider"></div>
                    <a @click.prevent='copyProfileLink(channelSidebar.username)' class="dropdown-item" href="#">Copy
                        Share Link</a>
                    <div v-if="isMyChannel(channelSidebar.id)">
                        <div class="dropdown-divider"></div>
                        <a @click.prevent='deleteNotification(channelSidebar)' class="dropdown-item" href="#">Transfer
                            Ownership</a>
                        <a @click.prevent='deleteChannelDropdown' class="dropdown-item red" href="#">Delete</a>
                    </div>
                    <div v-if="this.isSuperUser">
                        <div class="dropdown-divider"></div>
                        <a @click.prevent='deleteNotification(channelSidebar)' class="dropdown-item" href="#">Transfer
                            Ownership</a>
                        <a v-if="isMyChannel(channelSidebar.id)" @click.prevent='deleteChannelDropdown' class="dropdown-item" href="#">Delete</a>
                        <div class="dropdown-divider"></div>
                        <a @click.prevent='switchToChannelButton' class="dropdown-item" href="#">Switch To Channel</a>
                        <a @click.prevent='switchToChannelButton' class="dropdown-item" href="#">View Owner Info</a>
                    </div>

                </div>
            </div>
            <div class="stats">
                <div class="stat_item">
                    <div class="stat_number">{{channelSidebar.subCount}}</div>
                    <div class="stat_label">SUBS</div>
                </div>
                <div class="stat_item">
                    <div class="stat_number">{{channelSidebar.subCount}}</div>
                    <div class="stat_label">NOTIFIED</div>
                </div>
                <div class="stat_item">
                    <div class="stat_number">1</div>
                    <div class="stat_label">PER DAY</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Channel from '@/core/channel.core.js'
import { setTimeout } from 'timers'
import * as methods from '@/utils/methods'

export default {
    components: {},
    data() {
        return {}
    },
    mounted() {},
    methods: {
        unsubscribe(channel) {
            Channel.unsubscribe(channel)
                .then(postsToDelete => {
                    // send message to shuffle instance to update
                    this.$root.$emit('alert', 'success', `Successfully unsubscribed from ${channel.username}`)
                })
                .catch(e => {
                    console.log(e)
                    this.$root.$emit('alert', 'error', `Rats, couldn't unsubscribe from ${channel.username}`)
                })
        },
        addFavorite(channel) {
            this.$store.commit('addFavorites', [channel])
        },
        closeChannel() {
            this.$store.commit('closeChannelSidebar')
        },
        openChannel() {
            this.$store.state.channel.channelSidebarOpened = false
            this.$store.commit('subscriptionManagerToggle')
            this.$store.state.channel.channelOpened = !this.$store.state.channel.channelOpened
        },
        isMyChannel(id) {
            Channel.isMyChannel(id)
        }
    },
    computed: {
        isSubscribed() {
            return Channel.isSubscribed()
        },
        ...mapState(['tempNumbers']),
        ...mapGetters({
            channelSidebar: 'getchannelData',
            channelSidebarOpened: 'channelSidebarOpened'
        })
    }
}
</script>


<style>
.profile_column.opened {
    z-index: 999;
    margin-left: 0;
}

.profile_column {
    width: 280px;
    float: left;
    height: 100vh;
    transition: 0.1s;
    position: fixed;
    z-index: -999;
    margin-left: -280px;
}

.profile_container {
    padding: 20px;
}

.channel_close {
    float: right;
}

.avatar_large {
    width: 100px !important;
    height: 100px !important;
}

.profile_container .avatar {
    margin: auto;
    float: none;
}

.profile_container .options {
    margin: auto;
    display: table;
    padding-top: 10px;
    width: 121px;
    margin: auto;
}

.profile_container .options.subscribed {
    width: 142px;
}

.profile_meta {
    padding: 9px 11px;
    margin-bottom: -5px;
}
</style>
