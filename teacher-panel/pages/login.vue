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
              type="number"
              name=""
              :class="wrongNumber ? 'red' : ''"
              id="mobile-number"
              placeholder="شماره موبایل خود را وارد کنید"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="11"
            />
            <span class="icon-container">
              <img
                src="@/static/panel-teacher-icons/smartphone-icon.svg"
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
  layout: "withoutSidebar",
  data() {
    return {
      phoneNumber: "",
      showModal: false,
      wrongNumber: false,
    };
  },
  head() {
    return {
      title: "login",
    };
  },
  methods: {
    async setNumberForVerify() {
      if (this.phoneNumber != "" && this.phoneNumber.length == 11) {
        this.$store.commit("login/SET_PHONE_NUMBER", this.phoneNumber);
        const getTeacherExist = await this.$axios.get(
          "/api/Teacher/TeacherAccount/CheckTeacherExist/" + this.phoneNumber
        );
        if (
          getTeacherExist.data.message == "Success" &&
          getTeacherExist.data.statusCode == 200
        ) {
          // this.$axios.get("/api/VerifyCode/Send/" + this.phoneNumber);
          this.$router.push("/verification-code/login");
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
      this.$router.push("/verification-code/register");
    },
    toggleModal() {
      this.showModal = !this.showModal;
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
@import "@/assets/styles/swal-style.scss";
</style>
