import * as api from '@/core/api'
// import important from '@/components/important'

export default {
    state: {
        token: localStorage.getItem('token') || '',
        status: ''
    },
    mutations: {
        addToken: (state, token) => (state.token = token),
        removeToken: state => {
            localStorage.removeItem('token')
            state.token = null
        },

        // old

        authRequest: state => {
            state.status = 'loading'
        },
        authStatus: (state, resp) => {
            state.status = 'success'
            state.token = resp.data.token
        },
        authError: state => {
            state.status = 'error'
        },
        authLogout: state => {
            state.token = ''
        }
    },
    actions: {
        authRequest: async ({
            commit,
            dispatch
        }, user) => {
            commit('authRequest')
            try {
                let res = await api.authRequest(user)
                console.log(res)
                localStorage.setItem('token', res.data.token)
                commit('authStatus', res)
            } catch (err) {
                console.log(err)
                commit('authError', err)
                localStorage.removeItem('token')
                // important.forEach((line, i) =>
                // 	setTimeout(() => console.warn(line), i * 2000)
                // )
            }
        },
        authLogout: ({
            commit,
            dispatch
        }) => {
            return new Promise((resolve, reject) => {
                commit('authLogout')
                localStorage.removeItem('token')
                resolve()
            })
        }
    },
    getters: {
        isAuthenticated: state => !!state.token,
        authStatus: state => state.status,
        token: state => state.token
    }
}