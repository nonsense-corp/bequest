<template>
  <div>
      <h1>Embed codes</h1>

      <div v-if="loading">
        <div class="preloader">
          <div class="loader"></div>
        </div>
      </div>

      <div v-if="!loading">  
        <h2>Bitcoin</h2>
        <div v-if="qrCode_Bitcoin">
          <img :src="qrCode_Bitcoin" />
          <br/>
          <b>Image Tag:</b> &lt;img src="{{ qrCode_Bitcoin }}" /&gt;
        </div>
      </div>
      <div v-if="!loading">  
        <h2>Stellar</h2>
        <div v-if="qrCode_Stellar">
          <img :src="qrCode_Stellar" />
          <br/>
          <b>Image Tag:</b> &lt;img src="{{ qrCode_Stellar }}" /&gt;
          <br/>
          <b>Memo: {{memo_Stellar}}</b> 
        </div>
      </div>
  </div>
</template>

<script>
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
        .get("https://bitcoin-testnet.services.rehive.io/api/1/user/", {
          headers: { Authorization: token }
        })
        .then(
          response => {
            // this.$router.push('/login')
            console.log("response is", response);
            this.qrCode_Bitcoin = response.body.details.qr_code;
            this.loading = false;
          },
          err => {
            console.log("An error occured", err);
            this.loading = false;
          }
        );
      this.$http
        .get("https://stellar.services.rehive.io/api/1/user/account/", {
          headers: { Authorization: token }
        })
        .then(
          response => {
            // this.$router.push('/login')
            console.log("response is", response);
            // this.qrCode_Stellar = response.body.details.qr_code;
            this.address_Stellar = response.body.details.address;
            this.memo_Stellar = response.body.details.memo;
            this.qrCode_Stellar = "https://chart.googleapis.com/chart?choe=UTF-8&chs=300&chl=bitcoin%3A" + this.address_Stellar + "&cht=qr"
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
