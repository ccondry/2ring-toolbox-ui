<template>
  <div>

    <div class="tile is-ancestor">
      <div class="tile is-parent is-12">
        <article class="tile is-child box">
          <h1 class="title">Welcome</h1>
          <b-field>
            <p>
              Welcome to the 2RING Dashboards & Wallboards Instant Demo on dCloud.
            </p>
          </b-field>
          <b-field>
            <p>
              Click this button to get support, ask questions, and suggest
              new features:
            </p>
          </b-field>
          <b-field>
            <button class="button is-success" @click.prevent="showSupportRoomDialog" >
              Join Support Room
            </button>
          </b-field>
        </article>
      </div>
    </div>

    <!-- show canned agent info -->
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box is-horizontal">
          <h1 class="title">Personas</h1>
          <div class="content">
            <agents />
          </div>
        </article>
      </div>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Agents from '../../components/agents.vue'

export default {
  components: {
    Agents
  },

  data () {
    return {
      ownerFilter: '',
      brandFilter: 'mine',
      vertical: 'finance',
      showMore: false,
      timerEnd: 0,
      timerNow: 0
    }
  },

  mounted () {
  },

  methods: {
    ...mapActions([
      'inviteToSupportRoom',
    ]),
    showSupportRoomDialog (event) {
      // show dialog
      this.$buefy.dialog.prompt({
        title: 'Join the Webex Teams support room',
        message: `What is your Webex Teams email address?`,
        type: 'is-success',
        confirmText: 'Join',
        inputAttrs: {
          placeholder: 'username@example.com',
          value: this.user.email
        },
        onConfirm: (email) => {
          this.inviteToSupportRoom({email})
        }
      })
    }
  },

  computed: {
    ...mapGetters([
      'user',
    ])
  }
}
</script>
