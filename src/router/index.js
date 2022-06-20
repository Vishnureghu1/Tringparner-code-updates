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
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN", "AGENT"] }
    },

    {
        path: '/notifications',
        name: 'notifications',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/ViewAllNotifications.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN", "AGENT"] }
    },
    {
        path: '/missed_calls',
        name: 'missed_calls',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../components/missed_calls.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN", "AGENT"] }
    },
    {
        path: '/all_calls',
        name: 'all_calls',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../components/all_calls.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN", "AGENT"] }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/Dashboard.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN", "AGENT"] }
    },
    {
        path: '/report',
        name: 'report',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/Report.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN", "AGENT"] }
    },

    {
        path: '/contacts',
        name: 'contacts',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/Contacts.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN", "AGENT"] }
    },
    {
        path: '/Addons',
        name: 'Addons',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/Addons.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },
    {
        path: '/manageAddonNumbers',
        name: 'manageAddonNumbers',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/manageAddonNumbers.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },
    {
        path: '/manageAddonUsers',
        name: 'manageAddonUsers',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/manageAddonUsers.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },
    {
        path: '/buyNewNumber',
        name: 'buyNewNumber',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/buyNewNumber.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },
    {
        path: '/reserveNumber',
        name: 'reserveNumber',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/reserveNumber.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },
    {
        path: '/buyNewAddOnUser',
        name: 'buyNewAddOnUser',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/buyNewAddOnUser.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },
    {
        path: '/fancyNumberPurchase',
        name: 'fancyNumberPurchase',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/fancyNumberPurchase.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },

    {
        path: '/BillingInformation',
        name: 'BillingInformation',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/BillingInformation.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },

    {
        path: '/BillingAddress',
        name: 'BillingAddress',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/BillingAddress.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },
    {
        path: '/PaymentHistory',
        name: 'PaymentHistory',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/PaymentHistory.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },
    {
        path: '/BusinessNumber',
        name: 'BusinessNumber',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/BusinessNumber.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },

    // 
    {
        path: '/CallandIVRConfig',
        name: 'CallandIVRConfig',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/CallandIVRConfig.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },
    {
        path: '/IVRandCallRouting',
        name: 'IVRandCallRouting',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/IVRandCallRouting.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },
    // keyPressAudio
    {
        path: '/keyPressDepartment',
        name: 'keyPressDepartment',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/keyPressDepartment.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },
    // basicIvrAudio.vue 

    {
        path: '/basicIvrAudio',
        name: 'basicIvrAudio',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/basicIvrAudio.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    }, {
        path: '/ManageUsers',
        name: 'ManageUsers',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/ManageUsers.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },
    {
        path: '/FAQs',
        name: 'FAQs',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/FAQs.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    }, {
        path: '/AccountInformation',
        name: 'AccountInformation',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/AccountInformation.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN", "AGENT"] }
    },
    //Basic Information
    {
        path: '/BasicInformation',
        name: 'BasicInformation',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/BasicInformation.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },
    //Basic Information
    {
        path: '/BusinessInformation',
        name: 'BusinessInformation',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/BusinessInformation.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },

    // ChangeLoginNumber
    {
        path: '/ChangeLoginNumber',
        name: 'ChangeLoginNumber',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/ChangeLoginNumber.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },

    {
        path: '/GetSupport',
        name: 'GetSupport',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/GetSupport.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    }, {
        path: '/ChooseNumbers',
        name: 'ChooseNumbers',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/ChooseNumbers.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    }, {
        path: '/SelectPlan',
        name: 'SelectPlan',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/SelectPlan.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    }, {
        path: '/Billing',
        name: 'Billing',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/Billing.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    }, {
        path: '/Review',
        name: 'Review',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/Review.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    }, {
        path: '/CallFlowSettings',
        name: 'CallFlowSettings',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/CallFlowSettings.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },
    // ManageAgents
    {
        path: '/ManageAgents',
        name: 'ManageAgents',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/ManageAgents.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    }, {
        path: '/PauseNumber',
        name: 'PauseNumber',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/PauseNumber.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },

    {
        path: '/CallPreference',
        name: 'CallPreference',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/CallPreference.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },

    {
        path: '/IvrCallPreference',
        name: 'IvrCallPreference',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/CallPreferenceivr.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },



    // CallRouting
    {
        path: '/CallRouting',
        name: 'CallRouting',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/CallRouting.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },

    // PrioritizeConfiguration

    {
        path: '/PrioritizeConfiguration',
        name: 'PrioritizeConfiguration',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/PrioritizeConfiguration.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },
    {
        path: '/PrioritizeConfigurationIvr',
        name: 'PrioritizeConfigurationIvr',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/PrioritizeConfigurationIvr.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },

    {
        path: '/NotificationSettings',
        name: 'NotificationSettings',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/NotificationSettings.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN", "AGENT"] }
    },

    // MissedCallDistribution

    {
        path: '/MissedCallDistribution',
        name: 'MissedCallDistribution',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/MissedCallDistribution.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },
    {
        path: '/IvrMissedCallDistribution',
        name: 'IvrMissedCallDistribution',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/MissedCallDistributionIvr.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },
    // SelectSpecificAgent
    {
        path: '/SelectSpecificAgent',
        name: 'SelectSpecificAgent',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/SelectSpecificAgent.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },

    // BlockedNumbers
    {
        path: '/BlockedNumbers',
        name: 'BlockedNumbers',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/BlockedNumbers.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },

    // GreetingMessage.vue
    {
        path: '/GreetingMessage',
        name: 'GreetingMessage',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/GreetingMessage.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },

    // CallerTune.vue
    {
        path: '/CallerTune',
        name: 'CallerTune',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/CallerTune.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },
    // SetWorkingHours.vue
    {
        path: '/WorkingHours',
        name: 'WorkingHours',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/SetWorkingHours.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    }, {
        path: '/CallerID',
        name: 'CallerID',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/CallerID.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN", "AGENT"] }
    },

    // OfflineMesssage
    {
        path: '/OfflineMesssage',
        name: 'OfflineMesssage',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/OfflineMesssage.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },
    {
        path: '/IntroductionandDepartmentsAudio',
        name: 'IntroductionandDepartmentsAudio',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/IntroductionandDepartmentsAudio.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },
    {
        path: '/NoKeypressAudio',
        name: 'NoKeypressAudio',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/NoKeypressAudio.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },
    {
        path: '/WrongKeypressAudio',
        name: 'WrongKeypressAudio',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/WrongKeypressAudio.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    },
    {
        path: '/NoAnswerAudio',
        name: 'NoAnswerAudio',
        component: () =>
            import ( /* webpackChunkName: "missed_call" */ '../views/NoAnswerAudio.vue'),
        meta: { requiresAuth: true, role: 'OWNER', allowedRoles: ["OWNER", "ADMIN"] }
    }

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

        // if (metaRole == currentUserRole) {
        if (to.meta.allowedRoles.includes(currentUserRole)) {
            console.log('metaRole', metaRole)
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