<template>
    <div>
        <!-- START -->

        <transition name="fade">
            <!-- APP -->
            <div v-if="dataLoaded" :class="{ 'channelOpened': channelOpened, 'sidebar_closed': sidebarClosed }">
                <ChannelSidebar/>
                <div id="appcontainer" class="appcontainer jeff" :class="{ 'channel_opened': channelSidebarOpened }">
                    <LeftSidebar/>
                    <div class="page_container">
                        <transition name="sub">
                            <SubscriptionManager v-if="subscriptionManagerOpened"/>
                        </transition>
                        <!-- FULL WIDTH BGS OUTSIDE OF CONTAINER -->
                        <div class="channel_header channel_header_bg"/>
                        <div class="topnav topnav_bg"/>

                        <ChannelHeader/>

                        <TopRightActions/>

                        <div ref="appScroll" class="app">
                            <TopNavigation/>
                            <router-view />
                        </div>

                    </div>

                </div>

            </div>
        </transition>

        <LoadingScreen v-if="!dataLoaded" :chosen-line="chosenLine"/>


        <!-- END -->
    </div>
</template>

<script>
import router from '@/router'
import { server } from '@/main'

import Account from '@/core/account.core'

//components
import ChannelSidebar from '@/screens/app/ChannelSidebar'
import ChannelHeader from '@/screens/app/ChannelHeader'
import LeftSidebar from '@/screens/app/LeftSidebar'
import TopRightActions from '@/screens/app/TopRightActions'
import TopNavigation from '@/screens/app/TopNavigation'
import SubscriptionManager from '@/screens/app/SubscriptionManager'

import PerfectScrollbar from 'perfect-scrollbar'

import { LoadingScreen } from '@/components/presentational'
import { loadingLines } from '@/assets/data'

import push from '@/core/workers/push'

export default {
    components: {
        ChannelSidebar,
        ChannelHeader,
        LeftSidebar,
        TopRightActions,
        TopNavigation,
        SubscriptionManager,
        LoadingScreen
    },

    data() {
        return {
            focus: false,
            query: '',
            chosenLine: {}
        }
    },
    created() {
        // if (this.$store.getters.isAuthenticated) return router.push('/app')
        // const ps = new PerfectScrollbar('.app')
        this.chosenLine = loadingLines[Math.floor(Math.random() * loadingLines.length)]
    },
    updated() {
        // if (this.darkTheme) document.documentElement.classList.add('dark')
    },
    mounted() {
        // make sure the theme is correct
        this.theme()

        setTimeout(() => {
            this.$refs.appScroll.addEventListener('scroll', e => {
                const scroll = this.$refs.appScroll.scrollTop
                if (scroll !== 0) document.body.classList.add('scrolling')
                else document.body.classList.remove('scrolling')
            })
        }, 2500)

        Account.refresh()
            .then(res => {
                push()
            })
            .catch(e => {
                if ((e.code = 'messaging/unsupported-browser')) return
                if (process.env.NODE_ENV !== 'development') this.$router.push('/login')
                this.$store.state.dataLoaded = false
                this.$root.$emit('alert', 'error', 'Error initializing app. Try again.')
                console.log('Initialization Error:', { e })
            })
    },
    methods: {
        logout() {
            this.$store
                .dispatch('authLogout')
                .then(() => {
                    this.$router.push('/login')
                })
                .catch(err => {
                    alert(err)
                })
        }
    },
    computed: {
        dataLoaded() {
            return this.$store.state.dataLoaded
        },
        user() {
            return this.$store.getters.getUser
        },
        userHasChannel() {
            return this.$store.getters.userHasChannel
        },
        channel() {
            return this.$store.getters.getCurrentChannel
        },
        channelSidebarOpened() {
            return this.$store.state.channel.channelSidebarOpened
        },
        channelOpened() {
            return this.$store.state.channel.channelOpened
        },
        sidebarClosed() {
            return this.$store.state.sidebarClosed
        },
        subscriptionManagerOpened() {
            return this.$store.getters.subscriptionManagerOpened
        }

        // topics () {
        //     return this.$store.state.topics
        // },
        // channelSidebar () {
        //     return this.$store.state.channelSidebar
        // },
        // darkTheme: function(){
        //     return this.$store.getters.isDarkTheme
        // }
    },
    watch: {}
}
</script>


<style lang="scss">
.app {
    background: #ffffff;
    width: 100%;
    height: 100vh;
    box-shadow: 0px 2px 43px 0px rgba(0, 0, 0, 0.04);
    border-radius: 0px;
    position: relative;
    min-width: 950px;
    overflow: scroll;
}

.page {
    padding: 65px 14px 0px 30px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
 {
    opacity: 0;
}

.sub-enter-active {
    animation: slideee 200ms;
}

.sub-leave-active {
    animation: reverseSlide 200ms;
}

.dark .login_page .container .login_box.loading {
    color: rgb(248, 248, 248);
}

@keyframes slideee {
    0% {
        transform: translateY(-100px);
    }
    50% {
    }
    100% {
        transform: translateY(0);
    }
}

@keyframes reverseSlide {
    0% {
        transform: translateY(0);
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        transform: translateY(-100%);
    }
}
</style>
