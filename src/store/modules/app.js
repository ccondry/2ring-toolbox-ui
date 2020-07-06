import * as types from '../mutation-types'
import {ToastProgrammatic as Toast} from 'buefy'
import pkg from '../../../package.json'

const state = {
  device: {
    isMobile: false,
    isTablet: false
  },
  sidebar: {
    opened: false,
    hidden: false
  },
  effect: {
    translate3d: true
  },
  authApiVersion: 'loading...'
}

// return domain name part from client
const getters = {
  uiVersion: () => pkg.version,
  authApiVersion: state => state.authApiVersion
}

const mutations = {
  [types.TOGGLE_DEVICE] (state, device) {
    state.device.isMobile = device === 'mobile'
    state.device.isTablet = device === 'tablet'
  },

  [types.TOGGLE_SIDEBAR] (state, config) {
    if (state.device.isMobile && config.hasOwnProperty('opened')) {
      state.sidebar.opened = config.opened
    } else {
      state.sidebar.opened = true
    }

    if (config.hasOwnProperty('hidden')) {
      state.sidebar.hidden = config.hidden
    }
  },

  [types.SWITCH_EFFECT] (state, effectItem) {
    for (let name in effectItem) {
      state.effect[name] = effectItem[name]
    }
  },

  [types.SET_AUTH_API_INFO] (state, data) {
    state.authApiVersion = data.version
  }
}

const actions = {
  async getAuthApiInfo ({getters, dispatch}) {
    dispatch('setLoading', {group: 'app', type: 'authApiInfo', value: true})
    const operation = 'auth API info'
    console.log('getting', operation, '...')
    try {
      const endpoint = getters.endpoints.authApiInfo
      console.log('getting', operation, 'endpoint', endpoint, '...')
      const response = await dispatch('loadToState', {
        name: 'get' + operation,
        endpoint,
        mutation: types.SET_AUTH_API_INFO
      })
      console.log('get', operation, '- response:', response)
    } catch (e) {
      console.log('error getting', operation, e)
      dispatch('errorNotification', {title: 'Failed to get ' + operation, error: e})
    } finally {
      dispatch('setLoading', {group: 'app', type: 'authApiInfo', value: false})
    }
  },
  copyToClipboard (options, {string, type = 'Text'}) {
    console.log('copyToClipboard', type, string)
    // copy text to clipboard
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.value = string
    input.select()
    const result = document.execCommand('copy')
    if (result === 'unsuccessful') {
      // failed
      console.error('Failed to copy text.')
    } else {
      // success
      Toast.open({
        message: type + ' Copied to Your Clipboard',
        queue: false
      })
    }

    // Remove the selections - NOTE: Should use
    window.getSelection().removeAllRanges()
    // remove the input field
    input.remove()
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
