import * as methods from '@/utils/methods'

export default {
    state: {
        // all the posts
        posts: [],
        // object to store the current post expanded
        moreInfo: {}
    },
    mutations: {
        populatePosts: (state, posts) => (state.posts = posts),
        addNewPosts: (state, newPosts) => {
            const all = state.posts.concat(newPosts)
            // remove duplicates
            state.posts = methods.removeDuplicates(all)
            // log new posts for shuffleJS
            // state.addedPosts = methods.removeDuplicatesReturnNew(state.posts, newPosts)
        },
        removePosts: (state, posts) => {
            // map posts to delete to an array of ids
            const array = posts.map(post => post.id)
            // if post.id contains on of the ids in the array to delete, filter them out
            state.posts = state.posts.filter(post => array.includes(post.id))
        },
        removePostByID: (state, postID) => {
            state.posts = state.posts.filter(post => post.id !== postID)
        },
        moreInfo: (state, post) => {
            state.moreInfo = post
        }
    },
    actions: {},
    getters: {
        getPosts: state => {
            return methods.sortByDate(state.posts)
        },
        addedPosts: state => state.newPosts,
        removedPosts: state => state.removedPosts
        // getChannelPosts: state => methods.sortByDate(state.posts.filter(post => post.owner === state.channel.channelData.id))
    }
}