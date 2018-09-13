import * as store from '@/core/store'
import * as api from '@/core/api'

const Account = {
    // Create account, return true upon completion
    create: credentials => api.createAccount(credentials).then(() => true),
    // Handle login
    login(credentials) {
        return api.authRequest(credentials).then(res => {
            localStorage.setItem('token', res.data.token)
            store.commit('addToken', res.data.token)
            return true
        })
    },
    // Handle logout
    logout() {
        store.commit('dataLoaded', false)
        return api.logout().then(() => {
            localStorage.clear()
            store.commit('removeToken')
        })
    },
    // Upon app refresh or initial load request data payload from server and populate store
    refresh() {
        store.commit('clearAllData')
        return api.refresh().then(res => {
            const account = res.data.account
            const subscriptions = res.data.subscriptions
            const subscriptionsIndexArray = subscriptions.map(sub => sub.id)
            const channels = res.data.subscriptions.concat(res.data.suggested)

            store.commit('populateUser', account)
            store.commit('populateChannels', channels)

            const columns = {
                1: subscriptionsIndexArray.filter(id => !account.muted.includes(id)), // getting notified index array
                2: account.favorites || [],
                3: account.muted || [] // muted notified index array
                // insert public lists here
            }

            const lists = Object.assign({}, res.data.lists, {
                columns
            })

            store.commit('populateLists', lists)
            store.commit('populateSettings', account.settings)

            store.commit('generateIndex', {
                payload: res.data.subscriptions,
                type: 'subscriptions'
            })
            store.commit('generateIndex', {
                payload: res.data.suggested,
                type: 'suggested'
            })

            store.commit('populatePosts', res.data.posts) //change

            setTimeout(() => {
                store.commit('dataLoaded', true)
            }, 0)
            return true
        })
    },
    // Change password then return true
    changePassword: passwordBody => api.changePassword(passwordBody).then(() => true),
    // Get account's devices from the API
    getDevices: () => api.getAccountDevices().then(devices => devices.data.devices),
    // Add a token to the users device
    addPushToken: async token => {
        try {
            console.log('SENDING TOKEN: ', token)
            const done = await api.addPushToken({
                pushNotificationToken: token,
                pushNotificationTokenType: 'WPSH'
            })

            return done
        } catch (e) {
            console.log('Error adding Notification Token to server')
        }
    },

    updateSettings: async settings => {
        try {
            store.commit('updateSettings', settings)

            //var key = Object.keys(settings)
            //if (settings[key])

            const update = await api.updateSettings({
                settings: settings
            })

            console.log('Updating Settings: ', settings)
            Promise.resolve(update)
        } catch (e) {
            Promise.reject(e)
        }
    }
}

export default Account