// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from '@/App'

import router from '@/router'

import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)

import VueLodash from 'vue-lodash'
Vue.use(VueLodash, {
    name: '_'
})

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import Shortkey from 'vue-shortkey'
Vue.use(Shortkey)

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import * as ModalDialogs from 'vue-modal-dialogs'

Vue.use(ModalDialogs)

import '@fortawesome/fontawesome-free/css/all.css'

import store from '@/store'
import mixin from '@/components/methods.js'
import axios from 'axios'

import 'jquery'
import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

import '@/assets/css/taggle.css'
import '@/assets/css/themes/dark.css'
import '@/assets/css/global.scss'
import '@/assets/css/buttons.scss'
import '@/assets/css/sf.css'

import '@/assets/css/taggle.css'
import '@/assets/css/clean.scss'

// replace with CSS only
// import '@/assets/js/fontawesome-all.min.js'

Vue.config.productionTip = false

// Object.definePrototype(Vue.prototype, '$tags', { value: tags });

console.log(`Currently running in ${process.env.NODE_ENV} mode.`)

// let url = 'https://api-notify-me.herokuapp.com/'
// if (process.env.NODE_ENV !== 'production') {
// 	// url = 'http://192.168.1.64:3000/'
// 	url = 'https://apinotifyme.zormite.com/'
// }

// export const server = axios.create({
// 	baseURL: url,
// 	headers: {
// 		Authorization: localStorage.getItem('token')
// 	}
// })

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})