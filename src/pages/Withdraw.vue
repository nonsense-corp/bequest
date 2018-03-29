<template>
  <div>
      <h1>Withdraw Bitcoin</h1>
        <div v-if="!complete_bitcoin">
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
        <div v-if="complete_bitcoin">
            Successful Withdrawel
        </div>
        <div v-if="bitcoin_error">
            An error occured: {{bitcoin_error_msg}}
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
        },
        complete_bitcoin: false,
        bitcoin_error: false,
        bitcoin_error_msg: ""
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
            this.complete_bitcoin = true;
          },
          err => {
            console.log("An error occured", err);
            this.bitcoin_error = err;
            this.bitcoin_error = true;
          }
        );
    }
  }
};
</script>
