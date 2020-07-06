<template>
  <form action="" @submit.prevent="clickCreate()">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Create dCloud Demo Instance</p>
      </header>
      <section class="modal-card-body">
        <b-field label="ID">
          <b-input
          type="number"
          v-model="id"
          placeholder="2"
          required></b-input>
        </b-field>

        <b-field label="Priority">
          <b-input
          type="number"
          v-model="priority"
          placeholder="2"
          required></b-input>
        </b-field>

        <b-field label="Datacenter">
          <b-input
          v-model="datacenter"
          placeholder="RTP"
          required></b-input>
        </b-field>

        <b-field label="Session ID">
          <b-input
          type="number"
          v-model="session"
          placeholder="679138"
          required></b-input>
        </b-field>

        <b-field label="Demo">
          <b-input
          v-model="demo"
          placeholder="pcce"
          required></b-input>
        </b-field>

        <b-field label="Version">
          <b-input
          v-model="version"
          placeholder="12.0v1"
          required></b-input>
        </b-field>

        <b-field label="Remote Address">
          <b-input
          v-model="ip"
          placeholder="rp-pcce-12-0-rtp.cxdemo.net."
          required></b-input>
        </b-field>

        <b-field label="Locked">
          <b-checkbox v-model="locked"></b-checkbox>
        </b-field>

      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button type="submit" class="button is-success">Create</button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  data () {
    return {
      id: 2,
      datacenter: '',
      session: '',
      version: '',
      ip: '',
      locked: '',
      demo: '',
      priority: 2
    }
  },

  methods: {
    clickCreate () {
      const body = {
        id: Number(this.id),
        priority: Number(this.priority),
        datacenter: this.datacenter,
        session: this.session,
        version: this.version,
        ip: this.ip,
        locked: this.locked,
        demo: this.demo
      }
      console.log('clickCreate body:', body)
      this.$emit('submit', body)
      this.$parent.close()
    }
  }
}
</script>
