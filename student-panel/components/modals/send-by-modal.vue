<template>
  <div class="signin-signup-modal">
    <div class="content-box">
      <header>
        <div class="empty"></div>
        <h2 class="title">ارسال به...</h2>
        <button @click="$parent.toggleSendByModal" class="close-btn">&times;</button>
      </header>
      <a
        href=""
        type="button"
        @click.prevent="
          sendCodeWithSms();
          $parent.toggleSendByModal();
        "
        class="send-via-mobile form-btn red-color-outline"
        >موبایل</a
      >
      <a
        href=""
        type="button"
        @click.prevent="
          sendCodeWithEmail();
          $parent.toggleSendByModal;
        "
        class="send-via-mobile form-btn red-color"
        >ایمیل</a
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async sendCodeWithSms() {
      const sendWithSms = await this.$axios.get(
        "/api/Student/StudentAccount/SendRecoveryPassword/" +
          this.$store.state.login.phoneNumber +
          "/sms"
      );
    },
    async sendCodeWithEmail() {
      const sendWithSms = await this.$axios.get(
        "/api/Student/StudentAccount/SendRecoveryPassword/" +
          this.$store.state.login.phoneNumber +
          "/email"
      );
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/components/signin-signup-modal";
</style>
