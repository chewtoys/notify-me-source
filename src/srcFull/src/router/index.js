import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import Profile from '@/components/Profile'

import {
    Login,
    Register
} from '@/components/container'

//main app
import MainView from '@/screens/app/MainView'

//landing
import Landing from '@/screens/landing/Landing'
import Home from '@/screens/landing/Home'
import About from '@/screens/landing/About'
import Team from '@/screens/landing/Team'
import PublicChannel from '@/screens/PublicChannel'

import Subscriptions from '@/screens/tabs/subscriptions'
import Discover from '@/screens/tabs/discover'
import Trending from '@/screens/tabs/Trending'

import ChannelAbout from '@/screens/channel/about'
import ChannelHistory from '@/screens/channel/History'
import ChannelShows from '@/screens/channel/Shows'

Vue.use(Router)

// const ifNotAuthenticated = (to, from, next) => {
// 	if (!store.getters.isAuthenticated) {
// 		next()
// 		return
// 	}
// 	next('/login')
// }
const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next()
        return
    }
    next('/login')
}

const redirectToApp = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next('/subscriptions')
        return
    }
    next('/')
}

const router = new Router({
    mode: 'history',
    linkActiveClass: 'active',
    routes: [{
            name: 'Landing',
            path: '/',
            component: Home
            // beforeEnter: redirectToApp
        },
        {
            name: 'About',
            path: '/about',
            component: About
            // beforeEnter: redirectToApp
        },
        {
            name: 'Team',
            path: '/team',
            component: Team
            // beforeEnter: redirectToApp
        },
        {
            path: '/subscriptions',
            component: MainView,
            beforeEnter: ifAuthenticated,
            children: [{
                    name: 'Subscriptions',
                    path: '/',
                    beforeEnter: ifAuthenticated,
                    component: Subscriptions
                },
                {
                    name: 'Lists',
                    path: '/lists',
                    beforeEnter: ifAuthenticated,
                    component: Subscriptions,
                    meta: {
                        lists: true
                    }
                },
                {
                    name: 'Channel',
                    path: '/channel/:username',
                    beforeEnter: ifAuthenticated,
                    component: Subscriptions,
                    props: true
                },
                {
                    name: 'channelAbout',
                    path: '/channel/:username/about',
                    beforeEnter: ifAuthenticated,
                    component: ChannelAbout,
                    props: true
                },
                {
                    name: 'channelHistory',
                    path: '/channel/:username/history',
                    beforeEnter: ifAuthenticated,
                    component: ChannelHistory,
                    props: true
                },
                {
                    name: 'channelShows',
                    path: '/channel/:username/shows',
                    beforeEnter: ifAuthenticated,
                    component: ChannelShows,
                    props: true
                },
                {
                    name: 'Discover',
                    path: '/discover',
                    beforeEnter: ifAuthenticated,
                    component: Discover,
                    props: true
                },
                {
                    name: 'Trending',
                    path: '/trending',
                    beforeEnter: ifAuthenticated,
                    component: Trending,
                    props: true
                }
            ]
        },
        {
            name: 'Login',
            path: '/login',
            component: Login
            // beforeEnter: ifAlreadyLoggedIn
        },
        {
            name: 'Create Account',
            path: '/create',
            component: Register
        },
        {
            name: 'PublicChannel',
            path: '/:username',
            props: true,
            component: PublicChannel
        }
    ]
})
router.beforeEach((to, from, next) => {
    // console.log('PREVIOUS ROUTE', router.history.current.path)
    store.state.previousRoute = router.history.current.path
    next()
})
router.afterEach(to => {
    Vue.nextTick(() => (document.title = to.name + ' - Notify'))
})

export default router