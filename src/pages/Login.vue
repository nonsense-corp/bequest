<template>
  <div class="login__content">
    <h1 class="logo login__logo">Bistow</h1>
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
        <router-link to="/register" class="btn" tag="button">
          Register
          <i class="fas fa-edit"></i>
        </router-link>
        <button type='submit' class="btn btn--primary">
          Login
          <i class="fas fa-arrow-circle-right"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import store from "../store";
import globals from "../globals";

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
          globals.REHIVE_API.BASE_URL + globals.REHIVE_API.URLS.LOGIN,
          JSON.stringify(this.login)
        )
        .then(
          response => {
            localStorage.setItem("token", response.body.data.token);
            store.commit("changeLoggedIn", true);
            store.commit("setUserDetails", response.body.data.user);
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
