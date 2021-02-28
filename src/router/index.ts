import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Account from '../views/Account.vue'
import Overview from '../views/Overview.vue'
import Analytics from '../views/Analytics.vue'
import Users from '../views/Users.vue'
import Profile from '../views/Profile.vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import store from '../store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/login',
        name: 'Login',
        meta: {
            layout: 'no-side-bar',
            param: 'login',
            requiresAuth: false
        },
        component: Account
    },
    {
        path: '/signup',
        name: 'SignUp',
        meta: {
            layout: 'no-side-bar',
            param: 'signup',
            requiresAuth: false
        },
        component: Account
    },
    {
        path: '/',
        name: 'Overview',
        meta: {
            layout: 'default',
            requiresAuth: true
        },
        component: Overview
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
    },
    {
        path: '/analytics',
        name: 'Analytics',
        meta: {
            layout: 'default',
            requiresAuth: true
        },
        component: Analytics
    },
    {
        path: '/users',
        name: 'Users',
        meta: {
            layout: 'default',
            requiresAuth: true
        },
        component: Users
    },
    {
        path: '/profile',
        name: 'Profile',
        meta: {
            layout: 'default',
            requiresAuth: true
        },
        component: Profile
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = store.state.preload.user.email !== '';

    if (requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router
