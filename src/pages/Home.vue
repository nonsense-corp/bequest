<template>
  <div class="hello">
    <router-link to="/login" class="mui-btn mui-btn--primary">Log in</router-link> 
    <br/>
    <router-link to="/register" class="mui-btn mui-btn--primary">Register</router-link>
  </div>
</template>

<script>
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

</style>
