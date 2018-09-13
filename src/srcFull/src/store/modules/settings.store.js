export default {
    state: {
        settings: {}
    },
    mutations: {
        populateSettings: (state, payload) => {
            state.settings = payload
        },
        updateSettings: (state, settings) => {
            const x = Object.assign({}, state.settings)
            Object.entries(settings).forEach(setting => {
                const settingName = setting[0]
                const settingValue = setting[1]
                x[settingName] = settingValue
            })
            state.settings = x
        }
    },
    actions: {},
    getters: {
        darkTheme: state => state.settings.DARK_MODE || false,
        getSettings: state => state.settings || []
    }
}