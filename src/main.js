// Import Vue
import Vue from 'vue'
import VueRouter from 'vue-router'
import Buefy from 'buefy'
import { sync } from 'vuex-router-sync'
import '@fontsource/inter/latin-400'
import '@fontsource/inter/latin-500'
import '@fontsource/inter/latin-600'
import '@fontsource/inter/latin-700'
// theme variables, then bulma and buefy source
import './style.scss'
// Import Vue App, routes, store
import App from './App'
import router from './router'
import store from './store'

Vue.use(VueRouter)
Vue.use(Buefy)

sync(store, router)

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
})
