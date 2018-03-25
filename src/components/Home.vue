<template>
  <div class="hello">
    <router-link to="/login" class="mui-btn mui-btn--primary">Log in</router-link>
    <router-link to="/register" class="mui-btn mui-btn--primary">Register</router-link>
  </div>
</template>

<script>
import Login from './Login.vue'
import Register from './Register.vue'
import Qr from './Qr.vue'
export default {
  name: 'Home',
  props: {
    msg: String
  },
  data () {
    return {

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
