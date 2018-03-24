<template>
  <div id="app">
    <div class="container">
      <Header class="header"/>
      <div v-if="checkLogIn()">
        <DashboardMenu class="left-column"/>
      </div>
      <div class="content" v-bind:class="{ 'grid-column-start-1': !checkLogIn() }">
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
html, body
{
    margin: 0px; padding: 0px
}
#app {
  font-family: 'Hind','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container {
  display: grid;
  grid-template-columns: 2fr 8fr 2fr;
  grid-template-areas: 
  "header header header"
  "leftColumn content content"
  "footer footer footer";
}
.header {
  grid-area: header;
  background-color: #39DBC9;
}
.left-column {
  grid-area: leftColumn;
  background-color: #BA55D3;
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
  background-color: palevioletred;
}
.grid-column-start-1 {
  grid-column-start: 1;
}

/* Start fancy loaders */
.preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.loader {
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 150px;
    height: 150px;
    margin: -75px 0 0 -75px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #9370DB;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
}
.loader:before {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #BA55D3;
    -webkit-animation: spin 3s linear infinite;
    animation: spin 3s linear infinite;
}
.loader:after {
    content: "";
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #FF00FF;
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.5s linear infinite;
}
@-webkit-keyframes spin {
    0%   {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@keyframes spin {
    0%   {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>
