<template>
<section class="section">
  <div class="container">
    <h1 class="title">Register</h1>
    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left has-icon-right">
        <input class="input is-danger" type="email" placeholder="Email" v-model="form.email"/>
        <span class="icon is-small is-right"><i class="fas fa-enveloper"></i> </span>
        <span class="icon is-small is-right">
      <i class="fas fa-exclamation-triangle"></i>
    </span>
      </div>
      <p class="help is-danger" v-if="error !== null">{{ error }}</p>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control has-icon-right has-icons-left">
        <input class="input is-danger" type="password" v-model="form.password"/>
        <span class="icon is-small is-right">
          <i class="fas fa-key"></i>
        </span>
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" type="submit" @click="submit">Submit</button>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Register",
  data() {
    return {
      form: {
        email: "",
        password: ""
    },
      error: null
    }
  },
  methods: {
    submit() {
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then(data => {
            data.user.updateProfile({
              displayName: this.form.name
            })
            .then(() => {
              this.$router.replace({name: "Login"})
            });
          }).catch(err => {
            this.error = err.message;
          });

    }

  }

}
</script>

<style lang="scss">
@import "~bulma";
</style>