<template>
  <div class="panel-teacher-content-item my-courses">
    <div class="charts-container">
      <!-- skeleton -->
      <template v-if="loading">
        <progressSkeleton />
        <progressSkeleton />
        <div class="add-new-chart">
          <span class="content">
            <span>
              <skeleton class="skeleton" width="180px" height="35px" borderRadius="5px" />
            </span>
            <small>
              <skeleton
                class="skeleton mt"
                width="140px"
                height="25px"
                borderRadius="5px"
              />
            </small>
          </span>
        </div>
      </template>

      <template v-else>
        <circular-progressive-bar
          title="حجم مصرف شده برای بارگذاری دوره"
          :consumed="volumes.item2"
          :remaining="volumes.item2 - Math.round(volumes.item1)"
        />
        <circular-progressive-bar
          title="تعداد روزهای باقی مانده "
          :consumed="30"
          :remaining="0"
          color="green"
        />
        <div class="add-new-chart">
          <button
            class="content"
            @click.prevent="
              showAddCourse = true;
              SubmitType = 'add';
            "
          >
            <span class="plus">+</span>
            <p>افزودن دوره جدید</p>
          </button>
        </div>
      </template>
    </div>
    <div class="panel-table my-courses" v-if="showCoursesData && !showAddCourse">
      <div class="box-header">
        <span v-if="loading">
          <skeleton class="skeleton" width="130px" height="30px" borderRadius="5px" />
        </span>
        <h3 v-else>دوره های من</h3>
      </div>
      <section id="courses-table" class="box-content custom-scrollbar">
        <myCourseTableSkeleton v-if="loading" />
        <template v-else>
          <header class="table-row table-header">
            <span>عکس دوره</span>
            <span class="course-name-heading">نام دوره</span>
            <span>تاریخ</span>
            <span>تعداد جلسات</span>
            <span>قیمت (تومان)</span>
            <span>تخفیف</span>
            <span>حذف</span>
            <span>ویرایش</span>
            <span>افزودن قسمت ها</span>
            <span>وضعیت</span>
          </header>
          <courses-table
            v-for="course in coursesData"
            :key="course.id"
            :courseName="course.courseName"
            :coueseDetail="course.shortDescription"
            :courseCount="course.numberSessions"
            :price="course.price"
            :discount="course.discountPercentage"
            :date="course.courseReqTime"
            :id="course.id"
            :imageName="course.imageName"
            :isAccept="course.isAccepted"
          />
          <footer class="table-footer">
            <hr />
            <a href="" type="button" @click.prevent="seeAll"> مشاهده همه دوره ها </a>
          </footer>
        </template>
      </section>
    </div>
    <!-- <div class="basic-modal">
      <div class="content-box custom-scrollbar"> -->
    <div class="adding-course" v-show="!loading" v-if="showAddCourse">
      <form action="#">
        <template v-if="showAddPart >= 0">
          <header>
            <p class="section-header">افزودن دوره</p>
          </header>
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
            <p class="section-title-text">قوانین و شرایط</p>
          </div>
          <div class="terms-conditions custom-scrollbar">
            <p class="text">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
              طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
              لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف
              بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
              آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت
              بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در
              زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود
              در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
              حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
              اساسا مورد استفاده قرار گیرد.
            </p>
          </div>

          <label for="accept-terms" class="checkbox-label">
            <span class="checkbox-container">
              <input
                type="checkbox"
                name=""
                class="form-checkbox"
                id="accept-terms"
                v-model="terms"
              />
              <img
                src="@/static/panel-teacher-icons/check-mark.svg"
                class="check-mark"
                alt="check-icon"
              />
            </span>
            قوانین را میپذیرم
          </label>
          <div class="next-part-box">
            <button
              class="next-part-btn"
              type="button"
              @click.prevent="
                showAddPart = 1;
                termsNextBut();
              "
            >
              مرحله بعد
            </button>
          </div>
        </template>
        <template v-if="showAddPart >= 1 && terms" id="section2">
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
            <p class="section-title-text">مشخصات دوره</p>
          </div>
          <div class="form-row">
            <label for="" class="form-row-col">
              <input
                type="text"
                class="form-input"
                v-model="courseName"
                placeholder="نام دوره"
              />
            </label>

            <label for="" class="form-row-col">
              <div class="floated-list-container">
                <template v-if="SubmitType != 'edit'">
                  <input
                    type="text"
                    class="form-input"
                    v-model="groupDrop"
                    readonly
                    placeholder="دسته بندی"
                    @click="toggleDropDowns"
                  />
                  <ul class="floated-list custom-scrollbar">
                    <li
                      v-for="option in courseGroups"
                      :key="option.index"
                      @click="chooseGroup($event, option.id)"
                    >
                      {{ option.title }}
                    </li>
                  </ul>
                </template>
                <input
                  v-else
                  type="text"
                  class="form-input"
                  :value="groupDrop"
                  placeholder="نام دوره"
                />
              </div>
            </label>
          </div>
          <div class="form-row" v-if="subGroup.length > 0">
            <label for="" class="form-row-col floated-list-container in-panel">
              <input
                type="text"
                class="form-input"
                v-model="subGroupDrop"
                readonly
                placeholder="دسته دوره"
                @click="toggleDropDowns"
              />
              <ul class="floated-list custom-scrollbar">
                <li
                  v-for="option in subGroup"
                  :key="option.index"
                  @click="chooseSubGroup($event, option.id)"
                >
                  {{ option.groupTitle }}
                </li>
              </ul>
            </label>
            <label
              for=""
              class="form-row-col floated-list-container in-panel"
              v-if="subTwoGroup.length > 0"
            >
              <input
                type="text"
                class="form-input"
                v-model="subTwoGroupDrop"
                readonly
                placeholder="دسته دوره"
                @click="toggleDropDowns"
              />
              <ul class="floated-list custom-scrollbar">
                <li
                  v-for="option in subTwoGroup"
                  :key="option.index"
                  @click="chooseSubTwoGroup($event, option.id)"
                >
                  {{ option.groupTitle }}
                </li>
              </ul>
            </label>
            <label for="" class="form-row-col" v-else></label>
          </div>
          <div class="form-row">
            <label for="" class="form-row-col">
              <textarea
                name=""
                id=""
                cols="22"
                rows="0"
                v-model="shortDescription"
                placeholder="توضیحات دوره"
                class="form-input form-textarea"
              >
              </textarea>
            </label>
            <div class="form-row">
              <label for="" class="form-row-col">
                <input
                  type="text"
                  v-model="newTopic"
                  class="form-input has-cover-btn"
                  placeholder="افزودن سرفصل های دوره"
                />
                <button type="button" class="cover-btn" @click="addTopic">افزودن</button>
                <div class="course-topics">
                  <div class="topic" v-for="topic in topics" :key="topic.index">
                    <span class="topic-name">{{ topic }}</span>
                    <span class="close-icon" @click="removeTopic(topic)"> &times; </span>
                  </div>
                </div>
              </label>
              <label for="" class="form-row-col"></label>
            </div>
          </div>
          <div class="next-part-box">
            <button class="next-part-btn" type="button" @click.prevent="showAddPart = 2">
              مرحله بعد
            </button>
          </div>
        </template>
        <template v-if="showAddPart >= 2 && terms">
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
            <p class="section-title-text">معرفی دوره</p>
          </div>
          <div>
            <ckeditorNuxt v-model="content" />
          </div>
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
            <p class="section-title-text">تنظیمات دوره</p>
          </div>
          <custom-radio-btn
            name="course-setting"
            v-model="subscriptionRadio"
            :radioBtns="[
              {
                forId: 'vip-subscription-radio',
                text: 'پولی',
                val: 'money',
              },
              { forId: 'free-course-r adio', text: 'رایگان', val: 'free' },
            ]"
          />
          <div class="form-row">
            <label for="" class="form-row-col">
              <input
                type="number"
                class="form-input"
                v-model="coursePrice"
                placeholder="قیمت دوره"
                :disabled="subscriptionRadio == 'money' ? false : 'disabled'"
              />
              <span class="hint-text persian-number"
                >{{ priceUnderSuggestionPrice }} تومان</span
              >
            </label>
            <label for="" class="form-row-col">
              <input
                type="number"
                class="form-input"
                v-model="courseDiscount"
                placeholder="تخفیف دوره"
                :disabled="subscriptionRadio == 'money' ? false : 'disabled'"
              />
              <span class="hint-text">تخفیف دوره را بصورت درصد وارد کنید</span>
            </label>
          </div>
          <br />
          <br />
          <div class="next-part-box">
            <button class="next-part-btn" @click.prevent="showAddPart = 3" type="button">
              مرحله بعد
            </button>
          </div>
        </template>
        <template v-if="showAddPart >= 3 && terms">
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
            <p class="section-title-text">بارگذاری دوره</p>
          </div>
          <div class="form-row">
            <div for="" class="form-row-col darken-color">
              <div class="separator pseudo-form-input">
                <input type="file" id="upload-course-image" @change="uploadCoursePic" />
                <span v-if="coursePicName == ''">بارگذاری تصویر دوره</span>
                <span class="section-title-text" v-else>{{ coursePicName }}</span>
                <span>
                  <label for="upload-course-image" class="cover-btn">انتخاب</label>
                </span>
              </div>
            </div>

            <label for="" class="form-row-col guide-section">
              <a href="#" class="guide-text"> راهنمای انتخاب عکس مناسب </a>
            </label>
          </div>
          <button class="form-btn success" @click.prevent="uploadCourse">
            ثبت و نهایی کردن
          </button>
          <div class="options-buttons" v-if="SubmitType == 'edit'">
            <button class="form-btn" @click.prevent="banCourse('Completed')">
              کامل کردن دوره
            </button>
            <button class="form-btn" @click.prevent="banCourse('InProgress')">
              درحال پخش کردن دوره
            </button>
          </div>
        </template>
      </form>
    </div>
    <!-- </div>
    </div> -->
  </div>
</template>

<script>
import progressSkeleton from "@/components/pages-skeleton/circular-progress-skeleton";
import skeleton from "@/components/skeleton-components/skeletonCreator";
import myCourseTableSkeleton from "@/components/pages-skeleton/my-course-table-skeleton";
import ckeditorNuxt from "@/components/ckeditorNuxt";
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  components: {
    ckeditorNuxt,
    progressSkeleton,
    skeleton,
    myCourseTableSkeleton,
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },
  head() {
    return {
      title: "دوره ها",
    };
  },
  data() {
    return {
      showAddPart: 0,
      loading: true,
      content: "",
      coursesData: [],
      courseGroups: [],
      groupDrop: "",
      selectedGroup: "",
      subGroup: [],
      subGroupDrop: "",
      subGroupId: "",
      subTwoGroup: [],
      subTwoGroupDrop: "",
      subTwoGroupId: "",

      showAddCourse: false,
      showCoursesData: true,
      SubmitType: "",
      courseId: "",
      terms: false,
      coursePicName: "",

      // selected IDs
      selectedGroup: "",

      courseName: "",
      shortDescription: "",
      subscriptionRadio: "",
      coursePrice: "",
      courseDiscount: "",
      uploadedCourseImage: "",
      topicsString: "",

      topics: [],
      newTopic: "",
      contentHolder: "",
      priceUnderSuggestionPrice: 0,
    };
  },
  async beforeMount() {
    this.getLoadData();
  },
  // mounted() {
  //   setTimeout(() => {
  //     this.loading = false;
  //   }, 4000);
  // },
  methods: {
    seeAll() {
      const table = document.getElementById("courses-table");
      table.style.overflowY = "scroll";
      document.querySelector(".table-footer").style.display = "none";
    },
    toggleDropDowns(event) {
      event.stopPropagation();
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    async chooseGroup(event, id) {
      this.groupDrop = event.target.innerHTML.trim();
      this.selectedGroup = id;
      event.target.closest(".floated-list-container").classList.toggle("show");
      const subGroup = await this.$axios.get(
        `/api/Public/ProfileActions/GetCourseGroups/${this.selectedGroup}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (subGroup.data.statusCode == 200 && subGroup.data.message == "Success") {
        this.subGroup = subGroup.data.data;
      }
    },
    async chooseSubGroup(event, id) {
      this.subGroupDrop = event.target.innerHTML.trim();
      this.subGroupId = id;
      this.selectedGroup = id;
      event.target.closest(".floated-list-container").classList.toggle("show");
      const subTwoGroup = await this.$axios.get(
        `/api/Public/ProfileActions/GetCourseGroups/${this.subGroupId}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (subTwoGroup.data.statusCode == 200 && subTwoGroup.data.message == "Success") {
        this.subTwoGroup = subTwoGroup.data.data;
      }
    },
    chooseSubTwoGroup(event, id) {
      this.subTwoGroupDrop = event.target.innerHTML.trim();
      this.subTwoGroupId = id;
      this.selectedGroup = id;
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    async getLoadData() {
      this.loading = true;
      let [getCourseGroups, getCourseData, volumes] = await Promise.all([
        this.$axios.get("/api/Public/ProfileActions/GetCourseGroups", {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }),
        this.$axios.get("/api/Teacher/TeacherCourse/Course", {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }),
        this.$axios.get("/api/Teacher/TeacherHome/GetVolume", {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }),
      ]);
      // console.log(getCourseData);
      if (
        getCourseGroups.data.statusCode == 200 &&
        getCourseGroups.data.message == "Success" &&
        getCourseData.data.statusCode == 200 &&
        getCourseData.data.message == "Success"
      ) {
        this.volumes = volumes.data.data;
        for (const n of getCourseGroups.data.data) {
          this.courseGroups.push({ title: n.groupTitle, id: n.id });
        }

        if (getCourseData.data.data.length == 0) {
          this.showCoursesData = false;
        }
        for (const n of getCourseData.data.data) {
          this.coursesData.push({
            courseName: n.courseName,
            id: n.courseId,
            imageName: n.courseImageName,
            courseReqTime: new Date(n.createDate).toLocaleDateString("fa-IR"),
            discountPercentage: n.discountPercentage,
            numberSessions: n.numberSessions,
            price: n.price.toLocaleString(),
            shortDescription: n.shortDescription,
            isAccepted: n.isAccepted,
          });
        }
        this.loading = false;
      }
    },
    chooseGrade(event) {
      this.gradeDrop = event.target.innerHTML.trim();
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    chooseSubGrade(event) {
      this.subGradeDrop = event.target.innerHTML.trim();
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    addTopic() {
      if (this.newTopic !== "") {
        this.topics.push(this.newTopic);
        this.newTopic = "";
      }
    },
    removeTopic(topic) {
      const topicIndex = this.topics.indexOf(topic);
      if (topicIndex !== -1) {
        this.topics.splice(topicIndex, 1);
      }
    },
    uploadCoursePic(event) {
      try {
        this.uploadedCourseImage = event.target.files[0];
        this.coursePicName = event.target.files[0].name;
      } catch {}
      // this.createBase64Image(coursePic);
    },
    // createBase64Image(fileObject) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     this.uploadedCourseImage = e.target.result;
    //   };
    //   reader.readAsDataURL(fileObject);
    // },
    async uploadCourse() {
      if (
        this.courseName != "" &&
        this.content != "" &&
        this.coursePrice != "" &&
        this.topicsString != "" &&
        this.subscriptionRadio != "" &&
        this.shortDescription != ""
      ) {
        if (this.SubmitType == "add") {
          if (this.selectedGroup != "") {
            try {
              if (this.courseDiscount >= 0 && this.courseDiscount <= 100) {
                let formData = new FormData();
                formData.append("courseName", this.courseName);
                formData.append("groupId", this.selectedGroup);
                formData.append("shortDescription", this.shortDescription);
                formData.append("description", this.content);
                formData.append(
                  "price",
                  this.subscriptionRadio == "free" ? 0 : Number(this.coursePrice)
                );
                formData.append(
                  "discountPercentage",
                  this.subscriptionRadio == "free"
                    ? 0
                    : this.courseDiscount == ""
                    ? 0
                    : Number(this.courseDiscount)
                );
                formData.append("courseTopics", this.topicsString);
                formData.append("type", this.subscriptionRadio);
                formData.append("courseImage", this.uploadedCourseImage);
                const uploadCourseResponse = await this.$axios.post(
                  "/api/Teacher/TeacherCourse/Course",
                  formData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                      Authorization: `Bearer ${this.$cookies.get("key")}`,
                    },
                  }
                );
                if (
                  uploadCourseResponse.data.statusCode == 200 &&
                  uploadCourseResponse.data.message == "Success"
                ) {
                  // console.log(uploadCourseResponse);
                  this.$swal({
                    text: "با موفقیت انجام شد",
                    icon: "success",
                    showCloseButton: true,
                    confirmButtonText: "بستن",
                  });
                  this.coursesData = [];
                  this.courseGroups = [];
                  this.getLoadData();
                  this.showAddCourse = false;
                  this.$router.push("/add-episode/" + uploadCourseResponse.data.data);
                }
              } else {
                this.$swal({
                  text: "درصد تخفیف نامعتبر",
                  icon: "error",
                  showCloseButton: true,
                  confirmButtonText: "ادامه",
                });
              }
            } catch (e) {
              this.$swal({
                text: "مشکلی رخ داده است!لطفا بعدا دوباره تلاش کنید",
                icon: "error",
                showCloseButton: true,
                confirmButtonText: "ادامه",
              });
            }
          }
        } else if (this.SubmitType == "edit") {
          try {
            if (this.courseDiscount >= 0 && this.courseDiscount <= 100) {
              let formData = new FormData();
              formData.append("courseId", this.courseId);
              formData.append("shortDescription", this.shortDescription);
              formData.append("description", this.content);
              formData.append(
                "price",
                this.subscriptionRadio == "free" ? 0 : Number(this.coursePrice)
              );
              formData.append(
                "discountPercentage",
                this.subscriptionRadio == "free"
                  ? 0
                  : this.courseDiscount == ""
                  ? 0
                  : Number(this.courseDiscount)
              );
              formData.append("courseTopics", this.topicsString);
              formData.append("type", this.subscriptionRadio);
              formData.append("courseImage", this.uploadedCourseImage);
              const uploadCourseResponse = await this.$axios.put(
                "/api/Teacher/TeacherCourse/Course",
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${this.$cookies.get("key")}`,
                  },
                }
              );
              if (
                uploadCourseResponse.data.statusCode == 200 &&
                uploadCourseResponse.data.message == "Success"
              ) {
                this.$swal({
                  text: "با موفقیت انجام شد",
                  icon: "success",
                  showCloseButton: true,
                  confirmButtonText: "بستن",
                });
                this.coursesData = [];
                this.courseGroups = [];
                this.getLoadData();
                this.showAddCourse = false;
              }
            } else {
              this.$swal({
                text: "درصد تخفیف نامعتبر",
                icon: "error",
                showCloseButton: true,
                confirmButtonText: "ادامه",
              });
            }
          } catch {
            this.$swal({
              text: "مشکلی رخ داده است!لطفا بعدا دوباره تلاش کنید",
              icon: "error",
              showCloseButton: true,
              confirmButtonText: "ادامه",
            });
          }
        }
      } else {
        this.$swal({
          text: "همه فیلد ها را پر کنید",
          icon: "warning",
          showCloseButton: true,
          confirmButtonText: "تلاش مجدد",
        });
      }
    },
    async deleteCourse(courseID) {
      const deleteCourseResponse = await this.$axios.delete(
        "/api/Teacher/TeacherCourse/Course/" + courseID,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        deleteCourseResponse.data.statusCode == 200 &&
        deleteCourseResponse.data.message == "Success"
      ) {
        this.$swal({
          text: "با موفقیت انجام شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "بستن",
        });
        this.coursesData = [];
        this.courseGroups = [];
        this.getLoadData();
        this.showAddCourse = false;
      } else {
        this.$swal({
          text: "مشکلی رخ داده است!لطفا بعدا دوباره تلاش کنید",
          icon: "error",
          showCloseButton: true,
          confirmButtonText: "ادامه",
        });
      }
    },
    async getEditCourse(courseID) {
      this.SubmitType = "edit";
      const editableData = await this.$axios.get(
        "/api/Teacher/TeacherCourse/Course/" + courseID,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      const getData = editableData.data.data;
      // console.log(getData);
      if (editableData.data.statusCode == 200 && editableData.data.message == "Success") {
        this.showAddCourse = true;
        for (const n of this.courseGroups) {
          if (getData.groupId === n.id) {
            this.groupDrop = n.title;
            this.selectedGroup = n.id;
          }
        }
        this.groupDrop = getData.groupTitle;
        (this.topics = getData.courseTopics
          .substring(0, getData.courseTopics.length - 1)
          .split(",")),
          (this.topicsString = getData.courseTopics),
          (this.courseName = getData.courseName),
          (this.shortDescription = getData.shortDescription),
          (this.content = getData.description),
          (this.courseDiscount = getData.discountPercentage),
          (this.coursePrice = getData.price),
          (this.courseId = getData.courseId),
          (this.subscriptionRadio = getData.type);
      }
    },
    addVideos(id) {
      this.$router.push(`/add-episode/${id}`);
    },
    termsNextBut() {
      if (this.terms == false) {
        this.$swal({
          text: "قوانین را مطالعه و بپذیرید",
          icon: "error",
          showCloseButton: true,
          confirmButtonText: "ادامه",
        });
        this.showAddPart = 0;
      }
    },
  },
  watch: {
    subscriptionRadio: {
      handler() {
        if (this.subscriptionRadio == "free") {
          (this.coursePrice = "0"), (this.courseDiscount = "0");
        }
      },
      deep: true,
    },
    topics: {
      handler() {
        this.topicsString = "";
        this.topics.forEach((item) => {
          this.topicsString = this.topicsString + item + ",";
        });
      },
      deep: true,
    },
    coursePrice: {
      handler() {
        this.priceUnderSuggestionPrice = Number(this.coursePrice).toLocaleString();
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/swal-style.scss";
</style>
