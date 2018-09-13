import * as store from '@/core/store'
import * as methods from '@/utils/methods'
import * as api from '@/core/api'
import router from '../router'

const Post = {
    async scrape(link) {
        return await api.scrape(link)
    },
    async youtube(link) {
        return await api.youtube(link)
    },
    async newPost(post) {
        return await api.newPost(post)
    },
    async deletePost(id) {
        return await api.deletePost(id).then(() => {
            store.commit('removePostByID', id)
        })
    },
    // this will fire every time we switch to a new channel, in the store we move the current feed data to a new object
    // we then update the feed data with the new data from the server
    async getPostsByCreatorFromServer(previousChannelID, channel) {
        if (previousChannelID === channel.id) return // Stop the request from going through if we're already on that channel
        // const currentViewingChannel = store.getter('getchannelData')
        return await api.getChannelPosts(channel.id).then(response => {
            response.data.posts.forEach(post => (post.channel = channel))
            store.commit('addNewPosts', response.data.posts)
        })
    },
    // Credit: IAMABananaAMAA in Twitch Chat
    aggregateTopics(posts) {
        posts = posts.map(p => {
            if (!p.topics) {
                p.topics = []
            } //hotfix
            return p.topics.concat(p.platform)
        }) // map to topics + platform
        posts = posts.reduce((acc, val) => acc.concat(val), []) // flatten everything
        const counts = posts.reduce((acc, topic) => {
            acc[topic] = (acc[topic] || 0) + 1
            return acc
        }, {})
        const topics = Object.entries(counts).map(([topic, count], y) => {
            return {
                topic,
                count,
                id: Math.random()
            }
        })
        topics.sort(function(a, b) {
            return b.count - a.count
        })
        return topics
    },
    analyseURL(url) {
        let platform = ''

        const matches = {
            youtube: /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
            soundcloud: /((https:\/\/)|(http:\/\/)|(www.)|(m\.)|(\s))+(soundcloud.com\/)+[a-zA-Z0-9\-\.]+(\/)+[a-zA-Z0-9\-\.]+/,
            twitter: /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/,
            twitch: /http(?:s)?:\/\/(?:www\.)?twitch\.tv\/([a-zA-Z0-9_]+)/,
            reddit: /http(?:s)?:\/\/(?:www\.)?reddit\.com\/([a-zA-Z0-9_]+)/,
            facebook: /http(?:s)?:\/\/(?:www\.)?facebook\.com\/([a-zA-Z0-9_]+)/,
            instagram: /http(?:s)?:\/\/(?:www\.)?instagram\.com\/([a-zA-Z0-9_]+)/,
            notify: /http(?:s)?:\/\/(?:www\.)?notify\.me\/([a-zA-Z0-9_]+)/,
            spotify: /http(?:s)?:\/\/(?:www\.)?open.spotify\.com\/([a-zA-Z0-9_]+)/,
            discord: /http(?:s)?:\/\/(?:www\.)?discord\.gg\/([a-zA-Z0-9_]+)/,
            github: /http(?:s)?:\/\/(?:www\.)?(?:gist\.)?github\.com\/([a-zA-Z0-9_]+)/
        }
        platform = Object.keys(matches).filter(key => {
            if (url.match(matches[key])) return key
        })[0]
        if (!platform) platform = 'unknown'
        return platform
    }
}

export default Post