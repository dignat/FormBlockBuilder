<template>
  <section class="section">
  <div class="container">
    <h1 class="title">Login</h1>
    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left has-icon-right">
        <input class="input is-danger" type="email" placeholder="Email" required autofocus v-model="form.email">
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control has-icon-right has-icons-left">
        <input class="input is-danger" type="password" required v-model="form.password">
        <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
        </span>
      </div>
      <p v-if="error !== null">{{error }}</p>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" type="submit" @click="submit">Submit</button>
      </div>
      <div class="control">
        <button class="button is-link is-right">Cancel</button>
      </div>
    </div>
  </div>
  </section>
</template>

<script>

import firebase from "firebase";
export default {
name: "Login",
  data () {
  return {
    form: {
      email: "",
      password: ""
    },
    error: null
  }
  },
  methods : {
  submit() {
    firebase
    .auth()
    .signInWithEmailAndPassword(this.form.email, this.form.password)
    .then(data => {
      this.$router.replace({name: "Dashboard"})
    })
    .catch( err => {
      this.error = err.message;
    })
  }
  }
}
</script>

<style lang="scss">
@import "~bulma";
</style>