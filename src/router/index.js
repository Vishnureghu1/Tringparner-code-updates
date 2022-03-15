import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/components/login.vue'
import * as firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(VueRouter)
console.log(firebase)
const routes = [{
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
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../components/answered_call.vue'),
        meta: { requiresAuth: true, role: 'OWNER' }
    },
    {
        path: '/missed_calls',
        name: 'missed_calls',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../components/missed_calls.vue'),
        meta: { requiresAuth: true, role: 'OWNER' }
    },
    {
        path: '/all_calls',
        name: 'all_calls',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../components/all_calls.vue'),
        meta: { requiresAuth: true, role: 'OWNER' }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/Dashboard.vue'),
        meta: { requiresAuth: true, role: 'OWNER' }
    },
    {
        path: '/report',
        name: 'report',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/Report.vue'),
        meta: { requiresAuth: true, role: 'OWNER' }
    },
    {
        path: '/Addons',
        name: 'Addons',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/Addons.vue'),
        meta: { requiresAuth: true, role: 'OWNER' }
    },
    {
        path: '/BillingInformation',
        name: 'BillingInformation',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/BillingInformation.vue'),
        meta: { requiresAuth: true, role: 'OWNER' }
    },
    {
        path: '/BusinessNumber',
        name: 'BusinessNumber',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/BusinessNumber.vue'),
        meta: { requiresAuth: true, role: 'OWNER' }
    },
    {
        path: '/ManageUsers',
        name: 'ManageUsers',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/ManageUsers.vue'),
        meta: { requiresAuth: true, role: 'OWNER' }
    },
    {
        path: '/FAQs',
        name: 'FAQs',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/FAQs.vue'),
        meta: { requiresAuth: true, role: 'OWNER' }
    },
    {
        path: '/AccountInformation',
        name: 'AccountInformation',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/AccountInformation.vue'),
        meta: { requiresAuth: true, role: 'OWNER' }
    },
    {
        path: '/GetSupport',
        name: 'GetSupport',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/GetSupport.vue'),
        meta: { requiresAuth: true, role: 'OWNER' }
    },
    {
        path: '/ChooseNumbers',
        name: 'ChooseNumbers',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/ChooseNumbers.vue'),
        meta: { requiresAuth: true, role: 'OWNER' }
    },
    {
        path: '/SelectPlan',
        name: 'SelectPlan',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/SelectPlan.vue'),
        meta: { requiresAuth: true, role: 'OWNER' }
    },
    {
        path: '/Billing',
        name: 'Billing',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/Billing.vue'),
        meta: { requiresAuth: true, role: 'OWNER' }
    },
    {
        path: '/Review',
        name: 'Review',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/Review.vue'),
        meta: { requiresAuth: true, role: 'OWNER' }
    },
    {
        path: '/CallFlowSettings',
        name: 'CallFlowSettings',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/CallFlowSettings.vue'),
        meta: { requiresAuth: true, role: 'OWNER' }
    },
    {
        path: '/PauseNumber',
        name: 'PauseNumber',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/PauseNumber.vue'),
        meta: { requiresAuth: true, role: 'OWNER' }
    },

    {
        path: '/CallPreference',
        name: 'CallPreference',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/CallPreference.vue'),
        meta: { requiresAuth: true, role: 'OWNER' }
    },


    {
        path: '/NotificationSettings',
        name: 'NotificationSettings',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/NotificationSettings.vue'),
        meta: { requiresAuth: true, role: 'OWNER' }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// router.beforeEach( (to,from,next)=>{
//   const  requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   console.log ('data',requiresAuth);
//   const isAuthenticated = firebase.default.auth().currentUser;
//   console.log('isAuthenticated', isAuthenticated);
//   console.log(!isAuthenticated);
//   if (requiresAuth && !isAuthenticated){
//     next('/');
//   }else {
//     console.log('else part');
//     next();
//   }
// })

router.beforeEach(async(to, from, next) => {

    const currentUser = await checkAuthStatus();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const metaRole = to.meta.role;
    const currentUserRole = await getAuthUserRole();

    console.log('router.beforeEach currentUserRole', currentUserRole);

    if (requiresAuth && !currentUser) {
        next({
            path: '/login',
            query: {
                redirect: to.fullPath
            }
        });
    } else if (requiresAuth && currentUser) {

        if (metaRole == currentUserRole) {
            next();
        } else {
            if (currentUserRole == 'OWNER') {
                next({
                    path: '/login',
                    query: {
                        redirect: to.fullPath
                    }
                });
            } else if (currentUserRole == 'ADMIN') {
                next({
                    path: '/login',
                    query: {
                        redirect: to.fullPath
                    }
                });
            } else if (currentUserRole == 'AGENT') {
                next({
                    path: '/login',
                    query: {
                        redirect: to.fullPath
                    }
                });
            }
        }

    } else {
        next();
    }
})

function getAuthUserRole() {

    return new Promise((resolve, reject) => {
        try {

            let localStorageUserObj = localStorage.getItem('tpu');
            // let userRole = 'Guest';
            if (localStorageUserObj) {
                let parsedUserObj = JSON.parse(localStorageUserObj);
                // let userEmail = parsedUserObj['Email']
                // let userRole = parsedUserObj['role']
                // let userPhoneNumber = parsedUserObj['PhoneNumber']
                if (Object.prototype.hasOwnProperty.call(parsedUserObj, 'uid') &&
                    Object.prototype.hasOwnProperty.call(parsedUserObj, 'role')) {

                    firebase.default.auth().currentUser.getIdTokenResult()
                        .then((idTokenResult) => {
                            let userIdFromClaim = idTokenResult.claims.user_id;
                            let userIdFromLocalStorage = parsedUserObj['uid'];
                            let userRoleFromLocalStorage = parsedUserObj['role'];

                            if (userIdFromClaim == userIdFromLocalStorage) {
                                // console.log('Claim role confirm', userRoleFromLocalStorage)
                                resolve(userRoleFromLocalStorage)
                            } else {
                                resolve('Guest')
                            }

                        })
                        .catch((error) => {
                            console.log(error);
                            reject(error);
                        });
                }
            } else {
                resolve('Guest')
            }

        } catch {
            resolve('Guest');
        }
    });

}

function checkAuthStatus() {
    return new Promise((resolve, reject) => {
        try {
            // firebase.auth()
            firebase.default.auth()
                .onAuthStateChanged(user => {
                    // console.log('userChecked:', user)
                    //user obj has phoneNumber uid
                    resolve(user);
                });
        } catch {
            reject('api failed')
        }
    });
}

export default router