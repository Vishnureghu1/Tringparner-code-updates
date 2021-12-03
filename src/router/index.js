import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import * as firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/answered_call',
    name: 'answered_call',
    component: () => import(/* webpackChunkName: "missed_call" */ '../components/answered_call.vue'),
    meta: {requiresAuth: true}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
