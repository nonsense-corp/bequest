<template>
  <div>
      <h1>Register</h1>
      <div>
        <form v-on:submit.prevent="registerUser" class="mui-form">
            <label>
              First Name:
              <div class="mui-textfield">
                <input type='text' v-model="register.first_name"/>
              </div>
            </label>

            <label>
              Last Name: 
              <div class="mui-textfield">
                <input type='text' v-model="register.last_name"/>
              </div>
            </label>

            <label>
              Email address:
              <div class="mui-textfield">
                <input type='text' v-model="register.email"/>
              </div>
            </label>

            <label>
              Username:
              <div class="mui-textfield">
                <input type='text' v-model="stellar.username"/>
              </div>
            </label>

            <label>
              Password:
              <div class="mui-textfield">
                <input type='password' v-model="register.password"/>
              </div>
            </label>
            <br/>
            <input type='submit' value='Register' class="mui-btn mui-btn--raised mui-btn--primary"/>
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
