import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/Login.vue'
import Overview from '../views/Overview.vue'
import Users from '../views/Users.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/login',
        name: 'Login',
        meta: {
            layout: 'no-side-bar'
        },
        component: Login
    },
    {
        path: '/',
        name: 'Dashboard',
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
        path: '/users',
        name: 'Users',
        meta: {
            layout: 'default'
        },
        component: Users
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
