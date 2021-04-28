import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import firebase from "firebase/app";
import 'firebase/firestore';
import axios from 'axios'
import VueAxios from 'vue-axios'
import AxiosPlugin from 'vue-axios-cors'


Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(AxiosPlugin)
// Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
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

export const db = firebase.firestore();

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
