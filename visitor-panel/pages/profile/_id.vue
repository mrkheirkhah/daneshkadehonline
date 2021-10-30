<template>
  <div>
    <div class="panel-visitor-content-item withdraw-wallet">
      <header>
        <p class="section-header">مدارک محرمانه</p>
      </header>
      <form action="#">
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              :value="profData.visitorName"
              placeholder="نام و نام خانوادگی"
              disabled
            />
          </label>
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              :value="profData.phoneNumber"
              placeholder="شماره تلفن"
            />
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="number"
              class="form-input"
              :value="profData.nationalCardNumber"
              placeholder="کد ملی"
            />
          </label>
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              :value="profData.pageLink"
              placeholder="لینک"
            />
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input has-cover-btn"
              :value="profData.referralCode"
              placeholder="کد معرف"
            />
          </label>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  layout: "dashboardLay",
  data() {
    return {
      profData: "",
    };
  },
  head() {
    return {
      title: "پروفایل",
    };
  },
  async mounted() {
    if (this.$route.params.id == undefined) {
      // this.$router.push("/add-visitor");
    } else {
      const isVisitorExist = await this.$axios.get(
        `/api/Visitor/VisitorHome/CheckAnyPageLink/${this.$route.params.id}`
      );
      if (
        isVisitorExist.data.statusCode == 200 &&
        isVisitorExist.data.message == "Success"
      ) {
        this.getProf();
      } else {
        // redirect to main page
      }
    }
  },
  methods: {
    async getProf() {
      const profData = await this.$axios.get(
        `/api/Visitor/VisitorProfile/Profile/${this.$route.params.id}`
      );
      this.profData = profData.data.data;
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
