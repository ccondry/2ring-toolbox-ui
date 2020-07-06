import * as types from '../mutation-types'

function parseJwt (token) {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  return JSON.parse(window.atob(base64))
}

// function getSeconds () {
//   const secs = Date.now() / 1000
//   return Math.floor(secs)
// }

const state = {
  jwt: null,
  forwardTo: null
}

const getters = {
  jwt: state => state.jwt,
  authenticated: state => state.jwt !== null,
  forwardTo: state => state.forwardTo
}

const mutations = {
  [types.SET_JWT] (state, data) {
    state.jwt = data
  },
  [types.FORWARD_TO] (state, data) {
    state.forwardTo = data
  }
}

const actions = {
  setForwardTo ({commit}, data) {
    commit(types.FORWARD_TO, data)
  },
  setJwt ({commit}, data) {
    console.log('setting JWT in localStorage and state')
    // trim whitespace
    data = data.trim()
    // remove Bearer word
    if (data.indexOf('Bearer ') === 0) {
      data = data.substring('Bearer '.length)
    }
    // save JWT in state
    commit(types.SET_JWT, data)
    // save JWT in browser's localStorage
    window.localStorage.setItem('jwt', data)
    // decode jwt and store as user data
    try {
      commit(types.SET_USER, parseJwt(data))
    } catch (e) {
      // invalid JWT?
      console.error('invalid JWT', data)
      // unset JWT in state
      commit(types.SET_JWT, null)
      // remove JWT from localStorage
      window.localStorage.removeItem('jwt')
      // unset user in state
      commit(types.SET_USER, {})
    }
  },
  unsetJwt ({commit}) {
    // unset JWT in state
    commit(types.SET_JWT, null)
    // remove JWT from localStorage
    window.localStorage.removeItem('jwt')
    // unset user in state
    commit(types.SET_USER, {})
  },
  async logout ({dispatch, commit, getters}) {
    console.log('logging out user')
    try {
      // tell server we're logging out
      const response = await fetch(getters.endpoints.logout, {
        method: 'post',
        headers: {
          Authorization: 'Bearer ' + getters.jwt,
          instance: getters.instance
        }
      })
      // did they successfully log out of superuser mode?
      if (response.ok) {
        let json
        try {
          json = await response.json()
        } catch (e) {
          // normal logout, no sujwt
          // remove JWT
          commit(types.SET_JWT, null)
          // remove JWT from localStorage
          window.localStorage.removeItem('jwt')
          // remove user from state
          commit(types.SET_USER, {})
          return
        }
        console.log('logut json response', json)
        if (json.jwt) {
          // store new auth token in localStorage
          dispatch('setJwt', json.jwt)
          // load user data using JWT
          // dispatch('loadUser')
          dispatch('successNotification', `Successfully logged out of ${getters.user.username}`)
        } else {
          // remove JWT
          commit(types.SET_JWT, null)
          // remove JWT from localStorage
          window.localStorage.removeItem('jwt')
          // remove user from state
          commit(types.SET_USER, {})
        }
      } else {
        dispatch('errorNotification', `Failed to log out of ${getters.user.username}`)
      }
    } catch (e) {
      console.log(e)
    }
  },
  async checkLogin ({dispatch}) {
    console.log('checking localstorage for JWT login token')
    // retrieve auth token from localStorage
    const jwt = window.localStorage.getItem('jwt')
    // if we found a token, check the web service to see if it's still valid
    if (jwt !== null) {
      console.log('JWT login token found in localStorage. checking it...')
      // put jwt in state
      await dispatch('setJwt', jwt)
      // load user. this should validate JWT on server.
      dispatch('loadUser')
    } else {
      console.log('JWT not found in localstorage.')
      // forward user to login page if production
      if (process.env.NODE_ENV === 'production') {
        window.location = '/auth/login?destination=' + window.location
      } else {
        // TODO pop JWT login form for development
      }
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
