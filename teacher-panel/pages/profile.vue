<template>
  <div>
    <div class="panel-teacher-content-item profile-info">
      <header>
        <p class="section-header">
          <skeleton
            v-if="loading"
            class="skeleton"
            width="85px"
            height="30px"
            borderRadius="5px"
          />
          <span v-else> اطلاعات پروفایل </span>
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
            height="35px"
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
            <label for="" class="form-row-col">
              <input
                type="tell"
                class="form-input"
                :value="profData.phoneNumber"
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
                    :class="selectedDegreGroups.includes(option.id) ? 'selected' : ''"
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
                <input type="file" id="upload-profile-image--profile-info" />
                <span v-if="profImageName == ''">بارگذاری تصویر پروفایل</span>
                <span v-else>{{ profImageName }}</span>

                <span>
                  <label for="upload-file-croppie" class="cover-btn">انتخاب</label>
                  <!-- <label
                    data-related-file="upload-profile-image--profile-info"
                    class="cover-btn"
                    @click="selectProfImg"
                    >انتخاب</label
                  > -->
                </span>
              </label>

              <span class="hint-text">
                <a href="" type="button" @click.prevent="showProfHelp"> راهنمای انتخاب عکس پروفایل </a>
              </span>
            </div>
            <label for="" class="form-row-col">
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
            </label>
          </div>
          <div class="form-row">
            <label for="" class="form-row-col">
              <input
                type="email"
                class="form-input"
                v-model="profData.email"
                placeholder="ایمیل"
              />
            </label>
            <div class="form-row-col"></div>
          </div>
          <div class="form-row">
            <label for="" class="form-row-col">
              <span>
                <nuxt-link to="/change-password">برای تغییر رمز عبور کلیک کنید</nuxt-link>
              </span>
            </label>
            <div class="form-row-col"></div>
          </div>
          <button class="form-btn success" @click.prevent="editProf">ویرایش</button>
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
import skeleton from "@/components/skeleton-components/skeletonCreator";
import dropdownInp from "@/components/dropdown-inp";
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  components: { dropdownInp, skeleton },
  data() {
    return {
      cropped: null,
      croppieImage: "",
      profImageName: "",
      degree: [],
      drop: "",
      selectedDegree: "",
      profData: {
        email: "",
        phoneNumber: "",
      },
      aboutTeacher: "",
      loading: true,
      selectedDegreGroup: {},
      needImage: [],
      dontNeedImage: [],
      selectedDegreGroups: "",
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
      this.degree.push({ title: n.title, id: n.id, imageNeed: n.isRequiredImage });
    }
    const profData = await this.$axios.get("/api/Teacher/TeacherProfile/Profile", {
      headers: {
        Authorization: `Bearer ${this.$cookies.get("key")}`,
      },
    });
    // console.log(profData);
    if (profData.data.statusCode == 200) {
      this.selectedDegreGroups = profData.data.data.selectedEducations;

      this.aboutTeacher = profData.data.data.description;
      this.profData.degreeEducationId = profData.data.data.degreeEducationId;
      this.profData.email = profData.data.data.email;
      this.profData.phoneNumber = profData.data.data.phoneNumber;

      this.loading = false;
    }
  },
  mounted() {},
  methods: {
    showProfHelp() {
      this.$swal({
        text:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد",
        showCloseButton: true,
        showConfirmButton: false,
      });
    },
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
    degreName(id) {
      for (const i of this.degree) {
        if (i.id == id) {
          return i.title;
        }
      }
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
    croppie(e) {
      var files = e.target.files || e.dataTransfer.files;
      this.profImageName = e.target.files[0].name;
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

    async editProf() {
      for (const i of this.dontNeedImage) {
        this.selectedDegreGroup[i] = "";
      }
      const editProfResponse = await this.$axios.post(
        "/api/Teacher/TeacherProfile/Profile",
        {
          selectedEducations: this.selectedDegreGroup,
          degreeEducationId: this.selectedDegree,
          profileImageBase64: this.cropped,
          email: this.profData.email,
          description: this.aboutTeacher,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        editProfResponse.data.statusCode == 200 &&
        editProfResponse.data.message == "Success"
      ) {
        this.$swal({
          text: "تغییرات ثبت شد.منتظر تایید ادمین ها بمانید",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
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
