// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faPen} from "@fortawesome/free-solid-svg-icons";
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {routes} from "./routes/routes";
import VueRouter from "vue-router";

const router = new VueRouter({
  mode: 'history',
  routes
});
library.add(faPen);
library.add(faCamera);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
});
