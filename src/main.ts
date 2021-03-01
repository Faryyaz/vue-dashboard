import Vue from 'vue'
import vuetify from './vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './scss/main.scss'
import { auth } from './firebase'

import axios from 'axios'

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

let app: any;
auth.onAuthStateChanged(user => {
    if (!app) {
        app = new Vue({
            vuetify,
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
});
