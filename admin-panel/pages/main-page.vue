<template>
  <div class="panel-admin-content-item main-page">
    <header>
      <p class="section-header">صفحه اصلی</p>
    </header>
    <form action="">
      <div class="form-row">
        <label
          for=""
          class="form-row-col in-panel floated-list-container"
          @click="toggleDropdown"
        >
          <input
            type="text"
            class="form-input"
            readonly
            :value="selectedHeader"
            placeholder="انتخاب هدر"
          />
          <ul class="floated-list custom-scrollbar">
            <li @click="selectHeader($event, 1)">هدر بالا</li>
            <li @click="selectHeader($event, 2)">هدر پائین</li>
          </ul>
        </label>
        <label for="" class="form-row-col">
          <input
            type="text"
            class="form-input"
            v-model="headerTitle"
            placeholder="عنوان"
          />
        </label>
      </div>
      <div class="form-row">
        <label for="" class="form-row-col">
          <textarea
            name=""
            cols="22"
            rows="0"
            placeholder="توضیحات"
            v-model="headerDescription"
            class="form-input form-textarea"
          ></textarea>
        </label>
        <label for="" class="form-row-col">
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              v-model="buttonName"
              placeholder="نام دکمه"
            />
          </label>
          <div for="" class="form-row-col darken-color">
            <div class="separator pseudo-form-input">
              <input type="file" id="upload-header-vector" @change="uploadVector" />
              <span v-if="vectorName == ''">آپلود وکتور</span>
              <span v-else>{{ vectorName }}</span>
              <span>
                <label for="upload-header-vector" class="cover-btn">انتخاب</label>
              </span>
            </div>
          </div>
        </label>
      </div>
      <button class="form-btn success" @click.prevent="uploadLanding">تائید</button>

      <div class="section-title">
        <svg
          class="dashed-line"
          width="100%"
          height="15"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            stroke-dasharray="10, 5"
            x1="0"
            y1="10"
            x2="100%"
            y2="10"
            style="stroke: rgb(112, 112, 112)"
          ></line>
        </svg>
        <p class="section-title-text">آپلود تبلیغات</p>
      </div>
      <div class="shegeft mb-5">
        <div>
          <p class="section-header">شگفت انگیز</p>
        </div>
        <form action="">
          <div class="form-row radios-container">
            <div>
              <input
                type="radio"
                class="form-radio"
                name="course-setting"
                id="active-shegeft-radio"
                value="true"
                v-model="shegeftRadio"
              />
              <label for="active-shegeft-radio">فعال</label>
              <label for="active-shegeft-radio" class="radio-overlay"></label>
            </div>
            <div>
              <input
                type="radio"
                class="form-radio"
                name="course-setting"
                id="inactive-shegeft-radio"
                value="false"
                v-model="shegeftRadio"
              />
              <label for="inactive-shegeft-radio">غیر فعال</label>
              <label for="inactive-shegeft-radio" class="radio-overlay"></label>
            </div>
          </div>
          <div class="form-row">
            <div for="" class="form-row-col darken-color">
              <div class="separator pseudo-form-input">
                <input
                  type="file"
                  id="upload-ads-shegeft"
                  @change="uploadShegeftBanner"
                />
                <span v-if="ShegeftBannerName == ''">آپلود تبلیغ</span>
                <span v-else>{{ ShegeftBannerName }}</span>
                <span>
                  <label for="upload-ads-shegeft" class="cover-btn">انتخاب</label>
                </span>
              </div>
            </div>
            <div for="" class="form-row-col darken-color">
              <div class="separator pseudo-form-input">
                <span>انتخاب دوره ها</span>
                <span>
                  <nuxt-link to="/select-amazing" class="cover-btn">انتخاب</nuxt-link>
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="mahboob my-5">
        <div>
          <p class="section-header">محبوب ترین ها</p>
        </div>
        <form action="">
          <div class="form-row radios-container">
            <div>
              <input
                type="radio"
                class="form-radio"
                name="course-setting"
                id="active-mahboob-radio"
                value="true"
                v-model="mahboobRadio"
              />
              <label for="active-mahboob-radio">فعال</label>
              <label for="active-mahboob-radio" class="radio-overlay"></label>
            </div>
            <div>
              <input
                type="radio"
                class="form-radio"
                name="course-setting"
                id="inactive-mahboob-radio"
                value="false"
                v-model="mahboobRadio"
              />
              <label for="inactive-mahboob-radio">غیر فعال</label>
              <label for="inactive-mahboob-radio" class="radio-overlay"></label>
            </div>
          </div>
          <div class="form-row">
            <div for="" class="form-row-col darken-color">
              <div class="separator pseudo-form-input">
                <input
                  type="file"
                  id="upload-ads-mahboob"
                  @change="uploadMahboobBanner"
                />
                <span v-if="mahboobBannerName == ''">آپلود تبلیغ</span>
                <span v-else>{{ mahboobBannerName }}</span>
                <span>
                  <label
                    for="upload-ads-mahboob"
                    class="cover-btn"
                    @change="uploadMahboobBanner"
                    >انتخاب</label
                  >
                </span>
              </div>
            </div>
            <div class="form-row-col"></div>
          </div>
        </form>
      </div>
      <div class="jadid my-5">
        <div>
          <p class="section-header">جدید ترین ها</p>
        </div>
        <form action="">
          <div class="form-row radios-container">
            <div>
              <input
                type="radio"
                class="form-radio"
                name="course-setting"
                id="active-jadid-radio"
                value="true"
                v-model="jadidRadio"
              />
              <label for="active-jadid-radio">فعال</label>
              <label for="active-jadid-radio" class="radio-overlay"></label>
            </div>
            <div>
              <input
                type="radio"
                class="form-radio"
                name="course-setting"
                id="inactive-jadid-radio"
                value="false"
                v-model="jadidRadio"
              />
              <label for="inactive-jadid-radio">غیر فعال</label>
              <label for="inactive-jadid-radio" class="radio-overlay"></label>
            </div>
          </div>
          <div class="form-row">
            <div for="" class="form-row-col darken-color">
              <div class="separator pseudo-form-input">
                <input type="file" id="upload-ads-jadid" @change="uploadJadidBanner" />
                <span v-if="jadidBannerName == ''">آپلود تبلیغ</span>
                <span v-else>{{ jadidBannerName }}</span>
                <span>
                  <label for="upload-ads-jadid" class="cover-btn">انتخاب</label>
                </span>
              </div>
            </div>
            <div class="form-row-col"></div>
          </div>
        </form>
      </div>
      <div class="bazdid my-5">
        <div>
          <p class="section-header">پر بازدید ترین ها</p>
        </div>
        <form action="">
          <div class="form-row radios-container">
            <div>
              <input
                type="radio"
                class="form-radio"
                name="course-setting"
                id="active-bazdid-radio"
                value="true"
                v-model="bazdidRadio"
              />
              <label for="active-bazdid-radio">فعال</label>
              <label for="active-bazdid-radio" class="radio-overlay"></label>
            </div>
            <div>
              <input
                type="radio"
                class="form-radio"
                name="course-setting"
                id="inactive-bazdid-radio"
                value="false"
                v-model="bazdidRadio"
              />
              <label for="inactive-bazdid-radio">غیر فعال</label>
              <label for="inactive-bazdid-radio" class="radio-overlay"></label>
            </div>
          </div>
          <div class="form-row">
            <div for="" class="form-row-col darken-color">
              <div class="separator pseudo-form-input">
                <input type="file" id="upload-ads-bazdid" @change="uploadBazdidBanner" />
                <span v-if="bazdidBannerName == ''">آپلود تبلیغ</span>
                <span v-else>{{ bazdidBannerName }}</span>
                <span>
                  <label for="upload-ads-bazdid" class="cover-btn">انتخاب</label>
                </span>
              </div>
            </div>
            <div class="form-row-col"></div>
          </div>
        </form>
      </div>
      <div class="package mt-5">
        <div>
          <p class="section-header">پکیج ها</p>
        </div>
        <form action="">
          <div class="form-row radios-container">
            <div>
              <input
                type="radio"
                class="form-radio"
                name="course-setting"
                id="active-package-radio"
                value="true"
                v-model="packageRadio"
              />
              <label for="active-package-radio">فعال</label>
              <label for="active-package-radio" class="radio-overlay"></label>
            </div>
            <div>
              <input
                type="radio"
                class="form-radio"
                name="course-setting"
                id="inactive-package-radio"
                value="false"
                v-model="packageRadio"
              />
              <label for="inactive-package-radio">غیر فعال</label>
              <label for="inactive-package-radio" class="radio-overlay"></label>
            </div>
          </div>
          <div class="form-row">
            <div for="" class="form-row-col darken-color">
              <div class="separator pseudo-form-input">
                <input
                  type="file"
                  id="upload-ads-package"
                  @change="uploadPackageBanner"
                />
                <span v-if="packageBannerName == ''">آپلود تبلیغ</span>
                <span v-else>{{ packageBannerName }}</span>
                <span>
                  <label for="upload-ads-package" class="cover-btn">انتخاب</label>
                </span>
              </div>
            </div>
            <div class="form-row-col"></div>
          </div>
        </form>
      </div>
      <button class="form-btn success" @click.prevent="setSideAds">
        ثبت و تائید نهایی
      </button>
    </form>
  </div>
</template>
<script>
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  data() {
    return {
      selectOne: "",
      selectTwo: "",
      selectThree: "",
      selectedHeader: "",
      headerId: "",
      headerTitle: "",
      headerDescription: "",
      buttonName: "",
      selectedVector: "",
      vectorName: "",

      // radios
      shegeftRadio: false,
      mahboobRadio: false,
      jadidRadio: false,
      bazdidRadio: false,
      packageRadio: false,

      // ads
      ShegeftBannerName: "",
      ShegeftBanner: "",
      mahboobBannerName: "",
      mahboobBanner: "",
      bazdidBannerName: "",
      bazdidBanner: "",
      jadidBannerName: "",
      jadidBanner: "",
      packageBannerName: "",
      packageBanner: "",
    };
  },
  mounted() {
    this.getSiteAds();
    // get IP
    // fetch("https://api.ipify.org?format=json")
    //   .then((x) => x.json())
    //   .then(({ ip }) => {
    //     console.log(ip);
    //   });
  },
  methods: {
    toggleDropdown(event) {
      event.stopPropagation();
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    selectHeader(event, id) {
      this.headerId = id;
      this.selectedHeader = event.target.innerHTML.trim();
    },
    uploadVector(event) {
      const vectorImg = event.target.files[0];
      this.vectorName = event.target.files[0].name;
      this.createBase64Image(vectorImg);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedVector = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },
    // upload ads
    uploadShegeftBanner(event) {
      const ShegeftBannerImg = event.target.files[0];
      this.ShegeftBannerName = event.target.files[0].name;
      this.createBase64Banner(ShegeftBannerImg);
    },
    uploadJadidBanner(event) {
      const JadidBannerImg = event.target.files[0];
      this.jadidBannerName = event.target.files[0].name;
      this.createBase64Banner(JadidBannerImg);
    },
    uploadMahboobBanner(event) {
      const mahboobBannerImg = event.target.files[0];
      this.mahboobBannerName = event.target.files[0].name;
      this.createBase64Banner(mahboobBannerImg);
    },
    uploadBazdidBanner(event) {
      const bazdidBannerImg = event.target.files[0];
      this.bazdidBannerName = event.target.files[0].name;
      this.createBase64Banner(bazdidBannerImg);
    },
    uploadPackageBanner(event) {
      const packageBannerImg = event.target.files[0];
      this.packageBannerName = event.target.files[0].name;
      this.createBase64Banner(packageBannerImg);
    },
    createShegeftBase64Banner(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.ShegeftBanner = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },
    createJadidBase64Banner(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.jadidBanner = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },
    createMahboobBase64Banner(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.mahboobBanner = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },
    createBazdidBase64Banner(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.bazdidBanner = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },
    createPackageBase64Banner(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.packageBanner = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },
    async getSiteAds() {
      const adsInfo = await this.$axios.get("/api/Admin/AdminManageSiteInfo/Ads", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      const adsActivate = adsInfo.data.data;
      this.shegeftRadio = adsActivate.amazingIsActive;
      this.mahboobRadio = adsActivate.favoriteIsActive;
      this.jadidRadio = adsActivate.newestIsActive;
      this.bazdidRadio = adsActivate.mostVisitIsActive;
      this.packageRadio = adsActivate.packageIsActive;
    },
    async setSideAds() {
      const setAdsInfo = await this.$axios.post(
        "/api/Admin/AdminManageSiteInfo/Ads",
        {
          amazingImageBase64: this.ShegeftBanner,
          amazingIsActive: this.shegeftRadio,
          selectedAmazingCourses:
            this.$store.state.selectedCourses.selectedCourses == ""
              ? []
              : this.$store.state.selectedCourses.selectedCourses,
          favoriteImageBase64: this.mahboobBanner,
          favoriteIsActive: this.mahboobRadio,
          newestImageBase64: this.jadidBanner,
          newestIsActive: this.jadidRadio,
          mostVisitImageBase64: this.bazdidBanner,
          mostVisitIsActive: this.bazdidRadio,
          packageImageBase64: this.packageBanner,
          packageIsActive: this.packageRadio,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (setAdsInfo.data.statusCode == 200 && setAdsInfo.data.message == "Success") {
        this.$swal({
          text: "ثبت شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
        this.getSiteAds();
        this.$store.commit("selectedCourses/CLEAR_SELECTED");
      }
    },
    async uploadLanding() {
      const uploadResp = await this.$axios.post(
        "/api/Admin/AdminManageSiteInfo/UpdateLandingContent",
        {
          id: this.headerId,
          title: this.headerTitle,
          description: this.headerDescription,
          buttonName: this.buttonName,
          vectorBase64: this.selectedVector,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (uploadResp.data.statusCode == 200 && uploadResp.data.message == "Success") {
        this.$swal({
          text: "ثبت شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
        this.headerId = "";
        this.headerTitle = "";
        this.headerDescription = "";
        this.buttonName = "";
        this.selectedVector = "";
      }
    },
  },
  watch: {
    headerId: {
      async handler() {
        if (this.headerId != "") {
          const headerDetails = await this.$axios.get(
            `/api/Admin/AdminManageSiteInfo/GetLandingContent/${this.headerId}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (
            headerDetails.data.statusCode == 200 &&
            headerDetails.data.message == "Success"
          ) {
            const headerDetailsData = headerDetails.data.data;
            this.buttonName = headerDetailsData.buttonName;
            this.headerDescription = headerDetailsData.description;
            this.headerTitle = headerDetailsData.title;
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
