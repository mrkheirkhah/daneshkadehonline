<template>
  <div class="signin-signup">
    <main class="signin-signup-content">
      <form action="" class="form-box">
        <header class="signin-signup-header">
          <img src="@/static/logo.png" alt="لوگو" />
        </header>
        <h1 class="title">رمز عبور جدید</h1>
        <label for="new-teacher-password" class="input-label">
          <input
            type="password"
            name=""
            v-model="password"
            id="new-teacher-password"
            placeholder="رمز عبور جدید خود را وارد کنید"
          />
          <span class="icon-container">
            <img src="@/static/panel-teacher-icons/lock-icon.svg" alt="آیکون قفل" />
          </span>
        </label>
        <label for="teacher-repeat-new-password" class="input-label">
          <input
            type="password"
            name=""
            v-model="repeatPassword"
            id="teacher-repeat-new-password"
            placeholder="تائید رمز عبور"
          />
          <span class="icon-container">
            <img src="@/static/panel-teacher-icons/lock-icon.svg" alt="آیکون قفل" />
          </span>
        </label>

        <button class="enter-btn" @click.prevent="changePass" :disabled="isSending">
          تغییر رمز
        </button>
      </form>
    </main>
    <div class="empty"></div>
  </div>
</template>

<script>
export default {
  middleware: "userIsLog",
  layout: "withoutSidebar",
  mounted() {
    if (this.$route.params.id == undefined) {
      this.$router.push("/login");
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
      isSending: false,
    };
  },
  methods: {
    async changePass() {
      this.isSending = true;
      try {
        const changePassResp = await this.$axios.post(
          "/api/Teacher/TeacherAccount/UpdatePassword",
          {
            accessToken: this.$route.params.id,
            newPassword: this.password,
            reNewPassword: this.repeatPassword,
          }
        );
        if (changePassResp.status == 200) {
          this.$router.push("/login");
        } else {
          console.log(changePassResp);
        }
      } catch (e) {
        console.log(e);
      }
      this.isSending = false;
    },
  },
};
</script>
