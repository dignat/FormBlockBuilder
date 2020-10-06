// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faKey, faPen} from "@fortawesome/free-solid-svg-icons";
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {routes} from "./routes/routes";
import VueRouter from "vue-router";
import CKEditor from 'ckeditor4-vue';
import firebase from "firebase";
import store from "./store/store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes
});
firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
})
library.add(faPen);
library.add(faCamera);
library.add(faKey);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;
Vue.use( CKEditor );
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
});
