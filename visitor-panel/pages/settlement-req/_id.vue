<template>
  <div class="panel-table transaction-table">
    <div class="box-header">
      <h3>لیست درخواست تسویه</h3>
    </div>
    <section class="box-content custom-scrollbar" id="settlement-table">
      <header class="table-row table-header">
        <span class="course-owner">قیمت (تومان)</span>
        <span class="date">تاریخ</span>
        <span class="time">ساعت</span>
        <span>وضعیت</span>
      </header>
      <div class="table-row" v-for="settlement in settlements" :key="settlement.id">
        <span class="persian-number">{{ settlement.requestAmount }}</span>
        <span class="persian-number date">{{
          new Date(settlement.createDate).toLocaleDateString("fa-IR")
        }}</span>
        <span class="persian-number time">{{
          new Date(settlement.createDate).toLocaleTimeString("fa-IR")
        }}</span>
        <span class="green" v-if="settlement.status == 'Payed'">واریز شده</span>
        <span class="yellow" v-else-if="settlement.status == 'AwaitingApproval'"
          >در انتظار تایید</span
        >
        <span class="yellow" v-else-if="settlement.status == 'InPayList'"
          >در انتظار پرداخت</span
        >
        <span class="yellow" v-else-if="settlement.status == 'NotAccepted'">رد شده</span>
      </div>
      <footer class="table-footer">
        <hr />
        <a href="" type="button" @click.prevent="seeAll"> مشاهده همه درخواست ها </a>
      </footer>
    </section>
  </div>
</template>
<script>
export default {
  layout: "dashboardLay",
  head() {
    return {
      title: "لیست درخواست تسویه",
    };
  },
  data() {
    return {
      settlements: "",
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
        await this.getSettlements();
      } else {
        // redirect to main page
      }
    }
  },
  methods: {
    seeAll() {
      const table = document.getElementById("settlement-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer").style.display = "none");
    },
    async getSettlements() {
      const settlements = await this.$axios.get(
        `/api/Visitor/VisitorSettlementRequest/GetSettlementRequests/${this.$route.params.id}`
      );
      if (settlements.data.statusCode == 200 && settlements.data.message == "Success") {
        this.settlements = settlements.data.data;
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
