<template>
  <div class="login__content">
      <div>
        <h1 class="logo login__logo">Bequest</h1>
        <form v-on:submit.prevent="registerUser">
            <div class="group">      
              <input type="text" required v-model="register.first_name">
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>FIRST NAME</label>
            </div>

            <div class="group">      
              <input type="text" required v-model="register.last_name">
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>LAST NAME</label>
            </div>

            <div class="group">      
              <input type="text" required v-model="register.email">
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>EMAIL</label>
            </div>

            <div class="group">      
              <input type="text" required v-model="stellar.username">
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>USERNAME</label>
            </div>       

            <div class="group">      
              <input type="password" required v-model="register.password">
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>PASSWORD</label>
            </div>

            <div class="login__btn-wrapper">
              <router-link to="/login" class="btn" tag="button">Login</router-link>
              <button type="submit" class="btn btn--primary">Register</button>
            </div>
        </form>
      </div>
  </div>
</template>

<script>
import store from "../store";
import globals from "../globals";

export default {
  name: "Register",
  data() {
    return {
      register: {
        first_name: "",
        last_name: "",
        email: "",
        password: ""
      },
      stellar: {
        username: "",
      }
    };
  },
  methods: {
    registerUser: function(event) {
      event.preventDefault();
      console.log("register is", this.register);
      const payload = {
        first_name: this.register.first_name,
        last_name: this.register.last_name,
        email: this.register.email,
        password1: this.register.password,
        password2: this.register.password,
        company: "crypto_tipper"
      };
      this.$http
        .post(
          globals.REHIVE_API.BASE_URL + globals.REHIVE_API.URLS.REGISTER,
          JSON.stringify(payload)
        )
        .then(
          response => {
            localStorage.setItem("token", response.body.data.token);
            store.commit("changeLoggedIn", true);
            store.commit("setUserDetails", response.body.data.user);
            const payload_1 = {
              username: this.stellar.username,
             };
            const token = "Token " + localStorage.getItem("token");
            this.$http
                .post(
                  globals.STELLAR_API.BASE_URL + globals.STELLAR_API.URLS.USERNAME,
                  JSON.stringify(payload_1),
                  { headers: { Authorization: token }}
                )
                .then(
                  response => {
                    this.$router.push("/balances");
                  },
                  err => {
                    console.log("An error occured", err);
                  }
                );
          },
          err => {
            console.log("An error occured", err);
          }
        )
    }
  }
};
</script>
