<template>
  <div class="login__content">
      <div>
        <h1 class="logo login__logo">Bistow</h1>
        <form v-on:submit.prevent="registerUser">
            <div class="group">      
              <input type="text" 
                required v-model="register.first_name"
                v-on:blur="$v.register.first_name.$touch"
                v-bind:class="{error: $v.register.first_name.$error}"
              >
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>FIRST NAME</label>
            </div>

            <div class="group">      
              <input type="text" 
                required v-model="register.last_name"
                v-on:blur="$v.register.last_name.$touch"
                v-bind:class="{error: $v.register.last_name.$error}"
              >
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>LAST NAME</label>
            </div>

            <div class="group">      
              <input type="text" 
                required v-model="register.email"
                v-on:blur="$v.register.email.$touch"
                v-bind:class="{error: $v.register.email.$error}"
              >
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>EMAIL</label>
            </div>

            <div class="group">      
              <input type="text" 
                required v-model="stellar.username"
                v-on:blur="$v.stellar.username.$touch"
                v-bind:class="{error: $v.stellar.username.$error}"
              >
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>USERNAME</label>
            </div>       

            <div class="group">      
              <input type="password" 
                required v-model="register.password"
                v-on:blur="$v.register.password.$touch"
                v-bind:class="{error: $v.register.password.$error}"
              >
              <span class="highlight"></span>
              <span class="bar"></span>
              <label>PASSWORD</label>
            </div>

            <div class="login__btn-wrapper">
              <router-link to="/login" class="btn" tag="button">
                Login
                <i class="fas fa-edit"></i>
              </router-link>
              <button type="submit" class="btn btn--primary" :disabled="loading || $v.$invalid">
                Register
                <i class="fas fa-arrow-circle-right"></i>
              </button>
            </div>
        </form>
      </div>
  </div>
</template>

<script>
import store from "../store";
import globals from "../globals";
import { required, email } from 'vuelidate/lib/validators'

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
      },
      loading: false
    };
  },
  methods: {
    registerUser: function(event) {
      event.preventDefault();
      console.log("register is", this.register);
      this.loading = true;
      const payload = {
        first_name: this.register.first_name,
        last_name: this.register.last_name,
        email: this.register.email,
        password1: this.register.password,
        password2: this.register.password,
        company: "bistow"
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
                    this.loading = false;
                    this.$router.push("/balances");
                  },
                  err => {
                    console.log("An error occured", err);
                    this.$swal({
                      type: 'error',
                      title: 'Oops...',
                      text: err.body.message,
                    });
                    this.loading = false;
                  }
                );
          },
          err => {
            console.log("An error occured", err);
            this.$swal({
              type: 'error',
              title: 'Oops...',
              text: err.body.message,
            });
            this.loading = false;
          }
        )
    }
  },
  validations: {
    register: {
      first_name: {
        required
      },
      last_name: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required
      }
    },
    stellar: {
      username: {
        required
      }
    }
  }
};
</script>
