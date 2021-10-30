<template>
  <div class="signin-signup">
    <main class="signin-signup-content">
      <form action="" class="form-box" @submit.prevent="changePass">
        <header class="signin-signup-header">
          <img src="@/static/logo.png" alt="لوگو" />
        </header>
        <h1 class="title">رمز عبور جدید</h1>
        <label for="new-teacher-password" class="input-label">
          <input
            type="password"
            name="new-password"
            v-model="password"
            id="new-teacher-password"
            autocomplete="new-password"
            placeholder="رمز عبور جدید خود را وارد کنید"
          />
          <span class="icon-container">
            <img src="@/static/panel-student-icons/lock-icon.svg" alt="آیکون قفل" />
          </span>
        </label>
        <label for="teacher-repeat-new-password" class="input-label">
          <input
            type="password"
            name="repeat-new-password"
            autocomplete="repeat-new-password"
            v-model="repeatPassword"
            id="teacher-repeat-new-password"
            placeholder="تائید رمز عبور"
          />
          <span class="icon-container">
            <img src="@/static/panel-student-icons/lock-icon.svg" alt="آیکون قفل" />
          </span>
        </label>

        <button class="enter-btn">
          <div class="empty"></div>
          تغییر رمز
        </button>
      </form>
    </main>
    <div class="empty"></div>
  </div>
</template>

<script>
export default {
  // middleware: "userIsLog",
  layout: "default",
  mounted() {
    if (this.$route.params.id == undefined) {
      this.$router.push("/my/login");
    }
  },
  head() {
    return {
      title: "بازیابی رمز عبور",
    };
  },
  data() {
    return {
      password: "",
      repeatPassword: "",
    };
  },
  methods: {
    async changePass() {
      try {
        const changePassResp = await this.$axios.post(
          "/api/Student/StudentAccount/UpdatePassword",
          {
            accessToken: this.$route.params.id,
            newPassword: this.password,
            reNewPassword: this.repeatPassword,
          }
        );
        console.log(changePassResp);
        if (
          changePassResp.statusCode == 200 &&
          changePassResp.data.message == "Success"
        ) {
          this.$store.dispatch("login/clearToken");
          this.$router.push("/my/login");
        } else if (
          changePassResp.statusCode == 404 &&
          changePassResp.data.message == "NotFound"
        ) {
          this.$swal({
            text: "لینک وارد شده صحیح نمیباشد",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "تلاش مجدد!",
          });
        } else if (
          changePassResp.statusCode == 400 &&
          changePassResp.data.message == "تکرار رمز عبور صحیح نمی باشد"
        ) {
          this.$swal({
            text: "تکرار رمز عبور صحیح نمی باشد",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "تلاش مجدد!",
          });
        } else {
          this.$swal({
            text: "مشکلی رخ داده است! کمی بعد دوباره امتحان کنید",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "تلاش مجدد!",
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
//
<style lang="scss" scoped>
@import "@/assets/styles/layout/signin-signup-student";
</style>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
