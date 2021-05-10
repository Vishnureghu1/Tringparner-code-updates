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
    path: '/pricing',
    name: 'Pricing',
    component: () => import(/* webpackChunkName: "pricing_plan" */ '../components/pricing_plan.vue')
  },
  {
    path: '/billing_details',
    name: 'billing_details',
    component: () => import(/* webpackChunkName: "billing_details" */ '../components/billing_details.vue')
  },
  {
    path: '/trying',
    name: 'trying',
    component: () => import(/* webpackChunkName: "billing_details" */ '../components/try.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "billing_details" */ '../components/dashboard.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
