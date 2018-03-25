<template>
  <div class="menu">
      <router-link to="/balances" class="mui-btn mui-btn--flat">Balances</router-link>
      <router-link to="/tips" class="mui-btn mui-btn--flat">Tips</router-link>
      <router-link to="/embeds" class="mui-btn mui-btn--flat">Embeds</router-link>
      <router-link to="/withdraw" class="mui-btn mui-btn--flat">Withdraw</router-link>
      <a class="mui-btn mui-btn--flat" v-on:click="logout()">Log out</a>
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
