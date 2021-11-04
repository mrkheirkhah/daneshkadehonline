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
              :class="oldPassWrong ? 'red' : ''"
              class="form-input"
              placeholder="رمز عبور قدیمی"
              v-model="oldPass"
            />
            <p class="wrong-text" style="bottom: 0px" v-if="oldPassWrong">
              رمز عبور قدیمی را وارد کنید
            </p>
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
              :class="repWrong || newPassWrong ? 'red' : ''"
              placeholder="رمز عبور جدید"
              v-model="newPass"
            />
            <p class="wrong-text" style="bottom: 0px" v-if="repWrong">
              رمز و تکرار برابر نیستند
            </p>
            <p class="wrong-text" style="bottom: 0px" v-if="newPassWrong">
              رمز جدید را وارد کنید
            </p>
          </label>
          <label for="" class="form-row-col">
            <input
              type="password"
              class="form-input"
              :class="repWrong ? 'red' : ''"
              placeholder="تائید رمز عبور جدید"
              v-model="newPassRep"
            />
            <p class="wrong-text" v-if="repWrong">رمز و تکرار برابر نیستند</p>
          </label>
        </div>
        <button
          class="form-btn success"
          @click.prevent="changepass"
          :disabled="isSending"
        >
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
      repWrong: false,
      oldPassWrong: false,
      newPassWrong: false,
      isSending: false,
    };
  },
  methods: {
    toggleSendByModal() {
      this.showSendLink = !this.showSendLink;
    },
    async changepass() {
      this.isSending = true;
      if (this.newPass != this.newPassRep) {
        this.repWrong = true;
      } else {
        this.repWrong = false;
      }
      if (this.oldPass == "") {
        this.oldPassWrong = true;
      } else {
        this.oldPassWrong = false;
      }
      if (this.newPass == "") {
        this.newPassWrong = true;
      } else {
        this.newPassWrong = false;
      }
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
      }
      this.isSending = false;
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
