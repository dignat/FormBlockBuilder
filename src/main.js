// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faKey, faPen} from "@fortawesome/free-solid-svg-icons";
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import {faAngleDoubleDown} from '@fortawesome/free-solid-svg-icons';
import {faTable, faFont, faAlignCenter, faThList,faList,faCheckCircle,faCheckSquare,faClock, faCalculator,faThLarge,faStopwatch,faQrcode,faSignature,faParagraph,faSubscript,faMapMarker} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {routes} from "./routes/routes";
import VueRouter from "vue-router";
import CKEditor from 'ckeditor4-vue';
import firebase from "firebase";
import admin from "firebase/auth"
import store from "./store/store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes
});
firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
})
library.add(faMapMarker)
library.add(faSubscript)
library.add(faParagraph)
library.add(faSignature)
library.add(faStopwatch)
library.add(faQrcode)
library.add(faCheckCircle)
library.add(faCheckSquare)
library.add(faClock)
library.add(faCalculator)
library.add(faThLarge)
library.add(faPen);
library.add(faCamera);
library.add(faKey);
library.add(faAngleDoubleDown)
library.add(faTable)
library.add(faFont)
library.add(faAlignCenter)
library.add(faThList)
library.add(faList)

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
