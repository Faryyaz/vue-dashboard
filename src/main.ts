import Vue from 'vue'
import vuetify from './vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './scss/main.scss'
import { auth } from './firebase'
import './filters'

import axios from 'axios'

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.mixin({
    beforeRouteUpdate() {
        console.log("Mixin route");
    }
});

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