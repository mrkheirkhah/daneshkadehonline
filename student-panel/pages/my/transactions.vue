<template>
  <div class="panel-table transactions">
    <div class="box-header">
      <h3>
        <skeleton
          v-if="loading"
          class="skeleton"
          width="95px"
          height="30px"
          borderRadius="5px"
        />
        <span v-else> تاریخچه فاکتور ها </span>
      </h3>
    </div>
    <section class="box-content custom-scrollbar" id="transactions-table">
      <header class="table-row table-header">
        <template v-if="loading">
          <span v-for="i in 6" :key="i">
            <skeleton class="skeleton" width="35px" height="20px" borderRadius="5px" />
          </span>
        </template>
        <template v-else>
          <!-- <span class="transaction-type">نوع</span> -->
          <span>تعداد دوره</span>
          <span>تاریخ </span>
          <span>ساعت</span>
          <span>کد پیگیری</span>
          <span>وضعیت</span>
          <span>مشاهده</span>
        </template>
      </header>
      <template v-if="loading">
        <div class="table-row package-type" v-for="i in 4" :key="i.index">
          <span v-for="j in 6" :key="j">
            <skeleton class="skeleton" width="35px" height="20px" borderRadius="5px" />
          </span>
        </div>
      </template>
      <template v-else>
        <div class="table-row" v-for="transaction in myWallet" :key="transaction.id">
          <!-- <span class="transaction-type">{{
            transaction.type == "Deposite" ? "واریز" : "برداشت"
          }}</span> -->
          <span class="transaction-detail">{{ transaction.courseCount }}</span>
          <span class="persian-number">{{
            new Date(transaction.payDate).toLocaleDateString("fa-IR")
          }}</span>
          <span class="persian-number">{{
            new Date(transaction.payDate).toLocaleTimeString("fa-IR")
          }}</span>
          <span class="persian-number">{{ transaction.trackingCode }}</span>
          <span class="transaction-state successfull" v-if="transaction.isPay == true"
            >موفقیت آمیز</span
          >
          <span class="transaction-state failed" v-else>ناموفق</span>
          <span>
            <nuxt-link
              :to="{ path: '/cart', query: { id: transaction.id } }"
              class="transaction-state failed"
              >مشاهده</nuxt-link
            >
          </span>
        </div>
      </template>

      <footer class="table-footer">
        <hr />
        <skeleton
          v-if="loading"
          class="skeleton"
          width="150px"
          height="30px"
          borderRadius="5px"
        />
        <a href="" type="button" @click.prevent="seeAll" v-else> مشاهده همه فاکتور ها </a>
      </footer>
    </section>
  </div>
</template>

<script>
import skeleton from "@/components/skeleto-creator";
export default {
  layout: "dashboard",
  components: { skeleton },
  middleware: "userIsNotLog",
  data() {
    return {
      loading: true,
      myWallet: "",
    };
  },
  mounted() {
    this.getWallets();
  },
  methods: {
    seeAll() {
      const table = document.getElementById("transactions-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer").style.display = "none");
    },
    async getWallets() {
      const myWallet = await this.$axios.get(
        "/api/Student/StudentOrder/GetOrdersHistory",
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (myWallet.data.statusCode == 200 && myWallet.data.message == "Success") {
        this.myWallet = myWallet.data.data;
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss">
// @import "@/assets/styles/stu-panel.scss";
@import "@/assets/swal-style.scss";
</style>
