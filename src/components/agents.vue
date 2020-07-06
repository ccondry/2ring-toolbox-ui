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
        <button class="button is-success" @click="clickPortal">
          Workforce Optimization Portal
        </button>
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
      portalUrl: 'https://se1.calabriodemo.com',
      clipboard: ''
    }
  },

  computed: {
    agents () {
      return [
        {
          picture: 'https://mm.cxdemo.net/static/images/cumulus/common/author1.png',
          username: 'sandra.jefferson@ciscodcloud.com',
          password: 'C1sco12345',
          name: 'Sandra Jefferson',
          role: 'Contact Center Agent'
        },
        {
          picture: 'https://mm.cxdemo.net/static/images/cumulus/common/author3.png',
          username: 'rick.barrows@ciscodcloud.com',
          password: 'C1sco12345',
          name: 'Rick Barrows',
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
