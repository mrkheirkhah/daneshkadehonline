<template>
  <div class="panel-table transaction-table">
    <div class="box-header">
      <h3>تعداد تراکنش ها</h3>
    </div>
    <section class="box-content custom-scrollbar" id="transactions-table">
      <header class="table-row table-header">
        <span class="course-owner">نام و نام خانوادگی</span>
        <span class="date">تاریخ</span>
        <span class="time">ساعت</span>
        <span>قیمت (تومان)</span>
      </header>
      <div
        class="table-row"
        v-for="transaction in transactions"
        :key="transactions.indexOf(transaction)"
      >
        <span class="course-owner">{{ transaction.teacherName }}</span>
        <span class="persian-number date">{{
          new Date(transaction.createDate).toLocaleDateString("fa-IR")
        }}</span>
        <span class="persian-number time">{{
          new Date(transaction.createDate).toLocaleTimeString("fa-IR")
        }}</span>
        <span class="persian-number">{{ transaction.amount }}</span>
      </div>

      <footer class="table-footer">
        <hr />
        <a href="" type="button" @click.prevent="seeAll"> مشاهده همه تراکنش ها </a>
      </footer>
    </section>
  </div>
</template>
<script>
export default {
  layout: "dashboardLay",
  data() {
    return {
      transactions: "",
    };
  },
  async mounted() {
    if (this.$route.params.id == undefined) {
      this.$router.push("/add-visitor");
    } else {
      const isVisitorExist = await this.$axios.get(
        `/api/Visitor/VisitorHome/CheckAnyPageLink/${this.$route.params.id}`
      );
      if (
        isVisitorExist.data.statusCode == 200 &&
        isVisitorExist.data.message == "Success"
      ) {
        await this.getTransactions();
      } else {
        // redirect to main page
      }
    }
  },
  methods: {
    seeAll() {
      const table = document.getElementById("transactions-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer").style.display = "none");
    },
    async getTransactions() {
      const transactions = await this.$axios.get(
        `/api/Visitor/VisitorWallet/GetVisitorTransactions/${this.$route.params.id}`
      );
      if (transactions.data.statusCode == 200 && transactions.data.message == "Success") {
        this.transactions = transactions.data.data;
        // console.log(transactions);
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
