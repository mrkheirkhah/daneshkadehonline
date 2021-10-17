<template>
  <div class="panel-admin-content-item">
    <div class="panel-table teachers-list">
      <div class="box-header">
        <h3>
          <skeleton
            v-if="loading"
            class="skeleton"
            width="95px"
            height="30px"
            borderRadius="5px"
          />
          <template v-else> لیست معلمان </template>
        </h3>
        <form action="">
          <skeleton
            v-if="loading"
            class="skeleton"
            width="130px"
            height="30px"
            borderRadius="5px"
          />
          <skeleton
            v-if="loading"
            class="skeleton"
            width="40px"
            height="30px"
            borderRadius="5px"
          />
          <template v-else>
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
                <li @click="setFilter($event, 0)">همه</li>
                <li @click="setFilter($event, 1)">تائید شده</li>
                <li @click="setFilter($event, 2)">تائید نشده</li>
                <li @click="setFilter($event, 3)">مسدود شده</li>
                <li @click="setFilter($event, 4)">مسدود نشده</li>
                <li @click="setFilter($event, 5)">حذف شده</li>
              </ul>
            </div>
            <label for="teachers-search-btn" class="search-box" tabindex="0">
              <input
                type="search"
                placeholder="جستجو کنید"
                class="search-btn"
                id="teachers-search-btn"
                ref="searchInput"
              />
              <img
                src="@/static/icons/search-icon-orange.png"
                alt="آیکون سرچ"
                @click="searchEvent"
              />
            </label>
          </template>
        </form>
      </div>
      <section class="box-content custom-scrollbar" id="teachers-table">
        <header class="table-row table-header">
          <template v-if="loading">
            <span v-for="i in 7" :key="i">
              <skeleton class="skeleton" width="35px" height="20px" borderRadius="5px" />
            </span>
          </template>
          <template v-else>
            <span>عکس معلم</span>
            <span>نام معلم</span>
            <span>شماره موبایل</span>
            <span>کد ملی</span>
            <span>انسداد</span>
            <span>پیام</span>
            <span>پروفایل</span>
            <span>وضعیت</span>
            <span>درخواست تسویه</span>
            <span>حذف مدرس</span>
            <span>آپشن ها</span>
          </template>
        </header>
        <template v-if="loading">
          <div class="table-row" v-for="i in 6" :key="i.index">
            <span v-for="j in 7" :key="j">
              <skeleton class="skeleton" width="35px" height="20px" borderRadius="5px" />
            </span>
          </div>
        </template>
        <template v-else>
          <div class="table-row" v-for="teacher in teachers" :key="teacher.index">
            <span class="image">
              <img
                :src="
                  'https://api.daneshkadeonline.ir/Images/Public/Teacher/' +
                  teacher.profileImageName
                "
                alt="عکس معلم"
              />
            </span>

            <span class="name">{{ teacher.teacherName }}</span>

            <span class="persian-number">{{ teacher.phoneNumber }}</span>
            <span class="persian-number">{{ teacher.nationalCardNumber }}</span>
            <span class="persian-number">
              <button
                class="ban"
                v-if="teacher.isBlock == false"
                @click.prevent="banTeacher(teacher.teacherId)"
              >
                مسدود کردن
              </button>
              <button
                class="ban"
                v-if="teacher.isBlock == true"
                @click.prevent="unBanTeacher(teacher.teacherId)"
              >
                رفع مسدودیت
              </button>
            </span>
            <span class="persian-number">
              <button class="send-message" @click="sendMessage(teacher.teacherId)">
                ارسال پیام
              </button>
            </span>
            <span class="persian-number">
              <button class="view" @click.prevent="seeTeacherProfile(teacher.teacherId)">
                مشاهده
              </button>
            </span>

            <span class="state edited" v-if="teacher.status == 'NewEdit'">
              ویرایشات جدید
            </span>
            <span class="state accepted" v-else-if="teacher.status == 'Accepted'">
              تائید شده
            </span>
            <span class="state not-accepted" v-else-if="teacher.status == 'NotAccepted'">
              تائید نشده
            </span>
            <span>
              <button class="request">درخواست</button>
            </span>
            <span>
              <button
                class="view"
                v-if="teacher.isDelete == false"
                @click="deleteTeacher(teacher.teacherId)"
              >
                حذف
              </button>
              <button class="view" v-else @click="reStoreTeacher(teacher.teacherId)">
                بازیابی
              </button>
            </span>
            <span>
              <button class="view" @click.prevent="seeOptions(teacher.teacherId)">
                آپشن ها
              </button>
            </span>
          </div>

          <footer class="table-footer">
            <hr />
            <a href="" type="button" @click.prevent="seeAll"> مشاهده همه </a>
          </footer>
        </template>
      </section>
    </div>
    <div class="modal-send-message">
      <div class="content-box">
        <form action="">
          <div class="your-message-heading">پیام شما</div>
          <div class="form-row">
            <div class="form-row-col">
              <textarea
                v-model="messageText"
                class="message-textarea form-input"
                placeholder="متن پیام"
              ></textarea>
            </div>
          </div>

          <div class="footer-buttons-container">
            <button type="button" class="form-btn gray-color" @click="closeSendMessage">
              انصراف
            </button>
            <button class="form-btn success" @click.prevent="submitSendMessage">
              ارسال
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import skeleton from "@/components/skeleton-creator";
export default {
  components: { skeleton },
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  data() {
    return {
      filterBy: "فیلتر بر اساس",
      teachers: [],
      filterById: "",
      searchInput: "",
      loading: true,
      messageText: "",
      sendMessageTo: "",
    };
  },
  async mounted() {
    this.getAllTeachers();
  },
  methods: {
    sendMessage(id) {
      this.sendMessageTo = id;
      const messageModal = document.querySelector(".modal-send-message");
      messageModal.style.opacity = "1";
      messageModal.style.visibility = "visible";
    },
    closeSendMessage() {
      const messageModal = document.querySelector(".modal-send-message");
      messageModal.style.opacity = "0";
      messageModal.style.visibility = "hidden";
    },
    async submitSendMessage() {
      const sendAlertResp = await this.$axios.get(
        `/api/Admin/AdminManageTeacher/SendTeacherAlert?teacherId=${this.sendMessageTo}&text=${this.messageText}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        sendAlertResp.data.statusCode == 200 &&
        sendAlertResp.data.message == "Success"
      ) {
        this.$swal({
          text: "ارسال شد!",
          icon: "success",
          showCloseButton: false,
          confirmButtonText: "تایید",
        }).then(() => {
          this.sendMessageTo = "";
          this.messageText = "";
          this.closeSendMessage();
        });
      }
    },

    async getAllTeachers() {
      this.loading = true;
      const teachers = await this.$axios.get(
        `/api/Admin/AdminManageTeacher/GetTeachers`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (teachers.data.statusCode == 200 && teachers.data.message == "Success") {
        this.teachers = teachers.data.data;
        this.loading = false;
      }
    },
    toggleDropdown() {
      document.querySelector(".floated-list-container").classList.toggle("show");
    },
    setFilter(event, id) {
      this.filterById = id;
      this.filterBy = event.target.innerHTML.trim();
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    seeAll() {
      const table = document.getElementById("teachers-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer").style.display = "none");
    },
    seeTeacherProfile(id) {
      this.$router.push(`/see-profile/${id}`);
    },
    seeOptions(id) {
      this.$router.push(`/options/${id}`);
    },
    async banTeacher(teacherId) {
      const banResp = await this.$axios.get(
        `/api/Admin/AdminManageTeacher/BlockTeacher/${teacherId}/true`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (banResp.data.statusCode == 200 && banResp.data.message == "Success") {
        this.$swal({
          text: "مدرس مسدود شد!",
          icon: "success",
          showCloseButton: false,
          confirmButtonText: "تایید",
        }).then(() => {
          this.getAllTeachers();
        });
      }
    },
    async unBanTeacher(teacherId) {
      const unBanResp = await this.$axios.get(
        `/api/Admin/AdminManageTeacher/BlockTeacher/${teacherId}/false`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (unBanResp.data.statusCode == 200 && unBanResp.data.message == "Success") {
        this.$swal({
          text: "مدرس رفع مسدودیت شد!",
          icon: "success",
          showCloseButton: false,
          confirmButtonText: "تایید",
        }).then(() => {
          this.getAllTeachers();
        });
      }
    },
    async deleteTeacher(teacherId) {
      this.$swal({
        text: "از حذف مدرس اطمینان دارید؟",
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "بله",
        cancelButtonText: "خیر",
      }).then(async (clickedBut) => {
        if (clickedBut.isConfirmed) {
          const deleteResponse = await this.$axios.get(
            `/api/Admin/AdminManageTeacher/DeleteTeacher/${teacherId}/true`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (
            deleteResponse.data.statusCode == 200 &&
            deleteResponse.data.message == "Success"
          ) {
            this.$swal({
              text: "با موفقیت انجام شد",
              icon: "success",
              showCloseButton: true,
              confirmButtonText: "بستن",
            });
            this.getAllTeachers();
          } else {
            this.$swal({
              text: "مشکلی رخ داده است!لطفا بعدا دوباره تلاش کنید",
              icon: "error",
              showCloseButton: true,
              confirmButtonText: "ادامه",
            });
          }
        } else {
        }
      });
    },
    async reStoreTeacher(teacherId) {
      this.$swal({
        text: "از بازیابی مدرس اطمینان دارید؟",
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "بله",
        cancelButtonText: "خیر",
      }).then(async (clickedBut) => {
        if (clickedBut.isConfirmed) {
          const deleteResponse = await this.$axios.get(
            `/api/Admin/AdminManageTeacher/DeleteTeacher/${teacherId}/false`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (
            deleteResponse.data.statusCode == 200 &&
            deleteResponse.data.message == "Success"
          ) {
            this.$swal({
              text: "با موفقیت انجام شد",
              icon: "success",
              showCloseButton: true,
              confirmButtonText: "بستن",
            });
            this.getAllTeachers();
          } else {
            this.$swal({
              text: "مشکلی رخ داده است!لطفا بعدا دوباره تلاش کنید",
              icon: "error",
              showCloseButton: true,
              confirmButtonText: "ادامه",
            });
          }
        } else {
        }
      });
    },
    async searchEvent() {
      this.searchInput = this.$refs.searchInput.value;
      if (this.filterById == "") {
        const teachers = await this.$axios.get(
          `/api/Admin/AdminManageTeacher/GetTeachers?search=${this.searchInput}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (teachers.data.statusCode == 200 && teachers.data.message == "Success") {
          this.teachers = teachers.data.data;
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
  watch: {
    filterById: {
      async handler() {
        this.teachers = "";
        if (this.searchInput == "") {
          const teachers = await this.$axios.get(
            `/api/Admin/AdminManageTeacher/GetTeachers?filterBy=${this.filterById}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          console.log(teachers);
          if (teachers.data.statusCode == 200 && teachers.data.message == "Success") {
            this.teachers = teachers.data.data;
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
