<template>
  <div class="panel-teacher-content-item transaction">
    <div class="panel-table transaction-table">
      <div class="box-header">
        <h3>تراکنش ها</h3>
      </div>
      <section class="box-content" v-if="transactionsData.length != 0">
        <transactionsTableSkeleton v-if="loading" />
        <template v-else>
          <header class="table-row table-header">
            <span>نوع</span>
            <span>نام دوره</span>
            <span>تاریخ</span>
            <span>ساعت</span>
            <span>قیمت (تومان)</span>
            <span>کد پیگیری</span>
            <span class="card-number header"
              >شماره کارت
              <label
                for="transaction-search-btn"
                class="transaction-search-box"
                tabindex="0"
              >
                <input
                  type="search"
                  placeholder="جستجو کنید"
                  class="transaction-search-btn"
                  id="transaction-search-btn"
                />
                <img src="@/static/panel-teacher-icons/search-icon.svg" alt="آیکون سرچ" />
              </label>
            </span>
          </header>
          <div
            class="table-row"
            id="transactions-table"
            v-for="transaction in transactionsData"
            :key="transaction.id"
          >
            <span class="transaction-type withdraw" v-if="transaction.type == 2"
              >برداشت</span
            >
            <span class="transaction-type settle" v-if="transaction.type == 1"
              >واریز</span
            >
            <span class="transaction-detail">
              <small>{{ transaction.title }}</small>
            </span>
            <span class="persian-number">{{
              new Date(transaction.createDate).toLocaleDateString()
            }}</span>
            <span class="persian-number">{{
              new Date(transaction.createDate).toTimeString().slice(0, 5)
            }}</span>
            <span class="persian-number">{{ transaction.amount }}</span>
            <span class="persian-number">{{ transaction.trackingCode }}</span>
            <span class="card-number persian-number">{{ transaction.cardNumber }}</span>
          </div>

          <footer class="table-footer">
            <hr />
            <a href="" type="button" @click="seeAll"> مشاهده همه </a>
          </footer>
        </template>
      </section>
    </div>
    <div class="search-transaction-list" v-show="!loading">
      <header>
        <p class="section-header">لیست تراکنش ها</p>
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
        <p class="section-title-text">توضیحات</p>
      </div>
      <div class="detail-box">
        <p class="text">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
          طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
          لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود
          ابزارهای کاربردی می باشد، کتابهای زیادی در شصت.
        </p>
      </div>
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
        <p class="section-title-text">مشخصات</p>
      </div>
      <form action="">
        <div class="form-row">
          <label for="" class="form-row-col">
            <input type="number" class="form-input" placeholder="از تاریخ (99/12/08)" />
          </label>
          <label for="" class="form-row-col">
            <input type="number" class="form-input" placeholder="تا تاریخ (99/12/08)" />
          </label>
        </div>
        <custom-radio-btn
          name="search-transaction-type"
          :radioBtns="[
            { forId: 'settle-radio', text: 'برداشت' },
            { forId: 'withdraw-radio', text: 'واریز' },
            { forId: 'withdraw-settle-radio', text: 'برداشت واریز' },
          ]"
        />
        <a href="#" class="form-btn download-excel-format">
          <img src="@/static/panel-teacher-icons/excel-icon.png" alt="آیکون اکسل" />
          دانلود بصورت اکسل
        </a>
      </form>
    </div>
  </div>
</template>

<script>
import transactionsTableSkeleton from "@/components/pages-skeleton/transactions-table-skeleton";
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  components: { transactionsTableSkeleton },
  data() {
    return {
      loading: true,
      transactionsData: [],
    };
  },
  async beforeMount() {
    const transactions = await this.$axios.get("/api/Teacher/TeacherWallet/GetWallets", {
      headers: {
        Authorization: `Bearer ${this.$cookies.get("key")}`,
      },
    });
    if (transactions.data.statusCode == 200 && transactions.data.message == "Success") {
      this.transactionsData = transactions.data.data;
      this.loading = false;
    }
  },
  methods: {
    seeAll() {
      const table = document.getElementById("transactions-table");
      table.style.overflowY = "scroll";
      document.querySelector(".table-footer").style.display = "none";
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/swal-style.scss";
</style>
