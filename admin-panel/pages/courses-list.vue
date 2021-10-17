<template>
  <div class="panel-admin-content-item">
    <div class="panel-table teachers-list courses-list">
      <div class="box-header">
        <h3>
          <skeleton
            v-if="loading"
            class="skeleton"
            width="95px"
            height="30px"
            borderRadius="5px"
          />
          <template v-else> لیست دوره ها </template>
        </h3>
        <form action="">
          <skeleton
            v-if="loading"
            class="skeleton"
            width="130px"
            height="30px"
            borderRadius="5px"
          />
          <skeleton
            v-if="loading"
            class="skeleton"
            width="40px"
            height="30px"
            borderRadius="5px"
          />
          <template v-else>
            <div class="filter floated-list-container">
              <input
                type="text"
                readonly
                placeholder="فیلتر بر اساس"
                @click="toggleDropdown"
                v-model="filter"
              />
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
              <ul class="floated-list">
                <li @click="selectFilter($event, 'all')">بدون فیلتر</li>
                <li @click="selectFilter($event, 'package')">پکیج</li>
                <li @click="selectFilter($event, 'course')">دوره</li>
              </ul>
            </div>
            <label for="teacher-courses-search-btn" class="search-box" tabindex="0">
              <input
                type="search"
                placeholder="جستجو کنید"
                class="search-btn"
                id="teacher-courses-search-btn"
                ref="searchInput"
              />
              <img
                src="@/static/icons/search-icon-orange.png"
                alt="آیکون سرچ"
                @click="searchEvent"
              />
            </label>
          </template>
        </form>
      </div>
      <section class="box-content custom-scrollbar" id="courses-table">
        <header class="table-row table-header">
          <template v-if="loading">
            <span v-for="i in 7" :key="i">
              <skeleton class="skeleton" width="35px" height="20px" borderRadius="5px" />
            </span>
          </template>
          <template v-else>
            <span>نام دوره</span>
            <span>نام استاد</span>
            <span>شماره موبایل</span>
            <span>تعداد جلسات</span>
            <span>نوع</span>
            <span>مشاهده</span>
            <span>افزودن قسمت ها</span>
            <span>ویرایش دوره</span>
            <span>وضعیت تائید دوره</span>
            <span>وضعیت دوره</span>
            <span>پیام ها و نظرات دوره</span>
          </template>
        </header>
        <template v-if="loading">
          <div class="table-row" v-for="i in 4" :key="i.index">
            <span v-for="j in 7" :key="j">
              <skeleton class="skeleton" width="35px" height="20px" borderRadius="5px" />
            </span>
          </div>
        </template>
        <template v-else>
          <div class="table-row" v-for="course in courses" :key="course.courseId">
            <span>{{ course.courseName }}</span>
            <span class="name">{{ course.teacherName }}</span>
            <span class="persian-number">{{ course.phoneNumber }}</span>
            <span>{{ course.sessionsCount }}</span>
            <span v-if="course.isPackage == true">پکیج</span>
            <span v-if="course.isPackage == false">دوره</span>
            <span>
              <button class="view" @click.prevent="seeCourse(course.courseId)">
                مشاهده
              </button>
            </span>
            <span>
              <button class="view" @click.prevent="addVideos(course.courseId)">
                افزودن قسمت ها
              </button>
            </span>
            <span>
              <button class="view" @click.prevent="editCourse(course.courseId)">
                ویرایش دوره
              </button>
            </span>
            <span class="state edited" v-if="course.isAccepted == 'NewEdit'">
              ویرایشات جدید
            </span>
            <span class="state accepted" v-else-if="course.isAccepted == 'Accepted'">
              تائید شده
            </span>
            <span
              class="state not-accepted"
              v-else-if="course.isAccepted == 'NotAccepted'"
            >
              تائید نشده
            </span>
            <span class="state edited" v-if="course.status == 'InProgress'">
              در حال پخش
            </span>
            <span class="state accepted" v-else-if="course.status == 'Completed'">
              کامل شده
            </span>
            <span class="state not-accepted" v-else-if="course.status == 'Stopped'">
              مسدود شده
            </span>
            <span class="state not-accepted" v-else-if="course.status == null">
              وضعیت نامشخص(موقتی)
            </span>
            <span>
              <button class="view" @click.prevent="seeCourseComments(course.courseId)">
                مشاهده
              </button>
            </span>
          </div>

          <footer class="table-footer">
            <hr />
            <a href="" @click.prevent="seeAll"> مشاهده همه </a>
          </footer>
        </template>
      </section>
    </div>
  </div>
</template>
<script>
import skeleton from "@/components/skeleton-creator";
export default {
  components: { skeleton },
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  data() {
    return {
      loading: true,
      filter: "",
      courses: [],
      selectedFilter: "",
      searchInput: "",
      coursesComments: "",
      messageGroups: [],
      commentGroups: [],
      audioBase64Data: "",
      questionsFilter: "",
      goTo: "",
    };
  },
  async mounted() {
    await Promise.all([this.getCoursesQuestions(), this.getCoursesComments()]);
    const courses = await this.$axios.get("/api/Admin/AdminCourse/Course?filterBy=all", {
      headers: {
        Authorization: `Bearer ${this.$cookies.get("key")}`,
      },
    });
    if (courses.data.statusCode == 200 && courses.data.message == "Success") {
      this.courses = courses.data.data;
      this.loading = false;
    }
  },
  methods: {
    goToPage(event) {
      this.goTo = event.target.innerHTML;
    },
    async getCoursesQuestions() {
      this.messageGroups = [];
      const questions = await this.$axios.get(`/api/Admin/AdminQuestion/GetQuestions`, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      // console.log(questions);
      this.questionsFilter = questions.data.data.filter;
      for (const eachMessage of questions.data.data.questionItems) {
        if (eachMessage.parentId == null) {
          let group = [];
          group.push(eachMessage);
          this.messageGroups.push(group);
        } else {
          for (const i of this.messageGroups) {
            for (const j of i) {
              if (eachMessage.parentId == j.questionId) {
                i.push(eachMessage);
              }
            }
          }
        }
      }
    },
    async seeResponses(id) {
      const msgResp = await this.$axios.get(
        `/api/Admin/AdminQuestion/GetQuestionResponses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      for (const i of this.messageGroups) {
        if (i[0].questionId == Number(id)) {
          for (const j of msgResp.data.data) {
            i.push(j);
          }
        }
      }
    },
    async downloadAttachAudio(id) {
      const audioresp = await this.$axios.get(
        "/api/Admin/AdminQuestion/GetQuestionAudioBase64/" + id,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (audioresp.data.statusCode == 200 && audioresp.data.message == "Success") {
        const audioPlayerModal = document.querySelector(".audioPlayerModal");
        this.audioBase64Data = audioresp.data.data.audioBase64;
        audioPlayerModal.style.display = "flex";
        // audioPlayerModal.style.visibility = "visible";
      }
    },
    async downloadAttachFile(id) {
      const download = await this.$axios.get(
        "/api/Admin/AdminQuestion/GetQuestionAttachImageBase64/" + id,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (download.data.statusCode == 200 && download.data.message == "Success") {
        if (download.data.data.attachImageBase64 != null) {
          var a = document.createElement("a");
          a.href = "data:image/png;base64," + download.data.data.attachImageBase64;
          a.download = "Image" + new Date().getTime() + ".png";
          a.click();
        } else {
          this.$swal({
            text: "عکسی وجود ندارد",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "ادامه",
          });
        }
      }
    },
    closePlayer() {
      const audioPlayerModal = document.querySelector(".audioPlayerModal");
      this.audioBase64Data = "";
      audioPlayerModal.style.display = "none";
    },
    async getCoursesComments() {
      const coursesComments = await this.$axios.get(
        "/api/Admin/AdminComment/GetCourseComments",
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      // console.log(coursesComments);
      this.commentGroups = [];
      if (
        coursesComments.data.statusCode == 200 &&
        coursesComments.data.message == "Success"
      ) {
        for (const comment of coursesComments.data.data) {
          if (comment.parentId == null) {
            let group = [];
            group.push(comment);
            this.commentGroups.push(group);
          } else {
            for (const i of this.commentGroups) {
              for (const j of i) {
                if (comment.parentId == j.commentId) {
                  i.push(comment);
                }
              }
            }
          }
        }
      }
    },
    seeAll() {
      const table = document.getElementById("courses-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer").style.display = "none");
    },
    toggleDropdown() {
      event.stopPropagation();
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    selectFilter(event, select) {
      this.selectedFilter = select;
      this.filter = event.target.innerHTML.trim();
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    addVideos(id) {
      this.$router.push(`/add-episode/${id}`);
    },
    seeCourse(id) {
      this.$router.push(`/add-course/see/${id}`);
    },
    editCourse(id) {
      this.$router.push(`/add-course/edit/${id}`);
    },
    async deleteQuestion(id) {
      const deleteResp = await this.$axios.delete(
        `/api/Admin/AdminQuestion/RemoveQuestion/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (deleteResp.data.statusCode == 200 && deleteResp.data.message == "Success") {
        this.$swal({
          text: "حذف شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
        this.getCoursesQuestions();
      }
    },
    async changeStatus(id, type) {
      // const changeStatusResp = await this.$axios.get(
      //   `/api/Admin/AdminComment/UpdateCourseCommentStatus/${id}/${type}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${this.$cookies.get("key")}`,
      //     },
      //   }
      // );
      // console.log(changeStatusResp);
    },
    async confirmComment(id) {
      const changeStatusResp = await this.$axios.get(
        `/api/Admin/AdminComment/UpdateCourseCommentStatus/${id}/true`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        changeStatusResp.data.statusCode == 200 &&
        changeStatusResp.data.message == "Success"
      ) {
        this.$swal({
          text: "تایید شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
        this.getCoursesComments();
      }
    },
    async deleteComment(id) {
      const deleteResp = await this.$axios.delete(
        `/api/Admin/AdminComment/DeleteCourseCommentStatus/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (deleteResp.data.statusCode == 200 && deleteResp.data.message == "Success") {
        this.$swal({
          text: "حذف شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
        this.getCoursesComments();
      }
    },
    async searchEvent() {
      this.searchInput = this.$refs.searchInput.value;
      if (this.selectedFilter == "") {
        const courses = await this.$axios.get(
          `/api/Admin/AdminCourse/Course?filterBy=all&search=${this.searchInput}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (courses.data.statusCode == 200 && courses.data.message == "Success") {
          this.courses = courses.data.data;
        }
      } else {
        const courses = await this.$axios.get(
          `/api/Admin/AdminCourse/Course?filterBy=${this.selectedFilter}&search=${this.searchInput}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (courses.data.statusCode == 200 && courses.data.message == "Success") {
          this.courses = courses.data.data;
        }
      }
    },
    seeCourseComments(id) {
      this.$router.push("/course-questions/" + id);
    },
  },

  watch: {
    selectedFilter: {
      async handler() {
        if (this.searchInput == "") {
          const courses = await this.$axios.get(
            `/api/Admin/AdminCourse/Course?filterBy=${this.selectedFilter}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (courses.data.statusCode == 200 && courses.data.message == "Success") {
            this.courses = courses.data.data;
          }
        } else {
          const courses = await this.$axios.get(
            `/api/Admin/AdminCourse/Course?filterBy=${this.selectedFilter}&search=${this.searchInput}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (courses.data.statusCode == 200 && courses.data.message == "Success") {
            this.courses = courses.data.data;
          }
        }
      },
    },
    goTo: {
      async handler() {
        const questions = await this.$axios.get(
          `/api/Admin/AdminComment/GetCourseComments?pageId=${this.goTo}`
        );
        if (questions.data.statusCode == 200 && questions.data.message == "Success") {
          this.questionsFilter = questions.data.data.filter;
          this.messageGroups = [];
          for (const eachMessage of questions.data.data.questionItems) {
            if (eachMessage.parentId == null) {
              let group = [];
              group.push(eachMessage);
              this.messageGroups.push(group);
            } else {
              for (const i of this.messageGroups) {
                for (const j of i) {
                  if (eachMessage.parentId == j.questionId) {
                    i.push(eachMessage);
                  }
                }
              }
            }
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
