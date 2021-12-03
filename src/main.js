import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false
import vuetify from './plugins/vuetify';
import firebase from "firebase/app";
import 'firebase/firestore';
import axios from 'axios'
import VueAxios from 'vue-axios'
import AxiosPlugin from 'vue-axios-cors'
import "firebase/analytics"


Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(AxiosPlugin)

export const eventBus = new Vue();

firebase.initializeApp({
	apiKey: "AIzaSyAbKeIOiuumM2AYsvPgJuyytH0CvIwxhsU",
    authDomain: "tringpartner-v2.firebaseapp.com",
    databaseURL: "https://tringpartner-v2-default-rtdb.firebaseio.com",
    projectId: "tringpartner-v2",
    storageBucket: "tringpartner-v2.appspot.com",
    messagingSenderId: "448716065880",
    appId: "1:448716065880:web:fa9c09fe22e88d873b4e2d",
    measurementId: "G-Y2513C98CT"
  });
firebase.analytics();
Vue.prototype.$analytics = firebase.analytics();

export const db = firebase.firestore();
let app;
console.log("app", app)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
