<template>
  <div class='content'>
      <div v-if="loading">
        <div class="preloader">
          <div class="loader"></div>
        </div>
      </div>

      <div class="embed" v-if="!loading">  
        <h2>Bitcoin</h2>
        <div class="embed__details" v-if="qrCode_Bitcoin">
          <img :src="qrCode_Bitcoin" />
          <div class="embed__box">
            <p>
              <b>Address:</b> {{ address_Bitcoin }}
            </p>
            <br>
            <div class="image_embed">
              &lt;img src="{{ qrCode_Bitcoin }}" /&gt;
            </div>
          </div>
        </div>
      </div>
      <div class="embed" v-if="!loading">  
        <h2>Stellar</h2>
        <div class="embed__details" v-if="qrCode_Stellar">
          <img :src="qrCode_Stellar" />
          <div class="embed__box">
            <p>
              <b>Address:</b> {{ address_Stellar }}
            </p>
            <p>
              <b>Memo</b>: {{memo_Stellar}}
            </p>
            <br>
            <div class="image_embed">
             &lt;img src="{{ qrCode_Stellar }}" /&gt;
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import globals from "../globals";

export default {
  name: "Qr",
  data() {
    return {
      qrCode_Bitcoin: "",
      qrCode_Stellar: "",
      loading: true
    };
  },
  created() {
    console.log("hello");
    this.getQrCode();
  },
  methods: {
    getQrCode: function() {
      this.$http.headers.common.Authorization = `Token ${localStorage.getItem(
        "token"
      )}`;
      const token = "Token " + localStorage.getItem("token");
      this.$http
        .get(globals.BITCOIN_API.BASE_URL + globals.BITCOIN_API.URLS.USER, {
          headers: { Authorization: token }
        })
        .then(
          response => {
            this.address_Bitcoin = response.body.account_id;
            this.qrCode_Bitcoin = response.body.details.qr_code;
            this.loading = false;
          },
          err => {
            console.log("An error occured", err);
            this.loading = false;
          }
        );
      this.$http
        .get(globals.STELLAR_API.BASE_URL + globals.STELLAR_API.URLS.USER, {
          headers: { Authorization: token }
        })
        .then(
          response => {
            this.address_Stellar = response.body.details.address;
            this.memo_Stellar = response.body.details.memo;
            this.qrCode_Stellar = "https://chart.googleapis.com/chart?choe=UTF-8&chs=300&chl=stellar%3A" + this.address_Stellar + "&cht=qr"
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
    grid-gap: 20px;
    grid-template-columns: 1fr;
  }

  .embed {
    grid-column: span 2;
    background-color: #202E37;
    color: #E2F0F1;
    display: grid;
    align-items: center;
    text-align: center;
    line-height: 1.4;
    margin: 0;
    font-weight: 300;
    text-transform: uppercase;
  }

  h2 {
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-weight: 100;
    font-size: 48px;
    margin: 0;
  }

  .embed__details {
    background-color: #EAF5F5;
    color: #000;
    width: 100%;
    line-height: 1;
    margin: 0;
    font-weight: 300;
    font-size: 16px;
    letter-spacing: 0.05rem;
    height: 315px;
    text-align: left;
  }

  .preloader {
    grid-column: span 2;
  }

  .embed__box {
    float: left;
    text-transform: none;
    width: 65%;
    overflow-wrap: break-word;
    word-wrap: break-word;
    margin-left: 30px;
    margin-top: 30px;
  }

  .image_embed {
    background-color: #F7FCFC;
    font-weight: 600;
    padding: 15px;
    margin: 0 auto;
  }

  img {
    display: block;
    float: left;
    margin-left: 15px;
  }
</style>
