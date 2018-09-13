import * as methods from '@/utils/methods'

// This store is used for storing all the loaded (cached) channel objects.
export default {
    state: {
        //
        loadedChannels: [],

        // INDEX ARRAYS
        subscriptions: [],
        suggested: [],

        // the current external channel user is viewing or considering
        channelData: {},

        // if the channel sidebar is open
        channelSidebarOpened: false,

        // if the channel sidebar is open
        channelOpened: false
    },
    mutations: {
        populateChannels: (state, payload) => {
            const channels = methods.removeDuplicates(payload)
            state.loadedChannels = channels
            // console.log('do we have jamie?', state.loadedChannels.find(channel => channel.id === 1))
        },
        addChannelsToLoaded: (state, payload) => {
            const channels = state.loadedChannels.concat(payload)
            state.loadedChannels = methods.removeDuplicates(channels)
        },
        generateIndex: (state, {
            payload,
            type
        }) => {
            state[type] = payload.map(item => item.id)
            // console.log(state[type])
        },

        addSubscription: (state, channelID) => {
            console.log('UPDATING UI WITH NEW SUB', channelID)
            state.subscriptions.unshift(channelID)
        },
        removeSubscription: (state, channelID) => (state.subscriptions = state.subscriptions.filter(item => item !== channelID)),
        // Channel Sidebar Mutations:
        updateCurrentlyViewingChannel: (state, channelData) => (state.channelData = channelData),
        toggleChannelSidebar: state => (state.channelSidebarOpened = !state.channelSidebarOpened),
        openChannelSidebar: state => (state.channelSidebarOpened = true),
        closeChannelSidebar: state => (state.channelSidebarOpened = false),
        tempPostsForChannel: (state, posts) => (state.channelPosts = posts)
    },
    actions: {},
    getters: {
        getAllChannels: state => state.loadedChannels,
        getSubscriptions: state => state.loadedChannels.filter(item => state.subscriptions.includes(item.id)),
        getSuggested: state => {
            const suggested = state.loadedChannels.filter(item => state.suggested.includes(item.id) && !state.subscriptions.includes(item.id))
            // eventually remove this in favour of an algorythm
            suggested.sort((a, b) => b.subCount - a.subCount)
            return suggested.slice(0, 25)
        },
        channelSidebarOpened: state => state.channelSidebarOpened,
        channelOpened: state => state.channelOpened,
        getchannelData: state => state.channelData,
        getChannelData: state => state.channelData,
        getChannelSidebarID: state => {
            if (state.channelData) return state.channelData.id
        }
    }
}