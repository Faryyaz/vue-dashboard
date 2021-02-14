import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '../node_modules/@mdi/font/css/materialdesignicons.min.css'

Vue.use(Vuetify)

const opts = {
    iconfont: 'md',
}

export default new Vuetify(opts)