<template>
  <div class="account-menu" @click.stop>
    <button
    type="button"
    class="account-menu-button"
    :title="accountName"
    :aria-label="accountName"
    :aria-expanded="open ? 'true' : 'false'"
    @click="toggle"
    >
      <span class="account-menu-avatar">
        <b-icon icon="account" />
      </span>
    </button>

    <div v-if="open" class="account-menu-panel">
      <div class="account-card">
        <span class="account-card-avatar" aria-hidden="true">
          <b-icon icon="account" />
        </span>
        <div class="account-card-info">
          <div class="account-card-label">
            Logged in as
          </div>
          <div class="account-card-name">
            {{ accountName }}
          </div>
          <div class="account-card-detail">
            User ID {{ user.id }}
          </div>
        </div>
        <b-button
        class="account-card-logout"
        type="is-primary"
        outlined
        @click="clickLogout"
        >
          Log out
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      open: false
    }
  },

  computed: {
    ...mapGetters([
      'user'
    ]),
    accountName () {
      return this.user && this.user.username ? this.user.username : 'Account'
    }
  },

  watch: {
    $route () {
      this.close()
    }
  },

  mounted () {
    document.addEventListener('click', this.close)
    document.addEventListener('keydown', this.onKeydown)
    this.$root.$on('header-menu-open', this.onMenuOpen)
  },

  beforeDestroy () {
    document.removeEventListener('click', this.close)
    document.removeEventListener('keydown', this.onKeydown)
    this.$root.$off('header-menu-open', this.onMenuOpen)
  },

  methods: {
    ...mapActions([
      'logout'
    ]),
    toggle () {
      this.open = !this.open
      if (this.open) {
        this.$root.$emit('header-menu-open', this)
      }
    },
    close () {
      this.open = false
    },
    onMenuOpen (menu) {
      if (menu !== this) {
        this.close()
      }
    },
    onKeydown (event) {
      if (event.key === 'Escape') {
        this.close()
      }
    },
    clickLogout () {
      this.close()
      this.logout()
    }
  }
}
</script>

<style lang="scss">
.account-menu {
  position: relative;
}

.account-menu-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;

  &:hover .account-menu-avatar,
  &:focus-visible .account-menu-avatar {
    color: var(--fg-strong);
  }

  &[aria-expanded="true"] .account-menu-avatar {
    background: rgba(255, 255, 255, 0.06);
    color: var(--accent-cyan);
  }
}

.account-menu-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  transition: background-color 0.15s ease-out, color 0.15s ease-out;

  .icon,
  .mdi::before {
    font-size: 22px;
  }
}

.account-menu-panel {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  z-index: 40;
}

.account-card {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 22rem;
  max-width: min(28rem, calc(100vw - 24px));
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  background: rgba(30, 36, 46, 0.82);
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
  text-align: left;
}

.account-card-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #2c333d;
  color: rgba(255, 255, 255, 0.45);

  .icon,
  .mdi::before {
    font-size: 28px;
  }
}

.account-card-info {
  min-width: 0;
  flex: 1 1 auto;
}

.account-card-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1.2;
  text-transform: uppercase;
  color: var(--fg-muted);
}

.account-card-name {
  margin-top: 2px;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--fg-strong);
}

.account-card-detail {
  margin-top: 2px;
  overflow: hidden;
  font-size: 13px;
  line-height: 1.3;
  color: var(--fg-muted);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.account-card-logout.button {
  flex-shrink: 0;
  height: 36px;
  padding: 0 16px;
  border-radius: 8px;
  white-space: nowrap;
}
</style>
