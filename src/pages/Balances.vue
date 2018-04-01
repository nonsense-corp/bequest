<template>
  <div class="content">
      <template v-if="loading">
        <div class="preloader">
          <div class="loader"></div>
        </div>
      </template>

      <div v-for="(currency, key, index) in currencies" :key="index">
        <div class="balance">
          <h2 class="balance__header">
            {{currency.currency.code}} - {{currency.currency.symbol}}
          </h2>
          <h3 class="balance__amount">
            {{ currency.available_balance / (10 ** currency.currency.divisibility)}}
          </h3>
        </div>
      </div>
  </div>
</template>

<script>

import store from "../store";

export default {
  name: "Qr",
  data() {
    return {
      currencies: [],
      loading: true
    };
  },
  created() {
    this.getAccounts();
  },
  methods: {
    getAccounts: function() {
      this.$http.headers.common.Authorization = `Token ${localStorage.getItem(
        "token"
      )}`;
      const token = "Token " + localStorage.getItem("token")
      this.$http
        .get("https://api.rehive.com/3/accounts/", {headers: {"Authorization": token}})
        .then(
          response => {
            // this.$router.push('/login')
            console.log("response is", response);
            this.currencies = response.body.data.results[0].currencies;
            this.loading = false;
          },
          err => {
            console.log("An error occured", err);
            // Unauthorized.
            if (err.status == 401) {
              store.commit('logout');
              this.$router.push("/login");
            }
            this.loading = false;
          }
        );
    }
  }
};
</script>

<style scoped>
  .content {
    grid-gap: 20px;
  }
  .preloader {
    grid-column: span 2;
  }
  .balance__header {
    background-color: #202E37;
    color: #E2F0F1;
    display: grid;
    align-items: center;
    font-weight: 300;
    font-size: 48px;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    text-align: center;
    line-height: 1;
    margin: 0;
    height: 90px;
  }
  .balance__amount {
    align-items: center;
    justify-items: center;
    background-color: #EAF5F5;
    color: #000;
    display: grid;
    height: 170px;
    line-height: 1;
    margin: 0;
    font-weight: 600;
    font-size: 64px;
    letter-spacing: 0.05rem;
  }
</style>
