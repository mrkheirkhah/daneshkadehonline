<template>
  <div class="signin-signup">
    <template v-if="verifCodeLogin">
      <main class="signin-signup-content">
        <form action="" class="form-box" @submit.prevent="login">
          <header class="signin-signup-header">
            <img src="@/static/logo.png" alt="لوگو" />
          </header>
          <h1 class="title">کد تایید</h1>
          <h3 class="hint-text" v-if="$route.params.id == 'login'">
            کد تایید را وارد کنید &#40;<span class="teacher-mobile">{{
              this.$store.state.login.phoneNumber
            }}</span
            >&#41;
          </h3>
          <h3 class="hint-text" v-if="$route.params.id == 'register'">
            حساب کاربری با شماره موبایل &#40;<span class="teacher-mobile">{{
              this.$store.state.login.phoneNumber
            }}</span
            >&#41; وجود ندارد. برای ساخت حساب جدید کد تایید پیامک شده را وارد کنید
          </h3>
          <div class="pincode-container">
            <input
              autocomplete="one-time-code"
              @keyup="
                $event.key >= 0 && $event.key <= 9
                  ? $event.target.nextElementSibling.focus()
                  : {}
              "
              type="number"
              v-model="num1"
              onKeyPress="if(this.value.length==1) return false;"
              class="pincode-input"
              name=""
              id="num-1"
            />
            <input
              autocomplete="one-time-code"
              @keyup="
                $event.keyCode == 8 && 'this.value.length == 0'
                  ? $event.target.previousElementSibling.focus() &
                    ($event.target.previousElementSibling.value != '' ? (num1 = '') : {})
                  : {};
                $event.key >= 0 && $event.key <= 9
                  ? $event.target.nextElementSibling.focus()
                  : {};
              "
              type="number"
              v-model="num2"
              onKeyPress="if(this.value.length==1) return false;"
              class="pincode-input"
              name=""
              id="num-2"
            />
            <input
              autocomplete="one-time-code"
              @keyup="
                $event.keyCode == 8 && 'this.value.length == 0'
                  ? $event.target.previousElementSibling.focus() &
                    ($event.target.previousElementSibling.value != '' ? (num2 = '') : {})
                  : {};
                $event.key >= 0 && $event.key <= 9
                  ? $event.target.nextElementSibling.focus()
                  : {};
              "
              type="number"
              v-model="num3"
              onKeyPress="if(this.value.length==1) return false;"
              class="pincode-input"
              name=""
              id="num-3"
            />
            <input
              autocomplete="one-time-code"
              type="number"
              v-model="num4"
              @keyup="
                $event.keyCode == 8 && 'this.value.length == 0'
                  ? $event.target.previousElementSibling.focus() &
                    ($event.target.previousElementSibling.value != '' ? (num3 = '') : {})
                  : {};
                $event.key >= 0 && $event.key <= 9 ? login() : {};
              "
              onKeyPress="if(this.value.length==1) return false;"
              class="pincode-input"
              name=""
              id="num-4"
            />
          </div>
          <div class="link-container" v-if="verifType == 'login'">
            <a
              href=""
              type="button"
              @click.prevent="verifCodeLogin = false"
              class="form-link"
              >ورود با رمز عبور</a
            >
          </div>
          <div class="timer-container">
            <span class="timer" v-if="timer"
              >ارسال مجدد کد تا {{ minute < 10 ? "0" + minute : minute }}:{{
                sec < 10 ? "0" + sec : sec
              }}
              دیگر</span
            >
            <div class="link-container align-center" v-else>
              <a class="form-link" href="" type="button" @click.prevent="sendCodeAgain"
                >ارسال مجدد کد</a
              >
            </div>
          </div>
          <button class="enter-btn">
            <div class="empty"></div>
            <span v-if="verifType == 'login'"> ورود به پنل </span>
            <span v-else-if="verifType == 'register'"> ثبت نام </span>
          </button>
        </form>
      </main>
      <div class="empty"></div>
    </template>
    <template v-else>
      <main class="signin-signup-content">
        <form action="" class="form-box" @submit.prevent="passLogin">
          <header class="signin-signup-header">
            <img src="@/static/logo.png" alt="لوگو" />
          </header>
          <h1 class="title">رمز عبور</h1>
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
          <div>
            <div class="link-container">
              <a href="" type="button" @click.prevent="sendCode()" class="form-link"
                >ورود با کد یکبار مصرف</a
              >
            </div>
            <label for="remember-me" class="checkbox-label">
              <span class="checkbox-container">
                <input type="checkbox" name="" class="form-checkbox" id="remember-me" />
                <img
                  src="@/static/panel-student-icons/checkmark-red.svg"
                  class="check-mark"
                  alt="check-icon"
                />
              </span>
              مرا به خاطر بسپار
            </label>
          </div>
          <button class="enter-btn">ورود به پنل</button>
        </form>
        <div class="link-container align-center">
          اگر رمز عبور خود را فراموش کردید،
          <a type="button" @click.prevent="toggleSendByModal" class="form-link">کلیک</a>
          کنید.
        </div>
      </main>
      <div class="empty"></div>
      <div v-if="showSendByModal">
        <sendByModal />
      </div>
    </template>
  </div>
</template>

<script>
import sendByModal from "@/components/modals/send-by-modal";
export default {
  middleware: "userIsLog",
  components: { sendByModal },
  layout: "default",
  head() {
    return {
      title: "verification",
      meta: [{ name: "robots", content: "noindex,nofollow" }],
    };
  },
  beforeCreate() {
    if (this.$store.state.login.phoneNumber == "") {
      this.$router.push("/my/login");
    }
  },
  beforeMount() {
    if (this.$route.params.id) {
      if (this.$route.params.id == "login") {
        this.verifType = "login";
      } else if (this.$route.params.id == "register") {
        this.verifType = "register";
        this.verifCodeLogin = true;
        this.myTimer();
      } else {
        this.$router.push("/my/login");
      }
    }
  },
  mounted() {
    if (this.$route.params.id == "register") {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://trk.tablighdrive.com/pixel/init.action.js";
      document.head.appendChild(script);
    }
    // this.myTimer();
  },
  beforeDestroy() {
    window.clearInterval(this.timerInterval);
  },
  data() {
    return {
      verifCodeLogin: false,
      timerInterval: null,
      num1: "",
      num2: "",
      num3: "",
      num4: "",
      verifyCode: "",
      minute: this.$store.state.timer.minute,
      sec: this.$store.state.timer.sec,
      timer: true,
      verifType: "",
      showSendByModal: false,
      password: "",
    };
  },
  methods: {
    toggleSendByModal() {
      this.showSendByModal = !this.showSendByModal;
    },
    async passLogin() {
      try {
        const loginResponse = await this.$axios.post(
          "/api/Student/StudentAccount/Login",
          {
            phoneNumber: this.$store.state.login.phoneNumber,
            password: this.password,
            verifyCode: null,
          }
        );
        if (
          loginResponse.data.statusCode == 200 &&
          loginResponse.data.message == "Success"
        ) {
          this.$store.dispatch("login/setLoginDetails", loginResponse);
          this.$router.push("/");
        } else {
          this.$swal({
            text: "اطلاعات نامعتبر",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: "تلاش مجدد!",
          });
        }
      } catch (e) {
        this.$swal({
          text: "اطلاعات نامعتبر",
          icon: "warning",
          showCloseButton: true,
          confirmButtonText: "تلاش مجدد!",
        });
      }
    },
    async login() {
      const code = this.num1 + this.num2 + this.num3 + this.num4;
      if (this.$route.params.id == "login") {
        try {
          const loginResponse = await this.$axios.post(
            "/api/Student/StudentAccount/Login",
            {
              phoneNumber: this.$store.state.login.phoneNumber,
              verifyCode: code,
              password: null,
            }
          );
          if ((loginResponse.data.statusCode = 200)) {
            if (loginResponse.data) {
              this.$store.dispatch("login/setLoginDetails", loginResponse);
              this.$router.push("/");
            }
          }
        } catch (e) {
          this.$swal({
            text: "اطلاعات نامعتبر",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: "تلاش مجدد!",
          });
        }
      } else {
        const checkCode = await this.$axios.get(
          "/api/VerifyCode/Validation/" + this.$store.state.login.phoneNumber + "/" + code
        );
        if (checkCode.data.message == "Success" && checkCode.data.statusCode == 200) {
          this.$router.push(`/my/register/${code}`);
        } else {
          this.$swal({
            text: "کد اشتباه وارد شده است",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: "تلاش مجدد!",
          });
        }
      }
    },
    sendCodeAgain() {
      this.$axios.get("/api/VerifyCode/Send/" + this.$store.state.login.phoneNumber);
      this.$store.dispatch("timer/resetCounter");
      this.timer = true;
      this.myTimer();
    },
    sendCode() {
      this.verifCodeLogin = true;
      this.timer = true;
      if (this.timerInterval == null) {
        this.$store.dispatch("timer/resetCounter");
        this.$axios.get("/api/VerifyCode/Send/" + this.$store.state.login.phoneNumber);
        this.myTimer();
      }
    },
    myTimer() {
      this.timerInterval = setInterval(() => {
        this.$store.commit("timer/REDIUS_SEC");
        if (this.sec == 0) {
          if (this.minute != 0) {
            this.$store.commit("timer/REDIUS_MIN");
            this.$store.commit("timer/SET_SEC", 59);
          } else {
            clearInterval(this.timerInterval);
            this.timer = false;
          }
        }
      }, 1000);
    },
  },
  watch: {
    "$store.state.timer.sec": {
      handler() {
        this.sec = this.$store.state.timer.sec;
      },
      deep: true,
    },
    "$store.state.timer.minute": {
      handler() {
        this.minute = this.$store.state.timer.minute;
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
// @import "@/assets/styles/abstracts/variables";
// @import "@/assets/styles/core/reset";
// @import "@/assets/styles/font/fonts";
// @import "@/assets/styles/core/typography";
// @import "@/assets/styles/abstracts/mixins";
// @import "@/assets/styles/components/signin-signup-modal";
@import "@/assets/styles/layout/signin-signup-student";
</style>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
