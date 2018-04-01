<template>
  <div class="login__content">
    <h1 class="logo login__logo">Bequest</h1>
    <form v-on:submit.prevent="loginFunction">
      <div class="group">      
        <input type="text" required v-model="login.user">
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>EMAIL</label>
      </div>
      <div class="group">      
        <input type='password' required v-model="login.password">
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>PASSWORD</label>
      </div>

      <div class="login__btn-wrapper">
        <router-link to="/register" class="btn" tag="button">Register</router-link>
        <button type='submit' class="btn btn--primary">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "Login",
  data() {
    return {
      login: {
        user: "",
        password: "",
        company: "crypto_tipper"
      }
    };
  },
  methods: {
    loginFunction: function(event) {
      event.preventDefault();
      this.$http
        .post(
          "https://api.rehive.com/3/auth/login/",
          JSON.stringify(this.login)
        )
        .then(
          response => {
            localStorage.setItem("token", response.body.data.token);
            store.commit("changeLoggedIn", true);
            store.commit("setUserDetails", response.body.data);
            this.$router.push("/balances");
          },
          err => {
            console.log("An error occured", err);
          }
        );
    },
    checkLogIn: function() {
      if (store.state.loggedIn) {
        return "true";
      }
      return "false";
    }
  }
};
</script>
