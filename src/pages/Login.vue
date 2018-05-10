<template>
  <div class="login__content">
    <h1 class="logo login__logo">Bistow</h1>
    <form v-on:submit.prevent="loginFunction">
      <div class="group">      
        <input type="text" 
          required v-model="login.user"
          v-on:blur="$v.login.user.$touch"
          v-bind:class="{error: $v.login.user.$error}"
        >
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>EMAIL</label>
      </div>
      <div class="group">      
        <input type='password' 
          required v-model="login.password"
          v-on:blur="$v.login.password.$touch"
          v-bind:class="{error: $v.login.password.$error}"
        >
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>PASSWORD</label>
      </div>

      <div class="login__btn-wrapper">
        <router-link to="/register" class="btn" tag="button">
          Register
          <i class="fas fa-edit"></i>
        </router-link>
        <button type='submit' class="btn btn--primary" :disabled="login.loading || $v.$invalid">
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
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: "Login",
  data() {
    return {
      login: {
        user: "",
        password: "",
        company: "bistow",
        loading: false
      }
    };
  },
  methods: {
    loginFunction: function(event) {
      this.login.loading = true;
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
            this.login.loading = false;
          },
          err => {
            this.$swal({
              type: 'error',
              title: 'Oops...',
              text: err.body.message,
            });
            this.login.loading = false;
          }
        );
    },
    checkLogIn: function() {
      if (store.state.loggedIn) {
        return "true";
      }
      return "false";
    }
  },
  validations: {
    login: {
      user: {
        email,
        required
      },
      password: {
        required
      }
    }
  }
};
</script>
