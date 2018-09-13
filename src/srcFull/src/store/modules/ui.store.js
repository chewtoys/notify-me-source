export default {
    state: {
        isDarkTheme: JSON.parse(localStorage.getItem('isDarkTheme')) || false,
        onSwitchColor: '#A36AD8',
        offSwitchColor: '#efefef',
        onJackColor: '#fff',
        offJackColor: '#fff'
    },
    actions: {
        setDarkTheme: ({
            commit
        }, payload) => {
            localStorage.setItem('isDarkTheme', payload)
            commit('setDarkTheme', payload)
        }
    },
    mutations: {
        setDarkTheme: (state, payload) => {
            state.isDarkTheme = payload
            if (payload) {
                state.onSwitchColor = '#A36AD8'
                state.offSwitchColor = '#333333'
                state.onJackColor = '#fff'
                state.offJackColor = '#929292'
            } else {;
                (state.onSwitchColor = '#A36AD8'), (state.offSwitchColor = '#efefef'), (state.onJackColor = '#fff'), (state.offJackColor = '#fff')
            }
        }
    },
    getters: {
        isDarkTheme: state => state.isDarkTheme
    }
}