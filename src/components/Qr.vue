<template>
  <div>
      <h1>Qr code yo</h1>

      <div v-if="qrCode">
        <img :src="qrCode" />
        <br/>
        {{ qrCode }}
      </div>
  </div>
</template>

<script>
export default {
  name: "Qr",
  data() {
    return {
      qrCode: '',
    };
  },
  created() {
    console.log('hello');
    this.getQrCode();
  },
  methods: {
    getQrCode: function() {
      this.$http.headers.common.Authorization = `Token ${localStorage.getItem(
        "token"
      )}`;
      const token = "Token " + localStorage.getItem("token")
      this.$http
        .get("https://bitcoin-testnet.services.rehive.io/api/1/user/", {headers: {"Authorization": token}})
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
