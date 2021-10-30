<template>
  <div>
    <div class="panel-student-content-item new-password">
      <header>
        <p class="section-header">رمز عبور جدید</p>
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
        <p class="section-title-text">رمز عبور جدید</p>
      </div>
      <form action="">
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="password"
              class="form-input"
              placeholder="رمز عبور قدیمی"
              v-model="oldPass"
            />
          </label>
          <label class="form-row-col guide-section">
            <a @click.prevent="toggleSendByModal" class="guide-text">
              اگر رمز عبور قدیمی خود را فراموش کرده اید، کلیک کنید
            </a>
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="password"
              class="form-input"
              placeholder="رمز عبور جدید"
              v-model="newPass"
            />
          </label>
          <label for="" class="form-row-col">
            <input
              type="password"
              class="form-input"
              placeholder="تائید رمز عبور جدید"
              v-model="newPassRep"
            />
          </label>
        </div>
        <button class="form-btn success" @click.prevent="changepass">
          ثبت و نهایی کردن
        </button>
      </form>
    </div>
    <div v-if="showSendLink">
      <sendByModal />
    </div>
  </div>
</template>

<script>
import sendByModal from "@/components/modals/send-by-modal";
export default {
  layout: "dashboard",
  middleware: "userIsNotLog",
  components: { sendByModal },
  head() {
    return {
      title: "تغییر رمز عبور",
    };
  },
  data() {
    return {
      showSendLink: false,
      oldPass: "",
      newPass: "",
      newPassRep: "",
    };
  },
  methods: {
    toggleSendByModal() {
      this.showSendLink = !this.showSendLink;
    },
    async changepass() {
      if (this.oldPass != "" && this.newPass != "" && this.newPassRep != "") {
        try {
          const changePassResp = await this.$axios.post(
            "/api/Student/StudentAccount/EditPasswordFromPanel",
            {
              oldPassword: this.oldPass,
              newPassword: this.newPass,
              reNewPassword: this.newPassRep,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (
            changePassResp.data.statusCode == 200 &&
            changePassResp.data.message == "Success"
          ) {
            this.$swal({
              text: "رمز عبور تغییر کرد!",
              icon: "success",
              showCloseButton: true,
              confirmButtonText: "تایید",
            });
            this.$router.push("/my/");
          } else if (
            changePassResp.data.statusCode == 400 &&
            changePassResp.data.message == "PasswordInvalid"
          ) {
            this.$swal({
              text: "رمز عبور قدیمی شما اشتباه می‌باشد!",
              icon: "error",
              showCloseButton: true,
              confirmButtonText: "تلاش مجدد",
            });
          } else if (
            changePassResp.data.statusCode == 400 &&
            changePassResp.data.message == "InvalidRePassword"
          ) {
            this.$swal({
              text: "تکرار رمز عبور اشتباه می‌باشد!",
              icon: "error",
              showCloseButton: true,
              confirmButtonText: "تلاش مجدد!",
            });
          }
        } catch (e) {
          this.$swal({
            text: "مشکلی رخ داده است!لطفا دوباره امتحان کرده یا صفحه را رفرش کنید",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: "تلاش مجدد!",
          });
        }
      } else {
        this.$swal({
          text: "اطلاعات را به صورت کامل وارد کنید",
          icon: "warning",
          showCloseButton: true,
          confirmButtonText: "تلاش مجدد!",
        });
      }
    },
  },
};
</script>
//
<style lang="scss">
// @import "@/assets/styles/stu-panel.scss";
//
@import "@/assets/swal-style.scss";
</style>
