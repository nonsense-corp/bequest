<template>
  <div>
      <!-- Logo -->
      <h1 class="logo">Bequest</h1>

      <!-- Avatar -->
      <div class="sidebar__profile">
        <div class="sidebar__profile--img" 
          v-bind:style="{ backgroundImage: `url(${profileUrl})` }"
          aria-label="Profile Picture" title="Profile picture">
        </div>

        <p class="sidebar__profile-name">
          Connor Macdougall
        </p>
      </div>
      <!-- Links -->
      <router-link to="/balances" class="grid__sidebar-link">Balances</router-link>
      <router-link to="/tips" class="grid__sidebar-link">Tips</router-link>
      <router-link to="/embeds" class="grid__sidebar-link">Embeds</router-link>
      <router-link to="/withdraw" class="grid__sidebar-link">Withdraw</router-link>
      <a v-on:click="logout()">Log out</a>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "DashboardMenu",
  data() {
    return {
      profileUrl: '/img/tumblr_na99e5A2bY1ti25hmo1_1280.60f478f5.jpg',
    }
  },
  methods: {
    logout: function() {
      localStorage.clear();
      store.commit("changeLoggedIn", false);
      store.commit("setUserDetails", { });
      this.$router.push("/login");
    }
  }
}
</script>
