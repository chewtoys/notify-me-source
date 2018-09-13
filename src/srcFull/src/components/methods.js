import Vue from 'vue'
import router from '@/router'
import {
    server
} from '@/main'
import store from '@/store'
import {
    stringify
} from 'querystring'
import $ from 'jquery'

import Account from '@/core/account.core'

import Channel from '@/core/channel.core'
import Post from '@/core/post.core'

import moment from 'moment'

Vue.mixin({
    mounted() {},
    data() {
        return {
            subscriptionWaiting: false
        }
    },
    methods: {
        /**
         * Toggle the dark mode class
         */
        theme() {
            const body = document.body

            if (this.$store.getters.getSettings.DARK_MODE) body.classList.add('dark')
            else body.classList.remove('dark')
        },
        darkTheme(bool) {
            Account.updateSettings({
                DARK_MODE: bool
            }).catch(() => {
                this.$root.$emit('alert', 'error', 'Failed to switch Theme. Your theme will change back to light mode when you refresh')
            })
        },
        /**
         * Get a channel by their username
         */
        loadChannel(username) {
            Channel.getByUsername(username)
                .then(res => {
                    this.openChannel(res.data.channel)
                    this.$store.commit('addChannelsToLoaded', [res.data.channel])
                })
                .catch(e => {
                    console.log(e)
                    this.$root.$emit('alert', 'error', `Could not load channel @${username}.`)
                    this.$router.push('/subscriptions')
                })
        },
        /**
         * Open a channel
         */
        openChannel(channel) {
            const previousChannel = this.$store.getters.getChannelSidebarID
            this.$store.commit('updateCurrentlyViewingChannel', channel)
            this.$store.state.channel.channelOpened = true
            if (!this.$store.state.previousRoute.startsWith('/channel')) this.$router.push(`/channel/${channel.username}`)

            Post.getPostsByCreatorFromServer(previousChannel, channel).catch(e => {
                this.$root.$emit('alert', 'error', `Could not load users posts.. ${e}`)
            })
        },
        /**
         * Trims a string to a specified length
         */
        trimmedString(string, length) {
            if (string && string.length > length) {
                return string.substring(0, length)
            }

            return string
        },
        /**
         * Well i guess this logs the person out
         */
        logout() {
            Account.logout()
                .then(() => {
                    this.$root.$emit('alert', 'success', 'Successfully logged out!')
                    this.$root.$emit('closeModal')
                    this.$router.push('/login')
                })
                .catch(() => {
                    this.$root.$emit('alert', 'error', `Couldn't log out, check your connection. (or check console & report to Jamie)`)
                })
        },
        /**
         * Pushes to the home page
         */
        home() {
            this.$store.state.dataLoaded = false
            this.$router.push('/')
        },
        /**
         * Creates a new subscription
         */
        createSubscription(channel) {
            this.subscriptionWaiting = true
            Channel.subscribe(channel)
                .then(res => {
                    this.subscriptionWaiting = false
                    this.$root.$emit('alert', 'success', `You subscribed to @${channel.username}`)
                    this.$root.$emit('refreshFeed')
                    // this.channelSidebar.subCount++
                })
                .catch(e => {
                    console.log(e)
                    this.subscriptionWaiting = false
                    this.$root.$emit('alert', 'error', `Could not subscribe to @${channel.username}.`)
                })
        },
        nideDate(timestamp) {
            moment.updateLocale('en')

            return moment(timestamp).format('MMMM Do YYYY, h:mm a')
        },
        niceTime(time) {
            moment.updateLocale('en', {
                relativeTime: {
                    future: 'now',
                    past: '%s',
                    s: '1 second ago',
                    m: '1 minute ago',
                    mm: '%d minutes ago',
                    h: '1 hour ago',
                    hh: '%d hours ago',
                    d: '1 day ago',
                    dd: '%d days ago',
                    M: '1 month ago',
                    MM: '%d months ago',
                    y: '1 year ago',
                    yy: '%d years ago'
                }
            })
            return moment(time).fromNow()
        },
        closeChannelHeader() {
            // usually we'll just go back when the user closes the
            if (this.$store.state.previousRoute.startsWith('/channel')) this.$router.push('/subscriptions/')
            else this.$router.go(-1)
            this.$store.state.channel.channelSidebarOpened = false
            this.$store.state.channel.channelOpened = false
        },
        /**
         * Show create channel modal
         */
        createChannel() {
            this.$root.$emit('modal', 'CreateChannel')
        },
        /**
         * Show edit channel modal
         */
        editChannel() {
            this.$root.$emit('modal', 'EditChannel')
        },
        /**
         * Show the switch channel modal
         */
        switchChannel() {
            this.$root.$emit('modal', 'SwitchChannel')
        },
        /**
         * Show create notification modal
         */
        createNotification() {
            this.$root.$emit('modal', 'NewNotification')
        },
        /**
         * The default avatar
         */
        defaultAvatar() {
            return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlK-CycysHbJHbCLuqJJblfJVdEvGPX6WLnFcXblH-pi61Y7_q'
        }
    },
    computed: {
        userHasChannel() {
            var channels = this.$store.state.user.channels
            return !(channels === undefined || channels.length == 0)
        },
        devmode() {
            return this.$store.getters.getSettings.DEV_MODE
        },
        isSuperUser() {
            return this.$store.getters.isSuperUser
        },
        myChannel() {
            return this.$store.getters.getCurrentChannel
        }
    }
})