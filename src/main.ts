import Vue from 'vue'
import vuetify from './vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './scss/main.scss'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
