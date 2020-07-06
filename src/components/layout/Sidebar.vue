<template>
  <aside class="menu app-sidebar">
    <!-- <p class="menu-label">
    General
  </p> -->

  <!-- <p class="control">
  <button class="button is-primary">Search</button>
</p> -->
</b-field>
<ul class="menu-list">
  <!-- for each menu item - but only show admins the Admin menu -->
  <li v-for="(item, index) in filteredMenu" v-if="item.children.length && (item.name !== 'Admin' || user.admin)">
    <router-link :to="item.path" :exact="true" :aria-expanded="isExpanded(item) ? 'true' : 'false'" v-if="item.path" @click.native="toggle(index, item)">
      <!-- <span class="icon is-small"><i :class="['fa', item.meta.icon]"></i></span> -->
      <!-- icon -->
      <b-icon :icon="item.meta.icon"></b-icon>
      <!-- label -->
      {{ item.meta.label || item.name }}
      <!-- down arrow -->
      <b-icon v-if="item.children && item.children.length" :icon="isExpanded(item) ? 'chevron-up' : 'chevron-down'" ></b-icon>
    </router-link>
    <a :aria-expanded="isExpanded(item)" v-else @click="toggle(index, item)">
      <!-- <span class="icon is-small"><i :class="isExpanded(item) && item.meta.iconExpanded ? ['fa', item.meta.iconExpanded] : ['fa', item.meta.icon]"></i></span> -->
      <!-- expanded folder icon, or else the defined icon -->
      <b-icon :icon="isExpanded(item) && item.meta.iconExpanded ? item.meta.iconExpanded : item.meta.icon" ></b-icon>
      <!-- label -->
      {{ item.meta.label || item.name }}
      <!-- down arrow -->
      <b-icon v-if="item.children && item.children.length" :icon="isExpanded(item) ? 'chevron-up' : 'chevron-down'" ></b-icon>
    </a>

    <span v-if="item.children && item.children.length">
      <ul v-show="isExpanded(item)">
        <li v-for="subItem in item.children" v-if="subItem.path">
          <router-link :to="generatePath(item, subItem)">
            <!-- <span v-if="subItem.meta && subItem.meta.icon" class="icon is-small"><i :class="['fa', subItem.meta.icon]"></i></span> -->
            <b-icon v-if="subItem.meta && subItem.meta.icon" :icon="subItem.meta.icon" :pack="subItem.meta.pack || 'mdi'"></b-icon>
            {{ subItem.meta && subItem.meta.label || subItem.name }}
          </router-link>
        </li>
      </ul>
    </span>
  </li>
</ul>
</aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

// extract menu item name
function extract (el) {
  // return description if available, or else return name
  try {
    return el.meta.description || el.name
  } catch (e) {
    return el.name
  }
}

export default {
  components: {
  },

  props: {
    show: Boolean,
    menuFilter: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      isReady: false
      // menuFilter: ''
    }
  },

  mounted () {
    let route = this.$route
    if (route.name) {
      this.isReady = true
      this.shouldExpandMatchItem(route)
    }
    // console.log('menu', this.menu)
  },

  computed: {
    ...mapGetters({
      menu: 'menuitems',
      user: 'user',
      isProvisioned: 'isProvisioned'
    }),
    filteredMenu () {
      // copy menu
      const m = JSON.parse(JSON.stringify(this.menu))
      // if user is not provisioned yet, don't show them any menu items except Home
      if (!this.isProvisioned) {
        // for each folder
        for (const folder of m) {
          // filter all menu items except for Home
          folder.children = folder.children.filter(v => v.name === 'Home')
        }
        // return only this list for unprovisioned user, ignoring text filter
        return m
      }
      // iterate over menu folders
      for (const item of m) {
        // // filter children
        // const results = fuzzy.filter(this.menuFilter, item.children, {extract})
        // // map the original children objects
        // const matches = results.map(function (el) { return el.original })
        // // replace children with fuzzy filtered results map
        // item.children = matches
      }
      // return filtered menu
      return m
    }
  },

  methods: {
    ...mapActions([
      'expandMenu'
    ]),

    isExpanded (item) {
      return item.meta.expanded || this.menuFilter.length
    },

    toggle (index, item) {
      this.expandMenu({
        index: index,
        expanded: !item.meta.expanded
      })
    },

    shouldExpandMatchItem (route) {
      let matched = route.matched
      let lastMatched = matched[matched.length - 1]
      let parent = lastMatched.parent || lastMatched
      const isParent = parent === lastMatched
      if (isParent) {
        const p = this.findParentFromMenu(route)
        if (p) {
          parent = p
        }
      }

      this.expandMenu({
        item: parent,
        expanded: true
      })
      // if ('expanded' in parent.meta && !isParent) {
      //   this.expandMenu({
      //     item: parent,
      //     expanded: true
      //   })
      // }
    },

    generatePath (item, subItem) {
      return `${item.component ? item.path + '/' : ''}${subItem.path}`
    },

    findParentFromMenu (route) {
      const menu = this.menu
      for (let i = 0, l = menu.length; i < l; i++) {
        const item = menu[i]
        const k = item.children && item.children.length
        if (k) {
          for (let j = 0; j < k; j++) {
            if (item.children[j].name === route.name) {
              return item
            }
          }
        }
      }
    }
  },

  watch: {
    $route (route) {
      this.isReady = true
      this.shouldExpandMatchItem(route)
    }
  }

}
</script>

<style lang="scss">
// @import '~bulma/sass/utilities/variables';
// @import '~bulma/sass/utilities/mixins';

.app-sidebar {
  position: fixed;
  // top: 50px;
  left: 0;
  bottom: 0;
  padding: 3.5em 0 50px;
  width: 220px;
  min-width: 45px;
  max-height: 100vh;
  height: 100%;
  z-index: 3;
  background: #FFF;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
  background-color: rgb(245, 245, 245);
  overflow-y: auto;
  overflow-x: hidden;
  margin-right: 20px;

  // @include mobile() {
  //   transform: translate3d(-220px, 0, 0);
  // }

  .icon {
    vertical-align: baseline;
    &.is-angle {
      position: absolute;
      right: 10px;
      // transition: transform .377s ease;
    }
  }

  .menu-label {
    padding-left: 5px;
  }

  .menu-list {
    // li a {
    //   &[aria-expanded="true"] {
    //     .is-angle {
    //       transform: rotate(180deg);
    //     }
    //   }
    // }

    li a + ul {
      margin: 0 10px 0 15px;
    }

    a {
      padding-right: 0;
    }
  }

  .menu-list li ul {
    padding-left: 0em !important;
    margin-right: 0em !important;
  }
}
</style>
