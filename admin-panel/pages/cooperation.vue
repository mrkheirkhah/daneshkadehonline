<template>
  <div class="panel-admin-content-item main-page">
    <header>
      <p class="section-header">آپشن های لندینگ همکاری با ما</p>
    </header>
    <form action="">
      <div class="form-row">
        <label
          for=""
          class="form-row-col in-panel floated-list-container"
          @click="toggleDropdown"
        >
          <input
            type="text"
            class="form-input"
            readonly
            :value="selectedOption"
            placeholder="انتخاب آپشن"
          />
          <ul class="floated-list custom-scrollbar">
            <li @click="selectOption($event, 1)">آپشن اول</li>
            <li @click="selectOption($event, 2)">آپشن دوم</li>
            <li @click="selectOption($event, 3)">آپشن سوم</li>
          </ul>
        </label>
        <label for="" class="form-row-col">
          <input
            type="text"
            class="form-input"
            v-model="optionTitle"
            placeholder="عنوان"
          />
        </label>
      </div>
      <div class="form-row">
        <label for="" class="form-row-col">
          <textarea
            name=""
            cols="22"
            rows="0"
            placeholder="توضیحات"
            v-model="optionDescription"
            class="form-input form-textarea"
          ></textarea>
        </label>
        <label for="" class="form-row-col">
          <div for="" class="form-row-col darken-color">
            <div class="separator pseudo-form-input">
              <input type="file" id="upload-header-vector" @change="uploadVector" />
              <span v-if="vectorName == ''">آپلود وکتور</span>
              <span v-else>{{ vectorName }}</span>
              <span>
                <label for="upload-header-vector" class="cover-btn">انتخاب</label>
              </span>
            </div>
          </div>
        </label>
      </div>
      <button
        class="form-btn success"
        @click.prevent="uploadLanding"
        :disabled="isSendingOptions"
      >
        تائید
      </button>
    </form>
    <header>
      <p class="section-header">توضیحات و فوتر</p>
    </header>
    <div class="section-title">
      <p class="section-title-text">بدنه</p>
    </div>
    <form action="">
      <div class="form-row">
        <label for="" class="form-row-col">
          <input type="text" class="form-input" v-model="bodyTitle" placeholder="عنوان" />
        </label>
        <label for="" class="form-row-col">
          <textarea
            name=""
            cols="22"
            rows="0"
            placeholder="توضیحات"
            v-model="bodyDescription"
            class="form-input form-textarea"
          ></textarea>
        </label>
      </div>
      <div class="section-title">
        <p class="section-title-text">فوتر</p>
      </div>
      <div class="form-row">
        <label for="" class="form-row-col">
          <textarea
            name=""
            cols="22"
            rows="0"
            placeholder="توضیحات فوتر"
            v-model="footerDescription"
            class="form-input form-textarea"
          ></textarea>
        </label>
        <label for="" class="form-row-col"> </label>
      </div>
      <button
        class="form-btn success"
        @click.prevent="uploadBodyData"
        :disabled="isSending"
      >
        تائید
      </button>
    </form>
  </div>
</template>
<script>
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  data() {
    return {
      selectedOption: "",
      optionId: "",
      optionTitle: "",
      optionDescription: "",
      selectedVector: "",
      vectorName: "",

      //   body and footer
      footerDescription: "",
      bodyDescription: "",
      bodyTitle: "",

      isSendingOptions: false,
      isSending: false,
    };
  },
  mounted() {
    this.getBodyData();
  },
  methods: {
    toggleDropdown(event) {
      event.stopPropagation();
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    selectOption(event, id) {
      this.optionId = id;
      this.selectedOption = event.target.innerHTML.trim();
    },
    uploadVector(event) {
      try {
        this.selectedVector = event.target.files[0];
        this.vectorName = event.target.files[0].name;
      } catch {}
      // this.createBase64Image(vectorImg);
    },
    // createBase64Image(fileObject) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     this.selectedVector = e.target.result;
    //   };
    //   reader.readAsDataURL(fileObject);
    // },

    async getBodyData() {
      const bodyData = await this.$axios.get(
        "/api/Admin/AdminCooperation/CooperationInfo",
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (bodyData.data.statusCode == 200 && bodyData.data.message == "Success") {
        this.bodyTitle = bodyData.data.data.title;
        this.bodyDescription = bodyData.data.data.text;
        this.footerDescription = bodyData.data.data.footerText;
      }
    },
    async uploadLanding() {
      this.isSendingOptions = true;
      if (this.optionId != "") {
        let formData = new FormData();
        formData.append("id", this.optionId);
        formData.append("title", this.optionTitle);
        formData.append("icon", this.selectedVector);
        formData.append("description", this.optionDescription);
        const uploadResp = await this.$axios.put(
          "/api/Admin/AdminCooperation/CooperationOption",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (uploadResp.data.statusCode == 200 && uploadResp.data.message == "Success") {
          this.$swal({
            text: "ثبت شد",
            icon: "success",
            showCloseButton: true,
            confirmButtonText: "تایید",
          });
          this.optionId = "";
          this.optionTitle = "";
          this.optionDescription = "";
          this.selectedOption = "";
          this.vectorName = "";
        }
      } else {
        this.$swal({
          text: "آپشن را انتخاب کنید",
          icon: "error",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
      }
      this.isSendingOptions = false;
    },
    async uploadBodyData() {
      this.isSending = true;
      const uploadResp = await this.$axios.post(
        "/api/Admin/AdminCooperation/CooperationInfo",
        {
          footerText: this.footerDescription,
          title: this.bodyTitle,
          text: this.bodyDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (uploadResp.data.statusCode == 200 && uploadResp.data.message == "Success") {
        this.$swal({
          text: "ثبت شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
      }
      this.isSending = false;
    },
  },
  watch: {
    optionId: {
      async handler() {
        if (this.optionId != "") {
          const optionDetails = await this.$axios.get(
            `/api/Admin/AdminCooperation/CooperationOption/${this.optionId}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (
            optionDetails.data.statusCode == 200 &&
            optionDetails.data.message == "Success"
          ) {
            const optionDetailsData = optionDetails.data.data;
            this.optionDescription = optionDetailsData.description;
            this.optionTitle = optionDetailsData.title;
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
