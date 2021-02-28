import Vue from 'vue'
import vuetify from './vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './scss/main.scss'
import firebase from 'firebase/app'
import axios from 'axios'

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_SENDER_ID,
    appId: process.env.VUE_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app: any;

firebase.auth().onAuthStateChanged(user => {
    if (!app) {
        app = new Vue({
            vuetify,
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
});
