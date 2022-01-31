import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/components/login.vue'
import * as firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(VueRouter)
console.log(firebase)
const routes = [
  {
      path: '*',
      redirect: '/login'
  }, {
      path: '/',
      redirect: '/login'
  }, {
      path: '/login',
      name: 'login',
      component: login
  }, 
  {
    path: '/answered_call',
    name: 'answered_call',
    component: () => import(/* webpackChunkName: "missed_call" */ '../components/answered_call.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/missed_calls',
    name: 'missed_calls',
    component: () => import(/* webpackChunkName: "missed_call" */ '../components/missed_calls.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/all_calls',
    name: 'all_calls',
    component: () => import(/* webpackChunkName: "missed_call" */ '../components/all_calls.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "missed_call" */ '../views/Dashboard.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/report',
    name: 'report',
    component: () => import(/* webpackChunkName: "missed_call" */ '../views/Report.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/Addons',
    name: 'Addons',
    component: () => import(/* webpackChunkName: "missed_call" */ '../views/Addons.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/BillingInformation',
    name: 'BillingInformation',
    component: () => import(/* webpackChunkName: "missed_call" */ '../views/BillingInformation.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/BusinessNumber',
    name: 'BusinessNumber',
    component: () => import(/* webpackChunkName: "missed_call" */ '../views/BusinessNumber.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/ManageUsers',
    name: 'ManageUsers',
    component: () => import(/* webpackChunkName: "missed_call" */ '../views/ManageUsers.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/FAQs',
    name: 'FAQs',
    component: () => import(/* webpackChunkName: "missed_call" */ '../views/FAQs.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/AccountInformation',
    name: 'AccountInformation',
    component: () => import(/* webpackChunkName: "missed_call" */ '../views/AccountInformation.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/GetSupport',
    name: 'GetSupport',
    component: () => import(/* webpackChunkName: "missed_call" */ '../views/GetSupport.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/ChooseNumbers',
    name: 'ChooseNumbers',
    component: () => import(/* webpackChunkName: "missed_call" */ '../views/ChooseNumbers.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/SelectPlan',
    name: 'SelectPlan',
    component: () => import(/* webpackChunkName: "missed_call" */ '../views/SelectPlan.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/Billing',
    name: 'Billing',
    component: () => import(/* webpackChunkName: "missed_call" */ '../views/Billing.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/Review',
    name: 'Review',
    component: () => import(/* webpackChunkName: "missed_call" */ '../views/Review.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/CallFlowSettings',
    name: 'CallFlowSettings',
    component: () => import(/* webpackChunkName: "missed_call" */ '../views/CallFlowSettings.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/PauseNumber',
    name: 'PauseNumber',
    component: () => import(/* webpackChunkName: "missed_call" */ '../views/PauseNumber.vue'),
    meta: {requiresAuth: true}
  },
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