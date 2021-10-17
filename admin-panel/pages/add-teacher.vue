<template>
  <div>
    <div class="panel-admin-content-item complete-profile">
      <header>
        <p class="section-header">افزودن مدرس</p>
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
        <p class="section-title-text">پروفایل</p>
      </div>
      <form action="">
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="tell"
              class="form-input"
              v-model="phoneNumber"
              placeholder="شماره موبایل"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="11"
              autocomplete="off"
            />
          </label>
          <label for="" class="form-row-col">
            <input type="email" class="form-input" placeholder="ایمیل" v-model="email" />
          </label>
        </div>
        <div class="form-row">
          <div class="form-row-col darken-color">
            <div class="separator pseudo-form-input">
              <input type="file" id="upload-profile-image" accept="image/*" />
              <span>بارگذاری تصویر پروفایل</span>
              <span>
                <label
                  data-related-file="upload-profile-image"
                  class="cover-btn select-profile-btn"
                  @click="selectProfImg"
                  >انتخاب</label
                >
              </span>
            </div>

            <span class="hint-text">
              <a href="#"> راهنمای انتخاب عکس پروفایل </a>
            </span>
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

          <label for="" class="form-row-col">
            <input
              type="password"
              class="form-input"
              placeholder="رمز عبور"
              v-model="password"
              autocomplete="off"
            />
            <span class="hint-text">
              <a href="">برای تغییر رمز عبور کلیک کنید</a>
            </span>
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <label for="" class="form-row-col">
              <div class="floated-list-container select-multiple">
                <input
                  type="text"
                  class="form-input"
                  readonly
                  placeholder="مدرک تحصیلی"
                  @click="toggleDropDowns"
                />
                <ul class="floated-list custom-scrollbar">
                  <li
                    v-for="option in degree"
                    @click="chooseDegre($event, option.id)"
                    :key="option.index"
                  >
                    {{ option.title }}
                  </li>
                </ul>
              </div>
            </label>
          </label>
          <label for="" class="form-row-col"> </label>
        </div>
        <!-- <div class="form-row">
          <label for="" class="form-row-col">
            <input type="email" class="form-input" placeholder="ایمیل" v-model="email" />
          </label>
          <label for="" class="form-row-col"> </label>
        </div> -->
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
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              placeholder="نام و نام خانوادگی"
              v-model="fullName"
            />
          </label>
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              placeholder="شماره شبا"
              v-model="shebaNumber"
            />
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="number"
              class="form-input"
              placeholder="شماره کارت"
              v-model="cardNumber"
            />
          </label>
          <label for="" class="form-row-col">
            <input type="text" class="form-input" placeholder="آدرس" v-model="address" />
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
          <div class="form-row-col darken-color">
            <div class="separator pseudo-form-input">
              <input
                type="file"
                id="upload-melliCard-image"
                @change="uploadNCImg"
                accept="image/*"
              />
              <span>بارگذاری تصویر کارت ملی</span>
              <span>
                <label for="upload-melliCard-image" class="cover-btn">انتخاب</label>
              </span>
            </div>
          </div>
        </div>
        <button class="form-btn success" @click.prevent="addTeacher">
          ثبت و نهایی کردن
        </button>
      </form>
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
  </div>
</template>
<script>
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  data() {
    return {
      degree: [],
      degreDrop: "",
      selectedDegree: "",
      croppieImage: "",
      cropped: "",
      selectedNCImage: "",
      phoneNumber: "",
      password: "",
      email: "",
      shebaNumber: "",
      fullName: "",
      cardNumber: "",
      address: "",
      nationalCardNumber: "",
      selectedDegreGroup: [],
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
      this.degree.push({ title: n.title, id: n.id });
    }
  },
  methods: {
    toggleDropDowns(event) {
      event.stopPropagation();
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    chooseDegre(event, id, imageNeed) {
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
      if (id in this.selectedDegreGroup) {
        delete this.selectedDegreGroup[id];
      } else {
        this.selectedDegreGroup.push(id);
      }
    },
    toggleDropdown() {
      document.querySelector(".floated-list-container").classList.toggle("show");
    },
    selectDegreDrop(event) {
      this.degreDrop = event.target.innerHTML.trim();
      event.target.closest(".floated-list-container").classList.toggle("show");
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
    },
    crop() {
      // Options can be updated.
      // Current option will return a base64 version of the uploaded image with a size of 600px X 450px.
      let options = {
        type: "base64",
        size: { width: 600, height: 600 },
        format: "jpeg",
      };
      this.$refs.croppieRef.result(options, (output) => {
        this.cropped = this.croppieImage = output;
      });
    },
    selectProfImg() {
      document.querySelector(".profModal").classList.toggle("show");
    },
    uploadNCImg(event) {
      const NCImg = event.target.files[0];
      this.createBase64Image(NCImg);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedNCImage = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },
    async addTeacher() {
      if (
        this.phoneNumber != "" &&
        this.nationalCardNumber != "" &&
        this.fullName != "" &&
        this.password != ""
      ) {
        const addTeacherResp = await this.$axios.post(
          "/api/Admin/AdminManageTeacher/AddTeacher",
          {
            phoneNumber: this.phoneNumber,
            degreeEducationId:
              this.selectedDegree != "" ? Number(this.selectedDegree) : null,
            profileImageBase64: this.cropped != "" ? this.cropped : null,
            password: this.password,
            email: this.email != "" ? this.email : null,
            teacherName: this.fullName,
            shebaNumber: this.shebaNumber != "" ? this.shebaNumber : null,
            cardNumber: this.cardNumber != "" ? this.cardNumber : null,
            address: this.address != "" ? this.address : null,
            nationalCardNumber: this.nationalCardNumber,
            nationalCardImageBase64:
              this.selectedNCImage != "" ? this.selectedNCImage : null,
            educationIds: this.selectedDegreGroup,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (
          addTeacherResp.data.statusCode == 200 &&
          addTeacherResp.data.message == "Success"
        ) {
          this.$swal({
            text: "ثبت شد",
            icon: "success",
            showCloseButton: true,
            confirmButtonText: "تایید",
          }).then(() => {
            this.$router.push("/teachers-list");
          });
        }
      } else {
        this.$swal({
          text: "اطلاعات اجباری را کامل کنید",
          icon: "error",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
      }
    },
  },
  watch: {
    degreDrop: {
      handler() {
        for (const n of this.degree) {
          if (n.title === this.degreDrop) {
            this.selectedDegree = n.id;
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
