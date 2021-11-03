<template>
  <div>
    <div class="panel-student-content-item profile-info">
      <header>
        <p class="section-header">
          <skeleton
            v-if="loading"
            class="skeleton"
            width="95px"
            height="30px"
            borderRadius="5px"
          />
          <span v-else> تکمیل پروفایل </span>
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
            class="skeleton discount-inp-skeleton form-row-col"
            width="85px"
            height="30px"
            borderRadius="5px"
          />
          <span v-else> پروفایل </span>
        </p>
      </div>
      <form action="">
        <template v-if="loading">
          <div class="form-row">
            <skeleton
              class="skeleton discount-inp-skeleton form-row-col"
              width="150px"
              height="50px"
              borderRadius="5px"
            />
            <skeleton
              class="skeleton discount-inp-skeleton form-row-col"
              width="150px"
              height="50px"
              borderRadius="5px"
            />
          </div>
          <div class="form-row">
            <skeleton
              class="skeleton discount-inp-skeleton form-row-col"
              width="150px"
              height="50px"
              borderRadius="5px"
            />
            <skeleton
              class="skeleton discount-inp-skeleton form-row-col"
              width="150px"
              height="50px"
              borderRadius="5px"
            />
          </div>
          <div class="form-row">
            <skeleton
              class="skeleton discount-inp-skeleton form-row-col"
              width="150px"
              height="50px"
              borderRadius="5px"
            />
          </div>
          <skeleton
            v-if="loading"
            class="skeleton form-btn-skeleton"
            width="150px"
            height="50px"
            borderRadius="5px"
          />
        </template>
        <template v-else>
          <div class="form-row">
            <div class="form-row-col darken-color">
              <div class="separator pseudo-form-input">
                <span>انتخاب آواتار</span>
                <span>
                  <button
                    type="button"
                    id="select-student-avatar"
                    class="cover-btn"
                    @click="showAvatar"
                  >
                    انتخاب
                  </button>
                </span>
              </div>
            </div>
            <label for="" class="form-row-col floated-list-container">
              <input
                type="text"
                readonly
                placeholder="مدرک تحصیلی"
                @click="toggleDropdown"
                :value="drop"
                class="form-input"
              />
              <ul class="floated-list custom-scrollbar">
                <li
                  v-for="eachDegre in degree"
                  :key="eachDegre.index"
                  @click="selectDegre"
                >
                  {{ eachDegre.title }}
                </li>
              </ul>

              <!-- <input
                type="text"
                list="select-course-grade-student"
                class="form-input"
                placeholder="مدرک تحصیلی"
                v-model="drop"
              />
              <datalist id="select-course-grade-student">
                <option
                  v-for="eachDegre in degree"
                  :key="eachDegre.index"
                  :value="eachDegre.title"
                />
              </datalist> -->
            </label>
          </div>
          <div class="form-row">
            <label for="" class="form-row-col">
              <input
                v-model="profData.studentName"
                type="text"
                class="form-input"
                placeholder="نام و نام خانوادگی"
                disabled
              />
            </label>
            <label for="" class="form-row-col">
              <input
                type="text"
                class="form-input"
                placeholder="آدرس"
                v-model="profData.address"
              />
            </label>
          </div>
          <div class="form-row">
            <label for="" class="form-row-col">
              <input
                type="tel"
                class="form-input"
                placeholder="شماره موبایل"
                disabled
                v-model="profData.phoneNumber"
              />
            </label>
            <label for="" class="form-row-col">
              <!-- <input type="number" class="form-input" placeholder="شماره کارت"> -->
            </label>
          </div>
          <div class="form-row has-guidetext">
            <label for="" class="form-row-col guide-section">
              <nuxt-link to="/my/change-password" class="guide-text">
                برای تغییر رمز عبور کلیک کنید
              </nuxt-link>
            </label>
          </div>
          <button class="form-btn success" @click.prevent="editProf">
            ثبت و نهایی کردن
          </button>
        </template>
      </form>
    </div>
    <div class="basic-modal select-avatar">
      <div class="content-box">
        <header>
          <div class="empty"></div>
          <h2 class="title">انتخاب اواتار</h2>
          <button class="close-btn" @click="showAvatar">&times;</button>
        </header>
        <div class="avatars-container">
          <img
            @click="selectThisAvatar($event, 'person-avatar.png')"
            src="@/static/images/teacher-profile-image.png"
            class="avatar-image"
            alt="آواتار"
          />
          <img
            @click="selectThisAvatar($event, 'person-avatar.png')"
            src="@/static/images/teacher-profile-image.png"
            class="avatar-image"
            alt="آواتار"
          />
          <img
            @click="selectThisAvatar($event, 'person-avatar.png')"
            src="@/static/images/teacher-profile-image.png"
            class="avatar-image"
            alt="آواتار"
          />
          <img
            @click="selectThisAvatar($event, 'person-avatar.png')"
            src="@/static/images/teacher-profile-image.png"
            class="avatar-image"
            alt="آواتار"
          />
          <img
            @click="selectThisAvatar($event, 'person-avatar.png')"
            src="@/static/images/teacher-profile-image.png"
            class="avatar-image"
            alt="آواتار"
          />
        </div>
        <form action="#">
          <button class="form-btn submit-avatar lilac" @click="showAvatar">انتخاب</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import skeleton from "@/components/skeleto-creator";
export default {
  components: { skeleton },
  layout: "dashboard",
  middleware: "userIsNotLog",
  head() {
    return {
      title: "پنل دانش آموز",
      script: [
        {
          type: "text/javascript",
          innerHTML:
            "const token = '8oo00c84gsc080040w00so0ks00400kcw4sskgss'; const tools = 'ThankUpixel';",
          charset: "utf-8",
        },
        {
          src: "https://trk.tablighdrive.com/pixel/submit.action.js",
        },
      ],
    };
  },
  data() {
    return {
      showAvatarSelect: false,
      loading: true,
      degree: [],
      profData: { address: "", phoneNumber: "", studentName: "", degreeEducationId: "" },
      drop: "",
      selectedDegree: "",
      prtofAvatarName: "person-avatar.png",
    };
  },
  async beforeMount() {
    this.onLoadData();
  },
  methods: {
    toggleDropdown() {
      document.querySelector(".floated-list-container").classList.toggle("show");
    },
    selectDegre(event) {
      this.drop = event.target.innerHTML.trim();
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    showAvatar() {
      document.querySelector(".basic-modal.select-avatar").classList.toggle("show");
    },
    selectThisAvatar(event, name) {
      const images = document.querySelectorAll(".avatar-image");
      images.forEach((element) => {
        element.style.backgroundColor = "#fff";
      });
      event.target.style.backgroundColor = "#06D6A0";
      this.prtofAvatarName = name;
    },
    async editProf() {
      const editProfResp = await this.$axios.post(
        "/api/Student/StudentProfile/Profile",
        {
          degreeEducationId: this.selectedDegree,
          profileImageName: this.profAvatarName,
          address: this.profData.address,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (editProfResp.data.statusCode == 200 && editProfResp.data.message == "Success") {
        this.$swal({
          text: "اطلاعات پروفایل تغییر کرد!",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
        this.onLoadData();
      }
    },
    async onLoadData() {
      this.loading = true;
      const [degre, profileData] = await Promise.all([
        this.$axios.get("/api/Public/ProfileActions/GetDegreeEducations", {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }),
        this.$axios.get("/api/Student/StudentProfile/Profile", {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }),
      ]);
      // console.log(degre);
      if (
        degre.data.statusCode == 200 &&
        degre.data.message == "Success" &&
        profileData.data.statusCode == 200 &&
        profileData.data.message == "Success"
      ) {
        for (const n of degre.data.data) {
          this.degree.push({ title: n.title, id: n.id });
          for (const n of this.degree) {
            if (profileData.data.data.degreeEducationId === n.id) {
              this.drop = n.title;
            }
          }
          this.profData.address = profileData.data.data.address;
          this.profData.degreeEducationId = profileData.data.data.degreeEducationId;
          this.profData.studentName = profileData.data.data.studentName;
          this.profData.phoneNumber = profileData.data.data.phoneNumber;
        }
      }
      this.loading = false;
    },
  },
  watch: {
    drop: {
      handler() {
        for (const n of this.degree) {
          if (n.title === this.drop) {
            this.selectedDegree = n.id;
          }
        }
      },
      deep: true,
    },
  },
};
</script>
//
<style lang="scss">
@import "@/assets/swal-style.scss";
//   @import "@/assets/styles/stu-panel.scss";
//
</style>
