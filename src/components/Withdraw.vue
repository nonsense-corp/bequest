<template>
  <div>
      <h1>Withdraw Bitcoin</h1>
        <div>
            <form v-on:submit.prevent="sendBitcoin">
                <label>Bitcoin Address:
                <input type='text' v-model="withdraw_bitcoin.to_reference"/>
                </label>
                <br/>
                <label>Amount: 
                <input type='number' v-model="withdraw_bitcoin.amount"/>
                </label>
                <br/>
                <input type='submit' value='Withdraw' class="light-blue darken-4 waves-effect waves-light btn"/>
            </form>
        </div>
  </div>
</template>

<script>
export default {
  name: "Withdraw",
  data() {
    return {
        withdraw_bitcoin: {
            to_reference: "",
            amount: "",
        }
    };
  },
  methods: {
    sendBitcoin: function() {
      this.$http.headers.common.Authorization = `Token ${localStorage.getItem(
        "token"
      )}`;
      const token = "Token " + localStorage.getItem("token")
      this.$http
        .post(
            "https://bitcoin-testnet.services.rehive.io/api/1/wallet/send/", 
            JSON.stringify(this.withdraw_bitcoin),
            {headers: {"Authorization": token}}
        )
        .then(
          response => {
            // this.$router.push('/login')
            console.log("response is", response);
            this.qrCode = response.body.details.qr_code;
          },
          err => {
            console.log("An error occured", err);
          }
        );
    }
  }
};
</script>
