<template>
  <div>
    <div class="panel-table transaction-list">
      <div class="box-header">
        <h3>لیست تراکنش ها</h3>
      </div>
      <section class="box-content custom-scrollbar" id="transactions-table">
        <header class="table-row table-header">
          <span>نام دوره</span>
          <span>نام مدرس</span>
          <span>تاریخ</span>
          <span>ساعت</span>
          <span>وضعیت</span>
        </header>
        <div
          class="table-row"
          v-for="transaction in transactions"
          :key="transactions.indexOf(transaction)"
        >
          <span class="transaction-detail"> {{ transaction.courseName }}</span>
          <span class="transaction-detail">
            {{ transaction.teacherName }}
          </span>
          <span class="persian-number">{{
            new Date(transaction.createDate).toLocaleDateString("fa-IR")
          }}</span>
          <span class="persian-number">{{
            new Date(transaction.createDate).toLocaleTimeString("fa-IR")
          }}</span>
          <span class="persian-number edit" v-if="transaction.isFinal == true"
            >انجام شده</span
          >
          <span class="persian-number delete" v-else>انجام نشده</span>
        </div>
        <footer class="table-footer">
          <hr />
          <a @click="seeAll"> مشاهده همه </a>
        </footer>
      </section>
    </div>

    <div class="panel-table transaction-list">
      <div class="box-header">
        <h3>لیست دوره ها</h3>
      </div>
      <section class="box-content custom-scrollbar" id="courses-table">
        <header class="table-row table-header">
          <span>نام دوره</span>
          <span>نام مدرس</span>
          <span>تاریخ</span>
          <span>ساعت</span>
          <span>نوع</span>
        </header>
        <div class="table-row" v-for="course in courses" :key="courses.indexOf(course)">
          <span class="transaction-detail"> {{ course.courseName }}</span>
          <span class="transaction-detail">
            {{ course.teacherName }}
          </span>
          <span class="persian-number">{{
            new Date(course.createDate).toLocaleDateString("fa-IR")
          }}</span>
          <span class="persian-number">{{
            new Date(course.createDate).toLocaleTimeString("fa-IR")
          }}</span>
          <span class="persian-number edit" v-if="course.isPackage == true">پکیج</span>
          <span class="persian-number edit" v-else>دوره</span>
        </div>
        <footer class="courses-footer">
          <hr />
          <a @click="seeAllCourses"> مشاهده همه </a>
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
      courses: [],
    };
  },
  async beforeMount() {
    if (this.$route.params.id == undefined || isNaN(this.$route.params.id)) {
      this.$router.push("/students-list");
    } else {
      const [courses, transactions] = await Promise.all([
        this.$axios.get(
          `/api/Admin/AdminManageStudent/GetStudentCourses/${this.$route.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        ),
        this.$axios.get(
          `/api/Admin/AdminManageStudent/GetStudentOrders/${this.$route.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        ),
      ]);
      if (
        courses.data.statusCode == 200 &&
        courses.data.message == "Success" &&
        transactions.data.statusCode == 200 &&
        transactions.data.message == "Success"
      ) {
        this.courses = courses.data.data;
        this.transactions = transactions.data.data;
      }
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
    seeAllCourses() {
      const table = document.getElementById("courses-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".courses-footer").style.display = "none");
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
