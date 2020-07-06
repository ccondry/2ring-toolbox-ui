let authBaseUrl

const isProduction = process.env.NODE_ENV === 'production'

if (isProduction) {
  authBaseUrl = window.location.origin + '/api/v1/auth'
} else {
  authBaseUrl = 'http://localhost:3032/api/v1/auth'
}

const endpoints = {
  login: authBaseUrl + '/login',
  logout: authBaseUrl + '/logout',
  user: authBaseUrl + '/user',
  webex: authBaseUrl + '/resource/joinWfoSupportRoom',
  authApiInfo: authBaseUrl + '/version'
}


const state = {
  endpoints
}

const getters = {
  endpoints: state => state.endpoints
}

export default {
  state,
  getters
}
