<template>
  <div>
      <!-- Logo -->
      <h1 class="logo">Bequest</h1>

      <!-- Avatar -->
      <div class="sidebar__profile">
        <div class="sidebar__profile--img" 
          v-bind:style="{ backgroundImage: `url(${profileUrl})` }"
          aria-label="Profile Picture" title="Profile picture">
        </div>

        <p class="sidebar__profile-name">
          {{ full_name }}
        </p>
      </div>
      <!-- Links -->
      <router-link to="/balances" class="grid__sidebar-link">Balances</router-link>
      <router-link to="/tips" class="grid__sidebar-link">Tips</router-link>
      <router-link to="/embeds" class="grid__sidebar-link">Embeds</router-link>
      <router-link to="/withdraw" class="grid__sidebar-link">Withdraw</router-link>
  </div>
</template>

<script>
import store from "../store";
import defaultImage from "@/assets/avatar.svg";

export default {
  name: "DashboardMenu",
  data() {
    return {
      profileUrl: defaultImage,
    }
  },
  computed: {
    full_name () {
      return this.$store.state.user.first_name + ' ' + this.$store.state.user.last_name
    }
  }
}
</script>
