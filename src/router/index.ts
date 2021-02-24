import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Account from '../views/Account.vue'
import Overview from '../views/Overview.vue'
import Analytics from '../views/Analytics.vue'
import Users from '../views/Users.vue'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/login',
        name: 'Login',
        meta: {
            layout: 'no-side-bar',
            param: 'login'
        },
        component: Account
    },
    {
        path: '/signup',
        name: 'SignUp',
        meta: {
            layout: 'no-side-bar',
            param: 'signup'
        },
        component: Account
    },
    {
        path: '/',
        name: 'Overview',
        meta: {
            layout: 'default'
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
            layout: 'default'
        },
        component: Analytics
    },
    {
        path: '/users',
        name: 'Users',
        meta: {
            layout: 'default'
        },
        component: Users
    },
    {
        path: '/profile',
        name: 'Profile',
        meta: {
            layout: 'default'
        },
        component: Profile
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
