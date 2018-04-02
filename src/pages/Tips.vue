<template>
  <div class="content">

      <div v-if="loading">
        <div class="preloader">
          <div class="loader"></div>
        </div>
      </div>

      <div class="tips__table">
        <div class="tips__row" v-for="(transaction, key, index) in transactions" :key="index">
          <div class="tips__column">{{transaction.currency.code}}</div>
          <div class="tips__column">{{ transaction.amount / (10 ** transaction.currency.divisibility)}}</div>
          <div class="tips__column tips__column--hash">
            <template v-if="transaction.metadata && transaction.metadata.hash">
              <a class="tips__table-hash"
                :href="`https://bitcoin-node-testnet.rehive.io/tx/${transaction.metadata.hash}`">{{transaction.metadata.hash}}</a>
            </template>
          </div>
          <div class="tips__column" style="align-self:center">
            <div class="tips__button" :class="'tips__button--'+transaction.status">
               {{transaction.status}}
            </div> 
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import globals from "../globals";

export default {
  name: "Tips",
  data() {
    return {
        transactions: [],
        loading: true
    };
  },
  created() {
    this.getTransactions();
  },
  methods: {
    getTransactions: function() {
      const token = "Token " + localStorage.getItem("token")
      this.$http
        .get(globals.REHIVE_API.BASE_URL + globals.REHIVE_API.URLS.TRANSACTIONS, {headers: {"Authorization": token}})
        .then(
          response => {
            console.log("response is", response)
            this.transactions = response.body.data.results;
            this.loading = false;
          },
          err => {
            console.log("An error occured", err);
            this.loading = false;
          }
        );
    }
  }
};
</script>

<style scoped>
  .content {
    grid-template-columns: 1fr;
  }
</style>
