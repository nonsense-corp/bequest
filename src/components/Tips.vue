<template>
  <div>
      <h1>Tips</h1>

      <div v-for="transaction in transactions">
          <a :href="`https://bitcoin-node-testnet.rehive.io/tx/${transaction.metadata.hash}`">{{transaction.metadata.hash}} {{transaction.metadata.type}}</a>
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
          },
          err => {
            console.log("An error occured", err);
          }
        );
    }
  }
};
</script>
