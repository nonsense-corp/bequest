<template>
  <div>
      <h1>Login</h1>
        <div>
            <form v-on:submit.prevent="loginFunction" class="mui-form">
                <label>
                  User:
                  <div class="mui-textfield">
                    <input type='text' v-model="login.user"/>
                  </div>
                </label>
                <label>
                  Password: 
                  <div class="mui-textfield">
                    <input type='password' v-model="login.password"/>
                  </div>
                </label>
                <br/>
                <input type='submit' value='Login' class="mui-btn mui-btn--raised mui-btn--primary"/>
            </form>
      </div>
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
            // this.$router.push('/login')
            localStorage.setItem("token", response.body.data.token);
            store.commit("changeLoggedIn", true);
            store.commit("setUserDetails", { email: this.login.user });
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
