export default {
    state: {
        devices: []
    },
    mutations: {
        populateDevices: (state, payload) => {
            state.devices = payload
        }
    },
    actions: {},
    getters: {}
}