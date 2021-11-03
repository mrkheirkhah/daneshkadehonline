<template>
  <div class="panel-admin-content-item add-course">
    <div class="adding-course">
      <header>
        <p class="section-header">افزودن دوره</p>
      </header>
      <form action="#">
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
          <label for="" class="form-row-col floated-list-container in-panel">
            <template v-if="submitType != 'edit'">
              <input
                type="text"
                class="form-input"
                v-model="groupDrop"
                readonly
                placeholder="دسته دوره"
                @click="toggleDropDowns"
              />
              <ul class="floated-list custom-scrollbar">
                <li
                  v-for="option in courseGroups"
                  :key="option.index"
                  @click.prevent="chooseGroup($event, option.id)"
                >
                  {{ option.title }}
                </li>
              </ul>
            </template>
            <input
              v-else
              type="text"
              readonly
              class="form-input"
              :value="groupDropEdit"
              placeholder="دسته دوره"
            />
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
              cols="22"
              rows="0"
              placeholder="توضیحات دوره"
              v-model="shortDescription"
              class="form-input form-textarea"
            ></textarea>
          </label>

          <div class="form-row">
            <label for="" class="form-row-col">
              <input
                type="text"
                class="form-input has-cover-btn"
                placeholder="افزودن سرفصل های دوره"
                v-model="newTopic"
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
        <div id="teacher-course-editor" class="froala-editor"></div>
        <br />

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
        <div class="form-row radios-container">
          <div>
            <input
              type="radio"
              class="form-radio"
              name="course-price"
              id="course-price-radio"
              value="money"
              v-model="coursePriceType"
            />
            <label for="course-price-radio">پولی</label>
            <label for="course-price-radio" class="radio-overlay"></label>
          </div>
          <div>
            <input
              type="radio"
              class="form-radio"
              name="course-price"
              id="free-course-radio"
              value="free"
              v-model="coursePriceType"
            />
            <label for="free-course-radio">رایگان</label>
            <label for="free-course-radio" class="radio-overlay"></label>
          </div>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="number"
              class="form-input"
              placeholder="قیمت دوره"
              v-model="coursePrice"
              :disabled="coursePriceType == 'free'"
            /><span class="hint-text persian-number"
              >{{ priceUnderSuggestionPrice }} تومان</span
            >
          </label>
          <label for="" class="form-row-col">
            <input
              type="number"
              class="form-input"
              placeholder="تخفیف دوره"
              v-model="courseDiscount"
              :disabled="coursePriceType == 'free'"
            />
            <span class="hint-text">تخفیف دوره را بصورت درصد وارد کنید</span>
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="tel"
              class="form-input"
              placeholder="شماره موبایل معلم"
              v-model="teacherPhoneNumber"
              :disabled="disablePhone"
            />
            <span class="hint-text">{{ nameUnderPhone }}</span>
          </label>
          <label for="" class="form-row-col"> </label>
        </div>
        <br />
        <br />

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
              <input type="file" id="upload-course-image" @change="selectCourseImage" />
              <span v-if="imageName == ''">بارگذاری تصویر دوره</span>
              <span v-else>{{ imageName }}</span>
              <span>
                <label for="upload-course-image" class="cover-btn">انتخاب</label>
              </span>
            </div>
          </div>
          <label for="" class="form-row-col guide-section">
            <a href="" type="button" @click.prevent="showProfHelp" class="guide-text">
              راهنمای انتخاب عکس مناسب
            </a>
          </label>
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
          <p class="section-title-text">آپشن ها</p>
        </div>
        <div class="form-row radios-container">
          <div>
            <input
              type="radio"
              class="form-radio"
              name="course-setting"
              id="type-course-radio"
              :value="false"
              v-model="isPack"
            />
            <label for="type-course-radio">دوره</label>
            <label for="type-course-radio" class="radio-overlay"></label>
          </div>
          <div>
            <input
              type="radio"
              class="form-radio"
              name="course-setting"
              id="type-package-radio"
              :value="true"
              v-model="isPack"
            />
            <label for="type-package-radio">پکیج</label>
            <label for="type-package-radio" class="radio-overlay"></label>
          </div>
        </div>
        <div class="options-buttons">
          <button class="form-btn red-color" v-if="isEdit" @click.prevent="deleteCourse">
            حذف دوره
          </button>
          <button
            class="form-btn"
            v-if="isEdit && status == 'Stopped'"
            @click.prevent="banCourse('false')"
          >
            رفع مسدودیت
          </button>
          <button
            class="form-btn red-color"
            v-if="isEdit"
            @click.prevent="banCourse('Stopped')"
          >
            مسدود کردن دوره
          </button>
          <button class="form-btn" v-if="isEdit" @click.prevent="banCourse('Completed')">
            کامل کردن دوره
          </button>
          <button class="form-btn" v-if="isEdit" @click.prevent="banCourse('InProgress')">
            درحال پخش کردن دوره
          </button>
          <button
            class="form-btn green-color"
            v-if="isEdit"
            @click.prevent="changeAcceptCourse('true')"
          >
            تائید ویرایشات
          </button>
          <button
            class="form-btn red-color"
            v-if="isEdit"
            @click.prevent="changeAcceptCourse('false')"
          >
            رد دوره
          </button>
        </div>
        <button class="form-btn success" @click.prevent="addCourse" v-if="!isSee">
          ثبت و نهایی کردن
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import ckeditorNuxt from "@/components/ckeditorNuxt";
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  components: {
    ckeditorNuxt,
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },
  data() {
    return {
      groupDropEdit: "",
      newTopic: "",
      topicsString: "",
      topics: [],
      content: "",
      shortDescription: "",
      courseName: "",
      courseDiscount: "",
      coursePrice: "",
      teacherPhoneNumber: "",
      courseImageBase64: "",
      courseGroups: [],
      groupDrop: "",
      selectedGroup: "",
      subGroup: [],
      subGroupDrop: "",
      subGroupId: "",
      subTwoGroup: [],
      subTwoGroupDrop: "",
      subTwoGroupId: "",
      coursePriceType: "money",
      isPack: false,
      imageName: "",
      disablePhone: false,
      courseId: "",
      status: "",
      nameUnderPhone: "",
      submitType: this.$route.params.type,
      priceUnderSuggestionPrice: 0,
    };
  },
  computed: {
    isEdit() {
      return this.$route.params.type == "edit";
    },
    isSee() {
      return this.$route.params.type == "see";
    },
  },
  async beforeMount() {
    const groups = await this.$axios.get("/api/Public/ProfileActions/GetCourseGroups", {
      headers: {
        Authorization: `Bearer ${this.$cookies.get("key")}`,
      },
    });
    for (const n of groups.data.data) {
      this.courseGroups.push({ title: n.groupTitle, id: n.id });
    }
    if (this.$route.params.type == "edit" || this.$route.params.type == "see") {
      if (this.$route.params.id == undefined || isNaN(this.$route.params.id)) {
        this.$router.push("/courses-list");
      } else {
        const getCourseById = await this.$axios.get(
          "/api/Admin/AdminCourse/Course/" + String(this.$route.params.id),
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        const courseDetails = getCourseById.data.data;
        for (const n of this.courseGroups) {
          if (courseDetails.groupId === n.id) {
            this.groupDrop = n.title;
            this.selectedGroup = n.id;
          }
        }
        this.topics = courseDetails.courseTopics
          .substring(0, courseDetails.courseTopics.length - 1)
          .split(",");
        this.courseName = courseDetails.courseName;
        this.courseId = courseDetails.courseId;
        this.content = courseDetails.description;
        this.courseDiscount = courseDetails.discountPercentage;
        // this.selectedGroup = courseDetails.groupId;
        this.groupDropEdit = courseDetails.groupTitle;
        this.isPack = courseDetails.isPackage;
        this.coursePrice = courseDetails.price;
        this.shortDescription = courseDetails.shortDescription;
        this.teacherPhoneNumber = courseDetails.teacherPhoneNumber;
        this.coursePriceType = courseDetails.type;
        this.status = courseDetails.status;
      }
    } else if (this.$route.params.type == "add") {
      if (this.$route.params.id != undefined) {
        this.teacherPhoneNumber = this.$route.params.id;
        this.disablePhone = true;
      }
    }
  },
  async mounted() {},
  methods: {
    showProfHelp() {
      this.$swal({
        text:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد",
        showCloseButton: true,
        showConfirmButton: false,
      });
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
    addTopic() {
      if (this.newTopic !== "") {
        this.topics.push(this.newTopic);
        // this.topicsString = this.topicsString + this.newTopic + ",";
        this.newTopic = "";
      }
    },
    removeTopic(topic) {
      const topicIndex = this.topics.indexOf(topic);
      if (topicIndex !== -1) {
        this.topics.splice(topicIndex, 1);
      }
    },
    selectCourseImage() {
      try {
        this.imageName = event.target.files[0].name;
        this.courseImageBase64 = event.target.files[0];
      } catch {}
    },
    // createBase64Image(fileObject) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     this.courseImageBase64 = e.target.result;
    //   };
    //   reader.readAsDataURL(fileObject);
    // },
    deleteDiscount(id) {
      this.$swal({
        text: "از حذف تخفیف اطمینان دارید؟",
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "بله",
        cancelButtonText: "خیر",
      }).then(async (clickedBut) => {
        if (clickedBut.isConfirmed) {
          const deleteResponse = await this.$axios.delete(
            "/api/Teacher/TeacherDiscount/Discount/" + id,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (
            deleteResponse.data.statusCode == 200 &&
            deleteResponse.data.message == "Success"
          ) {
            this.$swal({
              text: "با موفقیت انجام شد",
              icon: "success",
              showCloseButton: true,
              confirmButtonText: "بستن",
            });
            location.reload();
          } else {
            this.$swal({
              text: "مشکلی رخ داده است!لطفا بعدا دوباره تلاش کنید",
              icon: "error",
              showCloseButton: true,
              confirmButtonText: "ادامه",
            });
          }
        } else {
        }
      });
    },
    async addCourse() {
      if (
        this.topicsString != "" &&
        this.content != "" &&
        this.shortDescription != "" &&
        this.courseName != "" &&
        this.coursePrice != "" &&
        this.teacherPhoneNumber != "" &&
        this.coursePriceType != ""
      ) {
        let formData = new FormData();
        formData.append("CourseName", this.courseName);
        formData.append("GroupId", this.selectedGroup);
        formData.append("ShortDescription", this.shortDescription);
        formData.append("Description", this.content);
        formData.append("Price", this.coursePrice);
        formData.append(
          "DiscountPercentage",
          this.courseDiscount != "" ? this.courseDiscount : 0
        );
        formData.append("CourseTopics", this.topicsString);
        formData.append("Type", this.coursePriceType);
        formData.append("CourseImage", this.courseImageBase64);
        formData.append("TeacherPhoneNumber", this.teacherPhoneNumber);
        formData.append("IsPackage", this.isPack);

        if (this.courseDiscount >= 0 && this.courseDiscount <= 100) {
          if (this.$route.params.type == "add") {
            const addCourseResponse = await this.$axios.post(
              "/api/Admin/AdminCourse/Course",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${this.$cookies.get("key")}`,
                },
              }
            );
            if (
              addCourseResponse.data.statusCode == 200 &&
              addCourseResponse.data.message == "Success"
            ) {
              this.$swal({
                text: "ثبت شد!",
                icon: "success",
                showCloseButton: true,
                confirmButtonText: "تایید",
              });
              this.topicsString = "";
              this.content = "";
              this.shortDescription = "";
              this.courseName = "";
              this.coursePrice = "";
              this.teacherPhoneNumber = "";
              this.courseImageBase64 = "";
              this.selectedGroup = "";
              this.coursePriceType = "";
              this.courseDiscount = "";
              this.groupDrop = "";
              this.topics = [];
              this.disablePhone = false;
              this.$router.push("/add-episode/" + addCourseResponse.data.data);
            }
          } else if (this.$route.params.type == "edit") {
            let formDataEdit = new FormData();
            formDataEdit.append("courseName", this.courseName);
            formDataEdit.append("courseId", this.$route.params.id);
            formDataEdit.append("shortDescription", this.shortDescription);
            formDataEdit.append("description", this.content);
            formDataEdit.append("price", this.coursePrice);
            formDataEdit.append(
              "discountPercentage",
              this.courseDiscount != "" ? this.courseDiscount : 0
            );
            formDataEdit.append("courseTopics", this.topicsString);
            formDataEdit.append("type", this.coursePriceType);
            formDataEdit.append("courseImage", this.courseImageBase64);
            formDataEdit.append("teacherPhoneNumber", this.teacherPhoneNumber);
            formDataEdit.append("isPackage", this.isPack);
            const editCourseResponse = await this.$axios.put(
              "/api/Admin/AdminCourse/Course",
              formDataEdit,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${this.$cookies.get("key")}`,
                },
              }
            );
            if (
              editCourseResponse.data.statusCode == 200 &&
              editCourseResponse.data.message == "Success"
            ) {
              this.$swal({
                text: "تغییرات ثبت شد!",
                icon: "success",
                showCloseButton: true,
                confirmButtonText: "تایید",
              }).then(() => {
                this.$router.push("/courses-list");
              });
            }
          }
        } else {
          this.$swal({
            text: "درصد تخفیف نامعتبر",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "ادامه",
          });
        }
      } else {
        this.$swal({
          text: "اطلاعات را کامل کنید",
          icon: "error",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
      }
    },
    async banCourse(action) {
      this.$swal({
        text:
          action == "Stopped"
            ? "از مسدود کردن دوره اطمینان دارید؟"
            : action == "Completed"
            ? "از در کامل کردن دوره اطمینان دارید؟"
            : "از در حال پخش کردن دوره اطمینان دارید؟",
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "بله",
        cancelButtonText: "خیر",
      }).then(async (clickedBut) => {
        if (clickedBut.isConfirmed) {
          const banCourseResponse = await this.$axios.get(
            `/api/Admin/AdminCourse/ChangeCourseStatus/${this.courseId}/${action}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (
            banCourseResponse.data.statusCode == 200 &&
            banCourseResponse.data.message == "Success"
          ) {
            this.$swal({
              text: "با موفقیت انجام شد",
              icon: "success",
              showCloseButton: true,
              confirmButtonText: "بستن",
            });
            this.$router.push("/courses-list");
          } else {
            this.$swal({
              text: "مشکلی رخ داده است!لطفا بعدا دوباره تلاش کنید",
              icon: "error",
              showCloseButton: true,
              confirmButtonText: "ادامه",
            });
          }
        } else {
        }
      });
    },
    async deleteCourse() {
      this.$swal({
        text: "از حذف کردن دوره اطمینان دارید؟",
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "بله",
        cancelButtonText: "خیر",
      }).then(async (clickedBut) => {
        if (clickedBut.isConfirmed) {
          const deleteCourseResponse = await this.$axios.delete(
            `/api/Admin/AdminCourse/Course/${this.courseId}`,
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
            this.$router.push("/courses-list");
            // console.log(deleteCourseResponse);
          } else {
            this.$swal({
              text: "مشکلی رخ داده است!لطفا بعدا دوباره تلاش کنید",
              icon: "error",
              showCloseButton: true,
              confirmButtonText: "ادامه",
            });
          }
        } else {
        }
      });
    },
    async changeAcceptCourse(status) {
      this.$swal({
        text:
          status == "true"
            ? "از تایید دوره اطمینان دارید؟"
            : "از رد کردن دوره اطمینان دارید؟",
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "بله",
        cancelButtonText: "خیر",
      }).then(async (clickedBut) => {
        if (clickedBut.isConfirmed) {
          const deleteCourseResponse = await this.$axios.get(
            `/api/Admin/AdminCourse/ChangeCourseAccept/${this.courseId}/${status}`,
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
            this.$router.push("/courses-list");
            // console.log(deleteCourseResponse);
          } else {
            this.$swal({
              text: "مشکلی رخ داده است!لطفا بعدا دوباره تلاش کنید",
              icon: "error",
              showCloseButton: true,
              confirmButtonText: "ادامه",
            });
          }
        } else {
        }
      });
    },
  },
  watch: {
    topics: {
      handler() {
        this.topicsString = "";
        this.topics.forEach((item) => {
          this.topicsString = this.topicsString + item + ",";
        });
      },
      deep: true,
    },
    teacherPhoneNumber: {
      async handler() {
        this.nameUnderPhone = "";
        if (this.teacherPhoneNumber.length == 11) {
          const name = await this.$axios.get(
            `/api/Admin/AdminCourse/GetTeacherName/${this.teacherPhoneNumber}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (name.data.statusCode == 200 && name.data.message == "Success") {
            if (name.data.data != undefined) {
              this.nameUnderPhone = name.data.data;
            } else {
              this.nameUnderPhone = "کاربری با این نام پیدا نشد";
            }
          }
        }
      },
      deep: true,
    },
    coursePriceType: {
      handler() {
        if (this.coursePriceType == "free") {
          (this.coursePrice = "0"), (this.courseDiscount = "0");
        } else {
          (this.coursePrice = ""), (this.courseDiscount = "");
        }
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
@import "@/assets/swal-style.scss";
</style>
