<template>
  <div>
      <h1>Embed codes</h1>

      <div v-if="loading">
        <div class="preloader">
          <div class="loader"></div>
        </div>
      </div>

      <div v-if="qrCode">
        <img :src="qrCode" />
        <br/>
        <b>Image Tag:</b> &lt;img src="{{ qrCode }}" /&gt;
      </div>
  </div>
</template>

<script>
export default {
  name: "Qr",
  data() {
    return {
      qrCode: "",
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
            this.qrCode = response.body.details.qr_code;
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
