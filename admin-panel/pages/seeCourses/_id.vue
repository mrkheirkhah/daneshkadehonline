<template>
  <div class="courses-list">
    <div class="banner">
      <div class="bg-image"></div>
      <div class="banner-overlay"></div>
      <div class="students-istatistic">
        <img src="@/static/icons/student-body.png" alt="آیکون دانشجو" />
        <div>
          <span class="persian-number count">{{ visitors }}</span>
          <p>دانشجو</p>
        </div>
      </div>
    </div>
    <main class="container-fluid px-2 px-md-4 py-5">
      <div class="row px-0 px-lg-2 px-xl-5 mx-xxl-4 mx-lg-2 mx-0">
        <div class="col-12 mt-lg-0 mt-2 section-has-filters">
          <div class="custom-accordion" @click.prevent="toggleAccordeon">
            <div class="accordion-header">
              <h5>دسته بندی بر اساس</h5>
              <img src="@/static/icons/chevron-bottom.svg" alt="علامت پیکان" />
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
            <section class="course" v-for="course in courseItems" :key="course.courseId">
              <nuxt-link
                :to="'/add-course/edit/' + course.courseId"
                class="image-container"
              >
                <img
                  :src="
                    'https://api.daneshkadeonline.ir/Images/Public/Course/' +
                    course.courseImageName
                  "
                  alt="عکس دوره"
                />
                <span class="course-duration">
                  <span class="persian-number">{{ course.courseTime }}</span>
                  <img src="@/static/icons/wall-clock.svg" alt="زمان" />
                </span>
                <span
                  class="on-performing-sign"
                  v-if="course.courseStatus == 'InProgress'"
                  >در حال برگزاری</span
                >
                <span
                  class="on-performing-sign"
                  v-else-if="course.courseStatus == 'Completed'"
                  >تمام شده</span
                >
                <span
                  class="on-performing-sign"
                  v-else-if="course.courseStatus == 'Stopped'"
                  >مسدود شده</span
                >
                <span class="on-performing-sign" v-else>در انتظار تائید</span>
              </nuxt-link>
              <h4 class="course-name">
                <nuxt-link :to="'/add-course/edit/' + course.courseId">{{
                  course.courseName
                }}</nuxt-link>
              </h4>
              <p class="course-detail">{{ course.courseShortDescription }}</p>
              <span class="course-teacher">
                مدرس:
                <span class="teacher-name">{{ course.teacherName }} </span>
              </span>
              <span class="course-viewers">
                بیننده
                <span class="count persian-number">{{ course.courseVisitCount }}</span>
                نفر
              </span>
            </section>
          </div>
          <footer class="indicators mt-4" v-if="filter != '' && filter.endPage != 0">
            <a
              href=""
              type="button"
              class="prev"
              @click.prevent="Number(goTo) > 1 ? (goTo = Number(goTo) - 1) : {}"
              ><img src="@/static/icons/chevron-bottom.svg" title="قبلی" alt="قبلی"
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
              v-if="filter.endPage > 4 && Number(filter.activePage) + 1 < filter.endPage"
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
              @click.prevent="
                Number(goTo) < filter.endPage ? (goTo = Number(goTo) + 1) : {}
              "
              ><img src="@/static/icons/chevron-bottom.svg" title="بعدی" alt="بعدی"
            /></a>
          </footer>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  // middleware: "userIsNotLog",
  data() {
    return {
      goTo: "1",
      courseItems: "",
      visitors: "",
      filter: "",
      orderById: "0",
    };
  },
  async mounted() {
    const courses = await this.$axios.get(
      `/api/Course/Index?teacherId=${this.$route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      }
    );
    if (courses.data.statusCode == 200 && courses.data.message == "Success") {
      this.courseItems = courses.data.data.courseItems;
      this.visitors = courses.data.data.studentCount;
      this.filter = courses.data.data.filter;
    }
  },
  methods: {
    goToPage(event) {
      this.goTo = event.target.innerHTML;
    },
    toggleAccordeon(event) {
      event.target.closest(".custom-accordion").classList.toggle("open");
    },
    toggle_li_open(event) {
      event.target.classList.toggle("open");
      event.stopPropagation();
    },
    async orderBy(event, id) {
      document.querySelectorAll(".filters-list li").forEach((item) => {
        item.classList.remove("active");
      });
      this.orderById = id;
      event.target.closest("li").classList.add("active");
      const courses = await this.$axios.get(
        `/api/Course/Index?orderBy=${id}&pageId=${this.goTo}&teacherId=${this.$route.params.id}`
      );
      if (courses.data.statusCode == 200 && courses.data.message == "Success") {
        this.courseItems = courses.data.data.courseItems;
        this.filter = courses.data.data.filter;
      }
    },
  },
  watch: {
    goTo: {
      async handler() {
        const courses = await this.$axios.get(
          `/api/Course/Index?pageId=${this.goTo}&orderBy=${this.orderById}&teacherId=${this.$route.params.id}`
        );
        if (courses.data.statusCode == 200 && courses.data.message == "Success") {
          this.courseItems = courses.data.data.courseItems;
          this.filter = courses.data.data.filter;
        }
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
body {
  background-color: #fff !important;
}
@import "@/assets/abstracts/mixins";
@import "@/assets/abstracts/variables";
@import "@/assets/pages/panel-admin/courses-list";
@import "@/assets/components/header-banner";
@import "@/assets/components/school-header";
@import "@/assets/components/custom-accordion";
</style>
