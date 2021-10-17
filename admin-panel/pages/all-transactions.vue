<template>
  <div>
    <div class="panel-table main-content-transactions">
      <div class="box-header">
        <h3>لیست تراکنش ها</h3>
        <form action="">
          <div class="filter floated-list-container" @click="toggleDropdown">
            <input type="text" readonly v-model="filterBy" value="فیلتر بر اساس" />
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
              <li @click="setFilter($event, 2)">تسویه</li>
              <li @click="setFilter($event, 3)">خرید حجم</li>
              <li @click="setFilter($event, 1)">خرید دوره</li>
            </ul>
          </div>
          <label for="main-content-search-btn" class="search-box" tabindex="0">
            <input
              type="search"
              placeholder="جستجو کنید"
              class="search-btn"
              id="main-content-search-btn"
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
          <span class="date">تاریخ </span>
          <span class="time">ساعت</span>
          <span>شماره پیگیری</span>
          <span class="name">نام مدرس</span>
          <span class="name">نام دانشجو</span>
          <span class="type">نوع</span>
          <span>کد تخفیف</span>
          <span>مبلغ</span>
        </header>
        <div
          class="table-row"
          v-for="transaction in transactions"
          :key="transactions.indexOf(transaction)"
        >
          <span class="date persian-number">1400/10/04</span>
          <span class="time persian-number">13:45</span>
          <span class="persian-number">{{ transaction.trackingCode }}</span>
          <span class="name">{{ transaction.teacherName }}</span>
          <span class="name">{{ transaction.studentName }}</span>
          <span class="type buy-course" v-if="transaction.type == 1">خرید دوره</span>
          <span class="type pay-off" v-else-if="transaction.type == 2">تسویه</span>
          <span class="type buy-volume" v-else>خرید حجم</span>
          <span class="persian-number">{{ transaction.discountCode }}</span>
          <span class="persian-number">{{ transaction.amount }}</span>
        </div>

        <footer class="table-footer">
          <hr />
          <a href="" type="button" @click.prevent="seeAll"> مشاهده همه </a>
        </footer>
      </section>
    </div>
    <a href="#" class="form-btn download-excel-format">
      <img src="@/static/icons/excel-icon.png" alt="آیکون اکسل" />
      دانلود بصورت اکسل
    </a>
    <div class="panel-admin-content-item transactions-output">
      <header>
        <p class="section-header">خروجی گرفتن از تراکنش ها</p>
      </header>
      <form action="">
        <div class="form-row">
          <label for="" class="form-row-col">
            <input type="text" class="form-input" placeholder="از تاریخ" />
          </label>
          <label for="" class="form-row-col">
            <input type="text" class="form-input" placeholder="تا تاریخ" />
          </label>
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
          <p class="section-title-text">خروجی بر اساس</p>
        </div>
        <div class="form-row radios-container">
          <div>
            <input
              type="radio"
              class="form-radio"
              name="course-setting"
              id="output-teacher-radio"
            />
            <label for="output-teacher-radio">شماره معلم</label>
            <label for="output-teacher-radio" class="radio-overlay"></label>
          </div>
          <div>
            <input
              type="radio"
              class="form-radio"
              name="course-setting"
              id="output-student-radio"
            />
            <label for="output-student-radio">دانشجو</label>
            <label for="output-student-radio" class="radio-overlay"></label>
          </div>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col in-panel floated-list-container">
            <input type="text" class="form-input" readonly placeholder="نوع تراکنش" />
            <ul class="floated-list custom-scrollbar">
              <li>دوره</li>
              <li>خرید حجم</li>
              <li>تسویه</li>
            </ul>
          </label>
          <label for="" class="form-row-col"></label>
        </div>
        <a
          href=""
          type="button"
          @click.prevent="downloadExcel"
          class="form-btn download-excel-format"
        >
          <img src="@/static/icons/excel-icon.png" alt="آیکون اکسل" />
          دانلود بصورت اکسل
        </a>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  data() {
    return {
      transactions: "",
      filterBy: "فیلتر بر اساس",
      filterById: "",
      searchInput: "",
    };
  },
  async mounted() {
    this.getAllTransactions();
  },
  methods: {
    seeAll() {
      const table = document.getElementById("transactions-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer").style.display = "none");
    },
    toggleDropdown() {
      document.querySelector(".floated-list-container").classList.toggle("show");
    },
    setFilter(event, id) {
      this.filterById = id;
      this.filterBy = event.target.innerHTML.trim();
    },
    async getAllTransactions() {
      const transactions = await this.$axios.get("/api/Admin/AdminWallet/AdminWallets", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      this.transactions = transactions.data.data;
    },
    async downloadExcel() {
      const exel = await this.$axios.get("/api/Admin/AdminWallet/ExportWalletsToExcel", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      var a = document.createElement("a"); //Create <a>
      a.href = "data:application/vnd.ms-excel;base64," + exel.data.data;
      a.download = new Date() + ".csv"; //File name Here
      a.click();
    },
    async searchEvent() {
      this.searchInput = this.$refs.searchInput.value;
      if (this.filterById == "") {
        const transactions = await this.$axios.get(
          `/api/Admin/AdminWallet/AdminWallets?search=${this.searchInput}`,
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
          `/api/Admin/AdminWallet/AdminWallets?search=${this.searchInput}&type=${this.filterById}`,
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
            `/api/Admin/AdminWallet/AdminWallets?type=${this.filterById}`,
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
          const teachers = await this.$axios.get(
            `/api/Admin/AdminManageTeacher/GetTeachers?search=${this.searchInput}&filterBy=${this.filterById}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (teachers.data.statusCode == 200 && teachers.data.message == "Success") {
            this.teachers = teachers.data.data;
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
