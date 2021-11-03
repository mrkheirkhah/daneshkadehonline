<template>
  <div>
    <div class="panel-admin-content-item teacher-profile">
      <header>
        <p class="section-header">
          <skeleton
            v-if="loading"
            class="skeleton"
            width="95px"
            height="30px"
            borderRadius="5px"
          />
          <template v-else> مشاهده پروفایل </template>
        </p>
      </header>

      <form action="">
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
            <p class="section-title-text">مدارک</p>
          </div>
          <div class="form-row">
            <div for="" class="form-row-col darken-color">
              <div class="separator pseudo-form-input">
                <input type="file" id="upload-profile-image" accept="image/*" />
                <span>تصویر پروفایل</span>

                <span>
                  <!-- <label for="upload-file-croppie" class="cover-btn select-profile-btn"
                    >انتخاب</label
                  > -->
                  <label
                    for="upload-course-image"
                    class="cover-btn"
                    @click.prevent="seeProfImage('prof')"
                    >مشاهده</label
                  >
                </span>
              </div>
            </div>
            <label for="" class="form-row-col">
              <input
                type="text"
                class="form-input has-cover-btn"
                placeholder="رمز عبور"
                v-model="password"
              />
            </label>
            <div class="basic-modal">
              <div class="content-box">
                <header>
                  <div class="empty"></div>
                  <h2 class="title">انتخاب تصویر</h2>
                  <button type="button" class="close-btn" @click="selectProfImg">
                    &times;
                  </button>
                </header>
              </div>
            </div>
          </div>
          <div class="form-row">
            <label for="" class="form-row-col">
              <input
                type="text"
                class="form-input has-cover-btn"
                placeholder="نام و نام خانوادگی"
                v-model="fullName"
              />
            </label>

            <label
              for=""
              class="form-row-col in-panel floated-list-container"
              @click="toggleDropdown"
            >
              <input
                type="text"
                readonly
                class="form-input"
                :value="degre"
                placeholder="مدرک تحصیلی"
              />
              <ul class="floated-list custom-scrollbar">
                <li
                  @click="setDegre($event, group.id)"
                  v-for="group in degres"
                  :key="group.id"
                >
                  {{ group.title }}
                </li>
              </ul>
            </label>
          </div>
          <div class="form-row">
            <label for="" class="form-row-col">
              <input
                type="text"
                class="form-input has-cover-btn"
                placeholder="آدرس"
                v-model="address"
              />
            </label>
            <label for="" class="form-row-col">
              <input
                type="tel"
                class="form-input has-cover-btn"
                placeholder="شماره موبایل"
                v-model="phoneNumber"
              />
            </label>
          </div>

          <div class="options-buttons">
            <button class="form-btn success" @click.prevent="editStudentProf">
              ویرایش اطلاعات
            </button>
          </div>
        </template>
      </form>
    </div>
    <!-- <div class="basic-modal show-image">
      <div class="content-box">
        <header>
          <div class="empty"></div>
          <h2 class="title">عکس {{ modalPicTitle }}</h2>
          <button type="button" class="close-btn" @click="closeModal">&times;</button>
        </header>
        <form action="#" class="image profile">
          <img
            :src="'data:image/png;base64,' + modalPicSrc"
            title="عکس پروفایل"
            alt="عکس دانشجو"
          />
        </form>
      </div>
    </div> -->
    <!-- <div class="basic-modal profModal">
      <div class="content-box">
        <header>
          <div class="empty"></div>
          <h2 class="title">انتخاب تصویر</h2>
          <button type="button" class="close-btn" @click="selectProfImg">&times;</button>
        </header>
        <div id="profile-modal">
          <client-only>
            <vue-croppie
              ref="croppieRef"
              :enableOrientation="true"
              :boundary="{ width: 330, height: 300 }"
              :viewport="{ width: 250, height: 250, type: 'circle' }"
              :enableResize="false"
            >
            </vue-croppie>
          </client-only>
          <footer class="cropper-footer">
            <div class="actionUpload">
              <label for="upload-file-croppie">آپلود</label>
              <input
                type="file"
                id="upload-file-croppie"
                value="انتخاب"
                accept="image/*"
                @change="croppie"
              />
            </div>
            <button
              type="button"
              class="actionDone form-btn"
              @click="
                crop();
                selectProfImg();
              "
            >
              انجام
            </button>
          </footer>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import skeleton from "@/components/skeleton-creator";
export default {
  components: { skeleton },
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  data() {
    return {
      loading: true,
      fullName: "",
      degre: "",
      address: "",
      password: "",
      phoneNumber: "",
      profileImageBase64: "",
      modalPicSrc: "",
      degres: [],
      degreeEducationId: "",
      notificationText: "",
      modalPicTitle: "",
      profileImageName: "person-avatar.png",
    };
  },
  async beforeMount() {
    const degre = await this.$axios.get(
      "/api/Public/ProfileActions/GetDegreeEducations",
      {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      }
    );
    for (const n of degre.data.data) {
      this.degres.push({ title: n.title, id: n.id });
    }
    // console.log(degre);
    if (this.$route.params.id == undefined || isNaN(this.$route.params.id)) {
      this.$router.push("/students-list");
    } else {
      const getStudentProfile = await this.$axios.get(
        `/api/Admin/AdminManageStudent/GetStudentById/${this.$route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      //   console.log(getStudentProfile);
      const studentProfile = getStudentProfile.data.data;
      this.degreeEducationId = studentProfile.degreeEducationId;
      for (const n of this.degres) {
        if (studentProfile.degreeEducationId === n.id) {
          this.degre = n.title;
        }
      }
      this.address = studentProfile.address;
      this.phoneNumber = studentProfile.phoneNumber;
      this.fullName = studentProfile.studentName;
      this.profileImageBase64 = studentProfile.profileImageBase64;
    }
    this.loading = false;
  },
  methods: {
    toggleDropdown() {
      event.stopPropagation();
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    seeProfImage(type) {
      document.querySelector(".show-image").style.display = "flex";
      if (type == "prof") {
        this.modalPicSrc = this.profileImageBase64;
        this.modalPicTitle = "پروفایل";
      } else {
        this.modalPicSrc = this.nationalCardImageBase64;
        this.modalPicTitle = "کارت ملی";
      }
    },
    async setDegre(event, id) {
      this.degre = event.target.innerHTML.trim();
      this.degreeEducationId = id;
    },
    closeModal() {
      document.querySelector(".show-image").style.display = "none";
    },
    selectProfImg() {
      document.querySelector(".profModal").classList.toggle("show");
    },
    croppie(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      var reader = new FileReader();
      reader.onload = (e) => {
        this.$refs.croppieRef.bind({
          url: e.target.result,
        });
      };

      reader.readAsDataURL(files[0]);
      this.selectProfImg();
    },
    crop() {
      let options = {
        type: "base64",
        size: { width: 600, height: 600 },
        format: "png",
      };
      this.$refs.croppieRef.result(options, (output) => {
        this.profileImageBase64 = output;
      });
    },
    uploadNCImg(event) {
      const NCImg = event.target.files[0];
      this.createBase64Image(NCImg);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.nationalCardImageBase64 = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },
    async editStudentProf() {
      const editStudentResp = await this.$axios.put(
        "/api/Admin/AdminManageStudent/EditStudent",
        {
          studentId: Number(this.$route.params.id),
          degreeEducationId: this.degreeEducationId,
          studentName: this.fullName,
          address: this.address,
          phoneNumber: this.phoneNumber,
          password: this.password,
          profileImageName: this.profileImageName,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        editStudentResp.data.statusCode == 200 &&
        editStudentResp.data.message == "Success"
      ) {
        this.$swal({
          text: "اطلاعات دانشجو ادیت شد!",
          icon: "success",
          showCloseButton: false,
          confirmButtonText: "تایید",
        }).then(() => {
          this.$router.push("/students-list");
        });
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
