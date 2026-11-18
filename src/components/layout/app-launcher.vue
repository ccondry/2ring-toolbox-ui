<template>
  <div class="app-launcher" @click.stop>
    <button
    type="button"
    class="app-launcher-button"
    aria-label="dCloud Applications"
    :aria-expanded="open ? 'true' : 'false'"
    @click="toggle"
    >
      <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      >
        <circle cx="3" cy="3" r="2.5" fill="currentColor" />
        <circle cx="10" cy="3" r="2.5" fill="currentColor" />
        <circle cx="17" cy="3" r="2.5" fill="currentColor" />
        <circle cx="3" cy="10" r="2.5" fill="currentColor" />
        <circle cx="10" cy="10" r="2.5" fill="currentColor" />
        <circle cx="17" cy="10" r="2.5" fill="currentColor" />
        <circle cx="3" cy="17" r="2.5" fill="currentColor" />
        <circle cx="10" cy="17" r="2.5" fill="currentColor" />
        <circle cx="17" cy="17" r="2.5" fill="currentColor" />
      </svg>
    </button>

    <div
    v-if="open"
    class="app-launcher-panel"
    role="menu"
    aria-label="dCloud Applications"
    >
      <h2 class="app-launcher-title">dCloud Applications</h2>
      <section
      v-for="section of sections"
      :key="section.title"
      class="app-launcher-section"
      >
        <button
        type="button"
        class="app-launcher-section-heading"
        :aria-expanded="isCollapsed(section) ? 'false' : 'true'"
        @click="toggleSection(section)"
        >
          <span>{{ section.title }}</span>
          <b-icon :icon="isCollapsed(section) ? 'chevron-down' : 'chevron-up'" />
        </button>
        <ul v-show="!isCollapsed(section)" class="app-launcher-links">
          <li v-for="link of visibleLinks(section)" :key="link.label">
            <a
            v-if="isCurrent(link)"
            class="app-launcher-link is-current"
            role="menuitem"
            tabindex="0"
            aria-current="page"
            >
              <span class="app-launcher-link-orbit" aria-hidden="true" />
              <span class="app-launcher-link-label">{{ link.label }}</span>
            </a>
            <a
            v-else
            :href="link.href"
            class="app-launcher-link"
            :class="{ 'is-external': link.external }"
            :target="link.external ? '_blank' : null"
            :rel="link.external ? 'noopener noreferrer' : null"
            role="menuitem"
            >
              {{ link.label }}
              <b-icon v-if="link.external" icon="open-in-new" size="is-small" />
            </a>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const sections = [
  {
    title: 'Application',
    links: [
      { label: 'Collaboration Toolbox Home', href: '/', paths: ['/', '/landing'] },
      { label: 'Customer Profile Editor', href: '/customer' },
      { label: 'Demo Branding Editor', href: '/branding' },
      { label: 'Demo Configurations', href: '/cloud-config' },
      { label: 'Admin', href: '/management', adminOnly: true }
    ]
  },
  {
    title: 'Instant Demos',
    links: [
      { label: 'Webex Contact Center v8', href: '/webex-v6' },
      { label: 'Webex Connect v6.0', href: '/webex-connect-v3' },
      { label: '2Ring Dashboards & Wallboards v1', href: '/2ring' }
    ]
  },
  {
    title: 'dCloud',
    links: [
      { label: 'dCloud Home', href: 'https://dcloud2.cisco.com', external: true }
    ]
  }
]

export default {
  data () {
    return {
      open: false,
      sections,
      collapsed: {}
    }
  },

  computed: {
    ...mapGetters([
      'isAdmin'
    ])
  },

  watch: {
    $route () {
      this.open = false
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
    visibleLinks (section) {
      return section.links.filter(link => !link.adminOnly || this.isAdmin)
    },
    isCurrent (link) {
      if (link.external) {
        return false
      }
      const path = window.location.pathname
      return (link.paths || [link.href]).some(href => {
        if (href === '/') {
          return path === '/'
        }
        return path === href || path.startsWith(href + '/')
      })
    },
    isCollapsed (section) {
      return this.collapsed[section.title] === true
    },
    toggleSection (section) {
      this.$set(this.collapsed, section.title, !this.isCollapsed(section))
    }
  }
}
</script>

<style lang="scss">
.app-launcher {
  position: relative;
}

.app-launcher-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: background-color 0.15s ease-out, color 0.15s ease-out;

  &:hover,
  &:focus-visible {
    color: var(--fg-strong);
  }

  &[aria-expanded="true"] {
    background: rgba(255, 255, 255, 0.06);
    color: var(--accent-cyan);
  }
}

.app-launcher-panel {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  z-index: 40;
  width: 375px;
  max-width: calc(100vw - 16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  background: rgba(30, 36, 46, 0.82);
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
  color: var(--fg-strong);
  text-align: left;
  font-weight: 400;
}

.app-launcher-title {
  padding: 24px 25px 20px;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  color: var(--fg-strong);
}

.app-launcher-section {
  padding: 8px 0 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.app-launcher-section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 14px 25px 10px;
  border: none;
  background: transparent;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  color: var(--fg-strong);
  cursor: pointer;

  .icon {
    color: var(--fg-muted);
  }
}

.app-launcher-links {
  padding: 0 14px;
}

.app-launcher-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 15px;
  line-height: 24px;
  color: var(--fg-strong);

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: var(--fg-strong);
  }

  &.is-external {
    color: var(--accent-cyan);

    &:hover {
      color: var(--accent-hover);
    }
  }

  // current page: 1px spinning conic frame around a dark surface, with a glow
  &.is-current {
    position: relative;
    padding: 1px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 0 14px rgba(110, 175, 253, 0.25);

    &:hover {
      background: none;
    }
  }
}

@property --app-launcher-spin {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.app-launcher-link-orbit {
  position: absolute;
  inset: 0;
  border-radius: 8px;
  background: conic-gradient(
    from var(--app-launcher-spin),
    transparent 0deg,
    rgba(110, 175, 253, 0) 5deg,
    rgba(110, 175, 253, 0.7) 40deg,
    rgba(160, 210, 255, 1) 80deg,
    #fff 100deg,
    rgba(160, 210, 255, 1) 120deg,
    rgba(110, 175, 253, 0.7) 160deg,
    transparent 200deg,
    transparent 360deg
  );
  pointer-events: none;
  animation: app-launcher-spin 2.5s linear infinite;
}

@keyframes app-launcher-spin {
  to {
    --app-launcher-spin: 360deg;
  }
}

.app-launcher-link-label {
  position: relative;
  z-index: 1;
  flex: 1;
  padding: 9px 15px;
  border-radius: 7px;
  background: rgba(11, 16, 28, 0.95);
}
</style>
