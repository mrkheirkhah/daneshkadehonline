<template>
  <div>
    <div class="contact-us">
      <div class="banner">
        <div class="bg-image"></div>
        <h2 class="title">تماس با ما</h2>
        <div class="banner-overlay"></div>
      </div>
      <main class="container">
        <div class="contacts row">
          <div
            class="item my-3 col-lg-4 col-12 col-md-6 justify-content-start justify-content-lg-center"
          >
            <img
              src="@/static/images/main-page-images/map-pin-outline.png"
              class="map"
              alt="آدرس"
            />
            <div class="info">
              <span class="title">آدرس ما</span>
              <address class="column has-address">
                <template v-if="loading">
                  <skeleton
                    class="skeleton"
                    width="150px"
                    height="20px"
                    borderRadius="5px"
                  />
                </template>
                <span v-else>
                  {{ contactAddress }}
                </span>
              </address>
            </div>
          </div>
          <div
            class="item my-3 col-lg-4 col-12 col-md-6 justify-content-start justify-content-lg-center"
          >
            <img
              src="@/static/images/main-page-images/mail-outline.png"
              class="mail"
              alt="ایمیل"
            />
            <div class="info">
              <span class="title">ایمیل ما</span>
              <span class="column has-email">
                <template v-if="loading">
                  <skeleton
                    class="skeleton"
                    width="150px"
                    height="20px"
                    borderRadius="5px"
                  />
                  <skeleton
                    class="skeleton mt"
                    width="150px"
                    height="20px"
                    borderRadius="5px"
                  />
                </template>
                <template v-else>
                  <span class="email">{{ firstEmail }}</span>
                  <span class="email">{{ secondEmail }}</span>
                </template>
              </span>
            </div>
          </div>
          <div
            class="item my-3 col-lg-4 col-12 col-md-6 justify-content-start justify-content-lg-center"
          >
            <img
              src="@/static/images/main-page-images/phone-outline.png"
              class="phone"
              alt="شماره تماس"
            />
            <div class="info">
              <span class="title">شماره تماس ما</span>
              <span class="column has-number">
                <template v-if="loading">
                  <skeleton
                    class="skeleton"
                    width="150px"
                    height="20px"
                    borderRadius="5px"
                  />
                  <skeleton
                    class="skeleton mt"
                    width="150px"
                    height="20px"
                    borderRadius="5px"
                  />
                </template>
                <template v-else>
                  <span class="call-number persian-number">{{ firstPhoneNumber }}</span>
                  <span class="call-number persian-number">{{ secondPhoneNumber }}</span>
                </template>
              </span>
            </div>
          </div>
        </div>
        <div class="contacts-form row">
          <div class="col-12 col-md-6 has-form">
            <h3 class="rb-title">فرم تماس با ما</h3>
            <form action="#">
              <label class="form-row" for="user-name">
                <input type="text" placeholder=" " v-model="name" id="user-name" />
                <span class="placeholder">نام و نام خانوادگی</span>
                <img
                  src="@/static/images/main-page-images/account.png"
                  class="user"
                  alt="کاربر"
                />
              </label>
              <label class="form-row" for="user-email">
                <input type="email" placeholder=" " v-model="email" id="user-email" />
                <span class="placeholder">ایمیل</span>
                <img
                  src="@/static/images/main-page-images/form-mail.png"
                  class="email"
                  alt="ایمیل"
                />
              </label>
              <label class="form-row" for="user-message">
                <textarea
                  name=""
                  placeholder=" "
                  v-model="comment"
                  id="user-message"
                  cols=""
                  rows="15"
                ></textarea>
                <span class="placeholder">دیدگاه شما</span>
                <img
                  src="@/static/images/main-page-images/file-text.png"
                  class="file"
                  alt="نظر"
                />
              </label>
              <button class="form-btn" @click.prevent="sendComment">ارسال دیدگاه</button>
            </form>
          </div>
          <div class="col-12 col-md-6">
            <iframe
              :src="mapLink"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import skeleton from "@/components/skeleto-creator";
export default {
  components: { skeleton },
  layout: "mainPages",
  head() {
    return {
      title:
        "دانشکده آنلاین بزرگترین پلتفرم آزاد آموزشی در ایران | تماس با دانشکده آنلاین",
      meta: [
        {
          hid: "description",
          content:
            "- پشتیبانی و پاسخگویی 7 روز هفته و 24 ساعت شبانه روز بدون وقفه - 91305951 -021 | دانشکده آنلاین",
        },
      ],
    };
  },
  data() {
    return {
      contactAddress: "",
      firstEmail: "",
      firstPhoneNumber: "",
      mapLink: "",
      secondEmail: "",
      secondPhoneNumber: "",

      name: "",
      comment: "",
      email: "",
      loading: true,
    };
  },
  mounted() {
    this.getContactData();
  },
  methods: {
    async getContactData() {
      this.loading = true;
      const contactResp = await this.$axios.get("/api/Home/Contact");
      const contactData = contactResp.data.data;
      this.contactAddress = contactData.contactAddress;
      this.firstEmail = contactData.firstEmail;
      this.firstPhoneNumber = contactData.firstPhoneNumber;
      this.mapLink = contactData.mapLink;
      this.secondEmail = contactData.secondEmail;
      this.secondPhoneNumber = contactData.secondPhoneNumber;
      this.loading = false;
    },
    async sendComment() {
      const sendResp = await this.$axios.post("/api/Home/Contact", {
        name: this.name,
        email: this.email,
        text: this.comment,
      });
      if (sendResp.data.statusCode == 200 && sendResp.data.message == "Success") {
        this.$swal({
          text: "ثبت شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
        this.comment = "";
        this.name = "";
        this.email = "";
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
@import "@/assets/styles/pages/contact-us.scss";
</style>
