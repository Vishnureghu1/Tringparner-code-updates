import Vue from 'vue'
import App from './App.vue'
import vuetify from '../plugins/vuetify'
import router from './router'
import firebase from "firebase/app";
import 'firebase/firestore';
import axios from 'axios'
import VueAxios from 'vue-axios'
import AxiosPlugin from 'vue-axios-cors'
import VueGoogleCharts from 'vue-google-charts'


Vue.prototype.$http = AxiosPlugin;
Vue.config.productionTip = false;
Vue.use(VueGoogleCharts)
Vue.use(VueAxios, axios);
Vue.use(AxiosPlugin);

export const bus = new Vue();

firebase.initializeApp({
    apiKey: "AIzaSyBXibeZC-vEjCOetmvBhwFS3mYz3VcyzRU",
    authDomain: "test-tpv2.firebaseapp.com",
    databaseURL: "https://test-tpv2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "test-tpv2",
    storageBucket: "test-tpv2.appspot.com",
    messagingSenderId: "915926362222",
    appId: "1:915926362222:web:b3f914ef56f454161c5e7f",
    measurementId: "G-7429HVQX2D"
});

export const db = firebase.firestore();

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')

import '/src/assets/css/main.css';

Vue.prototype.$mongoApi = 'http://35.244.46.144:5000';
Vue.prototype.$headerKeyMongo = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWMwNmQ1NjY1YzZmNGU4NTk4MDBkNGMiLCJpYXQiOjE2NDAwMDQ2OTN9.7VPtc5_xb6_4Feds3zdAZw9VZdOeq0rvwp425m0efE0';
Vue.prototype.$cloudfareApi = "https://asia-south1-test-tpv2.cloudfunctions.net/tpv2/web";