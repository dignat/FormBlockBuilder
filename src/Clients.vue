<template>
  <div class="section">
    <div class="container">
      <div class="field">
        <label class="label">Client Name</label>
        <input type="text" name="clientName" v-model="clients.clientName" class="input">
        <label class="label">Client Uri</label>
        <input type="text" name="clientUri" v-model="clients.clientUri" class="input">
      </div>
      <div class="field">
        <button class="button is-primary is-fullwidth" @click="addClientToDb">Add Clients to DB</button>
      </div>
    </div>
  </div>

</template>

<script>
import firebase from "firebase";
export default {
name: "Clients",
  data() {
  return {
    clients: {
      clientName: '',
      clientUri: '',
      forms:[]
    }
  }
  },
  methods: {
  addClientToDb() {
    this.clients.forms = [];
    firebase.database().ref('clients').push(this.clients)
    .then((data) => {
      console.log(data)

    }).catch((error) => {
      console.log(error);
    })
      }
  }
}
</script>

<style lang="scss">
@import "~bulma";

</style>