<template>
  <div class="signin-signup">
    <main class="signin-signup-content">
      <form action="" class="form-box custom-scrollbar" @submit.prevent="register">
        <header class="signin-signup-header">
          <img src="@/static/logo.png" alt="لوگو" />
        </header>
        <h1 class="title">ثبت نام</h1>
        <label for="teacher-fullname" class="input-label">
          <input
            type="text"
            name=""
            v-model="fullName"
            id="teacher-fullname"
            :class="wrongName ? 'red' : ''"
            @keyup="checkPersian($event)"
            placeholder="نام و نام خانوادگی را وارد کنید"
          />
          <span class="icon-container">
            <img src="@/static/panel-teacher-icons/name-icon.svg" alt="آیکون کاربر" />
          </span>
          <p class="wrong-text" v-if="wrongName">نام خود را صحیح وارد کنید</p>
        </label>
        <label for="teacher-mellicode" class="input-label">
          <input
            type="number"
            name=""
            v-model="nationalCardNumber"
            :class="wrongCode ? 'red' : ''"
            id="teacher-mellicode"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="10"
            placeholder="کد ملی خود را وارد کنید"
          />
          <span class="icon-container">
            <img src="@/static/panel-teacher-icons/flag-icon.svg" alt="آیکون پرچم" />
          </span>
          <p class="wrong-text" v-if="wrongCode">کد ملی خود را صحیح وارد کنید</p>
        </label>
        <label for="teacher-password" class="input-label">
          <input
            type="number"
            name=""
            :placeholder="phoneNumber"
            id="teacher-phone-number"
            disabled
          />
          <span class="icon-container">
            <img
              src="@/static/panel-teacher-icons/smartphone-icon.svg"
              alt="آیکون موبایل"
            />
          </span>
        </label>
        <label for="teacher-password" class="input-label">
          <input
            type="password"
            name=""
            v-model="password"
            :class="wrongPass ? 'red' : wrongPassLength ? 'red' : ''"
            id="teacher-password"
            placeholder="رمز عبور خود را وارد کنید"
          />
          <span class="icon-container">
            <img src="@/static/panel-teacher-icons/lock-icon.svg" alt="آیکون قفل" />
          </span>
          <p class="wrong-text" v-if="wrongPass">رمز یا تکرار رمز صحیح نمیباشد</p>
          <p class="wrong-text" v-if="wrongPassLength">
            طول رمز باید بیشتر یا مساوی هشت کاراکتر باشد
          </p>
        </label>
        <label for="teacher-repeat-password" class="input-label">
          <input
            type="password"
            name=""
            :class="wrongPass ? 'red' : wrongPassLength ? 'red' : ''"
            v-model="repeatPassword"
            id="teacher-repeat-password"
            placeholder="تائید رمز عبور"
          />
          <span class="icon-container">
            <img src="@/static/panel-teacher-icons/lock-icon.svg" alt="آیکون قفل" />
          </span>
          <p class="wrong-text" v-if="wrongPass">رمز یا تکرار رمز صحیح نمیباشد</p>
          <p class="wrong-text" v-if="wrongPassLength">
            طول رمز باید بیشتر یا مساوی هشت کاراکتر باشد
          </p>
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
                src="@/static/panel-teacher-icons/checkmark-red.svg"
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
                src="@/static/panel-teacher-icons/checkmark-red.svg"
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
  layout: "withoutSidebar",
  middleware: "userIsLog",
  head() {
    return {
      title: "ثبت نام | دانشکده آنلاین",
      meta: [{ name: "robots", content: "noindex,nofollow" }],
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
      wrongCode: false,
      wrongName: false,
      wrongPass: false,
      wrongPassLength: false,
    };
  },
  beforeCreate() {
    if (this.$store.state.login.phoneNumber == "") {
      this.$router.push("/login");
    }
  },
  methods: {
    async register() {
      if (this.fullName.trim() == "") {
        this.wrongName = true;
      } else {
        this.wrongName = false;
      }
      if (this.nationalCardNumber.length < 10 || this.nationalCardNumber.length > 10) {
        this.wrongCode = true;
      } else {
        this.wrongCode = false;
      }
      if (this.password.length < 8) {
        this.wrongPassLength = true;
      } else {
        this.wrongPassLength = false;
        if (this.password !== this.repeatPassword) {
          this.wrongPass = true;
        } else {
          this.wrongPass = false;
        }
      }
      if (
        this.fullName.trim() != "" &&
        this.nationalCardNumber.length == 10 &&
        this.password.length >= 8 &&
        this.password === this.repeatPassword
      ) {
        if (this.acceptTerms === false) {
          this.$swal({
            text: "قوانین سایت را مطالعه و تایید کنید!",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: "تلاش مجدد!",
          });
        } else {
          try {
            const registerData = await this.$axios.$post(
              "/api/Teacher/TeacherAccount/Register",
              {
                teacherName: this.fullName,
                nationalCardNumber: this.nationalCardNumber,
                phoneNumber: this.$store.state.login.phoneNumber,
                password: this.password,
                verifyCode: this.$route.params.code,
              }
            );
            if (registerData.data.tokenString) {
              this.$store.dispatch("login/setRegisterData", registerData);
              this.$router.push("/complete-profile");
            }
          } catch (e) {
            this.$swal({
              text: "مشکلی رخ داده است.کمی بعد دوباره امتحان کنید",
              icon: "warning",
              showCloseButton: true,
              confirmButtonText: "تلاش مجدد!",
            });
          }
        }
      }
      // } else if (
      //   this.nationalCardNumber.length < 10 ||
      //   this.nationalCardNumber.length > 10
      // ) {
      //   this.wrongCode = true;
      // } else {
      //   if (this.password === this.repeatPassword) {
      //     try {
      //       const registerData = await this.$axios.$post(
      //         "/api/Teacher/TeacherAccount/Register",
      //         {
      //           teacherName: this.fullName,
      //           nationalCardNumber: this.nationalCardNumber,
      //           phoneNumber: this.$store.state.login.phoneNumber,
      //           password: this.password,
      //           verifyCode: this.$route.params.code,
      //         }
      //       );
      //       if (registerData.data.tokenString) {
      //         this.$store.dispatch("login/setRegisterData", registerData);
      //         this.$router.push("/complete-profile");
      //       }
      //     } catch (e) {
      //       this.$swal({
      //         text: "مشکلی رخ داده است.کمی بعد دوباره امتحان کنید",
      //         icon: "warning",
      //         showCloseButton: true,
      //         confirmButtonText: "تلاش مجدد!",
      //       });
      //     }
      //   } else {
      //     this.$swal({
      //       text: "رمز و تکرار برابر نیستند!",
      //       icon: "warning",
      //       showCloseButton: true,
      //       confirmButtonText: "تلاش مجدد!",
      //     });
      //   }
      // }
    },
    checkPersian(e) {
      // javascript
      if (
        !/^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF7\u200C\u200F ]+$/.test(e.target.value)
      ) {
        e.target.value = "";
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/swal-style.scss";
</style>
