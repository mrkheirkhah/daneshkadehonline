<template>
  <div>
    <div class="cart-box">
      <div class="container-fluid px-md-3 px-xl-5 container-lg">
        <div class="row">
          <div class="col-12 col-lg-9 p-lg-0">
            <div class="cart-items-container">
              <div
                class="cart-item"
                v-for="item in orders.orderItems"
                :key="item.detailId"
              >
                <img
                  :src="
                    'https://api.daneshkadeonline.ir/Images/Public/Course/' +
                    item.courseImageName
                  "
                  class="course-image"
                  alt="عکس دوره"
                />
                <div class="name-detail">
                  <h5>{{ item.courseName }}</h5>
                  <small>
                    <img
                      src="@/static/images/main-page-images/video-camera.png"
                      alt="آیکون ویدئو"
                    />
                    <span class="persian-number"
                      >تعداد جلسات: {{ item.episodeCount }}</span
                    >
                  </small>
                </div>
                <p class="main-title">دوره</p>
                <span class="persian-number price"
                  >{{ Number(item.price).toLocaleString() }}
                  <span class="currency">تومان</span></span
                >
                <button class="close-btn" @click.prevent="deleteOrder(item.detailId)">
                  حذف
                </button>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-3 mt-3 mt-lg-0">
            <div class="discount-code-box">
              <input
                type="text"
                placeholder="کد تخفیف"
                v-model="discountCode"
                class="discount-code persian-number"
              />
              <button class="apply" @click.prevent="submitDiscount">اعمال</button>
            </div>
            <div class="factor">
              <ul class="list">
                <li>
                  <span>مبلغ کل:</span>
                  <span class="persian-number price"
                    >{{ Number(orders.sum).toLocaleString() }}
                    <span class="currency">تومان</span></span
                  >
                </li>
                <li>
                  <span>تخفیف:</span>
                  <span class="persian-number price"
                    >{{ Number(orders.discount).toLocaleString() }}
                    <span class="currency">تومان</span></span
                  >
                </li>
                <li>
                  <span>قابل پرداخت:</span>
                  <span class="persian-number price"
                    >{{ Number(orders.finalPrice).toLocaleString() }}
                    <span class="currency">تومان</span></span
                  >
                </li>
              </ul>
              <footer>
                <form action="https://sep.shaparak.ir/OnlinePG/OnlinePG" method="post">
                  <input type="hidden" name="Token" v-bind:value="Tokenforpay" />
                  <input
                    name="GetMethod"
                    type="text"
                    value="true"
                    style="visibility: hidden"
                  />
                  <a class="pay" v-if="this.orders.finalPrice > 0">
                    <button type="submit" @click="this.getOrders()">
                      پرداخت صورت حساب
                    </button>
                  </a>
                  <a class="pay" v-else>
                    <button type="reset">پرداخت صورت حساب</button>
                  </a>
                </form>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "mainPages",
  middleware: "mainPage",
  data() {
    return {
      orders: "",
      discountCode: "",
      Tokenforpay: "",
    };
  },
  mounted() {
    this.getOrders();
  },
  methods: {
    async getOrders() {
      const order = await this.$axios.get("/api/Student/StudentOrder/GetOrder", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      const pay = await this.$axios.get(
        `/api/Payment/GenerateTokenOrder/${order.data.data.orderId}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      this.Tokenforpay = pay.data.data;
      if (order.data.statusCode == 200 && order.data.message == "Success") {
        this.orders = order.data.data;
      }
    },
    async deleteOrder(id) {
      const deleteResp = await this.$axios.delete(
        `/api/Student/StudentOrder/RemoveItem/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (deleteResp.data.statusCode == 200 && deleteResp.data.message == "Success") {
        this.getOrders();
      }
    },
    async submitDiscount() {
      const discode = await this.$axios.get(
        `/api/Student/StudentOrder/UseDiscount/${this.orders.orderId}/${this.discountCode}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        discode.data.data == "Success" ||
        (discode.data.data == "UserUsed" && discode.data.isSuccess == true)
      ) {
        this.getOrders();
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
@import "@/assets/styles/pages/cart.scss";
</style>
