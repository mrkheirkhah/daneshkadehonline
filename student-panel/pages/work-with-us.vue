<template>
  <div class="landing-page" v-if="pageData != ''">
    <div class="landing-page-image">
      <header>
        <input type="checkbox" name="" id="landing-page-checkbox" />
        <nav>
          <ul>
            <li>
              <nuxt-link to="/">صفحه اصلی</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/courses-list">دوره ها</nuxt-link>
            </li>
            <li>
              <a href="https://panel.daneshkadeonline.ir/">ورود مدرس ها</a>
            </li>
            <!-- <li>
              <a href="#">ورود کارفرما</a>
            </li> -->
          </ul>
        </nav>
        <label for="landing-page-checkbox" class="navigation-overlay"></label>
        <label for="landing-page-checkbox" class="hamburger-button">
          <div class="hamburger-line"></div>
          <div class="hamburger-line"></div>
          <div class="hamburger-line"></div>
        </label>
      </header>
      <h1 class="landing-page-title">
        برای ثبت نام
        <a href="#" class="highlight">کلیک</a>
        کنید
      </h1>
    </div>
    <div class="overview-items">
      <div class="overview" v-for="option in pageData.options" :key="option.id">
        <div class="icon-container">
          <img
            class="option-vector"
            :src="
              'https://api.daneshkadeonline.ir/Images/Public/Cooperation/' +
              option.iconName
            "
            alt="تصویر آپشن"
          />
        </div>
        <h4 class="title">{{ option.title }}</h4>
        <p class="detail">{{ option.description }}</p>
      </div>
    </div>
    <div class="company-detail">
      <h3 class="title">{{ pageData.info.title }}</h3>
      <p class="detail">{{ pageData.info.text }}</p>
    </div>
    <footer>
      <p>
        {{ pageData.info.footerText }}
      </p>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageData: "",
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const loadData = await this.$axios.get("/api/Cooperation/Index");
      // console.log(loadData);
      this.pageData = loadData.data.data;
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
@import "@/assets/styles/pages/work-with-us.scss";
.option-vector {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
</style>
