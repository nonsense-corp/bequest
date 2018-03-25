<template>
  <div>
      <h1>Tips</h1>

      <div v-if="loading">
        <div class="preloader">
          <div class="loader"></div>
        </div>
      </div>

      <div v-for="transaction in transactions">
          <template v-if="transaction.metadata && transaction.metadata.hash">
            <a :href="`https://bitcoin-node-testnet.rehive.io/tx/${transaction.metadata.hash}`">{{transaction.metadata.hash}} {{transaction.metadata.type}}</a>
          </template>
          {{transaction.currency.symbol}}{{ transaction.balance / (10 ** transaction.currency.divisibility)}}
      </div>
  </div>
</template>

<script>
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
        .get("https://api.rehive.com/3/transactions/", {headers: {"Authorization": token}})
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
