<template>
  <div>
    <div class="panel-table transaction-list">
      <div class="box-header">
        <h3>لیست تراکنش ها</h3>
        <form action="">
          <div class="filter floated-list-container">
            <input type="text" readonly v-model="filterBy" @click="toggleDropdown" />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10.969"
              height="6.03"
              viewBox="0 0 10.969 6.03"
            >
              <g transform="translate(10.719 0.25) rotate(90)">
                <path
                  data-name="Path 88161"
                  d="M5.445,5.026.506.087A.3.3,0,1,0,.087.506L4.815,5.234.087,9.962a.3.3,0,0,0,0,.419.3.3,0,0,0,.208.088A.289.289,0,0,0,.5,10.381L5.442,5.442A.3.3,0,0,0,5.445,5.026Z"
                  fill="#4a4a4a"
                  stroke="#4a4a4a"
                  stroke-width="0.5"
                />
              </g>
            </svg>
            <ul class="floated-list">
              <li @click="setFilter($event, '')">همه</li>
              <li @click="setFilter($event, 2)">واریز</li>
              <li @click="setFilter($event, 1)">برداشت</li>
            </ul>
          </div>
          <label for="transaction-search-btn" class="search-box" tabindex="0">
            <input
              type="search"
              placeholder="جستجو کنید"
              class="search-btn"
              id="transaction-search-btn"
              ref="searchInput"
            />
            <img
              src="@/static/icons/search-icon-orange.png"
              alt="آیکون سرچ"
              @click="searchEvent"
            />
          </label>
        </form>
      </div>
      <section class="box-content custom-scrollbar" id="transactions-table">
        <header class="table-row table-header">
          <span class="transaction-type-header">نوع</span>
          <span>جزئیات</span>
          <span>تاریخ</span>
          <span>ساعت</span>
          <span>قیمت (تومان)</span>
          <span>کد پیگیری</span>
          <span class="card-number header">شماره کارت </span>
        </header>
        <div class="table-row" v-for="transaction in transactions" :key="transaction.id">
          <span class="transaction-type settle" v-if="transaction.type == 'Deposit'"
            >واریز</span
          >
          <span class="transaction-type withdraw" v-if="transaction.type == 'Take'"
            >برداشت</span
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
          <a @click="seeAll"> مشاهده همه </a>
        </footer>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  data() {
    return {
      transactions: [],
      filterBy: "فیلتر بر اساس",
      filterById: "",
      searchInput: "",
    };
  },
  async beforeMount() {
    if (this.$route.params.id == undefined || isNaN(this.$route.params.id)) {
      this.$router.push("/teachers-list");
    } else {
      const transactions = await this.$axios.get(
        `/api/Admin/AdminManageTeacher/GetTeacherTransactions/${this.$route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      // console.log(transactions);
      this.transactions = transactions.data.data;
    }
  },
  methods: {
    toggleDropdown() {
      document.querySelector(".floated-list-container").classList.toggle("show");
    },
    seeAll() {
      const table = document.getElementById("transactions-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer").style.display = "none");
    },
    setFilter(event, id) {
      this.filterById = id;
      this.filterBy = event.target.innerHTML.trim();
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    async searchEvent() {
      this.searchInput = this.$refs.searchInput.value;
      if (this.filterById == "") {
        const transactions = await this.$axios.get(
          `/api/Admin/AdminManageTeacher/GetTeacherWallets/${this.$route.params.id}?search=${this.searchInput}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (
          transactions.data.statusCode == 200 &&
          transactions.data.message == "Success"
        ) {
          this.transactions = transactions.data.data;
        }
      } else {
        const transactions = await this.$axios.get(
          `/api/Admin/AdminManageTeacher/GetTeacherWallets/${this.$route.params.id}?search=${this.searchInput}&wallet=${this.filterById}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (
          transactions.data.statusCode == 200 &&
          transactions.data.message == "Success"
        ) {
          this.transactions = transactions.data.data;
        }
      }
    },
  },
  watch: {
    filterById: {
      async handler() {
        if (this.searchInput == "") {
          const transactions = await this.$axios.get(
            `/api/Admin/AdminManageTeacher/GetTeacherWallets/${this.$route.params.id}?wallet=${this.filterById}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (
            transactions.data.statusCode == 200 &&
            transactions.data.message == "Success"
          ) {
            this.transactions = transactions.data.data;
          }
        } else {
          const transactions = await this.$axios.get(
            `/api/Admin/AdminManageTeacher/GetTeacherWallets/${this.$route.params.id}?search=${this.searchInput}&wallet=${this.filterById}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (
            transactions.data.statusCode == 200 &&
            transactions.data.message == "Success"
          ) {
            this.transactions = transactions.data.data;
          }
        }
      },
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
