<template>
  <div>
    <div class="articles-list">
      <div class="banner">
        <div class="bg-image"></div>
        <div class="banner-overlay"></div>
        <div class="students-istatistic">
          <img src="@/static/images/main-page-images/article.png" alt="آیکون مقاله" />
          <div>
            <span class="persian-number count">{{ newsCount }}</span>
            <p>خبر</p>
          </div>
        </div>
        <div class="sample-courses">
          <a
            href=""
            type="button"
            @click.prevent="filterThisPage(group.id)"
            v-for="group in headerGroups"
            :key="headerGroups.indexOf(group)"
            >{{ group.groupTitle }}</a
          >
        </div>
      </div>
      <main class="container-fluid px-2 px-md-4 py-5">
        <div class="row px-0 px-lg-2 px-xl-5 mx-xxl-4 mx-lg-2 mx-0">
          <div class="col-12 col-lg-3">
            <aside>
              <div class="custom-accordion assortment open">
                <header class="accordion-header" @click="toggleAccordeon">
                  <h5>دسته بندی</h5>
                  <img
                    src="@/static/images/main-page-images/chevron-bottom.svg"
                    alt="علامت پیکان"
                  />
                </header>
                <div class="accordion-body">
                  <ul class="root-ul custom-scrollbar">
                    <template v-if="loading">
                      <li class="" v-for="i in 6" :key="i">
                        <skeleton
                          class="skeleton"
                          width="100px"
                          height="20px"
                          borderRadius="5px"
                        />
                      </li>
                    </template>
                    <template v-else>
                      <li
                        :class="group.newsGroups == null ? '' : 'has-list'"
                        @click="filterThisPage(group.id, $event)"
                        v-for="group in groups"
                        :key="group.id"
                        v-if="group.parentId == null"
                        style="cursor: pointer"
                      >
                        <div
                          :class="group.newsGroups == null ? '' : 'test'"
                          @click="toggle_li_open($event)"
                        ></div>
                        {{ group.groupTitle }}
                        <ul
                          class="child-list"
                          v-if="group.newsGroups != null && group.newsGroups.length > 0"
                        >
                          <template v-for="subGroup in group.newsGroups">
                            <li
                              :class="subGroup.newsGroups == null ? '' : 'has-list'"
                              @click="filterThisPage(subGroup.id, $event)"
                              :key="subGroup.id"
                              style="cursor: pointer"
                            >
                              <div
                                :class="subGroup.newsGroups == null ? '' : 'test'"
                                @click="toggle_li_open($event)"
                              ></div>
                              {{ subGroup.groupTitle }}
                              <ul
                                class="child-list"
                                v-if="
                                  subGroup.newsGroups != null &&
                                  subGroup.newsGroups.length > 0
                                "
                              >
                                <template v-for="subTwoGroup in subGroup.newsGroups">
                                  <li
                                    :key="subTwoGroup.id"
                                    @click="filterThisPage(subTwoGroup.id, $event)"
                                    style="cursor: pointer"
                                  >
                                    {{ subTwoGroup.groupTitle }}
                                  </li>
                                </template>
                              </ul>
                            </li>
                          </template>
                          <li v-if="group.newsGroups == null" style="cursor: pointer">
                            {{ group.groupTitle }}
                          </li>
                        </ul>
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
          <div class="col-12 col-lg-9 mt-lg-0 mt-2 section-has-filters">
            <div class="custom-accordion">
              <div class="accordion-header" @click="toggleAccordeon">
                <h5>دسته بندی بر اساس</h5>
                <img
                  src="@/static/images/main-page-images/chevron-bottom.svg"
                  alt="علامت پیکان"
                />
              </div>
              <div class="accordion-body">
                <nav class="filters root-ul">
                  <span> دسته بندی بر اساس: </span>
                  <ul class="filters-list">
                    <li class="active" @click.prevent="orderBy($event, 0)">
                      <a href="" type="button">جدید ترین ها</a>
                    </li>
                    <li @click.prevent="orderBy($event, 1)">
                      <a href="" type="button">قدیمی ترین ها</a>
                    </li>
                    <li @click.prevent="orderBy($event, 2)">
                      <a href="" type="button">پر بازدید ترین ها</a>
                    </li>
                    <li @click.prevent="orderBy($event, 2)">
                      <a href="" type="button">محبوب ترین ها</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div class="courses-main-container">
              <template v-if="loading">
                <section class="course swiper-slide" v-for="i in 4" :key="i">
                  <div class="image-container">
                    <skeleton
                      class="skeleton"
                      width="260px"
                      height="180px"
                      borderRadius="5px"
                    />
                  </div>
                  <h4 class="course-name">
                    <skeleton
                      class="skeleton"
                      width="120px"
                      height="25px"
                      borderRadius="5px"
                    />
                  </h4>
                  <p class="course-detail">
                    <skeleton
                      class="skeleton"
                      width="180px"
                      height="15px"
                      borderRadius="5px"
                    />
                    <br />
                    <skeleton
                      class="skeleton"
                      width="130px"
                      height="15px"
                      borderRadius="5px"
                    />
                  </p>
                  <span class="course-teacher">
                    <span class="teacher-name"
                      ><skeleton
                        class="skeleton"
                        width="150px"
                        height="20px"
                        borderRadius="5px"
                    /></span>
                  </span>
                </section>
              </template>
              <section class="course" v-for="item in newsItems" :key="item.newsId" v-else>
                <nuxt-link :to="'/news/' + item.newsId" class="image-container">
                  <img
                    :src="
                      'https://api.daneshkadeonline.ir/Images/Public/News/' +
                      item.imageName
                    "
                    alt="عکس مقاله"
                  />
                </nuxt-link>
                <h4 class="course-name">
                  <nuxt-link :to="'/news/' + item.newsId">{{ item.title }}</nuxt-link>
                </h4>

                <span class="course-teacher">
                  تاریخ:
                  <span class="teacher-name persian-number">{{
                    new Date(item.createDate).toLocaleDateString("fa-IR")
                  }}</span>
                </span>
                <span class="course-viewers">
                  بیننده
                  <span class="count persian-number">{{ item.visitCount }}</span>
                  نفر
                </span>
              </section>
            </div>
            <footer class="indicators mt-4" v-if="filter != '' && filter.endPage != 0">
              <a
                href=""
                type="button"
                class="prev"
                v-if="filter.endPage > 1 && filter.activePage != 1"
                @click.prevent="Number(goTo) > 1 ? (goTo = Number(goTo) - 1) : {}"
                ><img
                  src="@/static/images/main-page-images/chevron-bottom.svg"
                  title="قبلی"
                  alt="قبلی"
              /></a>
              <a
                href=""
                type="button"
                class="persian-number"
                v-if="filter.activePage > 1"
                @click.prevent="goToPage"
                >{{ Number(filter.activePage) - 1 }}</a
              >
              <a href="" type="button" class="persian-number active">{{
                filter.activePage
              }}</a>
              <a
                href=""
                type="button"
                @click.prevent="goToPage"
                class="persian-number"
                v-if="Number(filter.activePage) + 1 < filter.endPage"
                >{{ Number(filter.activePage) + 1 }}</a
              >
              <span
                v-if="
                  filter.endPage > 4 && Number(filter.activePage) + 1 < filter.endPage
                "
                >...</span
              >
              <a
                href=""
                type="button"
                class="persian-number"
                @click.prevent="goToPage"
                v-if="filter.activePage != filter.endPage"
                >{{ filter.endPage }}</a
              >
              <a
                href=""
                type="button"
                class="next"
                v-if="filter.endPage > 1"
                @click.prevent="
                  Number(goTo) < filter.endPage ? (goTo = Number(goTo) + 1) : {}
                "
                ><img
                  src="@/static/images/main-page-images/chevron-bottom.svg"
                  title="بعدی"
                  alt="بعدی"
              /></a>
            </footer>
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
      title: "جدید ترین اخبار تکنولوژی و کسبوکار و آموزشی | دانشکده آنلاین",
      meta: [
        {
          hid: "description",
          content:
            "بروز ترین اخبار ایران و جهان در زمینه های تکنولوژی ، کسب مهارت و کسبو کار در کنار مهمترین اخبار در حوزه آموزش هر روزه برای شما جمع آوری و منتشر میشود | دانشکده آنلاین",
        },
      ],
    };
  },
  data() {
    return {
      newsItems: "",
      filter: "",
      goTo: "",
      groups: [],
      orderById: "",
      loading: true,
      newsCount: "",
      headerGroups: "",
    };
  },
  async mounted() {
    const groups = await this.$axios.get("/api/Public/ProfileActions/GetAllNewsGroups");
    // console.log(groups);
    this.groups = groups.data.data;
    if (this.$route.query.groupId != undefined) {
      const groups = await this.$axios.get(
        `/api/Public/ProfileActions/GetNewsGroups/${this.$route.query.groupId}`
      );
      this.headerGroups = groups.data.data;
    }
    if (Object.keys(this.$route.query).length != 0) {
      let query = "";
      for (const i in this.$route.query) {
        query = query + i + "=" + this.$route.query[i] + "&";
      }
      query = query.slice(0, -1);
      const news = await this.$axios.get(`/api/News/Index?${query}`);
      if (news.data.statusCode == 200 && news.data.message == "Success") {
        this.newsItems = news.data.data.newsItems;
        this.filter = news.data.data.filter;
        this.newsCount = news.data.data.newsCount;
      }
    } else {
      if (this.$store.state.search.newsItems != "") {
        this.newsItems = this.$store.state.search.newsItems;
        this.filter = this.$store.state.search.newsFilter;
        this.newsCount = this.$store.state.search.newsCount;
      } else {
        const news = await this.$axios.get("/api/News/Index");
        if (news.data.statusCode == 200 && news.data.message == "Success") {
          this.newsItems = news.data.data.newsItems;
          this.filter = news.data.data.filter;
          this.newsCount = news.data.data.newsCount;
        }
      }
    }
    // if (this.$route.query.filter != undefined) {
    //   const news = await this.$axios.get(
    //     `/api/News/Index?groupId=${this.$route.query.filter}`
    //   );
    //   if (news.data.statusCode == 200 && news.data.message == "Success") {
    //     this.newsItems = news.data.data.newsItems;
    //     this.filter = news.data.data.filter;
    //     this.newsCount = news.data.data.newsCount;
    //   }
    // } else {
    //   if (this.$store.state.search.newsItems != "") {
    //     this.newsItems = this.$store.state.search.newsItems;
    //     this.filter = this.$store.state.search.newsFilter;

    //     this.newsCount = this.$store.state.search.newsCount;
    //   } else {
    //     const news = await this.$axios.get("/api/News/Index");
    //     // console.log(news);
    //     if (news.data.statusCode == 200 && news.data.message == "Success") {
    //       this.newsItems = news.data.data.newsItems;
    //       this.filter = news.data.data.filter;
    //       this.newsCount = news.data.data.newsCount;
    //     }
    //   }
    // }
    this.loading = false;
  },
  methods: {
    filterThisPage(id, event) {
      event.stopPropagation();
      // console.log(this.$route);
      if (Object.keys(this.$route.query).length != 0) {
        if (this.$route.query.groupId == undefined) {
          this.$router.push(this.$route.fullPath + "&groupId=" + id);
        } else {
          this.$router.replace({ query: { ...this.$route.query, groupId: id } });
        }
      } else {
        this.$router.push(this.$route.fullPath + "?groupId=" + id);
      }
    },
    goToPage(event) {
      this.goTo = event.target.innerHTML;
    },
    toggleAccordeon(event) {
      event.target.closest(".custom-accordion").classList.toggle("open");
    },
    toggle_li_open(event) {
      // event.target.classList.toggle("open");
      event.target.parentNode.classList.toggle("open");
      event.stopPropagation();
    },
    async orderBy(event, id) {
      document.querySelectorAll(".filters-list li").forEach((item) => {
        item.classList.remove("active");
      });
      this.orderById = id;
      event.target.closest("li").classList.add("active");
      if (Object.keys(this.$route.query).length != 0) {
        if (this.$route.query.orderBy == undefined) {
          this.$router.push(this.$route.fullPath + "&orderBy=" + id);
        } else {
          this.$router.replace({ query: { ...this.$route.query, orderBy: id } });
        }
      } else {
        this.$router.push(this.$route.fullPath + "?orderBy=" + id);
      }
    },
  },
  watch: {
    "$store.state.search.newsItems": {
      handler() {
        this.newsItems = this.$store.state.search.newsItems;
        this.filter = this.$store.state.search.newsFilter;
        this.newsCount = this.$store.state.search.newsCount;
      },
      deep: true,
    },
    goTo: {
      async handler() {
        if (Object.keys(this.$route.query).length != 0) {
          if (this.$route.query.pageId == undefined) {
            this.$router.push(this.$route.fullPath + "&pageId=" + this.goTo);
          } else {
            this.$router.replace({ query: { ...this.$route.query, pageId: this.goTo } });
          }
        } else {
          this.$router.push(this.$route.fullPath + "?pageId=" + this.goTo);
        }
      },
      deep: true,
    },
    "$route.query": {
      async handler() {
        if (Object.keys(this.$route.query).length != 0) {
          let query = "";
          for (const i in this.$route.query) {
            query = query + i + "=" + this.$route.query[i] + "&";
          }
          query = query.slice(0, -1);
          const news = await this.$axios.get(`/api/News/Index?${query}`);
          if (news.data.statusCode == 200 && news.data.message == "Success") {
            this.newsItems = news.data.data.newsItems;
            this.filter = news.data.data.filter;
            this.newsCount = news.data.data.newsCount;
          }
        } else {
          if (this.$store.state.search.newsItems != "") {
            this.newsItems = this.$store.state.search.newsItems;
            this.filter = this.$store.state.search.newsFilter;
            this.newsCount = this.$store.state.search.newsCount;
          } else {
            const news = await this.$axios.get("/api/News/Index");
            if (news.data.statusCode == 200 && news.data.message == "Success") {
              this.newsItems = news.data.data.newsItems;
              this.filter = news.data.data.filter;
              this.newsCount = news.data.data.newsCount;
            }
          }
        }
        if (this.$route.query.courseGroupId != undefined) {
          const groups = await this.$axios.get(
            `/api/Public/ProfileActions/GetCourseGroups/${this.$route.query.groupId}`
          );
          if (groups.data.data.length > 5) {
            this.headerGroups = groups.data.data.slice(0, 5);
          } else {
            this.headerGroups = groups.data.data;
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
@import "@/assets/styles/pages/courses-list.scss";
</style>
