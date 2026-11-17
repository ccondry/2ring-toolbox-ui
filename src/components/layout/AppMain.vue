<template>
  <section class="app-main" :style="[hiddenSidebarStyle]">
    <div class="container is-fluid is-marginless app-content">
      <!-- <levelbar></levelbar> -->
      <transition
        mode="out-in"
        enter-active-class="fadeIn"
        leave-active-class="fadeOut"
        appear>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
    <footer class="app-footer">
      <div class="app-footer-inner">
        <p class="app-footer-copyright">© 2026 Cisco Systems, Inc.</p>
        <div class="app-footer-versions">
          <span>UI version {{ uiVersion }}</span>
          <span>Auth API version {{ authApiVersion }}</span>
        </div>
      </div>
    </footer>
  </section>
</template>

<script>
// import Levelbar from './Levelbar'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'sidebar',
      'uiVersion',
      'authApiVersion'
    ]),
    hiddenSidebarStyle () {
      return this.sidebar.hidden ? { 'margin-left': 0 } : null
    }
  },

  components: {
    // Levelbar
  }
}
</script>

<style lang="scss">
.app-main {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 52px;
  transform: translate3d(0, 0, 0);
}

.app-content {
  padding: 20px;
}

.app-footer {
  margin-top: auto;
  padding: 0 12px 12px;
  font-size: 13px;
  line-height: 20px;
}

.app-footer-inner {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 56px;
  padding: 17px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.25);

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.app-footer-copyright {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.app-footer-versions {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 20px;
  color: var(--fg-muted);
}
</style>
