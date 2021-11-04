<template>
  <div class="signin-signup">
    <main class="signin-signup-content">
      <form action="" class="form-box">
        <header class="signin-signup-header">
          <a href="#" class="logo-container">
            <img src="@/static/logo.png" alt="لوگو" />
            <span>دانشکده آنلاین</span>
          </a>
        </header>
        <h1 class="title">پنل ادمین</h1>

        <label for="mobile-number" class="input-label">
          <input
            type="tel"
            v-model="phoneNumber"
            name=""
            @keyup="justNumber"
            ref="mobileNumber"
            id="mobile-number"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="11"
            placeholder="شماره موبایل خود را وارد کنید"
            required
          />
          <span class="icon-container">
            <img src="@/static/icons/smartphone-icon.svg" alt="آیکون موبایل" />
          </span>
        </label>

        <label for="admin-password" class="input-label">
          <input
            type="password"
            name=""
            v-model="password"
            id="admin-password"
            placeholder="رمز عبور خود را وارد کنید"
            required
          />
          <span class="icon-container">
            <img src="@/static/icons/lock-icon.svg" alt="آیکون قفل" />
          </span>
        </label>

        <button class="enter-btn" @click.prevent="login()">ورود به پنل</button>
      </form>
    </main>
    <div class="empty"></div>
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: "ورود ادمین",
      meta: [{ name: "robots", content: "noindex,nofollow" }],
    };
  },
  middleware: "userIsLog",
  data() {
    return {
      password: "",
      phoneNumber: "",
    };
  },
  methods: {
    async login() {
      const loginResponse = await this.$axios.post("/api/Admin/AdminAccount/Login", {
        phoneNumber: this.phoneNumber,
        password: this.password,
      });
      if (
        loginResponse.data.statusCode == 200 &&
        loginResponse.data.message == "Success"
      ) {
        this.$store.dispatch("login/setLoginDetails", loginResponse);

        this.$router.push("/");
      } else if (
        loginResponse.data.statusCode == 404 &&
        loginResponse.data.message == "NotFound"
      ) {
        this.$swal({
          text: "اطلاعات نامعتبر",
          icon: "error",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
      }
    },
    justNumber() {
      this.$refs.mobileNumber.value = this.$refs.mobileNumber.value.replace(
        /[^0-9]/g,
        ""
      );
    },
  },
  watch: {
    phoneNumber: {
      handler() {
        if (this.phoneNumber[0] != 0) {
          this.phoneNumber = "";
        }
        if (this.phoneNumber.length >= 2) {
          if (this.phoneNumber[1] != 9) {
            this.phoneNumber = this.phoneNumber[0];
          }
        }
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
