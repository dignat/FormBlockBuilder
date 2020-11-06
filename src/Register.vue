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
      <label class="label">Role</label>
      <div class="control has-icon-right has-icons-left">
        <select class="input is-danger" type="select" v-model="selectedRole">
          <option v-for="currentRole in roles">{{ currentRole }}</option>
        </select>
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
import Select from "./components/Select";
export default {
  name: "Register",
  components: {Select},
  data() {
    return {
      form: {
        email: "",
        password: ""
    },
      userToDb: {
        email: "",
        uid: "",
        role:{
          admin: false,
          guest: false
        }
      },
      roles :[
        'admin',
        'guest'
      ],
      selectedRole: '',
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
            this.userToDb.email = data.user.email;
            this.userToDb.uid = data.user.uid
            this.userToDb.role.admin = this.selectedRole === 'admin';
            this.userToDb.role.guest = this.selectedRole === 'guest';
            firebase.database().ref('users').push(this.userToDb)
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