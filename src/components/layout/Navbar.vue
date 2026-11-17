<template>
  <b-navbar class="app-navbar">
        <template slot="brand">
          <b-navbar-item href="/" class="app-navbar-logo">
            <cisco-mark />
          </b-navbar-item>
        </template>

        <template slot="start">
          <b-navbar-item tag="div">
            <a href="/">dCloud Toolbox</a>&nbsp;- 2Ring Dashboards & Wallboards Instant Demo
          </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div" v-if="authenticated">
              {{ user.username }} ({{ user.id }})&nbsp;&nbsp;
              <a @click="clickLogout">Log Out</a>
            </b-navbar-item>
            <b-navbar-item tag="div" v-else>
              <a @click="clickLogin">Log in</a>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CiscoMark from '../cisco-mark.vue'

export default {
  components: {
    CiscoMark
  },

  data () {
    return {
      filter: ''
    }
  },

  props: {
    show: Boolean,
    menuFilter: String
  },

  mount () {
    if (!this.authenticated && !this.isProduction) {
      // pop development login modal
      this.clickLogin()
    }
  },

  computed: {
    ...mapGetters([
      'sidebar',
      'authenticated',
      'user',
    ])
  },

  methods: {
    ...mapActions([
      'logout',
      'setJwt'
    ]),
    clickLogout () {
      this.logout()
    },
    clickLogin () {
      this.$buefy.dialog.prompt({
        message: `Enter your JWT`,
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
    filter (val) {
      this.$emit('update:menuFilter', val)
    }
  }
}
</script>

<style lang="scss" scoped>
// @import '~bulma/bulma';
// @import '~bulma/sass/utilities/variables';

.app-navbar {
  font-weight: bold;
  a {
    color: var(--accent-cyan);
  }
  position: fixed;
  min-width: 100%;
  z-index: 4;

  .app-navbar-logo {
    padding-left: 16px;
    color: var(--fg-strong);

    .cisco-mark {
      display: block;
      width: 38px;
      height: 24px;
      max-height: none;
    }
  }

  .nav {
    min-height: 0em;
  }

  .container {
    // margin: auto 10px;
  }

  // .nav-right {
  //   align-items: stretch;
  //   align-items: stretch;
  //   flex: 1;
  //   justify-content: flex-end;
  //   overflow: hidden;
  //   overflow-x: auto;
  //   white-space: nowrap;
  // }
}

.hero-head {

  // .vue {
  //   margin-left: 10px;
  //   color: #36AC70;
  // }
  // .admin {
  // }
}
</style>
