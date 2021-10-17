<template>
  <div class="courses-list">
    <div class="banner">
      <div class="bg-image"></div>
      <div class="banner-overlay"></div>
      <div class="students-istatistic">
        <img src="@/static/icons/student-body.png" alt="آیکون دانشجو" />
        <div>
          <span class="persian-number count">57901</span>
          <p>دانشجو</p>
        </div>
      </div>
      <!-- <div class="sample-courses">
        <a href="#">ریاضی</a>
        <a href="#">شیمی</a>
        <a href="#">فیزیک</a>
        <a href="#">مهندسی</a>
        <a href="#">فارسی</a>
      </div> -->
    </div>
    <main class="container-fluid px-2 px-md-4 py-5">
      <div class="row px-0 px-lg-2 px-xl-5 mx-xxl-4 mx-lg-2 mx-0">
        <div class="col-12 col-lg-3">
          <aside>
            <div
              class="custom-accordion assortment open"
              @click.prevent="toggleAccordeon"
            >
              <header class="accordion-header">
                <h5>دسته بندی</h5>
                <img src="@/static/icons/chevron-bottom.svg" alt="علامت پیکان" />
              </header>
              <div class="accordion-body">
                <ul class="root-ul custom-scrollbar">
                  <li class="has-list" @click="toggle_li_open">شیمی</li>
                  <li class="has-list" @click="toggle_li_open">
                    فیزیک
                    <ul class="child-list">
                      <li>الکتریسیته</li>
                      <li>مقاومت</li>
                      <li>الکتریسیته</li>
                      <li>مدار منطقی</li>
                    </ul>
                  </li>
                  <li class="has-list" @click="toggle_li_open">مهندسی</li>
                  <li class="has-list" @click="toggle_li_open">
                    کامپیوتر
                    <ul class="child-list">
                      <li class="has-list" @click="toggle_li_open">
                        کامپیوتر
                        <ul class="child-list">
                          <li>اول</li>
                          <li>دوم</li>
                          <li>سوم</li>
                        </ul>
                      </li>
                      <li>برنامه نویسی</li>
                      <li>سخت افزار</li>
                      <li>نرم افزار</li>
                      <li>مدار منطقی</li>
                    </ul>
                  </li>
                  <li class="has-list" @click="toggle_li_open">عمران</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
        <div class="col-12 col-lg-9 mt-lg-0 mt-2 section-has-filters">
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
                  <li @click.prevent="orderBy($event, 3)">
                    <a href="" type="button">محبوب ترین ها</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div class="courses-main-container">
            <section
              class="course"
              :class="selectCourseList.includes(item.courseId) ? 'selected-course' : {}"
              @click.prevent="selectThis($event, item.courseId)"
              v-for="item in courseItems"
              :key="item.courseId"
            >
              <a href="#" class="image-container">
                <img
                  :src="
                    'https://api.daneshkadeonline.ir/Images/Public/Course/' +
                    item.courseImageName
                  "
                  alt="عکس دوره"
                />
                <span class="course-duration">
                  <span class="persian-number">{{ item.courseTime }}</span>
                  <img src="@/static/icons/wall-clock.svg" alt="زمان" />
                </span>
                <span class="on-performing-sign" v-if="item.courseStatus == 'InProgress'"
                  >در حال برگزاری</span
                >
                <span
                  class="on-performing-sign"
                  v-else-if="item.courseStatus == 'Completed'"
                  >تمام شده</span
                >
                <span class="on-performing-sign" v-else>نامعلوم(موقتی)</span>
              </a>
              <h4 class="course-name">
                <a href="#">{{ item.courseName }}</a>
              </h4>
              <p class="course-detail">{{ item.courseShortDescription }}</p>
              <span class="course-teacher">
                مدرس:
                <span class="teacher-name"> {{ item.teacherName }} </span>
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
          <form action="#">
            <button class="submit-selected-items" @click.prevent="submitSelects">
              ثبت آیتم ها
            </button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  middleware: "userIsNotLog",
  data() {
    return {
      courseItems: "",
      filter: "",
      selectCourseList: [],
      goTo: "",
      orderById: "0",
    };
  },
  async mounted() {
    if (this.$store.state.selectedCourses.selectedCourses != "") {
      for (let item of this.$store.state.selectedCourses.selectedCourses) {
        this.selectCourseList.push(Number(item));
      }
    }
    const courses = await this.$axios.get("/api/Course/Index");
    if (courses.data.statusCode == 200 && courses.data.message == "Success") {
      // console.log(courses);
      this.courseItems = courses.data.data.courseItems;
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
    selectThis(event, id) {
      if (this.selectCourseList.includes(id)) {
        for (var i = this.selectCourseList.length - 1; i >= 0; i--) {
          if (this.selectCourseList[i] == id) {
            this.selectCourseList.splice(i, 1);
          }
        }
      } else {
        this.selectCourseList.push(id);
      }
      let course;

      // to check course correctly clicked
      if (!event.target.classList.contains("course")) {
        course = event.target.closest(".course");
      } else {
        course = event.target;
      }
      course.classList.toggle("selected-course");
    },
    async submitSelects() {
      await this.$store.commit("selectedCourses/SET_SELECTED", this.selectCourseList);
      if (this.$route.params.page == "discount") {
        this.$router.push("/discount-code");
      } else {
        this.$router.push("/main-page");
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
      }
    },
  },
  watch: {
    goTo: {
      async handler() {
        const courses = await this.$axios.get(
          `/api/Course/Index?pageId=${this.goTo}&orderBy=${this.orderById}`
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
