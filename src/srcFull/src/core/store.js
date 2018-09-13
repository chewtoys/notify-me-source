import store from '../store/index'

// change store here
// const store = vuex

export const commit = (method, data) => {
    store.commit(method, data)
}

export const dispatch = (method, data) => {
    store.dispatch(method, data)
}

export const getter = method => {
    return store.getters[method]
}