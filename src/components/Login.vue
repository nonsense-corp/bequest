<template>
  <div>
      <h1>Login</h1>
        <h2>Logged in: {{ checkLogIn() }}</h2>
        <div>
            <form v-on:submit.prevent="loginFunction">
                <label>User:
                <input type='text' v-model="login.user"/>
                </label>
                <br/>
                <label>Password: 
                <input type='password' v-model="login.password"/>
                </label>
                <br/>
                <input type='submit' value='Login' class="light-blue darken-4 waves-effect waves-light btn"/>
            </form>
      </div>
  </div>
</template>

<script>
import store from '../store'

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
            // this.$router.push('/login')
            localStorage.setItem('token', response.body.data.token);
            store.commit('changeLoggedIn', true)
            this.$router.push("/balances");
          },
          err => {
            console.log("An error occured", err);
          }
        );
    },
    checkLogIn: function() {
        if (store.state.loggedIn) {
            return 'true';
        }
        return 'false';
    },
  }
};
</script>
