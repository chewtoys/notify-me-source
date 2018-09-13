import Request from './request'
import * as store from '@/core/store'

// GET REQUESTS

// ------------------------------------------
// Accounts and Authentication
// ------------------------------------------
export const refresh = () => Request.get('user/refresh')
export const authRequest = user =>
    Request.post('/auth', {
        email: user.email,
        password: user.password
    })
export const createAccount = user =>
    Request.post('/auth/create', {
        email: user.email,
        password: user.password
    })
export const logout = () => Request.get('auth/logout')
export const changePassword = passwordBody => Request.patch('auth/password', passwordBody)
// ------------------------------------------
// CHANNELS
// ------------------------------------------
export const check = username => Request.get('channel/check/' + username)
export const search = query => Request.get('channel/search/' + query)
export const getByUsername = username => Request.get('channel/username/' + username)
export const createChannel = channel => Request.post('/channel', channel)
export const editChannel = (updatedChannelValues, id) => Request.patch('/channel/' + id, updatedChannelValues)
export const deleteChannel = channelID => Request.delete(`channel/${channelID}`)

export const getPublicChannel = username => Request.get('channel/public/' + username)
// ------------------------------------------
// POSTS
// ------------------------------------------
export const newPost = post => Request.post('/post/new/', post)
export const deletePost = id => Request.delete(`post/${id}`)
export const getChannelPosts = id => Request.get('post/by/' + id + '/25')
// ------------------------------------------
// DEVICES
// ------------------------------------------
export const getAccountDevices = () => Request.get('devices/')
// ------------------------------------------
// API
// ------------------------------------------
export const scrape = x =>
    Request.post('wrapper/general/scrape', {
        link: x
    })
export const youtube = id => Request.get(`wrapper/youtube/video/${id}`)
// ------------------------------------------
// SUBSCRIPTIONS
// ------------------------------------------
export const subscribe = id => Request.get(`subscriptions/${id}`)
export const unsubscribe = id => Request.delete(`subscriptions/${id}`)
export const mute = id => Request.get(`/subscriptions/mute/${id}`)
export const unmute = id => Request.get(`/subscriptions/unmute/${id}`)
// ------------------------------------------
// SUBSCRIPTION MANAGER
// ------------------------------------------
export const getLists = () => Request.get(`/lists/`)
export const updateListPositions = list => Request.patch(`/lists/position`, list)

export const createList = list => Request.post(`/lists/`, list)
export const updateList = list => Request.patch(`/lists/${list.id}`)
export const deleteList = list => Request.delete(`/lists/${list.id}`)

export const hideList = list => Request.get(`/lists/hide/${list.id}`)
export const unhideList = list => Request.get(`/lists/unhide/${list.id}`)

// ------------------------------------------
// ADMIN
// ------------------------------------------
export const verifyChannel = username => Request.get(`admin/channel/verify/${username}`)
export const unVerifyChannel = username => Request.get(`admin/channel/unverify/${username}`)
export const transferChannel = body => Request.get(`/admin/channel/ownership/${body.owner}/${body.id}`)

export const createTopic = body => Request.post(`/admin/topic/`, body)
export const updateTopic = (id, body) => Request.patch(`/admin/topic/${id}`, body)
export const deleteTopic = id => Request.delete(`/admin/topic/${id}`)

// ------------------------------------------
// SETTINGS
// ------------------------------------------
export const updateSettings = settings => Request.patch(`/user/settings`, settings)

// ------------------------------------------
// CATEGORIES
// ------------------------------------------
export const searchCategories = search => Request.get(`/topic/search/${search}`)

export const addPushToken = body => Request.patch(`/devices/pushNotificationToken`, body)