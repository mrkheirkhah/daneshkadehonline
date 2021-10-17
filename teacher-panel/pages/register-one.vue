<template>
  <div>
    <div class="panel-teacher-content-item complete-profile">
      <header>
        <span v-if="loading" class="document-header-skeleton">
          <skeleton
            v-if="loading"
            class="skeleton"
            width="150px"
            height="40px"
            borderRadius="5px"
          />
        </span>
        <p class="section-header" v-else>تکمیل پروفایل</p>
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
          <span v-else> پروفایل </span>
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
            </p>
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
        <!-- skeleton end -->

        <template v-else>
          <div class="form-row">
            <label for="" class="form-row-col">
              <input
                type="tell"
                class="form-input"
                :value="phoneNumber"
                placeholder="شماره موبایل"
                disabled
              />
            </label>
            <label for="" class="form-row-col">
              <div class="floated-list-container select-multiple">
                <input
                  type="text"
                  class="form-input"
                  v-model="drop"
                  readonly
                  placeholder="مدرک تحصیلی"
                  @click="toggleDropDowns"
                />
                <ul class="floated-list custom-scrollbar">
                  <li
                    v-for="option in degree"
                    @click="chooseDegre($event, option.id, option.imageNeed)"
                    :key="option.index"
                  >
                    {{ option.title }}
                  </li>
                </ul>
              </div>
            </label>
          </div>

          <div class="form-row">
            <div class="form-row-col darken-color" v-for="i in needImage" :key="i">
              <div class="separator pseudo-form-input">
                <input
                  type="file"
                  :id="'upload-degre-image-' + i"
                  @change="uploadDegreImg($event, i)"
                />
                <span> بارگذاری تصویر {{ degreName(i) }}</span>
                <!-- <span else>{{ NCImageName }}</span> -->
                <span>
                  <label :for="'upload-degre-image-' + i" class="cover-btn">انتخاب</label>
                </span>
              </div>
            </div>
            <label for="" class="form-row-col" v-if="needImage.length % 2 != 0"> </label>
          </div>

          <div class="form-row">
            <div class="form-row-col darken-color">
              <label for="upload-file-croppie" class="separator pseudo-form-input">
                <input type="file" id="upload-profile-image" accept="image/*" />
                <span v-if="profImageName == ''">بارگذاری تصویر پروفایل</span>
                <span else>{{ profImageName }}</span>
                <span>
                  <label for="upload-file-croppie" class="cover-btn select-profile-btn"
                    >آپلود</label
                  >
                  <!-- <label
                    data-related-file="upload-profile-image"
                    class="cover-btn select-profile-btn"
                    @click="selectProfImg"
                    >انتخاب</label
                  > -->
                </span>
              </label>

              <span class="hint-text">
                <a href="#"> راهنمای انتخاب عکس پروفایل </a>
              </span>
            </div>
            <label for="" class="form-row-col">
              <input
                type="password"
                class="form-input"
                disabled
                placeholder="*********"
              />
              <span class="hint-text">
                <a href="">برای تغییر رمز عبور کلیک کنید</a>
              </span>
            </label>
          </div>
          <div class="form-row">
            <label for="" class="form-row-col">
              <input
                type="email"
                class="form-input"
                v-model="email"
                placeholder="ایمیل"
              />
              <label for="" class="form-row-col">
                <input
                  v-if="referralCodeIsNull == null"
                  type="text"
                  class="form-input"
                  v-model="reffererCode"
                  placeholder="کد معرف"
                />
              </label>
            </label>
            <div class="form-row-col">
              <textarea
                name=""
                id=""
                cols="22"
                rows="0"
                v-model="aboutTeacher"
                placeholder="درباره مدرس"
                class="form-input form-textarea"
              >
              </textarea>
            </div>
          </div>
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
                :value="teacherName"
                placeholder="نام و نام خانوادگی"
                disabled
              />
            </label>
            <label for="" class="form-row-col">
              <input
                type="number"
                class="form-input"
                placeholder="شماره شبا"
                v-model="shebaNumber"
              />
              <label for="" class="cover-btn">IR</label>
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
              <input
                type="text"
                class="form-input"
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
                v-model="nationalCardNumber"
                placeholder="کد ملی"
                disabled
              />
              <!-- <label for="upload-melliCard-image" class="cover-btn">اهراز هویت</label> -->
            </label>
            <div class="form-row-col darken-color">
              <label for="upload-melliCard-image" class="separator pseudo-form-input">
                <input type="file" id="upload-melliCard-image" @change="uploadNCImg" />
                <span v-if="NCImageName == ''">بارگذاری تصویر کارت ملی</span>
                <span else>{{ NCImageName }}</span>
                <span>
                  <label for="upload-melliCard-image" class="cover-btn">انتخاب</label>
                </span>
              </label>
            </div>
          </div>
          <button class="form-btn success" @click.prevent="complateProfile">
            ثبت و نهایی کردن
          </button>
        </template>
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
              :boundary="{ width: 300, height: 300 }"
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
import skeleton from "@/components/skeleton-components/skeletonCreator";
export default {
  layout: "dashboardLay",
  middleware: "newMember",
  components: { skeleton },
  async mounted() {
    let [getProfData, getDocData, getdegre] = await Promise.all([
      this.$axios.get("/api/Teacher/TeacherProfile/CompleteProfile", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      }),
      this.$axios.get("/api/Teacher/TeacherDocument/Document", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      }),
      this.$axios.get("/api/Public/ProfileActions/GetDegreeEducations", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      }),
    ]);
    console.log(getProfData);
    if (
      getdegre.data.statusCode == 200 &&
      getDocData.data.statusCode == 200 &&
      getProfData.data.statusCode == 200
    ) {
      for (const n of getdegre.data.data) {
        this.degree.push({ title: n.title, id: n.id, imageNeed: n.isRequiredImage });
      }
      // document data
      this.referralCodeIsNull = getProfData.data.data.referralCode;
      this.teacherName = getDocData.data.data.teacherName;
      this.nationalCardNumber = getDocData.data.data.nationalCardNumber;
      getDocData.data.data.shebaNumber !== null
        ? (this.shebaNumber = getDocData.data.data.shebaNumber)
        : {};
      getDocData.data.data.cardNumber !== null
        ? (this.cardNumber = getDocData.data.data.cardNumber)
        : {};
      getDocData.data.data.address !== null
        ? (this.address = getDocData.data.data.address)
        : {};
      // profile data
      this.aboutTeacher = getProfData.data.data.description;
      this.phoneNumber = getProfData.data.data.phoneNumber;
      getProfData.data.data.email !== null
        ? (this.email = getProfData.data.data.email)
        : {};
      for (const n of this.degree) {
        if (getProfData.data.data.degreeEducationId === n.id) {
          this.drop = n.title;
          this.selectedDegree = n.id;
        }
      }
      this.loading = false;
    } else {
      this.$swal({
        text: "مشکلی رخ داده است!",
        icon: "danger",
        showCloseButton: true,
        confirmButtonText: "تلاش مجدد!",
      });
    }
  },
  data() {
    return {
      phoneNumber: "",
      teacherName: "",
      croppieImage: "",
      NCImageName: "",
      loading: true,
      cropped: "",
      degree: [],
      drop: "",
      selectedDegree: "2",
      email: "",
      shebaNumber: "",
      cardNumber: "",
      address: "",
      nationalCardNumber: "",
      selectedNTImage: "",
      profImageName: "",
      tempProfImage: "",
      aboutTeacher: "",
      selectedDegreGroup: {},
      dontNeedImage: [],
      needImage: [],
      reffererCode: "",
      referralCodeIsNull: "",
    };
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
      } else if (this.dontNeedImage.includes(id)) {
        for (var i = this.dontNeedImage.length - 1; i >= 0; i--) {
          if (this.dontNeedImage[i] == id) {
            this.dontNeedImage.splice(i, 1);
          }
        }
      } else if (this.needImage.includes(id)) {
        for (var i = this.needImage.length - 1; i >= 0; i--) {
          if (this.needImage[i] == id) {
            this.needImage.splice(i, 1);
          }
        }
      } else {
        if (imageNeed == true) {
          this.needImage.push(id);
          // this.selectedDegreGroup[id] = "";
        } else {
          this.dontNeedImage.push(id);
        }
      }
    },
    croppie(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.tempProfImage = e.target.files[0].name;
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
      this.profImageName = this.tempProfImage;
    },
    selectProfImg() {
      document.querySelector(".profModal").classList.toggle("show");
    },
    uploadNCImg(event) {
      this.NCImageName = event.target.files[0].name;
      const NTImg = event.target.files[0];
      this.createBase64Image(NTImg);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedNTImage = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },
    uploadDegreImg(event, i) {
      event.target.nextElementSibling.innerHTML = event.target.files[0].name;
      const NTImg = event.target.files[0];
      this.createBase64ImageDegre(NTImg, i);
    },
    createBase64ImageDegre(fileObject, i) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedDegreGroup[i] = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },
    degreName(id) {
      for (const i of this.degree) {
        if (i.id == id) {
          return i.title;
        }
      }
    },
    async complateProfile() {
      for (const i of this.dontNeedImage) {
        this.selectedDegreGroup[i] = "";
      }
      {
        let [profData, docData] = await Promise.all([
          this.$axios.post(
            "/api/Teacher/TeacherProfile/CompleteProfile",
            {
              selectedEducations: this.selectedDegreGroup,
              referralCode: this.reffererCode,
              profileImageBase64: this.cropped,
              email: this.email,
              description: this.aboutTeacher,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          ),
          this.$axios.post(
            "/api/Teacher/TeacherDocument/Document",
            {
              shebaNumber: String(this.shebaNumber),
              cardNumber: String(this.cardNumber),
              address: String(this.address),
              nationalCardImageBase64: String(this.selectedNTImage),
            },
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          ),
        ]);
        if (profData.data.statusCode == 200 && docData.data.statusCode == 200) {
          this.$swal({
            text: "تغییرات ثبت شد.منتظر تایید ادمین ها بمانید",
            icon: "success",
            showCloseButton: true,
            confirmButtonText: "تایید",
          });
        } else if (
          profData.data.statusCode == 400 &&
          profData.data.message == "ReferralCodeNotFound"
        ) {
          this.$swal({
            text: "کد معرف اشتباه می باشد",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "تایید",
          });
        }
      }
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
<style lang="scss">
@import "@/assets/styles/swal-style.scss";
</style>
