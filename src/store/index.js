import Vue from 'vue'
import Vuex from 'vuex'
// import pkg from 'package'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import modules from './modules'

Vue.use(Vuex)

const isProduction = process.env.NODE_ENV === 'production'

const store = new Vuex.Store({
  strict: !isProduction,
  actions,
  getters,
  modules,
  state: {
    demoConfigId: 'wfo',
    isProduction,
    working: {
      app: {},
      user: {},
      session: {},
    },
    loading: {
      app: {},
      user: {},
      session: {},
    }
  },
  mutations
})

export default store
