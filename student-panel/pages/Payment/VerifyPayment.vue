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
        <div class="col" v-if="status == false">
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
    console.log(this.$route.query);
    this.checkdata()
  },
  methods: {
    async checkdata() {
      const datac = await this.$axios.get(`/api/Payment/VerifyPaymentOrder?MID=${this.$route.query['MID']}&RefNum=${this.$route.query['RefNum']}&ResNum=${this.$route.query['ResNum']}&State=${this.$route.query['State']}&TraceNo=${this.$route.query['TraceNo']}&Amount=${this.$route.query['Amount']}&Rrn=${this.$route.query['Rrn']}&SecurePan=${this.$route.query['SecurePan']}&Status=${this.$route.query['Status']}&Token=${this.$route.query['Token']}&HashedCardNumber=${this.$route.query['HashedCardNumber']}`, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        }
      });
      if (datac.data.isSuccess == true) {
        this.status = true;
        this.factor = datac.data;
      } else if (datac.data.isSuccess == false) {
        this.status = false;
        this.factor = null;
      }
      console.log(datac);
    }
  }
}
</script>
<style lang="scss">
.red-text {
  color: #e13535 !important;
}
@import "@/assets/swal-style.scss";
</style>
