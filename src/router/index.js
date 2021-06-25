import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/components/login.vue'
import * as firebase from 'firebase/app';
import 'firebase/auth';

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
    component: () => import(/* webpackChunkName: "choose_no" */ '../components/choose_no.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: () => import(/* webpackChunkName: "pricing_plan" */ '../components/pricing_plan.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/billing_details',
    name: 'billing_details',
    component: () => import(/* webpackChunkName: "billing_details" */ '../components/billing_details.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/trying',
    name: 'trying',
    component: () => import(/* webpackChunkName: "billing_details" */ '../components/try.vue'),
    
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "billing_details" */ '../components/dashboard.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/billing',
    name: 'billing',
    component: () => import(/* webpackChunkName: "billing" */ '../components/billing.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/manageUsers',
    name: 'manageUsers',
    component: () => import(/* webpackChunkName: "manage_users" */ '../components/manageUsers.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/calllogs',
    name: 'calllogs',
    component: () => import(/* webpackChunkName: "calllogs" */ '../components/calllogs.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/myinfo',
    name: 'myinfo',
    component: () => import(/* webpackChunkName: "myinfo" */ '../components/myinfo.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/test_number',
    name: 'test_number',
    component: () => import(/* webpackChunkName: "test_number" */ '../components/test_number.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/add_agents',
    name: 'add_agents',
    component: () => import(/* webpackChunkName: "Add_agents" */ '../components/add_agents.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/active_call',
    name: 'active_call',
    component: () => import(/* webpackChunkName: "active_call" */ '../components/active_call.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/missed_call',
    name: 'missed_call',
    component: () => import(/* webpackChunkName: "missed_call" */ '../components/missed_call.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/greeting',
    name: 'greeting',
    component: () => import(/* webpackChunkName: "greetings" */ '../components/greeting.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/block_calls',
    name: 'block_calls',
    component: () => import(/* webpackChunkName: "block_calls" */ '../components/block_calls.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/addons',
    name: 'addons',
    component: () => import(/* webpackChunkName: "addons" */ '../components/addons.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: () => import(/* webpackChunkName: "analytics" */ '../components/analytics.vue'),
    meta: {requiresAuth: true}
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach( (to,from,next)=>{
  const  requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  console.log ('data',requiresAuth);
  const isAuthenticated = firebase.default.auth().currentUser;
  console.log(!isAuthenticated);
  if (requiresAuth && !isAuthenticated){
    next('/');
  }else {
    console.log('else part');
    next();
  }
})

export default router
