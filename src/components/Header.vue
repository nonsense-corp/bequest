<template>
  <div>
    <a v-on:click="logout()" class="header_logout">LOGOUT ></a>
  </div>
</template>

<script>
import store from "../store";
export default {
  name: 'Header',
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

<style scoped>
  a {
    color: #000;
    letter-spacing: 0.1em;
    font-size: 24px;
    font-weight: 300;
    cursor: pointer;
  }
</style>