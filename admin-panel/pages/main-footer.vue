<template>
  <div class="panel-admin-content-item footer">
    <header>
      <p class="section-header">فوتر</p>
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
      <p class="section-title-text">شبکه های اجتماعی</p>
    </div>
    <form action="">
      <!-- <div class="form-row">
        <label for="" class="form-row-col">
          <input
            type="text"
            class="form-input"
            v-model="aparat"
            placeholder="آدرس آپارات"
          />
        </label>
        <label for="" class="form-row-col">
          <input
            type="text"
            class="form-input"
            v-model="youTube"
            placeholder="آدرس یوتیوب"
          />
        </label>
      </div> -->
      <div class="form-row">
        <label for="" class="form-row-col">
          <input
            type="text"
            class="form-input"
            v-model="linkdin"
            placeholder="آدرس لینکدین"
          />
        </label>
        <label for="" class="form-row-col">
          <input
            type="text"
            class="form-input"
            v-model="instagram"
            placeholder="آدرس اینستاگرام"
          />
        </label>
      </div>
      <div class="form-row">
        <!-- <label for="" class="form-row-col">
          <input
            type="text"
            class="form-input"
            v-model="instagram"
            placeholder="آدرس اینستاگرام"
          />
        </label> -->
        <label for="" class="form-row-col">
          <input
            type="tel"
            class="form-input"
            v-model="phoneNumber"
            placeholder="شماره موبایل"
          />
        </label>
        <label for="" class="form-row-col">
          <textarea
            name=""
            cols="22"
            rows="0"
            v-model="address"
            placeholder="آدرس"
            class="form-input form-textarea"
          ></textarea>
        </label>
      </div>
      <!-- <div class="form-row">
        <label for="" class="form-row-col">
          <textarea
            name=""
            cols="22"
            rows="0"
            v-model="address"
            placeholder="آدرس"
            class="form-input form-textarea"
          ></textarea>
        </label>
        <label for="" class="form-row-col"> </label>
      </div> -->

      <button class="form-btn success" @click.prevent="editFooter">
        ثبت و تائید نهایی
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
      linkdin: "",
      instagram: "",
      phoneNumber: "",
      address: "",
    };
  },
  async mounted() {
    this.footerDetails();
  },
  methods: {
    async footerDetails() {
      const footerDetails = await this.$axios.get(
        "/api/Admin/AdminManageSiteInfo/FooterInfo",
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        footerDetails.data.statusCode == 200 &&
        footerDetails.data.message == "Success"
      ) {
        const detailsData = footerDetails.data.data;
        this.linkdin = detailsData.linkedIn;
        this.instagram = detailsData.instagram;
        this.phoneNumber = detailsData.phoneNumber;
        this.address = detailsData.address;
      }
    },
    async editFooter() {
      const setFooterDetails = await this.$axios.post(
        "/api/Admin/AdminManageSiteInfo/FooterInfo",
        {
          linkedIn: this.linkdin,
          phoneNumber: this.phoneNumber,
          instagram: this.instagram,
          address: this.address,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        setFooterDetails.data.statusCode == 200 &&
        setFooterDetails.data.message == "Success"
      ) {
        this.$swal({
          text: "ثبت شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
        this.footerDetails();
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
