<template>
  <div>
    <div class="signin-signup">
      <main class="signin-signup-content">
        <form action="" class="form-box" @submit.prevent="setNumberForVerify">
          <header class="signin-signup-header">
            <img src="@/static/logo.png" alt="لوگو" />
          </header>
          <h1 class="title">ورود / ثبت نام</h1>
          <label for="mobile-number" class="input-label">
            <input
              v-model="phoneNumber"
              type="tel"
              name=""
              id="mobile-number"
              :class="wrongNumber ? 'red' : ''"
              placeholder="شماره موبایل خود را وارد کنید"
              maxlength="11"
            />
            <span class="icon-container">
              <img
                src="@/static/panel-student-icons/smartphone-icon.svg"
                alt="آیکون موبایل"
              />
            </span>
            <p class="wrong-text" v-if="wrongNumber">شماره خود را صحیح وارد کنید</p>
          </label>

          <a class="enter-btn" @click.prevent="setNumberForVerify"> ادامه </a>
        </form>
      </main>
      <div class="empty"></div>
    </div>
    <!-- <template v-if="showModal">
      <div class="signin-signup-modal">
        <div class="content-box">
          <header>
            <div class="empty"></div>
            <h2 class="title">حساب کاربری با این نام پیدا نشد</h2>
            <button class="close-btn" @click.prevent="toggleModal">&times;</button>
          </header>
          <a
            href=""
            type="button"
            @click.prevent="
              goToREgister();
              toggleModal();
            "
            class="send-via-mobile form-btn red-color-outline"
            >ثبت نام</a
          >
          <a
            href=""
            type="button"
            @click.prevent="toggleModal"
            class="send-via-mobile form-btn red-color"
            >لغو</a
          >
        </div>
      </div>
    </template> -->
  </div>
</template>

<script>
export default {
  middleware: "userIsLog",
  layout: "default",
  data() {
    return {
      phoneNumber: "",
      showModal: false,
      wrongNumber: false,
    };
  },
  mounted() {
    document.querySelector("body").style.backgroundColor = "#f3f3f3";
  },
  head() {
    return {
      title: "ورود / ثبت نام | دانشکده آنلاین",
      script: [
        {
          src: "https://trk.tablighdrive.com/pixel/init.action2.js",
        },
      ],
      meta: [{ name: "robots", content: "noindex, nofollow" }],
    };
  },
  methods: {
    async setNumberForVerify() {
      if (this.phoneNumber != "") {
        this.$store.commit("login/SET_PHONE_NUMBER", this.phoneNumber);
        const getTeacherExist = await this.$axios.get(
          "/api/Student/StudentAccount/CheckStudentExist/" + this.phoneNumber
        );
        if (
          getTeacherExist.data.message == "Success" &&
          getTeacherExist.data.statusCode == 200
        ) {
          // this.$axios.get("/api/VerifyCode/Send/" + this.phoneNumber);
          this.$router.push("/my/verification-code/login");
        } else if (
          getTeacherExist.data.message == "NotFound" &&
          getTeacherExist.data.statusCode == 404
        ) {
          this.goToRegister();
        }
      } else {
        this.wrongNumber = true;
      }
    },
    goToRegister() {
      this.$axios.get("/api/VerifyCode/Send/" + this.phoneNumber);
      this.$router.push("/my/verification-code/register");
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
