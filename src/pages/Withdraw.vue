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
                    <input type='number' step="any" required v-model="withdraw_bitcoin.amount">
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
            <form v-on:submit.prevent="widthdrawLumens">
                <h2>Enter an amount in Lumens</h2>
                <div class="group">      
                    <input type='number' step="any"required v-model="withdraw_lumens.amount">
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>AMOUNT</label>
                </div>
                <h2>Enter a Stellar Address</h2>
                <div class="group">      
                    <input type='text' required v-model="withdraw_lumens.reference">
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>ADDRESS</label>
                </div>
                <div class="group">      
                    <input type='text' required v-model="withdraw_lumens.memo">
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>MEMO</label>
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
        <div v-if="complete_lumens">
            Successful Withdrawel
        </div>
        <div v-if="lumens_error">
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
            reference: "",
            amount: "",
            memo: "",
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
        this.$http.headers.common.Authorization = `Token ${localStorage.getItem(
            "token"
        )}`;
        const token = "Token " + localStorage.getItem("token")
        this.$http
        .post(
            globals.STELLAR_API.BASE_URL + globals.STELLAR_API.URLS.WALLET_SEND, 
            JSON.stringify(this.withdraw_lumens),
            {headers: {"Authorization": token}}
        )
        .then(
            response => {
            console.log("response is", response);
            this.complete_lumens = true;
            },
            err => {
            console.log("An error occured", err);
            this.lumens_error = err;
            this.lumens_error = true;
            }
        );
    },
  }
};
</script>

<style scoped>
    .content {
        grid-template-columns: 1fr;
        padding-right: 0;
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
        /* border: 2px solid #202E37; */
        box-sizing: border-box;
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
        box-shadow: inset 0 0 0 2px  #202E37;
        position: relative;
        vertical-align: middle;
    }

    .currency-select::before,
    .currency-select::after {
        box-sizing: inherit;
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        transform-origin: center;
    }

    .currency-select::before {
        border-top: 2px solid #75B9BE;
        border-bottom: 2px solid #75B9BE;
        transform: scale3d(0,1,1);
    }

    .currency-select::after {
        border-left: 2px solid #75B9BE;
        border-right: 2px solid #75B9BE;
        transform: scale3d(1,0,1);
    }

    .currency-select:hover {
        color: #75B9BE;
    }

    .currency-select:hover::before,
    .currency-select:hover::after {
        transform: scale3d(1,1,1);
        transition: transform 0.3s;
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