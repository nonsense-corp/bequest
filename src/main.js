import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import store from './store'
import router from './router'
import globals from './globals'

// Styles
import './styles/main.scss'

//Global ENV variables
if (typeof window.__BEQUEST_ENV === "undefined") {
  window.__BEQUEST_ENV = globals;
}

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
