import Vue from 'vue'
import vuetify from './vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './scss/main.scss'
import { auth } from './firebase'
import './filters'

Vue.config.productionTip = false;

let app: Vue;
auth.onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            vuetify,
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
});