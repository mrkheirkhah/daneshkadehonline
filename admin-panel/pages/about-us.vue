<template>
  <div class="about-us">
    <div class="panel-admin-content-item about-us">
      <header>
        <p class="section-header">درباره ما</p>
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
        <p class="section-title-text">آشنایی با ما</p>
      </div>
      <form action="">
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="number"
              class="form-input"
              v-model="ongoingCourses"
              placeholder="دوره های در حال برگزاری"
            />
          </label>
          <label for="" class="form-row-col">
            <input
              type="number"
              class="form-input"
              v-model="coursesOrganized"
              placeholder="دوره های  برگزار شده"
            />
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="number"
              class="form-input"
              v-model="regularCustomers"
              placeholder="تعداد مشتریان"
            />
          </label>
          <label for="" class="form-row-col">
            <input
              type="number"
              class="form-input"
              v-model="teamMembers"
              placeholder="تعداد اعضای تیم"
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
              v-model="description"
              class="form-input form-textarea"
            ></textarea>
          </label>
        </div>
        <button class="form-btn" @click.prevent="changeAboutInfo">تائید</button>
      </form>
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
        <p class="section-title-text">افزودن اعضای تیم</p>
      </div>
      <form action="">
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              v-model="memberName"
              placeholder="نام عضو"
            />
          </label>
          <div for="" class="form-row-col darken-color">
            <div class="separator pseudo-form-input">
              <input type="file" @change="memberImage" id="team-person-upload-image" />
              <span v-if="memberImageName == ''">آپلود عکس</span>
              <span v-else>{{ memberImageName }}</span>
              <span>
                <label for="team-person-upload-image" class="cover-btn">انتخاب</label>
              </span>
            </div>
          </div>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input type="text" class="form-input" v-model="role" placeholder="سمت کاری" />
          </label>
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              v-model="facebookLink"
              placeholder="آدرس فیسبوک"
            />
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              v-model="twiterLink"
              placeholder="آدرس توئیتر"
            />
          </label>
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              v-model="instagramLink"
              placeholder="آدرس اینستاگرام"
            />
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              v-model="linkdinLink"
              placeholder="آدرس لینکدین"
            />
          </label>
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              v-model="telegramLink"
              placeholder="آدرس تلگرام"
            />
          </label>
        </div>
        <button class="form-btn" @click.prevent="addMember" v-if="submitType == 'add'">
          افزودن
        </button>
        <button class="form-btn" @click.prevent="submitEditMember" v-else>ویرایش</button>
      </form>
    </div>
    <div class="panel-table about-us-list">
      <div class="box-header">
        <h3>لیست اعضا</h3>
      </div>
      <section class="box-content custom-scrollbar" id="members-table">
        <header class="table-row table-header">
          <span>نام </span>
          <span>سمت </span>
          <span class="edit">ویرایش</span>
          <span class="delete">حذف</span>
        </header>
        <div class="table-row" v-for="member in teamMembersList" :key="member.id">
          <span>{{ member.name }}</span>
          <span class="persian-number">{{ member.role }}</span>
          <span class="edit">
            <button @click.prevent="editMember(member.id)">ویرایش</button>
          </span>
          <span class="delete">
            <button @click.prevent="deleteMember(member.id)">حذف</button>
          </span>
        </div>

        <footer class="table-footer">
          <hr />
          <a href="" type="button" @click.prevent="seeAll"> مشاهده همه </a>
        </footer>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  data() {
    return {
      coursesOrganized: "",
      description: "",
      ongoingCourses: "",
      regularCustomers: "",
      teamMembers: "",

      // add member data
      memberName: "",
      role: "",
      facebookLink: "",
      instagramLink: "",
      linkdinLink: "",
      telegramLink: "",
      twiterLink: "",
      memberImageBase64: "",
      memberImageName: "",
      teamMembersList: "",
      submitType: "add",
      editThisId: "",
    };
  },
  async mounted() {
    await Promise.all([this.membersDetail(), this.aboutDetails()]);
  },
  methods: {
    seeAll() {
      const table = document.getElementById("members-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer").style.display = "none");
    },
    resetData() {
      this.memberName = "";
      this.role = "";
      this.facebookLink = "";
      this.instagramLink = "";
      this.linkdinLink = "";
      this.telegramLink = "";
      this.twiterLink = "";
      this.memberImageBase64 = "";
      this.memberImageName = "";
      this.submitType = "add";
    },
    async aboutDetails() {
      const aboutDetails = await this.$axios.get(
        "/api/Admin/AdminManageSiteInfo/AboutInfo",
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (aboutDetails.data.statusCode == 200 && aboutDetails.data.message == "Success") {
        const aboutData = aboutDetails.data.data;
        this.coursesOrganized = aboutData.coursesOrganized;
        this.description = aboutData.description;
        this.ongoingCourses = aboutData.ongoingCourses;
        this.regularCustomers = aboutData.regularCustomers;
        this.teamMembers = aboutData.teamMembers;
      }
    },
    async changeAboutInfo() {
      const changeAboutResp = await this.$axios.post(
        "/api/Admin/AdminManageSiteInfo/AboutInfo",
        {
          coursesOrganized: this.coursesOrganized,
          ongoingCourses: this.ongoingCourses,
          regularCustomers: this.regularCustomers,
          teamMembers: this.teamMembers,
          description: this.description,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        changeAboutResp.data.statusCode == 200 &&
        changeAboutResp.data.message == "Success"
      ) {
        this.$swal({
          text: "ثبت شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
        this.aboutDetails();
      }
    },

    // add member
    memberImage(event) {
      try {
        this.memberImageBase64 = event.target.files[0];
        this.memberImageName = event.target.files[0].name;
      } catch {}
    },
    // createBase64Image(fileObject) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     this.memberImageBase64 = e.target.result;
    //   };
    //   reader.readAsDataURL(fileObject);
    // },
    async membersDetail() {
      const memberDetails = await this.$axios.get(
        "/api/Admin/AdminManageSiteInfo/TeamMember",
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        memberDetails.data.statusCode == 200 &&
        memberDetails.data.message == "Success"
      ) {
        this.teamMembersList = memberDetails.data.data;
      }
    },
    async addMember() {
      if (this.memberName != "" && this.role != "" && this.memberImageBase64 != "") {
        let formData = new FormData();
        formData.append("name", this.memberName);
        formData.append("role", this.role);
        formData.append("twitter", this.twiterLink);
        formData.append("linkedIn", this.linkdinLink);
        formData.append("facebook", this.facebookLink);
        formData.append("instagram", this.instagram);
        formData.append("telegram", this.telegramLink);
        formData.append("image", this.memberImageBase64);
        const addMemberResp = await this.$axios.post(
          `/api/Admin/AdminManageSiteInfo/TeamMember`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (
          addMemberResp.data.statusCode == 200 &&
          addMemberResp.data.message == "Success"
        ) {
          this.$swal({
            text: "ثبت شد",
            icon: "success",
            showCloseButton: true,
            confirmButtonText: "تایید",
          });
          this.membersDetail();
          this.resetData();
        }
      } else {
        this.$swal({
          text: "اطلاعات ناقص میباشد",
          icon: "warning",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
      }
    },
    async submitEditMember() {
      if (this.memberName != "" && this.role != "") {
        let formData = new FormData();
        formData.append("name", this.memberName);
        formData.append("role", this.role);
        formData.append("twitter", this.twiterLink);
        formData.append("linkedIn", this.linkdinLink);
        formData.append("facebook", this.facebookLink);
        formData.append("instagram", this.instagram);
        formData.append("telegram", this.telegramLink);
        formData.append("image", this.memberImageBase64);
        const addMemberResp = await this.$axios.put(
          `/api/Admin/AdminManageSiteInfo/TeamMember?memberId=${this.editThisId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (
          addMemberResp.data.statusCode == 200 &&
          addMemberResp.data.message == "Success"
        ) {
          this.$swal({
            text: "ویرایش شد",
            icon: "success",
            showCloseButton: true,
            confirmButtonText: "تایید",
          });
          this.resetData();
        }
      } else {
        this.$swal({
          text: "اطلاعات ناقص میباشد",
          icon: "warning",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
      }
    },
    async editMember(id) {
      this.editThisId = id;
      const editDetails = await this.$axios.get(
        `/api/Admin/AdminManageSiteInfo/TeamMember/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (editDetails.data.statusCode == 200 && editDetails.data.message == "Success") {
        this.submitType = "edit";
        const details = editDetails.data.data;
        this.memberName = details.name;
        this.role = details.role;
        this.twiterLink = details.twitter;
        this.linkdinLink = details.linkedIn;
        this.facebookLink = details.facebook;
        this.instagramLink = details.instagram;
        this.telegramLink = details.telegram;
      }
    },
    async deleteMember(id) {
      this.$swal({
        text: "از پاک کردن این عضو اطمینان دارید؟",
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "بله",
        cancelButtonText: "خیر",
      }).then(async (clickedBut) => {
        if (clickedBut.isConfirmed) {
          const blockResp = await this.$axios.delete(
            `/api/Admin/AdminManageSiteInfo/TeamMember/${id}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (blockResp.data.statusCode == 200 && blockResp.data.message == "Success") {
            this.$swal({
              text: "انجام شد",
              icon: "success",
              showCloseButton: true,
              confirmButtonText: "تایید",
            }).then(() => {
              this.resetData();
              this.membersDetail();
            });
          }
        }
      });
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
