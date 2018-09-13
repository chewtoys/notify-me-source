import axios from 'axios'
import store from '@/store'
import router from '@/router'

let burl = localStorage.getItem('api') || 'https://api.notify.gg/'

export default class Request {
    static post(url, data) {
        return Request.httpCall('post', url, data)
    }
    static put(url, data) {
        return Request.httpCall('put', url, data)
    }
    static get(url) {
        return Request.httpCall('get', url, null)
    }
    static delete(url, data) {
        return Request.httpCall('delete', url, data)
    }
    static patch(url, data) {
        return Request.httpCall('patch', url, data)
    }

    static httpCall(method, url, data) {
        let config = {
            method: method,
            baseURL: burl,
            url: url,
            data: JSON.stringify(data),
            timeout: 10000,
            headers: {
                Authorization: store.getters.token,
                'Content-Type': 'application/json'
            }
        }

        if (method === 'get' || data === null) {
            delete config.data
        }

        // if (!headers) {
        //     delete config.headers;
        // }

        let instance = axios.create(config)

        instance.interceptors.request.use(
            function(config) {
                // stop the request if one is already in progress
                // const requestStack = store.state.requestStack.find(i => i.request === config.baseURL + config.url)
                store.commit('requestStack', config.baseURL + config.url)

                // store.commit('globalWaitingForServer', 1)
                return config
            },
            function(error) {
                // Do something with request error
                // store.commit('globalWaitingForServer', -1)
                return Promise.reject(error)
            }
        )

        instance.interceptors.response.use(
            function(response) {
                console.log(`REQUEST STATUS: %c${response.status}`, 'color: #68e03c; font-weight: bold;')
                console.log(response.data)
                store.commit('removeRequest', response.request.responseURL)
                // Do something before request is sent
                // store.commit('globalWaitingForServer', -1)
                return response
            },
            function(error) {
                // Do something with request error
                // store.commit('globalWaitingForServer', -1)
                // console.log({ error })
                console.error('[API Error]: ', error.response)

                if (error.response.status === 401) {
                    store
                        .dispatch('authLogout')
                        .then(() => {
                            router.push('/login')
                        })
                        .catch(err => {
                            console.error('Critical Error: ', err)
                        })
                }

                store.commit('removeRequest', error.request.responseURL)
                return Promise.reject(error.response)
            }
        )

        return instance.request(config)
    }
}