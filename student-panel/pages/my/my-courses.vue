<template>
  <div class="panel-table my-courses">
    <div class="box-header">
      <h3>
        <skeleton
          v-if="loading"
          class="skeleton"
          width="95px"
          height="30px"
          borderRadius="5px"
        />
        <span v-else> دوره های من </span>
      </h3>
    </div>
    <section class="box-content custom-scrollbar">
      <header class="table-row table-header">
        <template v-if="loading">
          <span v-for="i in 6" :key="i">
            <skeleton class="skeleton" width="35px" height="20px" borderRadius="5px" />
          </span>
        </template>
        <template v-else>
          <span>عکس دوره</span>
          <span class="course-name-heading">نام دوره</span>
          <span>تاریخ خرید</span>
          <span>زمان مانده</span>
          <span>نام استاد</span>
          <span>مشاهده</span>
        </template>
      </header>
      <template v-if="loading">
        <div class="table-row package-type" v-for="i in 4" :key="i.index">
          <span class="course-image course-image-skeleton">
            <skeleton class="skeleton" width="60px" height="60px" borderRadius="5px" />
          </span>
          <span v-for="j in 5" :key="j">
            <skeleton class="skeleton" width="35px" height="20px" borderRadius="5px" />
          </span>
        </div>
      </template>
      <template v-else>
        <div
          class="table-row package-type"
          :class="course.isInCourse.item1 == 0 ? 'expired' : ''"
          v-for="course in myCourses"
          :key="course.courseId"
        >
          <span class="course-image">
            <img
              :src="
                'https://api.daneshkadeonline.ir/Images/Public/Course/' +
                course.courseImageName
              "
              alt="عکس دوره"
            />
          </span>
          <span class="course-name-content">
            <span class="course-name"> {{ course.courseName }} </span>
            <br />
            <span class="course-detail">
              {{ course.shortDescription }}
            </span>
          </span>
          <span class="persian-number">{{
            new Date(course.buyDate).toLocaleDateString("fa-IR")
          }}</span>
          <span class="time-left persian-number" v-if="course.isInCourse.item1 == 1">{{
            course.isInCourse.item2 != null
              ? course.isInCourse.item2 + " روز "
              : "--------"
          }}</span>
          <span class="time-left" v-else @click="buyLogin(course.courseId)"
            >تمدید دوره</span
          >
          <span>{{ course.teacherName }}</span>
          <span>
            <nuxt-link
              :to="'/my/course-download/' + course.courseId"
              class="download btn"
              v-if="course.isPackage == true"
              >دانلود</nuxt-link
            >
            <nuxt-link
              :to="'/course/' + course.courseId"
              class="view btn"
              v-else-if="course.isPackage == false && course.isInCourse.item1 == 1"
            >
              دیدن دوره
            </nuxt-link>
            <button class="view btn" v-else>-----------------</button>
          </span>
        </div>
        <!-- <div class="table-row package-type expired">
          <span class="course-image">
            <img src="@/static/images/course-image.png" alt="عکس دوره" />
          </span>
          <span class="course-name-content">
            <span class="course-name"> دوره رضایی </span>
            <br />
            <span class="course-detail">
              این توضیح برای معرفی دوره هستش که ساختگی می باشد
            </span>
          </span>
          <span class="persian-number">1400/07/18</span>
          <span class="time-left">تمدید دوره</span>
          <span>عرفان اسدی</span>
          <span>
            <button class="view btn">-----------------</button>
          </span>
        </div>
        <div class="table-row duration-type">
          <span class="course-image">
            <img src="@/static/images/course-image.png" alt="عکس دوره" />
          </span>
          <span class="course-name-content">
            <span class="course-name"> دوره رضایی </span>
            <br />
            <span class="course-detail">
              این توضیح برای معرفی دوره هستش که ساختگی می باشد
            </span>
          </span>
          <span class="persian-number">1400/07/18</span>
          <span>-----------------</span>
          <span>عرفان اسدی</span>
          <span>
            <button class="download btn">دانلود</button>
          </span>
        </div>
        <div class="table-row package-type">
          <span class="course-image">
            <img src="@/static/images/course-image.png" alt="عکس دوره" />
          </span>
          <span class="course-name-content">
            <span class="course-name"> دوره رضایی </span>
            <br />
            <span class="course-detail">
              این توضیح برای معرفی دوره هستش که ساختگی می باشد
            </span>
          </span>
          <span class="persian-number">1400/07/18</span>
          <span class="time-left">هفت روز </span>
          <span>عرفان اسدی</span>
          <span>
            <button class="view btn">دیدن دوره</button>
          </span>
        </div> -->
      </template>
      <footer>
        <hr />
        <skeleton
          v-if="loading"
          class="skeleton"
          width="150px"
          height="30px"
          borderRadius="5px"
        />
        <a href="#" v-else> مشاهده همه دوره ها </a>
      </footer>
    </section>
  </div>
</template>

<script>
import skeleton from "@/components/skeleto-creator";
export default {
  components: { skeleton },
  layout: "dashboard",
  middleware: "userIsNotLog",
  data() {
    return {
      loading: true,
      myCourses: "",
    };
  },
  mounted() {
    this.getCourses();
  },
  methods: {
    async getCourses() {
      const myCourses = await this.$axios.get("/api/Student/StudentCourse/GetCourses", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      this.myCourses = myCourses.data.data;
      this.loading = false;
    },
    async buyLogin(id) {
      const buyResp = await this.$axios.get(`/api/Student/StudentOrder/BuyCourse/${id}`, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      if (buyResp.data.data == 3) {
        this.$swal({
          text: "به سبد خرید اضافه شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
      } else if (buyResp.data.data == 2) {
        this.$swal({
          text: "در سبد خرید موجود است",
          icon: "error",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
      }
    },
  },
};
</script>
<style lang="scss">
// @import "@/assets/styles/stu-panel.scss";
@import "@/assets/swal-style.scss";
</style>
