import * as types from '../mutation-types'
// import axios from 'axios'
// import { load } from '../../utils'

const state = {
  user: {}
}

const getters = {
  user: state => state.user
}

const mutations = {
  [types.SET_USER] (state, data) {
    state.user = data
  }
}

const actions = {
  async loadUser ({getters, dispatch}) {
    try {
      const response = await fetch(getters.endpoints.user, {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + getters.jwt
        }
      })
      if (response.ok) {
        const json = await response.json()
        console.log('checkLogin get user response =', json)
      } else {
        if (response.status === 401) {
          // JWT invalid - delete it from localStorage
          dispatch('unsetJwt')
        }
        const text = await response.text()
        throw Error(`${response.status} ${response.statusText} - ${text}`)
      }
    } catch (e) {
      console.log('load user failed:', e.message)
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
