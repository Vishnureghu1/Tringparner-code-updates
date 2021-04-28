import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/components/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: login
  },
  {
    path: '/choose_no',
    name: 'Choose_no',
    component: () => import(/* webpackChunkName: "choose_no" */ '../components/choose_no.vue')
  },
  {
    path: '/trying',
    name: 'Trying',
    component: () => import(/* webpackChunkName: "choose_no" */ '../components/try.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
