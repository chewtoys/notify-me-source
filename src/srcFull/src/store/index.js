import Vue from 'vue'
import Vuex from 'vuex'

// import { CONNECTION_ERROR } from '@/store/types'
import auth from './modules/auth.store'
import user from './modules/user.store'
import ui from './modules/ui.store'
import channel from './modules/channel.store'
import columns from './modules/columns.store'
import post from './modules/post.store'
import topics from './modules/topics.store'
import devices from './modules/devices.store'
import settings from './modules/settings.store'

import * as methods from '@/utils/methods'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        user,
        ui,
        channel,
        columns,
        post,
        topics,
        settings,
        devices
    },
    state: {
        // the authentication token
        token: '',

        previousRoute: '',
        // if this is false the application will not render
        dataLoaded: false,
        // i think this is redundant
        serverError: false,
        // this too
        pendingAction: '',
        // use this to tell the server what page the infinate scroll is at
        postsPageNumber: 0,
        // remove this
        tempNumbers: {},

        // this tells the application if we're waiting for an API request
        globalWaitingForServer: 0,
        requestStack: [],

        //search
        searchWaiting: false,
        searchResults: [],

        // let the application know we have a connection error
        connectionError: false,

        drag: false,
        draggedElementData: null,

        sidebarClosed: true,
        searchOverlay: false,
        // show the feed or channel tabs
        showPosts: true
    },
    mutations: {
        drag: (state, x) => (state.drag = x),
        draggedElementData: (state, x) => (state.draggedElementData = x),
        clearAllData: state => {
            state.channel.loadedChannels = []
            state.post.posts = []
        },
        token: (state, x) => (state.token = x),
        dataLoaded: (state, x) => (state.dataLoaded = x),
        serverError: (state, x) => (state.serverError = x),
        globalWaitingForServer: (state, x) => (state.globalWaitingForServer += x),
        requestStack: (state, request) => {
            // find request
            const matchingRequest = state.requestStack.filter(i => i.request === request)
            // remove request
            state.requestStack = state.requestStack.filter(i => i.request !== request)
            // build new request
            // debugger
            let count = 0
            if (matchingRequest.length > 0) count = matchingRequest[0].count
            if (count > 0) console.log('Multiple request count:' + count)
            const requestObject = {
                request: request,
                count: ++count,
                time: new Date()
            }
            // reinsert modified request
            state.requestStack.unshift(requestObject)
        },
        removeRequest: (state, request) => (state.requestStack = state.requestStack.filter(i => i.request !== request)),

        pendingAction(state, x) {
            state.pendingAction = x
        },
        incrementPostsPageNumber(state) {
            state.postsPageNumber++
        },
        //search
        searchWaiting: (state, status) => (state.searchWaiting = status),
        searchResults: (state, results) => (state.searchResults = results),
        toggleSearchOverlay: state => (state.searchOverlay = !state.searchOverlay),
        mergeResultsWithLocal: (state, payload) => {
            state.searchResults = methods.removeDuplicates(state.searchResults.concat(payload))
        },
        connectionError: state => {}
    },
    actions: {
        // connectionError: ({ commit, dispatch }, e)=>{
        //     commit(connectionError, true)
        //     this.$root.$emit('alert', 'error', e)
        // }
    },
    getters: {
        connectionError: state => state.connectionError,
        getSearchResults: state => state.searchResults,
        getCurrentRequest: state => state.requestStack[0]
    }
})

export default store