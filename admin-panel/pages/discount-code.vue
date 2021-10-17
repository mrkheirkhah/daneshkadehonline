<template>
  <div>
    <div class="panel-admin-content-item add-course">
      <div class="adding-course">
        <header>
          <p class="section-header">افزودن کد تخفیف</p>
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
            <p class="section-title-text">مشخصات کد تخفیف</p>
          </div>
          <div class="form-row">
            <label for="" class="form-row-col">
              <input
                type="text"
                class="form-input"
                v-model="discountName"
                placeholder="نام تخفیف"
              />
            </label>
            <label for="" class="form-row-col">
              <input
                type="text"
                class="form-input"
                v-model="useCount"
                placeholder="تعداد مصرف"
              />
            </label>
          </div>
          <div class="form-row">
            <label for="" class="form-row-col">
              <input
                type="number"
                class="form-input"
                v-model="discountPercentage"
                placeholder="درصد تخفیف"
              />
            </label>
            <label for="" class="form-row-col">
              <input
                type="text"
                class="form-input"
                v-model="discountCode"
                placeholder="کد تخفیف"
              />
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
            <p class="section-title-text">انتخاب تخفیف برای :</p>
          </div>
          <div
            class="form-row radios-container"
            v-if="discountForTeacherRadio == 'all' && discountForCourceRadio == 'all'"
          >
            <div>
              <input
                type="radio"
                class="form-radio"
                name="students-radio"
                id="all-students-radio"
                value="all"
                v-model="discountForStudentRadio"
              />
              <label for="all-students-radio">برای همه دانشجوها</label>
              <label for="all-students-radio" class="radio-overlay"></label>
            </div>
            <div>
              <input
                type="radio"
                class="form-radio"
                name="students-radio"
                id="select-students-radio"
                value="notAll"
                v-model="discountForStudentRadio"
              />
              <label for="select-students-radio">برای دانشجوهای خاص</label>
              <label for="select-students-radio" class="radio-overlay"></label>
            </div>
          </div>

          <div class="form-row" v-if="discountForStudentRadio == 'notAll'">
            <label for="" class="form-row-col">
              <input
                type="number"
                class="form-input has-cover-btn"
                placeholder="افزودن شماره ی دانشجو ها"
                v-model="studentPhoneNumber"
                @keyup="justNumber"
                ref="mobileNumber"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                maxlength="11"
              />
              <span class="hint-text">{{ studentNameUnderPhone }}</span>
              <button type="button" class="cover-btn" @click="addStudentsNumber">
                افزودن
              </button>
              <div class="course-topics">
                <div
                  class="topic"
                  v-for="number in studentsNumberList"
                  :key="number.index"
                >
                  <span class="topic-name">{{ number }}</span>
                  <span class="close-icon" @click="removeStudentNumber(number)">
                    &times;
                  </span>
                </div>
              </div>
            </label>
            <label for="" class="form-row-col"></label>
          </div>

          <br />
          <div
            class="form-row radios-container"
            v-if="discountForStudentRadio == 'all' && discountForCourceRadio == 'all'"
          >
            <div>
              <input
                type="radio"
                class="form-radio"
                name="teachers-radio"
                id="all-teachers-radio"
                value="all"
                v-model="discountForTeacherRadio"
              />
              <label for="all-teachers-radio">برای همه مدرس ها</label>
              <label for="all-teachers-radio" class="radio-overlay"></label>
            </div>
            <div>
              <input
                type="radio"
                class="form-radio"
                name="teachers-radio"
                id="select-teachers-radio"
                value="notAll"
                v-model="discountForTeacherRadio"
              />
              <label for="select-teachers-radio">برای مدرس های خاص</label>
              <label for="select-teachers-radio" class="radio-overlay"></label>
            </div>
          </div>

          <div class="form-row" v-if="discountForTeacherRadio == 'notAll'">
            <label for="" class="form-row-col">
              <input
                type="number"
                class="form-input has-cover-btn"
                placeholder="افزودن شماره ی مدرس ها"
                v-model="teacherPhoneNumber"
                @keyup="justNumber"
                ref="mobileNumber"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                maxlength="11"
              />
              <span class="hint-text">{{ teacherNameUnderPhone }}</span>
              <button type="button" class="cover-btn" @click="addTeachersNumber">
                افزودن
              </button>
              <div class="course-topics">
                <div
                  class="topic"
                  v-for="number in teachersNumberList"
                  :key="number.index"
                >
                  <span class="topic-name">{{ number }}</span>
                  <span class="close-icon" @click="removeTeacherNumber(number)">
                    &times;
                  </span>
                </div>
              </div>
            </label>
            <label for="" class="form-row-col"></label>
          </div>
          <br />
          <div
            class="form-row radios-container"
            v-if="discountForStudentRadio == 'all' && discountForTeacherRadio == 'all'"
          >
            <div>
              <input
                type="radio"
                class="form-radio"
                name="courses-radio"
                id="all-courses-radio"
                value="all"
                v-model="discountForCourceRadio"
              />
              <label for="all-courses-radio">برای همه دوره ها</label>
              <label for="all-courses-radio" class="radio-overlay"></label>
            </div>
            <div>
              <input
                type="radio"
                class="form-radio"
                name="courses-radio"
                id="select-courses-radio"
                value="notAll"
                v-model="discountForCourceRadio"
              />
              <label for="select-courses-radio">برای دوره های خاص</label>
              <label for="select-courses-radio" class="radio-overlay"></label>
            </div>
            <div class="form-row">
              <div
                for=""
                class="form-row-col darken-color"
                v-if="discountForCourceRadio == 'notAll'"
              >
                <div class="separator pseudo-form-input">
                  <span>انتخاب دوره ها</span>
                  <span>
                    <nuxt-link
                      @click.native="saveDataToStore"
                      to="/select-amazing/discount"
                      class="cover-btn"
                      >انتخاب</nuxt-link
                    >
                  </span>
                </div>
              </div>
              <label for="" class="form-row-col"></label>
            </div>
          </div>
          <br /><br />
          <div class="form-row" v-if="restartDatePicker">
            <div class="form-row-col">
              <date-picker
                mode="single"
                placeholder="از تاریخ"
                v-model="startDate"
                type="date"
                color="red"
                click-on="all"
                locale="fa"
                :column="1"
                format="YYYY-MM-DD"
                input-format=""
                display-format=""
              >
              </date-picker>
            </div>
            <div class="form-row-col">
              <date-picker
                mode="single"
                placeholder="تا تاریخ"
                v-model="endDate"
                type="date"
                color="red"
                click-on="all"
                locale="fa"
                :column="1"
                format="YYYY-MM-DD"
                input-format=""
                display-format=""
              >
              </date-picker>
            </div>
          </div>
        </form>
        <button
          class="form-btn success"
          @click.prevent="addDiscount"
          v-if="submitType == 'add'"
        >
          اضافه کردن
        </button>
        <button class="form-btn success" @click.prevent="editDiscount" v-else>
          ویرایش کردن
        </button>
      </div>
      <br />
      <div class="panel-table">
        <div class="box-header">
          <h3>لیست تخفیف ها</h3>
        </div>
        <div v-if="discountList.length > 0">
          <section class="box-content custom-scrollbar" id="discount-table">
            <header class="table-row table-header">
              <span class="date">عنوان </span>
              <span class="time">درصد</span>
              <span class="time">ویرایش</span>
              <span class="time">حذف</span>
            </header>
            <div
              class="table-row"
              v-for="discount in discountList"
              :key="discount.discountId"
            >
              <span class="name persian-number">{{ discount.discountTitle }}</span>
              <span class="persian-number">{{ discount.discountPercent }}</span>
              <span
                class="type edit"
                @click.prevent="getDetailForEdit(discount.discountId)"
                >ویرایش</span
              >
              <span
                class="type delete"
                @click.prevent="deleteDiscount(discount.discountId)"
                >حذف</span
              >
            </div>

            <footer class="table-footer">
              <hr />
              <a href="" type="button" @click.prevent="seeAll"> مشاهده همه </a>
            </footer>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",

  data() {
    return {
      useCount: "",
      discountName: "",
      discountPercentage: "",
      discountForStudentRadio: "all",
      discountForTeacherRadio: "all",
      discountForCourceRadio: "all",
      studentPhoneNumber: "",
      teacherPhoneNumber: "",
      studentsNumberList: [],
      teachersNumberList: [],
      discountList: [],
      teacherNameUnderPhone: "",
      studentNameUnderPhone: "",
      startDate: "",
      endDate: "",
      discountCode: "",
      restartDatePicker: true,
      submitType: "add",
      editThisId: "",
    };
  },
  async beforeMount() {
    this.getDiscounts();
  },
  async mounted() {
    this.useCount = this.$store.state.selectedCourses.useCount;
    this.discountPercentage = this.$store.state.selectedCourses.discountPercentage;
    this.discountName = this.$store.state.selectedCourses.discountName;
    this.discountForCourceRadio = this.$store.state.selectedCourses.discountForCourceRadio;
    this.endDate = this.$store.state.selectedCourses.endDate;
    this.startDate = this.$store.state.selectedCourses.startDate;
    this.discountCode = this.$store.state.selectedCourses.discountCode;
    this.submitType = this.$store.state.selectedCourses.submitType;
    this.editThisId = this.$store.state.selectedCourses.editThisId;
  },
  methods: {
    saveDataToStore() {
      let discountData = {
        discountCode: this.discountCode,
        discountForCourceRadio: this.discountForCourceRadio,
        useCount: this.useCount,
        discountName: this.discountName,
        discountPercentage: this.discountPercentage,
        endDate: this.endDate,
        startDate: this.startDate,
        submitType: this.submitType,
        editThisId: this.editThisId,
      };
      this.$store.commit("selectedCourses/SET_DISCOUNT_DETAIL", discountData);
    },
    async getDiscounts() {
      const discounts = await this.$axios.get("/api/Admin/AdminDiscount/Discount", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      this.discountList = discounts.data.data;
    },
    resetData() {
      this.useCount = "";
      this.discountName = "";
      this.discountPercentage = "";
      this.discountForStudentRadio = "all";
      this.discountForTeacherRadio = "all";
      this.discountForCourceRadio = "all";
      this.studentPhoneNumber = "";
      this.teacherPhoneNumber = "";
      this.studentsNumberList = [];
      this.teachersNumberList = [];
      this.discountList = [];
      this.teacherNameUnderPhone = "";
      this.studentNameUnderPhone = "";
      this.startDate = "";
      this.endDate = "";
      this.submitType = "add";
      this.discountCode = "";
      this.restartDatePicker = true;
    },
    seeAll() {
      const table = document.getElementById("discount-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer").style.display = "none");
    },
    toggleDropDowns(event) {
      event.stopPropagation();
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    addStudentsNumber() {
      if (this.studentPhoneNumber !== "") {
        this.studentsNumberList.push(this.studentPhoneNumber);
        this.studentPhoneNumber = "";
      }
    },
    addTeachersNumber() {
      if (this.teacherPhoneNumber !== "") {
        this.teachersNumberList.push(this.teacherPhoneNumber);
        this.teacherPhoneNumber = "";
      }
    },
    removeStudentNumber(number) {
      const numberIndex = this.studentsNumberList.indexOf(number);
      if (numberIndex !== -1) {
        this.studentsNumberList.splice(numberIndex, 1);
      }
    },
    removeTeacherNumber(number) {
      const numberIndex = this.teachersNumberList.indexOf(number);
      if (numberIndex !== -1) {
        this.teachersNumberList.splice(numberIndex, 1);
      }
    },
    async addDiscount() {
      const selectedCourses = this.$store.state.selectedCourses.selectedCourses;
      const selectedCoursesList =
        this.discountForCourceRadio == "notAll" ? selectedCourses : [];
      const selectedTeachersList =
        this.discountForTeacherRadio == "notAll" ? this.teachersNumberList : [];
      const selectedStudentsList =
        this.discountForStudentRadio == "notAll" ? this.studentsNumberList : [];
      const addDiscountResp = await this.$axios.post(
        "/api/Admin/AdminDiscount/Discount",
        {
          discountTitle: this.discountName,
          discountCode: this.discountCode,
          discountPercent: this.discountPercentage,
          type:
            this.discountForCourceRadio == "notAll"
              ? "Course"
              : this.discountForTeacherRadio == "notAll"
              ? "Teacher"
              : this.discountForStudentRadio == "notAll"
              ? "Student"
              : "None",
          courseIds: selectedCoursesList,
          teacherPhoneNumbers: selectedTeachersList,
          studentPhoneNumbers: selectedStudentsList,
          usableCount: this.useCount,
          startDate: new Date(this.startDate),
          endDate: new Date(this.endDate),
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        addDiscountResp.data.statusCode == 200 &&
        addDiscountResp.data.message == "Success"
      ) {
        this.$swal({
          text: "ثبت شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
        this.getDiscounts();
        this.$store.commit("selectedCourses/CLEAR_DISCOUNT_DETAIL");
        this.resetData();
      }
    },
    async editDiscount() {
      const selectedCourses = this.$store.state.selectedCourses.selectedCourses;
      const selectedCoursesList =
        this.discountForCourceRadio == "notAll" ? selectedCourses : [];
      const selectedTeachersList =
        this.discountForTeacherRadio == "notAll" ? this.teachersNumberList : [];
      const selectedStudentsList =
        this.discountForStudentRadio == "notAll" ? this.studentsNumberList : [];
      const addDiscountResp = await this.$axios.put(
        "/api/Admin/AdminDiscount/Discount",
        {
          discountId: this.editThisId,
          discountTitle: this.discountName,
          discountCode: this.discountCode,
          discountPercent: this.discountPercentage,
          type:
            this.discountForCourceRadio == "notAll"
              ? "Course"
              : this.discountForTeacherRadio == "notAll"
              ? "Teacher"
              : this.discountForStudentRadio == "notAll"
              ? "Student"
              : "None",
          courseIds: selectedCoursesList,
          teacherPhoneNumbers: selectedTeachersList,
          studentPhoneNumbers: selectedStudentsList,
          usableCount: this.useCount,
          startDate: new Date(this.startDate),
          endDate: new Date(this.endDate),
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        addDiscountResp.data.statusCode == 200 &&
        addDiscountResp.data.message == "Success"
      ) {
        this.$swal({
          text: "ویرایش شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
        this.restartDatePicker = false;
        await this.$store.commit("selectedCourses/CLEAR_DISCOUNT_DETAIL");
        this.resetData();
        this.getDiscounts();
      }
    },
    async deleteDiscount(id) {
      this.$swal({
        text: "از پاک کردن این کد تخفیف اطمینان دارید؟",
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "بله",
        cancelButtonText: "خیر",
      }).then(async (clickedBut) => {
        if (clickedBut.isConfirmed) {
          const deleteResp = await this.$axios.delete(
            `/api/Admin/AdminDiscount/Discount/${id}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (deleteResp.data.statusCode == 200 && deleteResp.data.message == "Success") {
            this.$swal({
              text: "انجام شد",
              icon: "success",
              showCloseButton: true,
              confirmButtonText: "تایید",
            }).then(() => {
              this.getDiscounts();
              this.resetData();
            });
          }
        }
      });
    },
    async getDetailForEdit(id) {
      this.editThisId = id;
      this.submitType = "edit";
      this.restartDatePicker = false;
      const detailEdit = await this.$axios.get(
        `/api/Admin/AdminDiscount/Discount/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (detailEdit.data.statusCode == 200 && detailEdit.data.message == "Success") {
        const resp = detailEdit.data.data;
        this.discountCode = resp.discountCode;
        this.discountPercentage = resp.discountPercent;
        this.discountName = resp.discountTitle;
        this.endDate = new Date(resp.endDate).toISOString().split("T")[0];
        this.startDate = new Date(resp.startDate).toISOString().split("T")[0];
        this.useCount = resp.usableCount;
        this.restartDatePicker = true;
        resp.type == "Student"
          ? (this.discountForStudentRadio = "notAll")
          : resp.type == "Teacher"
          ? (this.discountForTeacherRadio = "notAll")
          : resp.type == "Course"
          ? (this.discountForCourceRadio = "notAll")
          : {};
        this.studentsNumberList = resp.studentPhoneNumbers;
        this.teachersNumberList = resp.teacherPhoneNumbers;
        this.$store.commit("selectedCourses/SET_SELECTED", resp.courseIds);
      }
      console.log(detailEdit);
    },
    justNumber() {
      this.$refs.mobileNumber.value = this.$refs.mobileNumber.value.replace(
        /[^0-9]/g,
        ""
      );
    },
  },
  watch: {
    studentsNumberList: {
      handler() {
        this.topicsString = "";
        this.studentsNumberList.forEach((item) => {
          this.topicsString = this.topicsString + item + ",";
        });
      },
      deep: true,
    },
    studentPhoneNumber: {
      async handler() {
        this.studentNameUnderPhone = "";
        if (this.studentPhoneNumber[0] != 0) {
          this.studentPhoneNumber = "";
        }
        if (this.studentPhoneNumber.length >= 2) {
          if (this.studentPhoneNumber[1] != 9) {
            this.studentPhoneNumber = this.studentPhoneNumber[0];
          }
        }
        if (this.studentPhoneNumber.length == 11) {
          const name = await this.$axios.get(
            `/api/Admin/AdminDiscount/GetStudentNameByPhoneNumber/${this.studentPhoneNumber}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (name.data.statusCode == 200 && name.data.message == "Success") {
            if (name.data.data != undefined) {
              this.studentNameUnderPhone = name.data.data;
            }
          } else {
            this.studentNameUnderPhone = "کاربری با این نام پیدا نشد";
          }
        }
      },
      deep: true,
    },
    teacherPhoneNumber: {
      async handler() {
        this.teacherNameUnderPhone = "";
        if (this.teacherPhoneNumber[0] != 0) {
          this.teacherPhoneNumber = "";
        }
        if (this.teacherPhoneNumber.length >= 2) {
          if (this.teacherPhoneNumber[1] != 9) {
            this.teacherPhoneNumber = this.teacherPhoneNumber[0];
          }
        }

        if (this.teacherPhoneNumber.length == 11) {
          const name = await this.$axios.get(
            `/api/Admin/AdminDiscount/GetTeacherNameByPhoneNumber/${this.teacherPhoneNumber}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (name.data.statusCode == 200 && name.data.message == "Success") {
            if (name.data.data != undefined) {
              this.teacherNameUnderPhone = name.data.data;
            }
          } else {
            this.teacherNameUnderPhone = "کاربری با این نام پیدا نشد";
          }
        }
      },
      deep: true,
    },
    discountPercentage: {
      handler() {
        if (Number(this.discountPercentage) > 100) {
          this.discountPercentage = 100;
        }
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss">
.pdp.rtl .pdp-group input {
  width: 100%;
}
@import "@/assets/swal-style.scss";
</style>
