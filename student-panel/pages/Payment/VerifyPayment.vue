<template>
  <div class="successful-box">
    <div class="container-fluid px-md-3 px-xl-5 container-lg">
      <div class="row">
        <div class="col" v-if="status == true">
          <h1>پرداخت موفقیت آمیز</h1>
          <ul class="successful-list">
            <li class="persian-number">
              <span>مبلغ پرداخت شده:</span>
              <span>
                <span v-text="factor.amount"></span>
                <span class="currency">تومان</span>
              </span>
            </li>
            <li class="persian-number">
              <span>ساعت:</span>
              <span v-text="factor.amount"></span>
            </li>
            <li class="persian-number">
              <span>تاریخ:</span>
              <span v-text="factor.amount">1400/04/24</span>
            </li>
            <li class="persian-number">
              <span>شماره کارت:</span>
              <span v-text="factor.hashedCardNumber"></span>
            </li>
            <li class="persian-number">
              <span>خانم/آقای:</span>
              <span v-text="factor.hashedCardNumber"></span>
            </li>
            <li class="persian-number">
              <span>شماره پیگیری:</span>
              <span v-text="factor.traceNo"></span>
            </li>
          </ul>
        </div>
        <div class="col" v-if="status == false" style="height: 50vh">
          <h1 class="red-text">خرید ناموفق</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: null,
      factor: null,
      test: 120000,
    };
  },
  layout: "mainPages",
  middleware: "mainPage",
  mounted() {
    // console.log(this.$route.query);
    this.checkdata();
  },
  methods: {
    async checkdata() {
      const datac = await this.$axios.post(
        "/api/Payment/VerifyPaymentOrder",
        {
          mid: this.$route.query["MID"],
          refNum: this.$route.query["RefNum"],
          resNum: this.$route.query["ResNum"],
          state: this.$route.query["State"],
          traceNo: this.$route.query["TraceNo"],
          amount: Number(this.$route.query["Amount"]),
          rrn: this.$route.query["Rrn"],
          securePan: this.$route.query["SecurePan"],
          status: Number(this.$route.query["Status"]),
          token: this.$route.query["Token"],
          hashedCardNumber: this.$route.query["HashedCardNumber"],
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (datac.data.isSuccess == true) {
        this.status = true;
        this.factor = datac.data;
      } else if (datac.data.isSuccess == false) {
        this.status = false;
        this.factor = null;
      }
      console.log(datac);
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/pages/cart.scss";
@import "@/assets/styles/pages/cart-suc.scss";
@import "@/assets/swal-style.scss";
.red-text {
  color: #e13535 !important;
}
</style>
