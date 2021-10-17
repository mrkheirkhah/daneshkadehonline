<template>
  <div class="panel-teacher-content-item documents">
    <!-- <header>
      <span v-if="loading" class="document-header-skeleton">
        <skeleton
          v-if="loading"
          class="skeleton"
          width="150px"
          height="40px"
          borderRadius="5px"
        />
      </span>
      <p class="section-header" v-else>مدارک محرمانه</p>
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
          width="120px"
          height="30px"
          borderRadius="5px"
        />
        <span v-else> مدارک </span>
      </p>
    </div>
    <form action="">
       skeleton
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
              class="form-input"
              :value="docData.teacherName"
              placeholder="نام و نام خانوادگی"
              disabled
            />
          </label>
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              :value="docData.shebaNumber"
              placeholder="شماره شبا"
            />
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="number"
              class="form-input"
              :value="docData.cardNumber"
              placeholder="شماره کارت"
            />
          </label>
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              :value="docData.address"
              placeholder="آدرس"
            />
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="number"
              class="form-input has-cover-btn"
              :value="docData.nationalCardNumber"
              placeholder="کد ملی"
            />
          </label>
          <div class="form-row-col darken-color">
            <div class="separator pseudo-form-input">
              <input type="file" id="upload-melliCard-image--documents" />
              <span>بارگذاری تصویر کارت ملی</span>
            </div>
          </div>
        </div>
        <p class="form-footer-hint">
          برای تغییر در این اطلاعات به بخش پشتیبانی مراجعه کنید
        </p>
      </template>
    </form> -->
  </div>
</template>
<script>
// import skeleton from "@/components/skeleton-components/skeletonCreator";
// export default {
//   layout: "dashboardLay",
//   middleware: "userIsNotLog",
//   components: { skeleton },
//   data() {
//     return {
//       loading: true,
//       docData: [],
//     };
//   },
//   async mounted() {
//     const documentData = await this.$axios.get("/api/Teacher/TeacherDocument/Document", {
//       headers: {
//         Authorization: `Bearer ${this.$cookies.get("key")}`,
//       },
//     });
//     if (documentData.data.statusCode == 200 && documentData.data.message == "Success") {
//       this.docData = documentData.data.data;
//     }
//     this.loading = false;
//   },
// };
</script>
