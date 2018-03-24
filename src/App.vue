<template>
  <div id="app">
    <Home msg="Bequest"/>
    <DashboardMenu />
    <router-view></router-view>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import DashboardMenu from './components/DashboardMenu.vue'

export default {
  name: 'app',
  components: {
    Home,
    DashboardMenu
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
