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
                <span v-if="profImageName == ''">تصویر پروفایل</span>
                <span v-else>{{ profImageName }}</span>

                <span>
                  <label
                    data-related-file="upload-profile-image"
                    class="cover-btn select-profile-btn"
                    @click="selectProfImg"
                    >انتخاب</label
                  >
                  <label
                    for="upload-course-image"
                    class="cover-btn"
                    @click.prevent="seeProfImage('prof')"
                    >مشاهده</label
                  >
                </span>
              </div>
            </div>
            <div class="basic-modal">
              <div class="content-box">
                <header>
                  <div class="empty"></div>
                  <h2 class="title">انتخاب تصویر</h2>
                  <button type="button" class="close-btn" @click="selectProfImg">
                    &times;
                  </button>
                </header>
                <!-- <div id="profile-modal">
                <div id="main-cropper"></div>
                <footer class="cropper-footer">
                  <div class="actionUpload">
                    <label for="upload-file-croppie">آپلود</label>
                    <input
                      type="file"
                      id="upload-file-croppie"
                      value="انتخاب"
                      accept="image/*"
                    />
                  </div>
                  <button type="button" class="actionDone form-btn">انجام</button>
                </footer>
              </div> -->
              </div>
            </div>

            <div for="" class="form-row-col darken-color">
              <div class="separator pseudo-form-input">
                <input
                  type="file"
                  id="upload-melliCard-image"
                  @change="uploadNCImg"
                  accept="image/*"
                />
                <span>تصویر کارت ملی</span>
                <span>
                  <label for="upload-melliCard-image" class="cover-btn">انتخاب</label>
                  <label
                    for="upload-course-image"
                    class="cover-btn"
                    @click.prevent="seeProfImage('card')"
                    >مشاهده</label
                  >
                </span>
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

            <div for="" class="form-row-col darken-color">
              <div class="separator pseudo-form-input">
                <span>مشاهده تخصص ها</span>
                <span>
                  <label class="cover-btn" @click="showSpecialties">مشاهده</label>
                </span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <label for="" class="form-row-col">
              <input
                type="number"
                class="form-input has-cover-btn"
                placeholder="شماره کارت"
                v-model="cardNumber"
              />
            </label>
            <label for="" class="form-row-col">
              <input
                type="text"
                class="form-input has-cover-btn"
                placeholder="آدرس"
                v-model="address"
              />
            </label>
          </div>
          <div class="form-row">
            <label for="" class="form-row-col">
              <input
                type="number"
                class="form-input has-cover-btn"
                placeholder="کد ملی"
                v-model="nationalCardNumber"
              />
            </label>
            <label for="" class="form-row-col">
              <input
                type="tel"
                class="form-input has-cover-btn"
                placeholder="شماره موبایل"
                v-model="phoneNumber"
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                maxlength="11"
              />
            </label>
          </div>
          <div class="form-row">
            <label for="" class="form-row-col">
              <input
                type="email"
                class="form-input has-cover-btn"
                placeholder="ایمیل"
                v-model="email"
              />
            </label>
            <label for="" class="form-row-col">
              <input
                type="text"
                class="form-input has-cover-btn"
                placeholder="شماره شبا"
                v-model="shebaNumber"
              />
            </label>
          </div>
          <div class="form-row">
            <label for="" class="form-row-col">
              <textarea
                name=""
                cols="22"
                rows="0"
                placeholder="درباره مدرس"
                v-model="aboutTeacher"
                class="form-input form-textarea"
              ></textarea>
            </label>
            <label for="" class="form-row-col">
              <div class="floated-list-container select-multiple in-panel">
                <input
                  type="text"
                  class="form-input"
                  readonly
                  :value="selectedCourseGroupsNames"
                  placeholder="مقاطع تدریس"
                  @click="toggleDropDowns"
                />
                <ul class="floated-list custom-scrollbar">
                  <li
                    v-for="option in courseGroups"
                    @click="chooseCourseGroup($event, option.id, option.groupTitle)"
                    :key="option.id"
                    :class="
                      selectedCourseGroups.length > 0 &&
                      selectedCourseGroups.includes(option.id)
                        ? 'selected'
                        : ''
                    "
                  >
                    {{ option.groupTitle }}
                  </li>
                </ul>
              </div>
              <input
                type="text"
                class="form-input has-cover-btn"
                placeholder="رمز عبور"
                v-model="password"
              />
            </label>
          </div>
          <div class="form-row">
            <label for="" class="form-row-col">
              <textarea
                name=""
                cols="22"
                rows="0"
                placeholder="دلیل رد(در صورت رد کردن وارد کنید)"
                v-model="notificationText"
                class="form-input form-textarea"
              ></textarea>
            </label>
          </div>
          <div class="options-buttons">
            <button
              class="form-btn success"
              @click.prevent="setTeacherProf('accept')"
              :disabled="isSendingAccept"
            >
              تایید اطلاعات
            </button>
            <button
              class="form-btn red-color"
              @click.prevent="setTeacherProf('decline')"
              :disabled="isSendingAccept"
            >
              رد اطلاعات
            </button>
          </div>
        </template>
      </form>
    </div>
    <div class="basic-modal show-image">
      <div class="content-box">
        <header>
          <div class="empty"></div>
          <h2 class="title">عکس {{ modalPicTitle }}</h2>
          <button type="button" class="close-btn" @click="closeModal">&times;</button>
        </header>
        <form action="#" class="image profile">
          <img
            :src="
              modalType == 'card'
                ? 'data:image/png;base64,' + modalPicSrc
                : 'https://api.daneshkadeonline.ir/Images/Public/Teacher/' + modalPicSrc
            "
            :title="' عکس ' + modalPicTitle"
            :alt="' عکس ' + modalPicTitle"
          />
        </form>
      </div>
    </div>
    <div class="basic-modal profModal">
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
    </div>
    <div class="basic-modal show-specialties">
      <div class="content-box">
        <header>
          <div class="empty"></div>
          <h2 class="title">تخصص ها</h2>
          <button type="button" class="close-btn" @click="closeSpecialties">
            &times;
          </button>
        </header>
        <form action="#" class="specialties">
          <ul>
            <li>
              <span class="info">
                <img
                  v-if="educationImageBase64 != ''"
                  :src="'data:image/png;base64,' + educationImageBase64"
                  tabindex="-1"
                  alt="عکس تخصص"
                />
                <span>{{ selectedEducationName }}</span>
              </span>
              <span class="options" v-if="educationIsAccepted == false">
                <button class="reject" @click.prevent="degreStatus(false)">حذف</button>
                <button class="confirm" @click.prevent="degreStatus(true)">تائید</button>
              </span>
              <span v-else> تایید شده !</span>
            </li>
          </ul>
        </form>
      </div>
    </div>
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
      teacherProfile: "",
      fullName: "",
      degre: "",
      address: "",
      cardNumber: "",
      shebaNumber: "",
      email: "",
      nationalCardNumber: "",
      password: "",
      phoneNumber: "",
      nationalCardImageBase64: undefined,
      profileImageBase64: undefined,
      modalPicSrc: "",
      degres: [],
      degreeEducationId: "",
      notificationText: "",
      aboutTeacher: "",
      modalPicTitle: "",
      teacherDegres: "",
      modalType: "",
      educationId: "",
      profImageName: "",
      courseGroups: "",
      selectedCourseGroups: [],
      selectedCourseGroupsNames: [],
      cropped: "",
      profImageFile: undefined,
      selectedEducationName: "",
      educationImageBase64: "",
      educationIsAccepted: "",
      profileType: "",
      isSendingAccept: false,
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
    // console.log(degre);
    for (const n of degre.data.data) {
      this.degres.push({ title: n.title, id: n.id });
    }
    // console.log(degre);
    if (this.$route.params.id == undefined || isNaN(this.$route.params.id)) {
      this.$router.push("/teachers-list");
    } else {
      // this.getTeacherDegres();
      const getTeacherProfile = await this.$axios.get(
        `/api/Admin/AdminManageTeacher/GetTeacherProfile?teacherId=${this.$route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      const groups = await this.$axios.get(
        "/api/Public/ProfileActions/GetAllCourseGroups"
      );
      this.courseGroups = groups.data.data;
      // console.log(getTeacherProfile);
      const teacherProfile = getTeacherProfile.data.data;
      this.educationId = teacherProfile.educationId;
      this.educationIsAccepted = teacherProfile.educationIsAccepted;
      this.educationImageBase64 = teacherProfile.educationImageBase64;
      for (const n of this.degres) {
        if (teacherProfile.educationId === n.id) {
          this.selectedEducationName = n.title;
        }
      }
      this.selectedCourseGroups = teacherProfile.groupIds;
      this.aboutTeacher = getTeacherProfile.data.data.description;
      this.address = teacherProfile.address;
      this.cardNumber = teacherProfile.cardNumber;
      this.email = teacherProfile.email;
      this.nationalCardNumber = teacherProfile.nationalCardNumber;
      this.phoneNumber = teacherProfile.phoneNumber;
      this.shebaNumber = teacherProfile.shebaNumber;
      this.fullName = teacherProfile.teacherName;
      this.nationalCardImage = teacherProfile.nationalCardImageBase64;
      this.profileImage = teacherProfile.profileImageName;
    }
    this.loading = false;
  },
  methods: {
    seeProfImage(type) {
      document.querySelector(".show-image").style.display = "flex";
      this.modalType = type;
      if (type == "prof") {
        this.modalPicSrc = this.profileImage;
        this.modalPicTitle = "پروفایل";
      } else {
        this.modalPicSrc = this.nationalCardImage;
        this.modalPicTitle = "کارت ملی";
      }
    },
    showSpecialties() {
      document.querySelector(".show-specialties").style.opacity = "1";
      document.querySelector(".show-specialties").style.visibility = "visible";
    },
    closeSpecialties() {
      document.querySelector(".show-specialties").style.opacity = "0";
      document.querySelector(".show-specialties").style.visibility = "hidden";
    },
    editTeacherProf() {},
    closeModal() {
      document.querySelector(".show-image").style.display = "none";
    },
    selectProfImg() {
      document.querySelector(".profModal").classList.toggle("show");
    },
    toggleDropDowns(event) {
      event.stopPropagation();
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    chooseCourseGroup(event, id, name) {
      if (
        event.target
          .closest(".floated-list-container")
          .classList.contains("select-multiple")
      ) {
        event.target.closest(".floated-list-container").classList.add("show");
        toggle_selected_item(event.target);
      }
      function toggle_selected_item(elem) {
        if (elem.tagName === "LI") {
          elem.classList.toggle("selected");
        }
      }
      if (this.selectedCourseGroups.includes(id)) {
        var index = this.selectedCourseGroups.indexOf(id);

        if (index > -1) {
          this.selectedCourseGroups.splice(index, 1);
        }
      } else {
        this.selectedCourseGroups.push(id);
      }
      if (this.selectedCourseGroupsNames.includes(name)) {
        var index = this.selectedCourseGroupsNames.indexOf(name);

        if (index > -1) {
          this.selectedCourseGroupsNames.splice(index, 1);
        }
      } else {
        this.selectedCourseGroupsNames.push(name);
      }
    },
    croppie(e) {
      try {
        var pattern = /image-*/;
        if (!e.target.files[0].type.match(pattern)) {
          this.$swal({
            text: "لطفا عکس درست انتخاب کنید!",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "تایید",
          });
        } else {
          var files = e.target.files || e.dataTransfer.files;
          if (!files.length) return;
          this.profImageName = e.target.files[0].name;
          this.profileType = e.target.files[0].type;
          var reader = new FileReader();
          reader.onload = (e) => {
            this.$refs.croppieRef.bind({
              url: e.target.result,
            });
          };

          reader.readAsDataURL(files[0]);
        }
      } catch {
        return;
      }
    },
    crop() {
      const lastDot = this.profileType.lastIndexOf("/");
      const ext = this.profileType.substring(lastDot + 1);
      let options = {
        type: "blob",
        size: { width: 600, height: 600 },
        format: ext,
      };
      this.$refs.croppieRef.result(options, (output) => {
        this.cropped = output;
      });
    },
    uploadNCImg(event) {
      try {
        this.nationalCardImageBase64 = event.target.files[0];
      } catch {}
    },
    async setTeacherProf(type) {
      this.isSendingAccept = true;
      if (this.cropped != "") {
        this.profImageFile = new File([this.cropped], this.profImageName, {
          type: this.profileType,
        });
      }
      if (type == "accept") {
        let formData = new FormData();
        formData.append("TeacherId", this.$route.params.id);
        formData.append("EducationId", this.educationId);
        formData.append("ProfileImage", this.profImageFile);
        formData.append("NationalCardImage", this.nationalCardImageBase64);
        for (let i = 0; i < this.selectedCourseGroups.length; i++) {
          formData.append("GroupIds", this.selectedCourseGroups[i]);
        }
        formData.append("TeacherName", this.fullName);
        formData.append("CardNumber", this.cardNumber);
        formData.append("Address", this.address);
        formData.append("NationalCardNumber", this.nationalCardNumber);
        formData.append("PhoneNumber", this.phoneNumber);
        formData.append("Email", this.email);
        formData.append("ShebaNumber", this.shebaNumber);
        formData.append("Password", this.password);
        formData.append("Description", this.aboutTeacher);
        formData.append("isAccepted", true);
        // for (var value of formData.values()) {
        //   console.log(value);
        // }
        const setStatusResponse = await this.$axios.post(
          "/api/Admin/AdminManageTeacher/SetTeacherProfile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (
          setStatusResponse.data.statusCode == 200 &&
          setStatusResponse.data.message == "Success"
        ) {
          this.$swal({
            text: "اطلاعات مدرس تایید شد!",
            icon: "success",
            showCloseButton: false,
            confirmButtonText: "تایید",
          }).then(() => {
            this.$router.push("/teachers-list");
          });
        }
      } else {
        let formData = new FormData();
        formData.append("TeacherId", this.$route.params.id);
        formData.append("isAccepted", false);
        formData.append("notificationText", this.notificationText);
        const setStatusResponse = await this.$axios.post(
          "/api/Admin/AdminManageTeacher/SetTeacherProfile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        this.$swal({
          text: "اطلاعات مدرس رد شد!",
          icon: "success",
          showCloseButton: false,
          confirmButtonText: "تایید",
        }).then(() => {
          this.$router.push("/teachers-list");
        });
      }
      this.isSendingAccept = false;
    },
    async degreStatus(type) {
      const acceptDegreResp = await this.$axios.get(
        `/api/Admin/AdminManageTeacher/ChangeAcceptEducation/${this.$route.params.id}?isAccepted=${type}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        acceptDegreResp.data.statusCode == 200 &&
        acceptDegreResp.data.message == "Success"
      ) {
        this.getTeacherDegres();
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
