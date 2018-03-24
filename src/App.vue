<template>
  <div id="app">
    <Home msg="Bequest"/>
    <div v-if="checkLogIn()">
      <DashboardMenu />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import DashboardMenu from './components/DashboardMenu.vue'
import store from './store'

export default {
  name: 'app',
  components: {
    Home,
    DashboardMenu
  },
  methods: {
    checkLogIn: function() {
        if (store.state.loggedIn) {
            return 'true';
        }
        return 'false';
    },
  }
}
</script>

<style>
#app {
  font-family: 'Hind','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
