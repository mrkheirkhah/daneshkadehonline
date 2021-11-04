<template>
  <div class="submit-admin">
    <div class="panel-admin-content-item submit-admin">
      <header>
        <p class="section-header">ثبت ادمین</p>
      </header>
      <form action="">
        <div class="form-row">
          <div for="" class="form-row-col darken-color">
            <div class="separator pseudo-form-input">
              <input type="file" id="upload-newAdmin-profile" @change="newAdminPhoto" />
              <span v-if="adminPhotoName == ''">آپلود عکس پروفایل</span>
              <span v-else>{{ adminPhotoName }}</span>
              <span>
                <label for="upload-newAdmin-profile" class="cover-btn">انتخاب</label>
              </span>
            </div>
          </div>
          <label for="" class="form-row-col in-panel floated-list-container">
            <input
              type="text"
              class="form-input"
              readonly
              v-model="roleDrop"
              placeholder="نوع ادمین"
              @click="toggleDropdown"
            />
            <ul class="floated-list custom-scrollbar">
              <li @click="selectAdminRole($event, 0)">پشتیبان</li>
              <li @click="selectAdminRole($event, 1)">ادمین</li>
              <li @click="selectAdminRole($event, 2)">سوپر ادمین</li>
              <li @click="selectAdminRole($event, 3)">نویسنده</li>
            </ul>
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="tel"
              class="form-input"
              v-model="adminPhone"
              placeholder="شماره موبایل"
            />
          </label>
          <label for="" class="form-row-col">
            <input
              type="number"
              class="form-input"
              v-model="nationalCardNumber"
              placeholder="کد ملی"
            />
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="password"
              class="form-input"
              v-model="password"
              placeholder="رمز عبور"
            />
          </label>
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              v-model="adminName"
              placeholder="نام ادمین"
            />
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input type="text" class="form-input" v-model="email" placeholder="ایمیل" />
          </label>
          <label for="" class="form-row-col"> </label>
        </div>
        <button
          class="form-btn success"
          v-if="submitType == 'add'"
          @click.prevent="addNewAdmin"
          :disabled="isSending"
        >
          تائید
        </button>
        <button
          class="form-btn success"
          v-if="submitType == 'edit'"
          @click.prevent="editAdmin"
          :disabled="isSending"
        >
          ثبت ویرایشات
        </button>
      </form>
    </div>
    <div class="panel-table submit-admin">
      <div class="box-header">
        <h3>لیست ادمین ها</h3>
        <form action="">
          <div class="filter floated-list-container">
            <input type="text" readonly value="فیلتر بر اساس" />
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
              <li>پشتیبان</li>
              <li>ادمین</li>
              <li>سوپر ادمین</li>
              <li>منشی</li>
            </ul>
          </div>
          <label for="submit-admin-search-btn" class="search-box" tabindex="0">
            <input
              type="search"
              placeholder="جستجو کنید"
              class="search-btn"
              id="submit-admin-search-btn"
            />
            <img src="@/static/icons/search-icon-orange.png" alt="آیکون سرچ" />
          </label>
        </form>
      </div>
      <section class="box-content custom-scrollbar" id="admins-table">
        <header class="table-row table-header">
          <span>نام </span>
          <span>شماره موبایل</span>
          <span>کد ملی</span>
          <span class="option-buttons"> آپشن ها </span>
        </header>
        <div class="table-row" v-for="admin in adminsList" :key="admin.id">
          <span> {{ admin.name }}</span>
          <span class="persian-number">{{ admin.phoneNumber }}</span>
          <span class="persian-number">{{ admin.nationalCardNumber }}</span>
          <span class="option-buttons">
            <button
              class="delete"
              v-if="!admin.isDelete"
              @click.prevent="deleteAdmin(admin.id, 'true')"
            >
              حذف
            </button>
            <button
              class="delete"
              v-if="admin.isDelete"
              @click.prevent="deleteAdmin(admin.id, 'false')"
            >
              بازیابی
            </button>
            /
            <button
              class="ban"
              @click.prevent="blockAdmin(admin.id, 'true')"
              v-if="!admin.isBlock"
            >
              مسدود کردن
            </button>
            <button
              class="ban"
              @click.prevent="blockAdmin(admin.id, 'false')"
              v-if="admin.isBlock"
            >
              آزاد کردن
            </button>

            /
            <button class="edit" @click.prevent="getEditDetails(admin.id)">ویرایش</button>
          </span>
        </div>

        <footer class="table-footer">
          <hr />
          <a href="" type="button" @click.prevent="seeAll"> مشاهده همه </a>
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
      adminsList: "",
      newAdminPhotoBase64: "",
      adminPhotoName: "",
      adminPhone: "",
      nationalCardNumber: "",
      password: "",
      adminName: "",
      email: "",
      selectedRole: null,
      roleDrop: "",
      submitType: "add",
      editThisId: "",
      isSending: false,
    };
  },
  mounted() {
    this.getAdminsList();
  },
  methods: {
    seeAll() {
      const table = document.getElementById("admins-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer").style.display = "none");
    },
    resetData() {
      this.adminsList = "";
      this.newAdminPhotoBase64 = "";
      this.adminPhotoName = "";
      this.adminPhone = "";
      this.nationalCardNumber = "";
      this.password = "";
      this.adminName = "";
      this.email = "";
      this.selectedRole = null;
      this.roleDrop = "";
      this.editThisId = "";
      this.submitType = "add";
    },
    toggleDropdown() {
      document.querySelector(".floated-list-container").classList.toggle("show");
    },
    selectAdminRole(event, id) {
      this.roleDrop = event.target.innerHTML.trim();
      this.selectedRole = id;
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    async getAdminsList() {
      const adminsList = await this.$axios.get(`/api/Admin/AdminManage/Admin`, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      // console.log(adminsList);
      if (adminsList.data.statusCode == 200 && adminsList.data.message == "Success") {
        this.adminsList = adminsList.data.data;
      }
    },
    async addNewAdmin() {
      this.isSending = true;
      if (
        this.newAdminPhotoBase64 != "" &&
        this.adminName.trim() != "" &&
        this.adminPhone != "" &&
        this.selectedRole != null &&
        this.nationalCardNumber != "" &&
        this.password != ""
      ) {
        let formData = new FormData();
        formData.append("profileImage", this.newAdminPhotoBase64);
        formData.append("name", this.adminName);
        formData.append("phoneNumber", this.adminPhone);
        formData.append("email", this.email);
        formData.append("role", this.selectedRole);
        formData.append("nationalCardNumber", this.nationalCardNumber);
        formData.append("password", this.password);
        const addAdminResp = await this.$axios.post(
          "/api/Admin/AdminManage/Admin",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (
          addAdminResp.data.statusCode == 200 &&
          addAdminResp.data.message == "Success"
        ) {
          this.$swal({
            text: "ثبت شد",
            icon: "success",
            showCloseButton: true,
            confirmButtonText: "تایید",
          }).then(() => {
            this.resetData();
            this.getAdminsList();
          });
        }
      } else {
        this.$swal({
          text: "اطلاعات ناقص میباشد",
          icon: "warning",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
      }
      this.isSending = false;
    },
    async getEditDetails(id) {
      this.submitType = "edit";
      this.editThisId = id;
      const editDeatils = await this.$axios.get(`/api/Admin/AdminManage/Admin/${id}`, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      if (editDeatils.data.statusCode == 200 && editDeatils.data.message == "Success") {
        const details = editDeatils.data.data;
        this.adminName = details.name;
        this.email = details.email;
        this.nationalCardNumber = details.nationalCardNumber;
        this.adminPhone = details.phoneNumber;
        this.roleDrop =
          details.role == 0
            ? "پشتیبان"
            : details.role == 1
            ? "ادمین"
            : details.role == 2
            ? "سوپر ادمین"
            : "نویسنده";
        this.selectedRole = details.role;
      }
    },
    async editAdmin() {
      this.isSending = true;
      if (
        this.adminName.trim() != "" &&
        this.adminPhone != "" &&
        this.selectedRole != null &&
        this.nationalCardNumber != ""
      ) {
        let formData = new FormData();
        formData.append("profileImage", this.newAdminPhotoBase64);
        formData.append("name", this.adminName);
        formData.append("phoneNumber", this.adminPhone);
        formData.append("email", this.email);
        formData.append("role", this.selectedRole);
        formData.append("nationalCardNumber", this.nationalCardNumber);
        formData.append("password", this.password);
        const editAdminResp = await this.$axios.put(
          `/api/Admin/AdminManage/Admin?adminId=${this.editThisId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (
          editAdminResp.data.statusCode == 200 &&
          editAdminResp.data.message == "Success"
        ) {
          this.$swal({
            text: "ثبت شد",
            icon: "success",
            showCloseButton: true,
            confirmButtonText: "تایید",
          }).then(() => {
            this.resetData();
            this.getAdminsList();
          });
        }
      } else {
        this.$swal({
          text: "اطلاعات ناقص میباشد",
          icon: "warning",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
      }
      this.isSending = false;
    },
    async blockAdmin(id, type) {
      this.$swal({
        text:
          type == "false"
            ? "از آزاد سازی ادمین اطمینان دارید؟"
            : "از مسدود کردن ادمین اطمینان دارید؟",
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "بله",
        cancelButtonText: "خیر",
      }).then(async (clickedBut) => {
        if (clickedBut.isConfirmed) {
          const blockResp = await this.$axios.get(
            `/api/Admin/AdminManage/BlockAdmin/${id}/${type}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (blockResp.data.statusCode == 200 && blockResp.data.message == "Success") {
            this.$swal({
              text: "انجام شد",
              icon: "success",
              showCloseButton: true,
              confirmButtonText: "تایید",
            }).then(() => {
              this.resetData();
              this.getAdminsList();
            });
          }
        }
      });
    },
    async deleteAdmin(id, type) {
      this.$swal({
        text:
          type == "false"
            ? "از بازیابی ادمین اطمینان دارید؟"
            : "از حذف ادمین اطمینان دارید؟",
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "بله",
        cancelButtonText: "خیر",
      }).then(async (clickedBut) => {
        if (clickedBut.isConfirmed) {
          const deleteAdminResponse = await this.$axios.get(
            `/api/Admin/AdminManage/DeleteAdmin/${id}/${type}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (
            deleteAdminResponse.data.statusCode == 200 &&
            deleteAdminResponse.data.message == "Success"
          ) {
            this.$swal({
              text: "با موفقیت انجام شد",
              icon: "success",
              showCloseButton: true,
              confirmButtonText: "بستن",
            });
            this.resetData();
            this.getAdminsList();
          } else {
            this.$swal({
              text: "مشکلی رخ داده است!لطفا بعدا دوباره تلاش کنید",
              icon: "error",
              showCloseButton: true,
              confirmButtonText: "ادامه",
            });
          }
        }
      });
    },
    newAdminPhoto(event) {
      try {
        this.newAdminPhotoBase64 = event.target.files[0];
        this.adminPhotoName = event.target.files[0].name;
      } catch {}
      // this.createBase64Image(adminPhoto);
    },
    // createBase64Image(fileObject) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     this.newAdminPhotoBase64 = e.target.result;
    //   };
    //   reader.readAsDataURL(fileObject);
    // },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
