<template>
  <div>
      <h1>Qr code yo</h1>

      <div v-for="currency in currencies">
        {{currency.currency.symbol}}{{ currency.available_balance / (10 ** currency.currency.divisibility)}}
      </div>
  </div>
</template>

<script>
export default {
  name: "Qr",
  data() {
    return {
      currencies: [],
    };
  },
  created() {
    console.log('hello');
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
          },
          err => {
            console.log("An error occured", err);
          }
        );
    }
  }
};
</script>
