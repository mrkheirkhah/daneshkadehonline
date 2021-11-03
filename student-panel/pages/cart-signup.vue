<template>
  <div class="cart-box">
    <div class="container-fluid px-md-3 px-xl-5 container-lg">
      <div class="row">
        <div class="col-12 col-lg-9 p-lg-0">
          <form action="#" class="cart-signup-form">
            <div class="form-row" v-if="!register">
              <div class="form-row-col">
                <input type="text" v-model="name" placeholder="نام و نام خانوادگی" />
              </div>
              <div class="form-row-col">
                <input type="tel" v-model="phoneNumber" placeholder="شماره موبایل" />
              </div>
            </div>
            <div class="form-row" v-else>
              <div class="form-row-col">
                <input type="number" placeholder="کد تائید را وارد کنید" />
              </div>
              <div class="form-row-col hint-edit">
                <p>
                  ارسال کد تائید به شماره <span>{{ phoneNumber }}</span>
                </p>
                <a
                  type="button"
                  href=""
                  @click.prevent="backToEdit"
                  class="change-mobile-number"
                  >ویرایش شماره موبایل!</a
                >
              </div>
            </div>
          </form>
        </div>
        <div class="col-12 col-lg-3 mt-3 mt-lg-0">
          <div class="factor">
            <ul class="list">
              <li>
                <span>مبلغ کل:</span>
                <span class="persian-number price"
                  >130000 <span class="currency">تومان</span></span
                >
              </li>
              <li>
                <span>تخفیف:</span>
                <span class="persian-number price"
                  >6500 <span class="currency">تومان</span></span
                >
              </li>
              <li>
                <span>قابل پرداخت:</span>
                <span class="persian-number price"
                  >123500 <span class="currency">تومان</span></span
                >
              </li>
            </ul>
            <footer>
              <a type="button" @click="chackNumber" class="confirm" v-if="!register"
                >تائید شماره موبایل</a
              >
              <a type="button" @click="payAndBuy" class="confirm" v-else
                >پرداخت صورت حساب</a
              >
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      phoneNumber: "",
      register: false,
    };
  },
  layout: "mainPages",
  middleware: "mainPage",
  methods: {
    async chackNumber() {
      const student = await this.$axios.get(
        `/api/Student/StudentAccount/CheckStudentExist/${this.phoneNumber}`
      );
      if (student.data.statusCode == 200 && student.data.message == "Success") {
        console.log("go to buy");
      } else if (student.data.statusCode == 404 && student.data.message == "NotFound") {
        this.$axios.get("/api/VerifyCode/Send/" + this.phoneNumber);
        this.register = true;
      }
    },
    backToEdit() {
      this.register = false;
    },
    payAndBuy() {},
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
@import "@/assets/styles/pages/cart.scss";
</style>
