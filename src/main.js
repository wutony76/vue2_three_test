import Vue from 'vue'
import App from './App.vue'

import './core/base'
import router from './router'
import store from './store'
import base from './utils/base'

const app = new Vue({
  el:'#app',
  store,
  router,
  render: h => h(App)
})

// 全域變數設定
// Vue.prototype.env = process.env.NODE_ENV
Vue.prototype.$vue = app 
Vue.prototype.$store = store

base.self = app
