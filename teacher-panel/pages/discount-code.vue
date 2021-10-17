<template>
  <div class="panel-teacher-content-item discount-code">
    <header>
      <p class="section-header">
        <skeleton
          v-if="loading"
          class="skeleton"
          width="85px"
          height="30px"
          borderRadius="5px"
        />
        <span v-else> ثبت تخفیف </span>
      </p>
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
      <p class="section-title-text">
        <skeleton
          v-if="loading"
          class="skeleton"
          width="150px"
          height="30px"
          borderRadius="5px"
        />
        <span v-else> کد تخفیف </span>
      </p>
    </div>
    <form action="">
      <!-- skeleton -->
      <template v-if="loading">
        <div class="form-row">
          <skeleton
            v-if="loading"
            class="skeleton discount-inp-skeleton form-row-col"
            width="150px"
            height="50px"
            borderRadius="5px"
          />
          <skeleton
            v-if="loading"
            class="skeleton discount-inp-skeleton form-row-col"
            width="150px"
            height="50px"
            borderRadius="5px"
          />
        </div>
        <div class="form-row">
          <skeleton
            v-if="loading"
            class="skeleton discount-inp-skeleton form-row-col"
            width="150px"
            height="50px"
            borderRadius="5px"
          />
          <skeleton
            v-if="loading"
            class="skeleton discount-inp-skeleton form-row-col"
            width="150px"
            height="50px"
            borderRadius="5px"
          />
        </div>
      </template>

      <template v-else>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="text"
              v-model="discountTitle"
              class="form-input"
              placeholder="عنوان کد تخفیف"
              :disabled="formType == 'show'"
            />
          </label>
          <label for="" class="form-row-col">
            <input
              type="number"
              v-model="discountPercent"
              class="form-input"
              placeholder="درصد کد تخفیف"
              :disabled="formType == 'show'"
            />
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="number"
              class="form-input"
              v-model="endDays"
              placeholder="زمان اعتبار کد تخفیف"
              :disabled="formType == 'show'"
            />
            <label for="" class="cover-btn" style="cursor: context-menu">روز</label>
          </label>
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              v-model="discountCode"
              placeholder="کد تخفیف را انتخاب کنید"
              :disabled="formType == 'show'"
            />
            <span class="hint-text">به لاتین وارد کنید</span>
          </label>
        </div>
      </template>
      <template v-if="loading">
        <skeleton
          v-if="loading"
          class="skeleton"
          width="150px"
          height="30px"
          borderRadius="5px"
        />
        <skeleton
          v-if="loading"
          class="skeleton"
          width="150px"
          height="30px"
          borderRadius="5px"
        />
      </template>
      <custom-radio-btn
        v-model="picked"
        v-else
        name="choose-course"
        :disable="formType == 'show' ? true : false"
        :radioBtns="[
          {
            forId: 'to-all-courses',
            text: 'برای تمامی دوره ها',
            val: 'forAll',
            checked: this.picked == 'forAll',
          },
          {
            forId: 'to-one-course',
            text: 'برای یک دوره',
            val: 'forOne',
            checked: this.picked == 'forOne',
          },
        ]"
      />
      <div class="form-row">
        <!-- skeleton -->
        <div v-if="loading">
          <skeleton
            v-if="loading"
            class="skeleton discount-btn-skeleton mt"
            width="120px"
            height="40px"
            borderRadius="5px"
          />
          <skeleton
            v-if="loading"
            class="skeleton discount-btn-skeleton mt mr-2"
            width="120px"
            height="40px"
            borderRadius="5px"
          />
          <skeleton
            v-if="loading"
            class="skeleton discount-btn-skeleton mt mr-2"
            width="120px"
            height="40px"
            borderRadius="5px"
          />
        </div>

        <template v-else>
          <button
            type="button"
            class="recommended-course btn-solid"
            :class="[DiscountForCourseId == course.courseId ? 'active' : '']"
            :ref="'courseButton' + course.id"
            v-for="course in courseNames"
            :key="course.courseId"
            @click.prevent="discountForThis(course.courseId)"
            :disabled="picked != 'forOne'"
          >
            {{ course.courseName }}
          </button>
        </template>
      </div>
      <!-- skeleton -->
      <skeleton
        v-if="loading"
        class="skeleton form-btn-skeleton"
        width="120px"
        height="40px"
        borderRadius="5px"
      />

      <button
        v-else
        class="form-btn success"
        @click.prevent="submitDiscount"
        v-show="formType != 'show'"
      >
        ثبت و نهایی کردن
      </button>
    </form>

    <!-- this part never show before loading -->
    <template v-if="!loading">
      <div class="section-title" v-show="discountsList.length != 0">
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
        <p class="section-title-text">لیست کدهای تخفیف</p>
      </div>
      <ul class="discount-codes-list">
        <li
          class="discount-code-item"
          v-for="discount in discountsList"
          :key="discount.discountId"
        >
          <p class="discount-code-title">
            {{ discount.discountTitle }}
          </p>
          <small class="discount-code-amount">{{ discount.discountPercent }}%</small>
          <p class="course-name" v-if="discount.courseName == 'برای تمامی دوره ها'">
            {{ discount.courseName }}
          </p>
          <p class="course-name" v-else>برای دوره {{ discount.courseName }}</p>
          <footer class="options">
            <p>
              <a href="" @click.prevent="deleteDiscount(discount.discountId)">حذف</a>
              /
              <a href="" @click.prevent="editDiscount(discount.discountId, 'edit')"
                >ویرایش</a
              >
              /
              <a href="" @click.prevent="editDiscount(discount.discountId, 'show')"
                >نمایش</a
              >
            </p>
          </footer>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import skeleton from "@/components/skeleton-components/skeletonCreator";
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  components: { skeleton },
  data() {
    return {
      loading: true,
      picked: "forAll",
      courseNames: [],
      discountsList: [],
      formType: "add",
      discountId: 0,

      // form data
      endDays: "",
      discountTitle: "",
      discountCode: "",
      discountPercent: "",
      DiscountForCourseId: null,
    };
  },
  beforeMount() {
    this.getLoadDetails();
  },
  mounted() {},
  methods: {
    resetData() {
      this.picked = "forAll";
      this.courseNames = [];
      this.discountsList = [];
      this.formType = "add";
      this.discountId = 0;

      // form data
      this.endDays = "";
      this.discountTitle = "";
      this.discountCode = "";
      this.discountPercent = "";
      this.DiscountForCourseId = null;
    },
    async getLoadDetails() {
      this.loading = true;
      let [courses, discounts] = await Promise.all([
        this.$axios.get("/api/Teacher/TeacherDiscount/GetTeacherCourseNamesForDiscount", {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }),
        this.$axios.get("/api/Teacher/TeacherDiscount/Discount", {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }),
      ]);
      if (
        courses.data.message == "Success" &&
        courses.data.statusCode == 200 &&
        discounts.data.message == "Success" &&
        discounts.data.statusCode == 200
      ) {
        this.discountsList = discounts.data.data;
        this.courseNames = courses.data.data;
      }
      this.loading = false;
    },
    endDateCreate(days) {
      const nextDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
      return nextDate;
    },
    discountForThis(id) {
      if (this.formType != "show") {
        this.DiscountForCourseId = id;
      }
    },
    async submitDiscount() {
      if (this.formType == "add") {
        if (
          this.DiscountForCourseId != "" &&
          this.discountTitle != "" &&
          this.discountCode != "" &&
          this.discountPercent != "" &&
          Number(this.discountPercent) > 0 &&
          this.endDays != ""
        ) {
          if (this.discountPercent >= 0 && this.discountPercent <= 100) {
            const submitDiscountResp = await this.$axios.post(
              "/api/Teacher/TeacherDiscount/Discount",
              {
                courseId:
                  this.picked == "forAll" ? null : Number(this.DiscountForCourseId),
                discountTitle: this.discountTitle,
                discountCode: this.discountCode,
                discountPercent: Number(this.discountPercent),
                endDate: this.endDateCreate(this.endDays),
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$cookies.get("key")}`,
                },
              }
            );
            if (
              submitDiscountResp.data.statusCode == 200 &&
              submitDiscountResp.data.message == "Success"
            ) {
              this.$swal({
                text: "با موفقیت انجام شد",
                icon: "success",
                showCloseButton: true,
                confirmButtonText: "بستن",
              });
              this.getLoadDetails();
              this.resetData();
            } else {
              this.$swal({
                text: "مشکلی رخ داده است!لطفا بعدا دوباره تلاش کنید",
                icon: "error",
                showCloseButton: true,
                confirmButtonText: "ادامه",
              });
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
            text: "فیلد ها را پر کنید",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "ادامه",
          });
        }
      } else if (this.formType == "edit") {
        if (
          this.DiscountForCourseId != "" &&
          this.discountTitle != "" &&
          this.discountCode != "" &&
          this.discountPercent != "" &&
          Number(this.discountPercent) > 0 &&
          this.endDays != ""
        ) {
          if (this.discountPercent >= 0 && this.discountPercent <= 100) {
            const editDiscountResponse = await this.$axios.put(
              "/api/Teacher/TeacherDiscount/Discount",
              {
                id: Number(this.discountId),
                courseId:
                  this.picked == "forAll" ? null : Number(this.DiscountForCourseId),
                discountTitle: String(this.discountTitle),
                discountCode: String(this.discountCode),
                discountPercent: Number(this.discountPercent),
                endDate: this.endDateCreate(this.endDays),
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$cookies.get("key")}`,
                },
              }
            );
            if (
              editDiscountResponse.data.statusCode == 200 &&
              editDiscountResponse.data.message == "Success"
            ) {
              this.$swal({
                text: "با موفقیت انجام شد",
                icon: "success",
                showCloseButton: true,
                confirmButtonText: "بستن",
              });
              this.getLoadDetails();
              this.resetData();
            } else {
              this.$swal({
                text: "مشکلی رخ داده است!لطفا بعدا دوباره تلاش کنید",
                icon: "error",
                showCloseButton: true,
                confirmButtonText: "ادامه",
              });
            }
          } else {
            this.$swal({
              text: "درصد تخفیف نامعتبر",
              icon: "error",
              showCloseButton: true,
              confirmButtonText: "ادامه",
            });
          }
        }
      }
    },
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
            this.getLoadDetails();
            this.resetData();
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
    async editDiscount(courseId, formType) {
      const getEditDiscountData = await this.$axios.get(
        "/api/Teacher/TeacherDiscount/Discount/" + courseId,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        getEditDiscountData.data.statusCode == 200 &&
        getEditDiscountData.data.message == "Success"
      ) {
        this.formType = formType;
        const editData = getEditDiscountData.data.data;
        this.discountTitle = editData.discountTitle;
        this.discountCode = editData.discountCode;
        this.discountPercent = editData.discountPercent;
        this.discountId = editData.id;
        if (editData.courseId != null) {
          this.picked = "forOne";
        } else {
          this.picked = "forAll";
        }
        const today = new Date();
        const discountEnd = new Date(editData.endDate);
        const beetwen = discountEnd.getTime() - today.getTime();
        this.endDays = Math.round(beetwen / (1000 * 3600 * 24));
        this.DiscountForCourseId = editData.courseId;
      } else {
        this.$swal({
          text: "مشکلی رخ داده است!لطفا بعدا دوباره تلاش کنید",
          icon: "error",
          showCloseButton: true,
          confirmButtonText: "ادامه",
        });
        this.getLoadDetails();
        this.resetData();
      }
    },
  },
  watch: {
    picked: {
      handler() {
        if (this.picked != "forOne") {
          this.DiscountForCourseId = null;
        }
      },
      deep: true,
    },
    discountPercent: {
      handler() {
        if (Number(this.discountPercent) > 100) {
          this.discountPercent = 100;
        }
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/swal-style.scss";
</style>
