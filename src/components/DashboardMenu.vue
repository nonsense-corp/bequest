<template>
  <div>
      <router-link to="/balances" class="grid__sidebar_link">Balances</router-link>
      <router-link to="/tips" class="grid__sidebar_link">Tips</router-link>
      <router-link to="/embeds" class="grid__sidebar_link">Embeds</router-link>
      <router-link to="/withdraw" class="grid__sidebar_link">Withdraw</router-link>
      <a v-on:click="logout()">Log out</a>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "DashboardMenu",
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
