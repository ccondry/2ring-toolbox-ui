// Import Vue
import Vue from 'vue'
import VueRouter from 'vue-router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import { sync } from 'vuex-router-sync'
// Import Vue App, routes, store
import App from './App'
import routes from './routes'
import router from './router'
import store from './store'

Vue.use(VueRouter)
Vue.use(Buefy)

sync(store, router)

const { state } = store

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
})
