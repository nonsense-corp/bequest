<template>
  <div id="app">
    <div class="grid">
      <Header class="grid__header" v-if="checkLogIn()"/>
      <template v-if="checkLogIn()">
        <DashboardMenu class="grid__sidebar"/>
      </template>
      <div class="grid__content" v-bind:class="{ 'login': !checkLogIn()}">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import DashboardMenu from './components/DashboardMenu.vue'
import store from './store'

export default {
  name: 'app',
  components: {
    Header,
    DashboardMenu
  },
  methods: {
    checkLogIn: function() {
        if (store.state.loggedIn) {
            return true;
        }
        return false;
    },
  }
}
</script>

<style>

</style>
