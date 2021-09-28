import Vue from 'vue'
import App from './App'
import Utils from './Utils/index.js'
import Services from './Utils/services.js'

Vue.config.productionTip = false
Vue.prototype.utils = Utils
Vue.prototype.services = Services

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
