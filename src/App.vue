<template>
  <div id="app">
    <div class="container">
      <Home msg="Bequest" class="header"/>
      <DashboardMenu class="left-column"/>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
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
.container {
  margin: 25px;
  display: grid;
  grid-template-columns: 2fr 8fr 2fr;
  grid-template-areas: 
  "header header header"
  "leftColumn content content"
  "footer footer footer";
}
.header {
  grid-area: header;
}
.left-column {
  grid-area: leftColumn;
  display: grid;
  grid-template-columns: 1fr;
}
.left-column a {
    text-decoration: none;
    color: #F57F17;
    font-style: italic;
    transition: all 0.3s;
    /* Need this to prevent entire thing from being clickable! */
    align-self: center;
    justify-self: center;
}
.content {
  grid-area: content;
}
</style>
