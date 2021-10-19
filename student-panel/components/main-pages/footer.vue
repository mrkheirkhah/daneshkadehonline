<template>
  <footer class="school-footer">
    <div class="container-fluid px-md-5">
      <div class="row d-md-flex justify-content-evenly">
        <div class="col-sm-6 col-lg-3 col-12 px-md-5 px-4 my-sm-1 my-2">
          <div class="header">
            <h5 class="list-title">راهنمای مشتریان</h5>
          </div>
          <ul>
            <li><nuxt-link to="/frequent-questions">پرسش های متداول</nuxt-link></li>
            <li><nuxt-link to="/about-us">درباره ما</nuxt-link></li>
            <li><nuxt-link to="/contact-us">تماس با ما</nuxt-link></li>
            <!-- <li><a href="#">شرایط استفاده</a></li>
            <li><a href="#">مشتریان</a></li> -->
          </ul>
        </div>
        <div class="col-sm-6 col-lg-3 col-12 px-md-5 px-4 my-sm-1 my-2">
          <div class="header">
            <h5 class="list-title">دسترسی</h5>
          </div>
          <ul>
            <li><a href="https://panel.daneshkadeonline.ir/">ورود مدرس</a></li>
            <li><nuxt-link to="/my/login">ورود دانشجو</nuxt-link></li>
            <!-- <li><a href="#">اشتراک</a></li> -->
            <li><nuxt-link to="/work-with-us">همکاری با ما</nuxt-link></li>
            <li><a href="https://mag.daneshkadeonline.ir" target="_blank">مقالات</a></li>
          </ul>
        </div>
        <div class="col-sm-6 col-lg-3 col-12 px-md-5 px-4 my-sm-1 my-2">
          <div class="header">
            <h5 class="list-title">دوره ها</h5>
          </div>
          <ul>
            <li>
              <nuxt-link :to="{ path: '/', hash: '#packages-part' }">پکیچ ها</nuxt-link>
            </li>
            <li><nuxt-link to="/#amazing">شگفت انگیز ها </nuxt-link></li>
            <li><nuxt-link to="/#newest">جدید ترین ها</nuxt-link></li>
            <li><nuxt-link to="/#popular">محبوب ترین ها</nuxt-link></li>
            <li><nuxt-link to="/#visited">پر بازدید ترین ها</nuxt-link></li>
            <li><nuxt-link to="/#latest-news">آخرین اخبار</nuxt-link></li>
          </ul>
        </div>
        <div class="col-sm-6 col-lg-3 col-12 px-md-5 px-4 my-sm-1 my-2">
          <div class="header">
            <h5 class="list-title">راهنمای مشتریان</h5>
          </div>
          <ul>
            <li><nuxt-link to="/frequent-questions">پرسش های متداول</nuxt-link></li>
            <li><nuxt-link to="/about-us">درباره ما</nuxt-link></li>
            <li><a href="#">شرایط استفاده</a></li>
            <li><a href="#">مشتریان</a></li>
          </ul>
        </div>
      </div>

      <div class="row bottom-box">
        <div
          class="col-12 col-lg-6 d-flex align-items-center justify-content-between flex-column flex-sm-row justify-content-sm-start mb-4 m-sm-0"
        >
          <div class="address-box">
            <img src="@/static/images/main-page-images/location.png" alt="آدرس" />
            <address>{{ siteInfo.address }}</address>
          </div>
          <div class="mobile-box">
            <img src="@/static/images/main-page-images/phone-call.png" alt="شماره تماس" />
            <a href="tel:02191305951" class="call persian-number">021-91305951</a>
          </div>
        </div>
        <div
          class="col-12 col-lg-5 d-flex align-items-center flex-column flex-sm-row justify-content-between"
        >
          <div class="social-media">
            <a :href="siteInfo.youtube" target="blank" class="youtube"> Youtube </a>
            <a :href="siteInfo.aparat" target="blank">
              <svg
                class="twitter"
                xmlns="http://www.w3.org/2000/svg"
                width="39.333"
                height="32.474"
                viewBox="0 0 39.333 32.474"
              >
                <path
                  d="M14.966,32.474C8.4,32.474,3.213,31.327.73,29.327l-.048-.039-.044-.044a2.019,2.019,0,0,1-.53-2.123l.023-.063a2.056,2.056,0,0,1,1.876-1.291A16.95,16.95,0,0,0,6.49,25.15a8.507,8.507,0,0,1-4.483-5.18,1.836,1.836,0,0,1,.641-2.141,1.874,1.874,0,0,1,.559-.286A12.405,12.405,0,0,1,.663,12.984l-.015-.051-.011-.052a1.912,1.912,0,0,1,.886-2.052,1.9,1.9,0,0,1,.907-.256A9.591,9.591,0,0,1,1.7,8.363,9.249,9.249,0,0,1,2.689,2.2l.244-.488a1.36,1.36,0,0,1,2.179-.354l.444.445C9.067,5.484,12.212,7.231,17.65,8.426a9.634,9.634,0,0,1,2.6-5.554A9.125,9.125,0,0,1,26.765,0h.016a13.051,13.051,0,0,1,5.386,1.753c1.159-.379,2.555-.967,4-1.587a1.829,1.829,0,0,1,2.047.36,1.8,1.8,0,0,1,.39,1.975q-.158.44-.358.862a1.832,1.832,0,0,1,.533.368,1.978,1.978,0,0,1,.492,1.849l-.018.063A7.546,7.546,0,0,1,36.225,9.8c-.236,12.544-9.682,22.669-21.259,22.669ZM2.942,28.043c2.339,1.323,6.8,2.124,12.024,2.124a18.011,18.011,0,0,0,13.352-6.075A21.764,21.764,0,0,0,33.923,9.324V9.261a1.359,1.359,0,0,1,.725-1.2,4.9,4.9,0,0,0,2.12-2.345,1.36,1.36,0,0,1-1.31-2.142,7.488,7.488,0,0,0,.514-.814c-1.251.525-2.439,1-3.471,1.31a1.475,1.475,0,0,1-1.135-.122,11.238,11.238,0,0,0-4.578-1.638,7.172,7.172,0,0,0-6.9,7.268,1.361,1.361,0,0,1-1.624,1.335C12,9.675,8.281,7.823,4.418,3.941a6.81,6.81,0,0,0-.449,3.982,8.416,8.416,0,0,0,2,3.873,1.36,1.36,0,0,1-1.373,2.211,6.23,6.23,0,0,1-1.268-.487,11.491,11.491,0,0,0,3.94,4.569,1.36,1.36,0,0,1-.87,2.478,6.115,6.115,0,0,1-1.805-.39,6.2,6.2,0,0,0,4.95,3.507,1.36,1.36,0,0,1,.4,2.543,16.344,16.344,0,0,1-7,1.815Zm0,0"
                  transform="translate(0 0)"
                />
              </svg>
            </a>
            <a :href="siteInfo.linkedIn" target="blank">
              <svg
                class="linkedin"
                xmlns="http://www.w3.org/2000/svg"
                width="35.041"
                height="39.333"
                viewBox="0 0 35.041 39.333"
              >
                <path
                  data-name="Path 89153"
                  d="M8.478,151.625H1.848A1.35,1.35,0,0,0,.5,152.973v24.989a1.349,1.349,0,0,0,1.348,1.348H8.478a1.349,1.349,0,0,0,1.348-1.348V152.973A1.349,1.349,0,0,0,8.478,151.625ZM7.518,177H2.808V153.933H7.518Zm0,0"
                  transform="translate(-0.461 -139.977)"
                />
                <path
                  data-name="Path 89154"
                  d="M4.7,0A4.7,4.7,0,1,0,9.4,4.7,4.707,4.707,0,0,0,4.7,0Zm0,7.1A2.394,2.394,0,1,1,7.1,4.7,2.4,2.4,0,0,1,4.7,7.1Zm0,0"
                />
                <path
                  data-name="Path 89155"
                  d="M176.549,154.559a8.6,8.6,0,0,0-5.672-1.992,8.7,8.7,0,0,0-3.684.9v-.546a1.288,1.288,0,0,0-1.287-1.287h-6.751a1.287,1.287,0,0,0-1.287,1.287v25.11a1.287,1.287,0,0,0,1.287,1.287h6.885a1.154,1.154,0,0,0,1.154-1.154V163.189a2.388,2.388,0,0,1,2.284-2.4,2.358,2.358,0,0,1,2.427,2.354v15.045a1.13,1.13,0,0,0,1.13,1.13h6.617a1.13,1.13,0,0,0,1.13-1.13V163.6a11.744,11.744,0,0,0-4.231-9.038Zm1.923,22.447h-4.26V163.139a4.663,4.663,0,0,0-9.327,0v13.867h-4.71V153.937h4.71v1.677h0a1.153,1.153,0,0,0,1.918.864,6.394,6.394,0,0,1,4.115-1.6,6.289,6.289,0,0,1,4.151,1.457,9.441,9.441,0,0,1,3.4,7.266Zm0,0"
                  transform="translate(-145.74 -139.981)"
                />
              </svg>
            </a>
            <a :href="siteInfo.instagram" target="blank">
              <svg
                class="instagram"
                data-name="instagram (14)"
                xmlns="http://www.w3.org/2000/svg"
                width="39.333"
                height="39.333"
                viewBox="0 0 39.333 39.333"
              >
                <path
                  data-name="Path 89150"
                  d="M28.685,0H10.646A10.659,10.659,0,0,0,0,10.647V28.686A10.659,10.659,0,0,0,10.646,39.333H28.686A10.659,10.659,0,0,0,39.332,28.686V10.647A10.659,10.659,0,0,0,28.685,0Zm8.341,28.686a8.351,8.351,0,0,1-8.341,8.341H10.646A8.351,8.351,0,0,1,2.3,28.686V10.647a8.351,8.351,0,0,1,8.341-8.341H28.686a8.351,8.351,0,0,1,8.341,8.341Zm0,0"
                  transform="translate(0.001 0)"
                />
                <path
                  data-name="Path 89151"
                  d="M126.759,116a10.755,10.755,0,1,0,10.755,10.755A10.767,10.767,0,0,0,126.759,116Zm0,19.2a8.449,8.449,0,1,1,8.449-8.449A8.459,8.459,0,0,1,126.759,135.208Zm0,0"
                  transform="translate(-107.092 -107.092)"
                />
                <path
                  data-name="Path 89152"
                  d="M361.155,66.285a3.178,3.178,0,1,0,3.178,3.178A3.182,3.182,0,0,0,361.155,66.285Zm0,4.05a.872.872,0,1,1,.872-.872A.873.873,0,0,1,361.155,70.335Zm0,0"
                  transform="translate(-330.476 -61.193)"
                />
              </svg>
            </a>
            <a :href="siteInfo.facebook" target="blank">
              <svg
                class="facebook"
                xmlns="http://www.w3.org/2000/svg"
                width="22.325"
                height="39.333"
                viewBox="0 0 22.325 39.333"
              >
                <path
                  d="M14.29,39.333h-6.3a1.91,1.91,0,0,1-1.908-1.908V23.218H2.408A1.91,1.91,0,0,1,.5,21.31V15.222a1.91,1.91,0,0,1,1.908-1.908H6.083V10.265A10.38,10.38,0,0,1,8.828,2.828,9.886,9.886,0,0,1,16.116,0l4.8.008a1.911,1.911,0,0,1,1.9,1.908V7.568a1.91,1.91,0,0,1-1.907,1.908H17.683c-.986,0-1.238.2-1.291.258-.089.1-.194.385-.194,1.169v2.409h4.476a1.939,1.939,0,0,1,.944.24,1.915,1.915,0,0,1,.982,1.669l0,6.088a1.91,1.91,0,0,1-1.908,1.907H16.2V37.425a1.91,1.91,0,0,1-1.908,1.908Zm-5.9-2.306h5.5V22.185a1.275,1.275,0,0,1,1.274-1.274h5.126l0-5.292H15.166a1.275,1.275,0,0,1-1.274-1.274V10.9a3.927,3.927,0,0,1,.772-2.7,3.908,3.908,0,0,1,3.019-1.038h2.836V2.313l-4.4-.007c-4.765,0-7.726,3.05-7.726,7.96v4.081A1.275,1.275,0,0,1,7.115,15.62H2.806v5.292H7.115a1.275,1.275,0,0,1,1.274,1.274ZM20.916,2.313h0Zm0,0"
                  transform="translate(-0.5 0)"
                />
              </svg>
            </a>
          </div>
          <div class="confirmation">
            <img
              referrerpolicy="origin"
              id="nbqejzpenbqejzpeapfujxlz"
              style="cursor: pointer; width: 55px; height: 66.25px; border-radius: 4px"
              @click.prevent="namad"
              alt="نماد نشان ثبت ملی"
              src="@/static/images/main-page-images/melli-neshan.png"
            />
            <a
              referrerpolicy="origin"
              target="_blank"
              href="https://trustseal.enamad.ir/?id=230436&amp;Code=UTxMLiCPsotcoSHWB8rV"
              ><img
                referrerpolicy="origin"
                src="@/static/images/main-page-images/e-namad.png"
                alt="نماد اعتماد الکترونیکی"
                style="cursor: pointer"
                id="UTxMLiCPsotcoSHWB8rV"
            /></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      siteInfo: "",
    };
  },
  async mounted() {
    const siteInfo = await this.$axios.get("/api/Home/FooterInfo");
    if (siteInfo.data.statusCode == 200 && siteInfo.data.message == "Success") {
      this.siteInfo = siteInfo.data.data;
    }
  },
  methods: {
    namad() {
      window.open(
        "https://logo.samandehi.ir/Verify.aspx?id=272751&p=uiwkjyoeuiwkjyoedshwrfth",
        "Popup",
        "toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30"
      );
    },
  },
};
</script>
<style lang="scss">
.call.persian-number {
  transition: all 0.5s;
}
.call.persian-number:hover {
  color: #e13535 !important;
}
</style>
