import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/database'

import {rtdbPlugin} from 'vuefire'

Vue.use(rtdbPlugin);
const config = {
    apiKey: "AIzaSyBUdYMFasIKpcOLn0VyzwstT4qLRFZU5yw",
    authDomain: "formbuilder-f0c5e.firebaseapp.com",
    databaseURL: "https://formbuilder-f0c5e.firebaseio.com/",
    projectId: "formbuilder-f0c5e",
    storageBucket: "formbuilder-f0c5e.appspot.com",
};
firebase.initializeApp(config);

export const db = firebase.database();
