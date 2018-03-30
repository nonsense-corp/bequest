<template>
  <div id="app">
    <div class="grid">
      <Header class="grid__header"/>
      <template v-if="checkLogIn()">
        <DashboardMenu class="grid__sidebar"/>
      </template>
      <div class="grid__content" v-bind:class="{ 'grid-column-start-2': !checkLogIn()}">
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

.page {
  box-shadow: 0 0 1px #000;
}
.grid-column-start-2 {
  grid-column-start: 2;
}
.left-column .mui-btn+.mui-btn {
    margin-left: 0;
}

.menu {
  margin-right: 30px;
}
.menu a {
  width: 100%;
  padding: 0px;
}
</style>
