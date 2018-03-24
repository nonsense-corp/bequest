import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'

Vue.use(VueRouter)


Vue.config.productionTip = false

// // 1. Define route components.
// // These can be imported from other files
// const Foo = { template: '<div>foo</div>' }
// const Bar = { template: '<div>bar</div>' }

// // 2. Define some routes
// // Each route should map to a component. The "component" can
// // either be an actual component constructor created via
// // `Vue.extend()`, or just a component options object.
// // We'll talk about nested routes later.
// const routes = [
//   { path: '/', component: App },
//   { path: '/foo', component: Foo },
//   { path: '/bar', component: Bar }
// ]

// // 3. Create the router instance and pass the `routes` option
// // You can pass in additional options here, but let's
// // keep it simple for now.
// const router = new VueRouter({
//   routes // short for `routes: routes`
// })

// new Vue({
//   render: h => h(App)
// }).$mount('#app')

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
