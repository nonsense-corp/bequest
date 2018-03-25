<template>
  <div>
      <h1>Withdraw Bitcoin</h1>
        <div>
            <form v-on:submit.prevent="sendBitcoin" class="mui-form">
                <label>
                    Bitcoin Address:
                    <div class="mui-textfield">
                        <input type='text' v-model="withdraw_bitcoin.to_reference"/>
                    </div>
                </label>
                <br/>
                <label>Amount: 
                    <div class="mui-textfield">
                        <input type='number' v-model="withdraw_bitcoin.amount"/>
                    </div>
                </label>
                <br/>
                <input type='submit' value='Withdraw' class="mui-btn mui-btn--raised"/>
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
