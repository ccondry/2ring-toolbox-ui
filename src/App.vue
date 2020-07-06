<template>
  <div>
    <b-loading :is-full-page="true" :active="!authCheckDone" :can-cancel="false"></b-loading>
    <div v-if="authenticated" style="min-height: calc(100vh - 1.6em);">
      <!-- endpoints have not finished loading yet -->
      <b-loading :is-full-page="true" :active="!authCheckDone" :can-cancel="false"></b-loading>
      <div v-if="authCheckDone">
        <!-- <nprogress-container></nprogress-container> -->
        <navbar :show="true"></navbar>
        <!-- <sidebar :show="sidebar.opened && !sidebar.hidden"></sidebar> -->
        <app-main></app-main>
      </div>
    </div>
    <footer class="footer" style="height: 1.6em; padding: 0; background-color: #ebebeb">
      <div class="content">
        <small style="padding-right: 2em; padding-left: 1em;">
          UI version {{ uiVersion }}
        </small>
        <small>
          Auth API version {{ authApiVersion }}
        </small>
      </div>
    </footer>
  </div>
</template>


<script>
// import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import AppMain from './components/layout/AppMain'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      production: process.env.NODE_ENV === 'production',
      authCheckDone: false
    }
  },

  components: {
    Navbar,
    Sidebar,
    AppMain
    // NprogressContainer
  },

  beforeMount () {
    const { body } = document
    const WIDTH = 768
    const RATIO = 3

    const handler = () => {
      if (!document.hidden) {
        let rect = body.getBoundingClientRect()
        let isMobile = rect.width - RATIO < WIDTH
        this.toggleDevice(isMobile ? 'mobile' : 'other')
        this.toggleSidebar({
          opened: !isMobile
        })
      }
    }

    // add event listeners for DOM events
    document.addEventListener('visibilitychange', handler)
    window.addEventListener('DOMContentLoaded', handler)
    window.addEventListener('resize', handler)
  },

  mounted () {
    this.authCheck().then(r => {
      // auth check done
      // are they logged in?
      if (this.authenticated === true) {
        // and get auth api info
        this.getAuthApiInfo()
      }
    })
  },

  computed: {
    ...mapGetters([
      'sidebar',
      'authenticated',
      'loading',
      'endpoints',
      'uiVersion',
      'authApiVersion'
    ])
  },

  methods: {
    ...mapActions([
      'toggleDevice',
      'toggleSidebar',
      'checkLogin',
      'setJwt',
      'getAuthApiInfo'
    ]),
    async authCheck () {
      try {
        // check the JWT in localstorage to see if the user is already logged in
        console.log('checking login...')
        await this.checkLogin()
        console.log('checking login done.')
        this.authCheckDone = true
        if (this.authenticated === false) {
          // user is not authenticated - send them to login
          if (this.production) {
            // production - redirect to login page
            window.location = '/auth/login?destination=' + window.location
          } else {
            // development - pop JWT form
            this.clickLogin()
          }
        }
      } catch (e) {
        console.log('failed to get endpoints and check login:', e.message)
      }
    },
    clickLogin () {
      this.$buefy.dialog.prompt({
        message: `Enter your JWT to log in`,
        inputAttrs: {
          placeholder: 'JWT'
        },
        onConfirm: (value) => {
          this.setJwt(value)
        }
      })
    }
  },
  watch: {
    async authenticated (val, oldVal) {
      // if user goes from logged in to logged out, forward them to the login page
      if (oldVal === true && val === false) {
        if (this.production) {
          // production - redirect to login page
          window.location = '/auth/login?destination=' + window.location
        } else {
          // development - pop JWT form
          this.clickLogin()
        }
      }
    }
  }
}
</script>
