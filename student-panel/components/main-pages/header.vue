<template>
  <div class="container-fluid px-md-5 school-header-container">
    <header class="school-header py-xl-2 py-3">
      <a href="#" class="logo-container d-none d-xl-inline">
        <img src="@/static/logo.png" class="logo-img" alt="لوگو" />
      </a>
      <input type="checkbox" name="" id="school-header-checkbox" />
      <nav>
        <ul>
          <li><nuxt-link to="/">صفحه اصلی</nuxt-link></li>
          <li class="courses-header-link">
            <nuxt-link to="/courses-list">دوره ها</nuxt-link>
            <span class="alternate-header" @click="toggle_category_list_mobile($event)"
              >دوره ها</span
            >
            <div class="category desktop-version">
              <ul class="category-list">
                <template v-for="group in groups">
                  <li class="category-item" v-if="group.parentId == null" :key="group.id">
                    <a
                      @click="filterThisPage(group.id)"
                      @mouseenter="render_related_category($event)"
                      :id="'category-' + group.id"
                      >{{ group.groupTitle }}</a
                    >
                  </li>
                </template>
              </ul>
              <div class="mega-menu-container">
                <template v-for="group in groups">
                  <div
                    class="mega-menu show"
                    :data-related-category="'category-' + group.id"
                    :key="group.id"
                  >
                    <div
                      class="mega-menu-cell"
                      v-for="subGroup in group.courseGroups"
                      :key="subGroup.id"
                    >
                      <nuxt-link
                        :to="'/courses-list?filter=' + subGroup.id"
                        class="cell-link parent"
                        >{{ subGroup.groupTitle }}</nuxt-link
                      >
                      <nuxt-link
                        :to="'/courses-list?filter=' + subTwo.id"
                        class="cell-link"
                        v-for="subTwo in subGroup.courseGroups"
                        :key="subTwo.id"
                        >{{ subTwo.groupTitle }}</nuxt-link
                      >
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <div class="category mobile-version">
              <ul class="category-list">
                <template v-for="group in groups">
                  <li
                    class="category-item"
                    @click="_mobile($event)"
                    v-if="group.parentId == null"
                    :key="group.id"
                  >
                    {{ group.groupTitle }}
                    <ul class="category-sub">
                      <template v-for="subGroup in group.courseGroups">
                        <li
                          class="category-item lvl-2"
                          v-if="subGroup.courseGroups != null"
                          @click="_mobile($event)"
                          :key="subGroup.id"
                        >
                          {{ subGroup.groupTitle }}
                          <ul class="category-sub">
                            <li v-for="subTwo in subGroup.courseGroups" :key="subTwo.id">
                              <nuxt-link
                                :to="'/courses-list?filter=' + subTwo.id"
                                class="link"
                                >{{ subTwo.groupTitle }}</nuxt-link
                              >
                            </li>
                          </ul>
                        </li>
                        <li v-else :key="subGroup.id">
                          <nuxt-link
                            :to="'/courses-list?filter=' + subGroup.id"
                            class="link"
                            >{{ subGroup.groupTitle }}</nuxt-link
                          >
                        </li>
                      </template>
                    </ul>
                  </li>
                </template>
              </ul>
            </div>
          </li>
          <li><nuxt-link to="/articles-list">اخبار</nuxt-link></li>
          <li><nuxt-link to="/about-us">درباره ما</nuxt-link></li>
          <li>
            <nuxt-link to="/work-with-us" v-if="studentIsLogin == false"
              >همکاری با ما</nuxt-link
            >
          </li>
        </ul>
      </nav>
      <label for="school-header-checkbox" class="navigation-overlay"></label>
      <label for="school-header-checkbox" class="hamburger-button d-block d-lg-none">
        <div class="hamburger-line"></div>
        <div class="hamburger-line"></div>
        <div class="hamburger-line"></div>
      </label>
      <form action="" class="search-box" @click.prevent="search">
        <input type="search" placeholder="جستجو" ref="search" />
        <button class="search-btn" type="submit">
          <img src="@/static/images/main-page-images/search-icon.svg" alt="جستجو" />
        </button>
        <div class="courses-btn floated-list-container-main" @click="toggleDropdown">
          {{ groupDrop }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10.969"
            height="6.03"
            viewBox="0 0 10.969 6.03"
          >
            <g transform="translate(10.719 0.25) rotate(90)">
              <path
                data-name="Path 88161"
                d="M5.445,5.026.506.087A.3.3,0,1,0,.087.506L4.815,5.234.087,9.962a.3.3,0,0,0,0,.419.3.3,0,0,0,.208.088A.289.289,0,0,0,.5,10.381L5.442,5.442A.3.3,0,0,0,5.445,5.026Z"
                fill="#4a4a4a"
                stroke="#4a4a4a"
                stroke-width="0.5"
              />
            </g>
          </svg>
          <ul class="floated-list-main">
            <li @click.prevent="chooseGroup($event, 'course')">دوره ها</li>
            <li @click.prevent="chooseGroup($event, 'news')">اخبار</li>
            <li @click.prevent="chooseGroup($event, 'package')">پکیج ها</li>
          </ul>
        </div>
      </form>
      <div class="tools">
        <nuxt-link to="/cart" class="cart non-empty" title="سبد خرید">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19.21"
            height="24"
            viewBox="0 0 19.21 24"
          >
            <path v-if="cart == true"
              data-name="Path 88159"
              d="M68,20.746,66.631,5.271a.661.661,0,0,0-.658-.6H63.146a4.742,4.742,0,0,0-9.482,0H50.837a.658.658,0,0,0-.658.6L48.8,20.746c0,.02,0,.039,0,.059A3.42,3.42,0,0,0,52.4,24h12a3.42,3.42,0,0,0,3.6-3.2A.239.239,0,0,0,68,20.746ZM58.4,1.325a3.419,3.419,0,0,1,3.416,3.342H54.989A3.419,3.419,0,0,1,58.4,1.325Zm6,21.35h-12a2.114,2.114,0,0,1-2.277-1.84L51.44,6h2.218V8.01a.663.663,0,1,0,1.325,0V6h6.837V8.01a.663.663,0,0,0,1.325,0V6h2.218l1.32,14.837A2.118,2.118,0,0,1,64.407,22.675Z"
              transform="translate(-48.8)"
              fill="#c52c2c"
            />
            <path v-if="cart == false"
              data-name="Path 88159"
              d="M68,20.746,66.631,5.271a.661.661,0,0,0-.658-.6H63.146a4.742,4.742,0,0,0-9.482,0H50.837a.658.658,0,0,0-.658.6L48.8,20.746c0,.02,0,.039,0,.059A3.42,3.42,0,0,0,52.4,24h12a3.42,3.42,0,0,0,3.6-3.2A.239.239,0,0,0,68,20.746ZM58.4,1.325a3.419,3.419,0,0,1,3.416,3.342H54.989A3.419,3.419,0,0,1,58.4,1.325Zm6,21.35h-12a2.114,2.114,0,0,1-2.277-1.84L51.44,6h2.218V8.01a.663.663,0,1,0,1.325,0V6h6.837V8.01a.663.663,0,0,0,1.325,0V6h2.218l1.32,14.837A2.118,2.118,0,0,1,64.407,22.675Z"
              transform="translate(-48.8)"
              fill="#212121"
            />
          </svg>
        </nuxt-link>
        <nuxt-link to="/my/login" class="signin-signup" title="حساب کاربری">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20.414"
            height="24"
            viewBox="0 0 20.414 24"
          >
            <g transform="translate(0)">
              <g data-name="Group 19931" transform="translate(0)">
                <path
                  data-name="Path 88157"
                  d="M142.182,12.932h.159a4.586,4.586,0,0,0,3.5-1.516c1.913-2.157,1.6-5.855,1.561-6.207A5.07,5.07,0,0,0,144.995.7a5.526,5.526,0,0,0-2.674-.7h-.084a5.534,5.534,0,0,0-2.674.681,5.074,5.074,0,0,0-2.44,4.528c-.035.353-.353,4.051,1.561,6.207A4.568,4.568,0,0,0,142.182,12.932Zm-3.732-7.6c0-.015,0-.03,0-.04.164-3.563,2.694-3.946,3.777-3.946h.06c1.342.03,3.623.577,3.777,3.946a.1.1,0,0,0,0,.04c0,.035.353,3.414-1.228,5.194a3.257,3.257,0,0,1-2.56,1.064h-.05a3.247,3.247,0,0,1-2.555-1.064C138.106,8.757,138.444,5.363,138.449,5.333Z"
                  transform="translate(-132.062)"
                  fill="#212121"
                />
                <path
                  data-name="Path 88158"
                  d="M56.486,265.425v-.015c0-.04,0-.079,0-.124-.03-.984-.094-3.285-2.251-4.021l-.05-.015a14.341,14.341,0,0,1-4.125-1.879.671.671,0,1,0-.77,1.1,15.478,15.478,0,0,0,4.538,2.072c1.158.413,1.287,1.65,1.322,2.783a1,1,0,0,0,0,.124,9.022,9.022,0,0,1-.1,1.536,18.29,18.29,0,0,1-8.762,2.038,18.4,18.4,0,0,1-8.767-2.043,8.54,8.54,0,0,1-.1-1.536c0-.04,0-.079,0-.124.035-1.133.164-2.371,1.322-2.783a15.623,15.623,0,0,0,4.538-2.072.671.671,0,1,0-.77-1.1,14.184,14.184,0,0,1-4.125,1.879l-.05.015c-2.157.741-2.222,3.042-2.251,4.021a1,1,0,0,1,0,.124v.015a7.622,7.622,0,0,0,.253,2.251.638.638,0,0,0,.258.313,18.8,18.8,0,0,0,9.7,2.376,18.856,18.856,0,0,0,9.7-2.376.665.665,0,0,0,.258-.313A8,8,0,0,0,56.486,265.425Z"
                  transform="translate(-36.073 -246.36)"
                  fill="#212121"
                />
              </g>
            </g>
          </svg>

          <span v-if="studentIsLogin == false">ورود / ثبت نام</span>
          <span v-else>{{ studentName }}</span>
        </nuxt-link>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchInput: "",
      studentIsLogin: false,
      studentName: "",
      groupDrop: "دوره ها",
      searchIn: "course",
      groups: "",
      cart: false,
    };
  },
  async mounted() {
    this.getOrders();
    const groups = await this.$axios.get("/api/Public/ProfileActions/GetAllCourseGroups");
    this.groups = groups.data.data;

    document.addEventListener("click", () => {
      let is_searchbox_active = document.querySelector(".school-header.active-searchBox");
      if (is_searchbox_active) {
        is_searchbox_active.classList.remove("active-searchBox");
      }
    });
    if (this.$cookies.get("key")) {
      const getData = await this.$axios.post(
        "/api/Student/StudentAccount/check-student-auth",
        {},
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (getData.data.statusCode == "200" && getData.data.message == "Success") {
        this.studentName = getData.data.data.studentName;
        this.studentIsLogin = true;
      } else {
        this.$cookies.remove("refreshToken");
        this.$cookies.remove("key");
        this.studentIsLogin = false;
      }
    } else if (this.$cookies.get("refreshToken")) {
      try {
        const token = this.$cookies.get("refreshToken");
        const getToken = await this.$axios.post("/api/Student/StudentAccount/refresh", {
          refreshToken: token,
        });
        if (getToken.data.statusCode == 200 && getToken.data.message == "Success") {
          this.studentName = getToken.data.data.studentName;
          this.studentIsLogin = true;
          this.$store.dispatch("login/setLoginDetails", getToken);
        } else {
          this.studentIsLogin = false;
          this.$cookies.remove("refreshToken");
        }
      } catch {
        this.studentIsLogin = false;
        this.$cookies.remove("refreshToken");
      }
    }
  },
  methods: {
    async getOrders() {
      const order = await this.$axios.get("/api/Student/StudentOrder/GetOrder", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      if (order.data.statusCode == 200 && order.data.message == "Success") {
        if(order.data.data.orderItems.length != 0) {
          this.cart = true;
        }
      }
    },
    _mobile(event) {
      let target = event.target;
      if (target.classList.contains("category-item")) target.classList.toggle("show");
      event.stopPropagation();
    },
    toggle_category_list_mobile() {
      if (event.target.classList.contains("alternate-header"))
        event.target.classList.toggle("show");

      document
        .querySelector(".category.mobile-version .category-list")
        .classList.toggle("show");
    },
    filterThisPage(id) {
      this.$router.push("/courses-list?filter=" + id);
    },
    render_related_category(event) {
      this.remove_previous_category();

      let target_id = event.target.getAttribute("id");
      let related_value = document.querySelector(
        `.mega-menu[data-related-category = ${target_id}]`
      );

      related_value.classList.add("show");
    },
    remove_previous_category() {
      try {
        let active_megaMenu = document.querySelector(".mega-menu.show");
        active_megaMenu.classList.remove("show");
      } catch {}
    },
    goToLogin() {
      this.$router.push("/my/login");
    },
    chooseGroup(event, text) {
      this.groupDrop = event.target.innerHTML.trim();
      this.searchIn = text;
    },
    async search(event) {
      this.searchInput = this.$refs.search.value;
      if (this.searchInput == "") {
        const header_searchBox = document.querySelector("header .search-box");

        event.stopPropagation();
        document.querySelector(".school-header").classList.add("active-searchBox");
        header_searchBox.querySelector("input").focus();
      } else {
        if (this.searchIn == "news") {
          await this.$store.dispatch("search/searchNews", this.searchInput);
          this.$router.push("/articles-list");
        } else if (this.searchIn == "course") {
          await this.$store.dispatch("search/search", this.searchInput);
          this.$router.push("/courses-list");
        }
        this.searchInput = "";
        this.$refs.search.value = "";
      }
    },
    toggleDropdown() {
      document.querySelector(".floated-list-container-main").classList.toggle("show");
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/core/reset";
@import "@/assets/styles/font/fonts";
@import "@/assets/styles/abstracts/main-pages/variables";
@import "@/assets/styles/core/main-pages/typography";
@import "@/assets/styles/abstracts/main-pages/mixins";
@import "@/assets/styles/components/main-pages/school-header.scss";
</style>
