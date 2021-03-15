import Vue from 'vue'
import VueRouter, { RouteConfig, Route } from 'vue-router'
import Account from '../views/Account.vue'
import Overview from '../views/Overview.vue'
import Analytics from '../views/Analytics.vue'
import Users from '../views/Users.vue'
import Profile from '../views/Profile.vue'
import About from '../views/About.vue'
import * as fb from '../firebase'
import store from '../store'
import { ERole } from '../datamodels/User'

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
        name: 'Dashboard',
        redirect: '/overview',
        meta: {
            layout: 'default',
            requiresAuth: true
        },
        component: { template: '<router-view></router-view>' },
        children: [
            {
                path: '/overview',
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
                beforeEnter: (to: Route, from: Route, next: Function) => {
        
                    const role = store.state.preload.user.role;
                    if (role === ERole.admin || role === ERole.staff) {
                        next();
                    }
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
                beforeEnter: (to: Route, from: Route, next: Function) => {
        
                    const role = store.state.preload.user.role;
                    if (role === ERole.admin) {
                        next();
                    }
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
            },
            {
                path: '/about',
                name: 'About',
                meta: {
                    layout: 'default',
                    requiresAuth: true
                },
                component: About
            }
        ]
    }
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to: Route, from: Route, next: Function) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const currentUser = fb.auth.currentUser;
    const userProfile = store.state.preload.user;

    if (userProfile.email === '' && currentUser) {
        store.dispatch('fetchUserProfile', currentUser);
    }

    if (requiresAuth && !currentUser) {
        next('/login');
    } else {
        next();
    }
});

export default router
