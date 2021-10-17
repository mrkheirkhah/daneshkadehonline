<template>
  <div class="signin-signup">
    <main class="signin-signup-content">
      <form action="" class="form-box" @submit.prevent="login">
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
            <nuxt-link to="/my/verification-code/login" class="form-link"
              >ورود با کد یکبار مصرف</nuxt-link
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
  </div>
</template>

<script>
import sendByModal from "@/components/modals/send-by-modal";
export default {
  layout: "default",
  middleware: "userIsLog",
  components: { sendByModal },
  head() {
    return {
      title: "login with password",
    };
  },
  data() {
    return {
      showSendByModal: false,
      password: "",
    };
  },
  beforeCreate() {
    if (this.$store.state.login.phoneNumber == "") {
      this.$router.push("/my/login");
    }
  },
  methods: {
    toggleSendByModal() {
      this.showSendByModal = !this.showSendByModal;
    },
    async login() {
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
          this.$router.push("/my/");
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
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
// @import '@/assets/styles/layout/signin-signup-student';
</style>
