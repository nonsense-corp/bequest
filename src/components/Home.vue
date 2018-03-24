<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <a v-on:click="selected = 'qr'">Qr code</a>

    <Register v-if="selected == 'register'"/>
    <Login v-if="selected == 'login'"/>
    <Qr v-if="selected == 'qr'"/>
  </div>
</template>

<script>
import Login from './Login.vue'
import Register from './Register.vue'
import Qr from './Qr.vue'
export default {
  name: 'Home',
  components: {
    Login,
    Qr,
    Register,
  },
  props: {
    msg: String
  },
  data () {
    return {
      selected: 'register',
      email: '',
      password: '',
      login: false,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
