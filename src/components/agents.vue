<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile">
        <!-- repeat this tile for each agent -->
        <div class="tile is-parent" v-for="agent of agents" :key="agent.name">
          <article class="tile is-child box">

            <p class="title">{{ agent.name }}</p>
            <p class="subtitle">{{ agent.role }}</p>
            <img :src="agent.picture" width="128px">
            <p>
              <strong>Username: {{ agent.username }}</strong>
              <a @click="clickCopy(agent.username, 'Username')"><b-icon icon="layers"></b-icon></a>
            </p>
            <p>
              <strong>Password: {{ agent.password }}</strong>
              <a @click="clickCopy(agent.password, 'Password')"><b-icon icon="layers"></b-icon></a>
            </p>
          </article>
        </div>

      </div>
    </div>
    <center>
      <b-field>
        <a class="button is-success" :href="portalUrl" target="_blank">
          2Ring Dashboards & Wallboards
        </a>
      </b-field>
    </center>

    <input type="hidden" id="clipboard" :value="clipboard">

  </div>
</template>


<script>
import {mapActions} from 'vuex'

export default {
  props: ['user'],

  data () {
    return {
      portalUrl: 'https://www.2ring.com/dcloud',
      // portalUrl: 'https://demo.2ring.com/dw80',
      clipboard: ''
    }
  },

  computed: {
    agents () {
      return [
        {
          picture: 'https://mm.cxdemo.net/static/images/cumulus/common/helen.png',
          username: 'Helen.Liang@ciscodcloud.com',
          password: 'C1sco12345',
          name: 'Helen Liang',
          role: 'Contact Center Agent'
        },
        {
          picture: 'https://mm.cxdemo.net/static/images/cumulus/common/james.png',
          username: 'James.Bracksted@ciscodcloud.com',
          password: 'C1sco12345',
          name: 'James Bracksted',
          role: 'Contact Center Supervisor'
        }
      ]
    }
  },

  methods: {
    ...mapActions([
      'copyToClipboard'
    ]),
    clickPortal (e) {
      // open agent portal in new tab
      window.open(this.portalUrl, '_blank')
    },
    clickCopy (string, type) {
      // copy string to clipboard
      this.copyToClipboard({string, type})
    }
  }
}
</script>
