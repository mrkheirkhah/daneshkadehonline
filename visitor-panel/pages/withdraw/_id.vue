<template>
  <div class="panel-visitor-content-item withdraw-wallet">
    <header>
      <p class="section-header">برداشت از کیف پول</p>
    </header>
    <div class="section-title">
      <svg
        class="dashed-line"
        width="100%"
        height="15"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          stroke-dasharray="10, 5"
          x1="0"
          y1="10"
          x2="100%"
          y2="10"
          style="stroke: rgb(112, 112, 112)"
        ></line>
      </svg>
      <p class="section-title-text">برداشت</p>
    </div>
    <form action="#">
      <div class="form-row">
        <div class="form-row-col">
          <input
            type="number"
            class="form-input"
            v-model="withdrawReq"
            placeholder="به تومان وارد شود"
          />
          <span class="hint-text persian-number"
            >{{ priceUnderSuggestionPrice }} تومان</span
          >
        </div>
      </div>
      <div class="hint-text">
        کل مبلغ کیف پول
        <span class="walletbalane persian-number">{{ wallet.toLocaleString() }}</span>
        تومان &nbsp;
        <a href="" type="button" class="withdraw-total" @click.prevent="withdrawAll"
          >برداشت کل مبلغ!</a
        >
      </div>
      <button class="form-btn orange-color" @click.prevent="witdraw">برداشت</button>
    </form>
  </div>
</template>
<script>
export default {
  layout: "dashboardLay",
  data() {
    return {
      wallet: "",
      withdrawReq: "",
      priceUnderSuggestionPrice: 0,
    };
  },
  async mounted() {
    if (this.$route.params.id == undefined) {
      // this.$router.push("/add-visitor");
    } else {
      const isVisitorExist = await this.$axios.get(
        `/api/Visitor/VisitorHome/CheckAnyPageLink/${this.$route.params.id}`
      );
      if (
        isVisitorExist.data.statusCode == 200 &&
        isVisitorExist.data.message == "Success"
      ) {
        await this.getWallet();
      } else {
        // redirect to main page
      }
    }
  },
  methods: {
    async getWallet() {
      const walletResp = await this.$axios.get(
        `/api/Visitor/VisitorHome/GetVisitorWallet/${this.$route.params.id}`
      );
      if (walletResp.data.statusCode == 200 && walletResp.data.message == "Success") {
        this.wallet = walletResp.data.data;
      }
    },
    async witdraw() {
      if (this.withdrawReq <= this.wallet) {
        const withdrawResp = await this.$axios.post(
          `/api/Visitor/VisitorSettlementRequest/AddSettlementRequest?pageLink=${this.$route.params.id}&requestAmount=${this.withdrawReq}`
        );
        if (
          withdrawResp.data.statusCode == 200 &&
          withdrawResp.data.message == "Success"
        ) {
          this.$swal({
            text: "ثبت شد!منتظر تایید ادمین باشید",
            icon: "success",
            showCloseButton: true,
            confirmButtonText: "تایید",
          });
          this.withdrawReq = "";
        }
      } else {
        this.$swal({
          text: "مبلغ درخواستی بیشتر از موجودی است",
          icon: "error",
          showCloseButton: true,
          confirmButtonText: "ویرایش",
        });
      }
    },
    withdrawAll() {
      this.withdrawReq = this.wallet;
    },
  },
  watch: {
    withdrawReq: {
      handler() {
        this.priceUnderSuggestionPrice = Number(this.withdrawReq).toLocaleString();
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
