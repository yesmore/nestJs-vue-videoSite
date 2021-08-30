import Vue from 'vue'
import App from './App.vue'

import './plugins/element'
import './plugins/avue.js'

import axios from 'axios' 
import router from './router'
import EleForm from "vue-ele-form";

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})
Vue.use(EleForm)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
