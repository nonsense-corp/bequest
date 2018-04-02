<template>
  <div>
    <div class="currency-wrapper">
        <h2>Pick your currency to withdraw</h2>
        <div>
            <router-link to="/withdraw/bitcoin" tag="div" class="currency-select"
                v-bind:class="{'currency-select--active' : !$route.params.currency || $route.params.currency == 'bitcoin'}"
            >
                XBT
            </router-link>
            <router-link to="/withdraw/lumens" tag="div" class="currency-select"
                v-bind:class="{'currency-select--active' : $route.params.currency == 'lumens'}"
            >
                XLM
            </router-link>
        </div>
    </div>

    <!-- START Bitcoin -->
      <div v-if="!$route.params.currency || $route.params.currency == 'bitcoin'">
        <div v-if="!complete_bitcoin" class="form-wrapper">
            <form v-on:submit.prevent="withdrawBitcoin">
                <h2>Enter an amount in Bitcoin</h2>
                <div class="group">      
                    <input type='number' required v-model="withdraw_bitcoin.amount">
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>AMOUNT</label>
                </div>
                <h2>Enter a Bitcoin Address</h2>
                <div class="group">      
                    <input type='text' required v-model="withdraw_bitcoin.to_reference">
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>ADDRESS</label>
                </div>
                <div class="button-wrapper">
                    <button type="submit" class="btn btn--secondary">
                        WITHDRAW
                        <i class="fas fa-exchange-alt"></i>
                    </button>
                </div>
            </form>
        </div>
        <div v-if="complete_bitcoin">
            Successful Withdrawel
        </div>
        <div v-if="bitcoin_error">
            An error occured: {{bitcoin_error_msg}}
        </div>
      </div>
    <!-- END Bitcoin -->

    <!-- START Lumens -->
    <div v-if="$route.params.currency == 'lumens'">
        <div v-if="!complete_bitcoin" class="form-wrapper">
            <form v-on:submit.prevent="withdrawBitcoin">
                <h2>Enter an amount in Lumens</h2>
                <div class="group">      
                    <input type='number' required v-model="withdraw_bitcoin.amount">
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>AMOUNT</label>
                </div>
                <h2>Enter a Lumens Address</h2>
                <div class="group">      
                    <input type='text' required v-model="withdraw_bitcoin.to_reference">
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>ADDRESS</label>
                </div>
                <div class="button-wrapper">
                    <button type="submit" class="btn btn--secondary">
                        WITHDRAW
                        <i class="fas fa-exchange-alt"></i>
                    </button>
                </div>
            </form>
        </div>
        <div v-if="complete_bitcoin">
            Successful Withdrawel
        </div>
        <div v-if="bitcoin_error">
            An error occured: {{lumens_error_msg}}
        </div>
    </div>
  </div>
  <!-- END Lumens -->
  
</template>

<script>
import globals from "../globals";

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
        bitcoin_error_msg: "",
        withdraw_lumens: {
            to_reference: "",
            amount: "",
        },
        complete_lumens: false,
        lumens_error: false,
        lumens_error_msg: "",
    };
  },
  methods: {
    withdrawBitcoin: function() {
      this.$http.headers.common.Authorization = `Token ${localStorage.getItem(
        "token"
      )}`;
      const token = "Token " + localStorage.getItem("token")
      this.$http
        .post(
            globals.BITCOIN_API.BASE_URL + globals.BITCOIN_API.URLS.WALLET_SEND, 
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
    },
    widthdrawLumens: function () {
        // TODO: Lumen withdraw logic here.
    },
  }
};
</script>

<style scoped>
    .content {
        grid-template-columns: 1fr;        
    }

    h2 {
        margin-top: 0;
        font-weight: 500;
        letter-spacing: 0.1rem;
        font-size: 24px;
    }

    .currency-wrapper {
        border-bottom: 1px solid rgba(117, 185, 190, 0.2);
        margin-top: 30px;
        padding-bottom: 70px;
        padding-left: 30px;
    }

    .currency-select {
        border: 2px solid #202E37;
        color: #202E37;
        cursor: pointer;
        display: inline-block;
        font-size: 36px;
        font-weight: 500;
        line-height: 130px;
        letter-spacing: 0.1rem;
        height: 120px;
        margin-right: 15px;
        text-align: center;
        text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
        width: 120px;
    }

    .currency-select--active {
        background-color: #202E37;
        color: #fff;
    }

    .form-wrapper {
        display: grid;
        justify-content: left;
        margin-top: 30px;
        padding-left: 30px;
    }

    .button-wrapper {
        display: flex;
        justify-content: flex-end;
    }
</style>