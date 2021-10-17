<template>
  <div>
    <div class="panel-admin-content-item">
      <div class="panel-table teachers-list package-request">
        <div class="box-header">
          <h3>لیست درخواست پکیج</h3>
          <form action="">
            <div class="filter floated-list-container">
              <input type="text" readonly @click="toggleDropdown" v-model="filter" />
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
                <li @click="selectFilter($event, '1')">در انتظار تائید</li>
                <li @click="selectFilter($event, '4')">بدون فیلتر</li>
                <li @click="selectFilter($event, '3')">رد شده</li>
                <li @click="selectFilter($event, '2')">تائید شده</li>
              </ul>
            </div>
            <label for="package-request-search-btn" class="search-box" tabindex="0">
              <input
                type="search"
                placeholder="جستجو کنید"
                class="search-btn"
                id="package-request-search-btn"
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
        <section class="box-content custom-scrollbar" id="courses-table">
          <header class="table-row table-header">
            <span>نام معلم</span>
            <span>شماره معلم</span>
            <span>عنوان پکیج</span>
            <span>مشاهده درخواست</span>
            <span>وضعیت</span>
          </header>
          <div class="table-row" v-for="pack in packRequests" :key="pack.packageId">
            <span class="name">{{ pack.teacherName }}</span>
            <span class="persian-number">{{ pack.phoneNumber }}</span>
            <span>{{ pack.packageName }}</span>
            <span>
              <button class="view" @click.prevent="seeFullPack(pack.packageId)">
                مشاهده
              </button>
            </span>
            <span class="state accepted" v-if="pack.isAccepted == true">تائید شده</span>
            <span class="state not-accepted" v-else-if="pack.isAccepted == false"
              >تائید نشده</span
            >
            <span class="state not-accepted" v-else>در انتظار تائید</span>
          </div>

          <footer class="table-footer">
            <hr />
            <a href="" @click.prevent="seeAll"> مشاهده همه </a>
          </footer>
        </section>
      </div>
    </div>
    <div class="basic-modal show-package-request">
      <div class="content-box">
        <header>
          <div class="empty"></div>
          <h2 class="title">مشاهده درخواست</h2>
          <button type="button" class="close-btn" @click="closeModal()">&times;</button>
        </header>
        <ul class="request-list">
          <li>
            <span class="persian-number">عنوان پکیج:</span>
            <span class="persian-number">{{ fullPackDetail.packageName }}</span>
          </li>
          <li>
            <span class="persian-number">نوع پکیج:</span>
            <span class="persian-number">{{ fullPackDetail.courseGroup }}</span>
          </li>
          <li>
            <span class="persian-number">قیمت پکیج:</span>
            <span class="persian-number"
              >{{ Number(fullPackDetail.suggestionPrice).toLocaleString() }}
              <span>تومان</span></span
            >
          </li>
          <li>
            <span class="persian-number"> تعداد جلسات:</span>
            <span class="persian-number">{{ fullPackDetail.sectionsCount }}</span>
          </li>
        </ul>
        <div class="details-box">
          <h3 class="title">توضیحات:</h3>
          <p>
            {{ fullPackDetail.description }}
          </p>
        </div>
        <div class="buttons">
          <button class="reject-image" @click.prevent="changeAcceptPack('false')">
            رد کردن
          </button>
          <button class="confirm-image" @click.prevent="changeAcceptPack('true')">
            تائید کردن
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  async beforeMount() {
    if (this.$route.params.id == undefined || isNaN(this.$route.params.id)) {
      this.$router.push("/teachers-list");
    } else {
      this.getPackReqs();
    }
  },
  data() {
    return {
      packRequests: [],
      fullPackDetail: [],
      modalId: "",
      filter: "فیلتر بر اساس",
      selectedFilter: "",
      searchInput: "",
    };
  },
  methods: {
    seeAll() {
      const table = document.getElementById("courses-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer").style.display = "none");
    },
    toggleDropdown() {
      document.querySelector(".floated-list-container").classList.toggle("show");
    },
    selectFilter(event, select) {
      this.selectedFilter = select;
      this.filter = event.target.innerHTML.trim();
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    async getPackReqs() {
      const packReqsREsponse = await this.$axios.get(
        `/api/Admin/AdminManageTeacher/GetTeacherPackageRequest?teacherId=${this.$route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        packReqsREsponse.data.statusCode == 200 &&
        packReqsREsponse.data.message == "Success"
      ) {
        this.packRequests = packReqsREsponse.data.data;
      }
    },
    async seeFullPack(id) {
      const fullPackResponse = await this.$axios.get(
        `/api/Admin/AdminManageTeacher/GetPackageRequestForShow/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      this.modalId = id;
      document.querySelector(".show-package-request").style.display = "flex";
      this.fullPackDetail = fullPackResponse.data.data;
    },
    async changeAcceptPack(type) {
      const changeAcceptPackResponse = await this.$axios.get(
        `/api/Admin/AdminManageTeacher/ChangePackageRequestStatus/${this.modalId}/${type}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        changeAcceptPackResponse.data.statusCode == 200 &&
        changeAcceptPackResponse.data.message == "Success"
      ) {
        this.closeModal();
        this.getPackReqs();
      }
    },
    closeModal() {
      document.querySelector(".show-package-request").style.display = "none";
    },
    async searchEvent() {
      this.searchInput = this.$refs.searchInput.value;
      if (this.selectedFilter == "") {
        const packReqsResponse = await this.$axios.get(
          `/api/Admin/AdminManageTeacher/GetTeacherPackageRequest?teacherId=${this.$route.params.id}&search=${this.searchInput}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (
          packReqsResponse.data.statusCode == 200 &&
          packReqsResponse.data.message == "Success"
        ) {
          this.packRequests = packReqsResponse.data.data;
        }
      } else {
        const packReqsResponse = await this.$axios.get(
          `/api/Admin/AdminManageTeacher/GetTeacherPackageRequest?teacherId=${this.$route.params.id}&search=${this.searchInput}&acceptFilter=${this.selectedFilter}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (
          packReqsResponse.data.statusCode == 200 &&
          packReqsResponse.data.message == "Success"
        ) {
          this.packRequests = packReqsResponse.data.data;
        }
      }
    },
  },
  watch: {
    selectedFilter: {
      async handler() {
        if (this.searchInput == "") {
          const packReqsResponse = await this.$axios.get(
            `/api/Admin/AdminManageTeacher/GetTeacherPackageRequest?teacherId=${this.$route.params.id}&acceptFilter=${this.selectedFilter}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (
            packReqsResponse.data.statusCode == 200 &&
            packReqsResponse.data.message == "Success"
          ) {
            this.packRequests = packReqsResponse.data.data;
          }
        } else {
          const packReqsResponse = await this.$axios.get(
            `/api/Admin/AdminManageTeacher/GetTeacherPackageRequest?teacherId=${this.$route.params.id}&search=${this.searchInput}&acceptFilter=${this.selectedFilter}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (
            packReqsResponse.data.statusCode == 200 &&
            packReqsResponse.data.message == "Success"
          ) {
            this.packRequests = packReqsResponse.data.data;
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
