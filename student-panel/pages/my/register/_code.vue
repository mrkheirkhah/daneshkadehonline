<template>
  <div class="signin-signup">
    <main class="signin-signup-content">
      <form action="" class="form-box custom-scrollbar" @submit.prevent="register">
        <header class="signin-signup-header">
          <img src="@/static/logo.png" alt="لوگو" />
        </header>
        <h1 class="title">ثبت نام دانشجو</h1>
        <label for="teacher-fullname" class="input-label">
          <input
            type="text"
            name=""
            v-model="fullName"
            id="teacher-fullname"
            placeholder="نام و نام خانوادگی را وارد کنید"
          />
          <span class="icon-container">
            <img src="@/static/panel-student-icons/name-icon.svg" alt="آیکون کاربر" />
          </span>
        </label>
        <label for="teacher-password" class="input-label">
          <input
            type="number"
            name=""
            v-model="phoneNumber"
            id="teacher-phone-number"
            placeholder="شماره تلفن خود را وارد کنید"
            disabled
          />
          <span class="icon-container">
            <img src="@/static/panel-student-icons/lock-icon.svg" alt="آیکون قفل" />
          </span>
        </label>
        <label for="teacher-password" class="input-label">
          <input
            type="password"
            name=""
            v-model="password"
            id="teacher-password"
            placeholder="رمز عبور خود را وارد کنید"
          />
          <span class="icon-container">
            <img src="@/static/panel-student-icons/lock-icon.svg" alt="آیکون قفل" />
          </span>
        </label>
        <label for="teacher-repeat-password" class="input-label">
          <input
            type="password"
            name=""
            v-model="repeatPassword"
            id="teacher-repeat-password"
            placeholder="تائید رمز عبور"
          />
          <span class="icon-container">
            <img src="@/static/panel-student-icons/lock-icon.svg" alt="آیکون قفل" />
          </span>
        </label>
        <div>
          <label for="remember-me" class="checkbox-label">
            <span class="checkbox-container">
              <input
                type="checkbox"
                name=""
                v-model="rememberMe"
                class="form-checkbox"
                id="remember-me"
              />
              <img
                src="@/static/panel-student-icons/checkmark-red.svg"
                class="check-mark"
                alt="check-icon"
              />
            </span>
            مرا به خاطر بسپار
          </label>
          <label for="accept-terms" class="checkbox-label">
            <span class="checkbox-container">
              <input
                type="checkbox"
                v-model="acceptTerms"
                name=""
                class="form-checkbox"
                id="accept-terms"
              />
              <img
                src="@/static/panel-student-icons/checkmark-red.svg"
                class="check-mark"
                alt="check-icon"
              />
            </span>
            <div class="link-container">
              <a href="#" class="form-link">قوانین و مقررات </a> را میپذیرم
            </div>
          </label>
        </div>
        <button class="enter-btn">ورود به پنل</button>
      </form>
    </main>
    <div class="empty"></div>
  </div>
</template>

<script>
export default {
  layout: "default",
  middleware: "userIsLog",
  head() {
    return {
      title: "ثبت نام",
      script: [
        {
          src: "https://trk.tablighdrive.com/pixel/init.action.js",
        },
      ],
      meta: [{ name: "robots", content: "noindex, nofollow" }],
    };
  },
  data() {
    return {
      fullName: "",
      nationalCardNumber: "",
      password: "",
      repeatPassword: "",
      phoneNumber: this.$store.state.login.phoneNumber,
      rememberMe: false,
      acceptTerms: false,
    };
  },
  beforeCreate() {
    if (this.$store.state.login.phoneNumber == "") {
      this.$router.push("/my/login");
    }
  },
  methods: {
    async register() {
      if (this.acceptTerms === false) {
        this.$swal({
          text: "قوانین سایت را مطالعه و تایید کنید!",
          icon: "warning",
          showCloseButton: true,
          confirmButtonText: "تلاش مجدد!",
        });
      } else {
        if (this.password === this.repeatPassword) {
          try {
            const registerData = await this.$axios.$post(
              "/api/Student/StudentAccount/Register",
              {
                studentName: this.fullName,
                phoneNumber: this.$store.state.login.phoneNumber,
                password: this.password,
                verifyCode: this.$route.params.code,
              }
            );
            // console.log(registerData);
            if (registerData.data.tokenString) {
              this.$store.dispatch("login/setRegisterData", registerData);
              this.$router.push("/my/");
            }
          } catch (e) {
            console.log(e);
            this.$swal({
              text: "مشکلی رخ داده است.کمی بعد دوباره امتحان کنید",
              icon: "error",
              showCloseButton: true,
              confirmButtonText: "تلاش مجدد!",
            });
          }
        } else {
          this.$swal({
            text: "رمز و تکرار برابر نیستند!",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "تلاش مجدد!",
          });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/layout/signin-signup-student";
</style>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
