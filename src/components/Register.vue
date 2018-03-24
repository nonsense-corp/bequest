<template>
  <div>
      <h1>Register</h1>
      <div>
        <form v-on:submit.prevent="registerUser">
            <label>First Name:
            <input type='text' v-model="register.first_name"/>
            </label>
            <br/>
            <label>Last Name: 
            <input type='text' v-model="register.last_name"/>
            </label>
            <br/>
            <label>Email address:
            <input type='text' v-model="register.email"/>
            </label>
            <br/>
            <label>Password:
            <input type='password' v-model="register.password"/>
            </label>
            <br/>
            <input type='submit' value='Register' class="light-blue darken-4 waves-effect waves-light btn"/>
        </form>
      </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      register: {
        first_name: "",
        last_name: "",
        email: "",
        password: ""
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
          "https://api.rehive.com/3/auth/register/",
          JSON.stringify(payload)
        )
        .then(
          response => {
            this.$router.push("/login");
          },
          err => {
            console.log("An error occured", err);
          }
        );
    }
  }
};
</script>
