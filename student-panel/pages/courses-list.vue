<template>
  <div>
    <div class="courses-list">
      <div class="banner">
        <div class="bg-image"></div>
        <div class="banner-overlay"></div>
        <div class="students-istatistic">
          <img
            src="@/static/images/main-page-images/student-body.png"
            alt="آیکون دانشجو"
          />
          <div>
            <span class="persian-number count">{{ studentCount }}</span>
            <p>دانشجو</p>
          </div>
        </div>
        <div class="sample-courses" v-if="headerGroups != ''">
          <a href="#" v-for="group in headerGroups" :key="headerGroups.indexOf(group)">{{
            group.groupTitle
          }}</a>
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
                        :class="group.courseGroups == null ? '' : 'has-list'"
                        @click="filterThisPage(group.id, $event)"
                        v-for="group in groups"
                        :key="group.id"
                        v-if="group.parentId == null"
                      >
                        <div
                          :class="group.courseGroups == null ? '' : 'test'"
                          @click="toggle_li_open($event)"
                        ></div>
                        {{ group.groupTitle }}
                        <ul
                          class="child-list"
                          v-if="
                            group.courseGroups != null && group.courseGroups.length > 0
                          "
                        >
                          <template v-for="subGroup in group.courseGroups">
                            <li
                              :class="subGroup.courseGroups == null ? '' : 'has-list'"
                              @click="filterThisPage(subGroup.id, $event)"
                              :key="subGroup.id"
                            >
                              <div
                                :class="subGroup.courseGroups == null ? '' : 'test'"
                                @click="toggle_li_open($event)"
                              ></div>
                              {{ subGroup.groupTitle }}
                              <ul
                                class="child-list"
                                v-if="
                                  subGroup.courseGroups != null &&
                                  subGroup.courseGroups.length > 0
                                "
                              >
                                <template v-for="subTwoGroup in subGroup.courseGroups">
                                  <li
                                    :key="subTwoGroup.id"
                                    @click="filterThisPage(subTwoGroup.id, $event)"
                                  >
                                    {{ subTwoGroup.groupTitle }}
                                  </li>
                                </template>
                              </ul>
                            </li>
                          </template>
                          <li v-if="group.courseGroups == null">
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
              <section
                class="course"
                v-for="item in courseItems"
                :key="item.courseId"
                v-else
              >
                <nuxt-link :to="'/course/' + item.courseId" class="image-container">
                  <img
                    :src="
                      'https://api.daneshkadeonline.ir/Images/Public/Course/' +
                      item.courseImageName
                    "
                    alt="عکس دوره"
                  />
                  <span class="course-duration">
                    <span class="persian-number">{{ item.courseTime }}</span>
                    <img
                      src="@/static/images/main-page-images/wall-clock.svg"
                      alt="زمان"
                    />
                  </span>
                  <span
                    class="on-performing-sign"
                    v-if="item.courseStatus == 'InProgress'"
                    >در حال برگزاری</span
                  >
                  <span
                    class="on-performing-sign"
                    v-else-if="item.courseStatus == 'Completed'"
                    >تمام شده</span
                  >
                  <span class="on-performing-sign" v-else>نامعلوم(موقتی)</span>
                </nuxt-link>
                <h4 class="course-name">
                  <nuxt-link :to="'/course/' + item.courseId">{{
                    item.courseName
                  }}</nuxt-link>
                </h4>
                <p class="course-detail">{{ item.courseShortDescription }}</p>
                <span class="course-teacher">
                  مدرس:
                  <span class="teacher-name">{{ item.teacherName }}</span>
                </span>
                <span class="course-viewers">
                  بیننده
                  <span class="count persian-number">{{ item.courseVisitCount }}</span>
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
  data() {
    return {
      courseItems: "",
      filter: "",
      goTo: "",
      orderById: "0",
      groups: "",
      loading: true,
      studentCount: "",
      headerGroups: "",
    };
  },
  async mounted() {
    const groups = await this.$axios.get("/api/Public/ProfileActions/GetAllCourseGroups");
    this.groups = groups.data.data;
    if (this.$route.query.filter != undefined) {
      const groups = await this.$axios.get(
        `/api/Public/ProfileActions/GetCourseGroups/${this.$route.query.filter}`
      );
      if (groups.data.data.length > 5) {
        this.headerGroups = groups.data.data.slice(0, 5);
      } else {
        this.headerGroups = groups.data.data;
      }
    }
    if (this.$route.query != undefined) {
      const courses = await this.$axios.get(
        this.$route.query.filter != undefined && this.$route.query.isPackage != undefined
          ? `/api/Course/Index?courseGroupId=${this.$route.query.filter}&isPackage=${this.$route.query.isPackage}`
          : this.$route.query.filter != undefined
          ? `/api/Course/Index?courseGroupId=${this.$route.query.filter}`
          : this.$route.query.isPackage != undefined
          ? `/api/Course/Index?isPackage=${this.$route.query.isPackage}`
          : ""
      );
      if (courses.data.statusCode == 200 && courses.data.message == "Success") {
        this.courseItems = courses.data.data.courseItems;
        this.filter = courses.data.data.filter;
        this.studentCount = courses.data.data.studentCount;
      }
    } else {
      if (this.$store.state.search.courseItems != "") {
        this.courseItems = this.$store.state.search.courseItems;
        this.filter = this.$store.state.search.filter;
        this.studentCount = this.$store.state.search.studentCount;
      } else {
        const courses = await this.$axios.get("/api/Course/Index");
        if (courses.data.statusCode == 200 && courses.data.message == "Success") {
          this.courseItems = courses.data.data.courseItems;
          this.filter = courses.data.data.filter;
          this.studentCount = courses.data.data.studentCount;
        }
      }
    }
    this.loading = false;
  },
  methods: {
    goToPage(event) {
      this.goTo = event.target.innerHTML;
    },
    seeCourse(id) {
      this.$router.push(`/course/${id}`);
    },
    toggleAccordeon(event) {
      event.target.closest(".custom-accordion").classList.toggle("open");
    },
    toggle_li_open(event) {
      // event.target.classList.toggle("open");
      event.target.parentNode.classList.toggle("open");
      event.stopPropagation();
    },
    filterThisPage(id, event) {
      event.stopPropagation();
      // console.log(this.$route);
      if (Object.keys(this.$route.query).length != 0) {
        this.$router.push(this.$route.fullPath + "&filter=" + id);
      } else {
        this.$router.push(this.$route.fullPath + "?filter=" + id);
      }
    },
    async orderBy(event, id) {
      document.querySelectorAll(".filters-list li").forEach((item) => {
        item.classList.remove("active");
      });
      this.orderById = id;
      event.target.closest("li").classList.add("active");
      const courses = await this.$axios.get(`/api/Course/Index?orderBy=${id}`);
      if (courses.data.statusCode == 200 && courses.data.message == "Success") {
        this.courseItems = courses.data.data.courseItems;
        this.filter = courses.data.data.filter;
        this.studentCount = courses.data.data.studentCount;
      }
    },
  },
  watch: {
    "$store.state.search.courseItems": {
      handler() {
        this.courseItems = this.$store.state.search.courseItems;
        this.filter = this.$store.state.search.filter;
        this.studentCount = this.$store.state.search.studentCount;
      },
      deep: true,
    },
    goTo: {
      async handler() {
        const courses = await this.$axios.get(
          `/api/Course/Index?pageId=${this.goTo}&orderBy=${this.orderById}`
        );
        if (courses.data.statusCode == 200 && courses.data.message == "Success") {
          this.courseItems = courses.data.data.courseItems;
          this.filter = courses.data.data.filter;

          this.studentCount = courses.data.data.studentCount;
        }
      },
      deep: true,
    },
    "$route.query": {
      async handler() {
        const courses = await this.$axios.get(
          `/api/Course/Index?courseGroupId=${this.$route.query.filter}`
        );
        if (courses.data.statusCode == 200 && courses.data.message == "Success") {
          this.courseItems = courses.data.data.courseItems;
          this.filter = courses.data.data.filter;

          this.studentCount = courses.data.data.studentCount;
        }
        const groups = await this.$axios.get(
          `/api/Public/ProfileActions/GetCourseGroups/${this.$route.query.filter}`
        );
        this.headerGroups = groups.data.data;
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
