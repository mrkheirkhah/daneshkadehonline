<template>
  <div>
    <div class="panel-admin-content-item complete-profile">
      <header>
        <p class="section-header">افزودن ویزیتور</p>
      </header>
      <form action="">
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
              type="tell"
              class="form-input"
              v-model="phoneNumber"
              placeholder="شماره موبایل"
            />
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
              <a href="" type="button" @click.prevent="showProfHelp">
                راهنمای انتخاب عکس پروفایل
              </a>
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
            </div>
          </div>

          <label for="" class="form-row-col">
            <input
              type="number"
              class="form-input"
              placeholder="کد ملی"
              v-model="nationalCardNumber"
            />
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              placeholder="شماره کارت"
              v-model="cardNumber"
            />
          </label>
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              v-model="shebaNumber"
              placeholder="شماره شبا"
            />
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              placeholder="کمیسیون"
              v-model="commision"
            />
          </label>
          <label for="" class="form-row-col"> </label>
        </div>
        <button class="form-btn success" @click.prevent="addVisitor">
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
    <div class="panel-admin-content-item">
      <div class="panel-table teachers-list">
        <div class="box-header">
          <h3>
            <!-- <skeleton
              v-if="loading"
              class="skeleton"
              width="95px"
              height="30px"
              borderRadius="5px"
            /> -->
            <template> لیست ویزیتور ها </template>
          </h3>
          <form action="">
            <!-- <skeleton
              v-if="loading"
              class="skeleton"
              width="130px"
              height="30px"
              borderRadius="5px"
            />
            <skeleton
              v-if="loading"
              class="skeleton"
              width="40px"
              height="30px"
              borderRadius="5px"
            /> -->
            <!-- <template>
              <div class="filter floated-list-container">
                <input type="text" readonly v-model="filterBy" @click="toggleDropdown" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10.969"
                  height="6.03"
                  viewBox="0 0 10.969 6.03"
                >
                  <g transform="translate(10.719 0.25) rotate(90)">
                    <path
                      data-name="Path 88161"
                      d="M5.445,5.026.506.087A.3.3,0,1,0,.087.506L4.815,5.234.087,9.962a.3.3,0,0,0,0,.419.3.3,0,0,0,.208.088A.289.289,0,0,0,.5,10.381L5.442,5.442A.3.3,0,0,0,5.445,5.026Z"
                      fill="#4a4a4a"
                      stroke="#4a4a4a"
                      stroke-width="0.5"
                    />
                  </g>
                </svg>
                <ul class="floated-list">
                  <li @click="setFilter($event, 0)">همه</li>
                  <li @click="setFilter($event, 1)">تائید شده</li>
                  <li @click="setFilter($event, 2)">تائید نشده</li>
                  <li @click="setFilter($event, 3)">مسدود شده</li>
                  <li @click="setFilter($event, 4)">مسدود نشده</li>
                  <li @click="setFilter($event, 5)">حذف شده</li>
                </ul>
              </div>
              <label for="teachers-search-btn" class="search-box" tabindex="0">
                <input
                  type="search"
                  placeholder="جستجو کنید"
                  class="search-btn"
                  id="teachers-search-btn"
                  ref="searchInput"
                />
                <img
                  src="@/static/icons/search-icon-orange.png"
                  alt="آیکون سرچ"
                  @click="searchEvent"
                />
              </label>
            </template> -->
          </form>
        </div>
        <section class="box-content custom-scrollbar" id="visitors-table">
          <header class="table-row table-header">
            <!-- <template v-if="loading">
              <span v-for="i in 7" :key="i">
                <skeleton
                  class="skeleton"
                  width="35px"
                  height="20px"
                  borderRadius="5px"
                />
              </span>
            </template> -->
            <template>
              <span>نام ویزیتور</span>
              <span>شماره موبایل</span>
              <span>کد ملی</span>
              <span>انسداد</span>
              <span>کد معرف</span>
              <span>پروفایل</span>
              <span>حذف ویزیتور</span>
              <span>لینک</span>
              <span>ویرایش</span>
            </template>
          </header>
          <!-- <template v-if="loading">
            <div class="table-row" v-for="i in 6" :key="i.index">
              <span v-for="j in 7" :key="j">
                <skeleton
                  class="skeleton"
                  width="35px"
                  height="20px"
                  borderRadius="5px"
                />
              </span>
            </div>
          </template> -->
          <template>
            <div class="table-row" v-for="visitor in visitors" :key="visitor.index">
              <span class="name">{{ visitor.visitorName }}</span>

              <span class="persian-number">{{ visitor.phoneNumber }}</span>
              <span class="persian-number">{{ visitor.nationalCardNumber }}</span>
              <span class="persian-number">
                <button
                  class="ban"
                  v-if="visitor.isBlock == false"
                  @click.prevent="banVisitor(visitor.visitorId, 'true')"
                >
                  مسدود کردن
                </button>
                <button
                  class="ban"
                  v-if="visitor.isBlock == true"
                  @click.prevent="banVisitor(visitor.visitorId, 'false')"
                >
                  رفع مسدودیت
                </button>
              </span>
              <span class="persian-number">
                {{ visitor.referralLink }}
              </span>
              <span class="persian-number">
                <button
                  class="view"
                  @click.prevent="seeVisitorProfile(visitor.visitorId)"
                >
                  مشاهده
                </button>
              </span>
              <span>
                <button class="view" @click="deleteVisitor(visitor.visitorId, 'true')">
                  حذف
                </button>
              </span>
              <span>
                {{ visitor.pageLink }}
              </span>
              <span>
                <button class="view" @click="editVisitor(visitor.visitorId)">
                  ویرایش
                </button>
              </span>
            </div>

            <footer class="table-footer">
              <hr />
              <a href="" type="button" @click.prevent="seeAll"> مشاهده همه </a>
            </footer>
          </template>
        </section>
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
      croppieImage: "",
      cropped: "",
      phoneNumber: "",
      profImageFile: undefined,
      fullName: "",
      nationalCardNumber: "",
      visitors: "",
      filterBy: "",
      submitType: "add",
      cardNumber: "",
      shebaNumber: "",
      commision: "",
      profImageName: "",
      profileType:''
    };
  },
  async beforeMount() {
    this.getVisitors();
  },
  methods: {
    showProfHelp() {
      this.$swal({
        text:
          "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد",
        showCloseButton: true,
        showConfirmButton: false,
      });
    },
    async getVisitors() {
      const visitors = await this.$axios.get(
        "/api/Admin/AdminManageVisitor/GetVisitors",
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      this.visitors = visitors.data.data;
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
      // Options can be updated.
      // Current option will return a base64 version of the uploaded image with a size of 600px X 450px.
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
    selectProfImg() {
      document.querySelector(".profModal").classList.toggle("show");
    },
    async addVisitor() {
      if (this.cropped != "") {
        this.profImageFile = new File([this.cropped], this.profImageName, {
          type: this.profileType,
        });
        // console.log(this.profImageFile);
      }
      if (
        this.phoneNumber != "" &&
        this.fullName != "" &&
        this.nationalCardNumber != ""
      ) {
        if (this.submitType == "add") {
          let formData = new FormData();
          formData.append("VisitorName", this.fullName);
          formData.append("PhoneNumber", this.phoneNumber);
          formData.append("ProfileImage", this.profImageFile);
          formData.append("NationalCardNumber", this.nationalCardNumber);
          formData.append("CardNumber", this.cardNumber);
          formData.append("ShebaNumber", this.shebaNumber);
          formData.append("Commission", this.commision);
          for (var value of formData.values()) {
            console.log(value);
          }
          const addVisitorResp = await this.$axios.post(
            "/api/Admin/AdminManageVisitor/Visitor",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (
            addVisitorResp.data.statusCode == 200 &&
            addVisitorResp.data.message == "Success"
          ) {
            this.$swal({
              text: "ثبت شد",
              icon: "success",
              showCloseButton: true,
              confirmButtonText: "تایید",
            }).then(() => {
              this.getVisitors();
              this.resetData();
            });
          }
        } else if (this.submitType == "edit") {
          let formData = new FormData();
          formData.append("VisitorName", this.fullName);
          formData.append("PhoneNumber", this.phoneNumber);
          formData.append("ProfileImage", this.cropped);
          formData.append("NationalCardNumber", this.nationalCardNumber);
          formData.append("CardNumber", this.cardNumber);
          formData.append("ShebaNumber", this.shebaNumber);
          formData.append("Commission", this.commision);
          const editVisitorResp = await this.$axios.put(
            `/api/Admin/AdminManageVisitor/Visitor?visitorId=${this.editThisId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (
            editVisitorResp.data.statusCode == 200 &&
            editVisitorResp.data.message == "Success"
          ) {
            this.$swal({
              text: "ویرایش شد",
              icon: "success",
              showCloseButton: true,
              confirmButtonText: "تایید",
            }).then(() => {
              this.getVisitors();
              this.resetData();
            });
          }
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
    resetData() {
      this.croppieImage = "";
      this.cropped = "";
      this.phoneNumber = "";
      this.fullName = "";
      this.nationalCardNumber = "";
      this.visitors = "";
      this.filterBy = "";
      this.submitType = "add";
      this.shebaNumber = "";
      this.cardNumber = "";
      this.commision = "";
    },
    async banVisitor(id, status) {
      const banResp = await this.$axios.get(
        `/api/Admin/AdminManageVisitor/ChangeVisitorBlock/${id}/${status}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (banResp.data.statusCode == 200 && banResp.data.message == "Success") {
        this.$swal({
          text: "انجام شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        }).then(() => {
          this.getVisitors();
        });
      }
    },
    seeAll() {
      const table = document.getElementById("visitors-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer").style.display = "none");
    },
    async deleteVisitor(id, status) {
      this.$swal({
        text: "از حذف خبر اطمینان دارید؟",
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "بله",
        cancelButtonText: "خیر",
      }).then(async (clickedBut) => {
        if (clickedBut.isConfirmed) {
          const deleteResp = await this.$axios.delete(
            `/api/Admin/AdminManageVisitor/ChangeVisitorDelete/${id}/${status}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (deleteResp.data.statusCode == 200 && deleteResp.data.message == "Success") {
            this.$swal({
              text: "انجام شد",
              icon: "success",
              showCloseButton: true,
              confirmButtonText: "تایید",
            }).then(() => {
              this.getVisitors();
            });
          }
        }
      });
    },
    async editVisitor(id) {
      const editDetails = await this.$axios.get(
        `/api/Admin/AdminManageVisitor/GetVisitorForShow/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (editDetails.data.statusCode == 200 && editDetails.data.message == "Success") {
        this.submitType = "edit";
        this.editThisId = id;
        this.nationalCardNumber = editDetails.data.data.nationalCardNumber;
        this.fullName = editDetails.data.data.visitorName;
        this.phoneNumber = editDetails.data.data.phoneNumber;
        this.commision = editDetails.data.data.commission;
        this.shebaNumber = editDetails.data.data.shebaNumber;
        this.cardNumber = editDetails.data.data.cardNumber;
      }
    },
    seeVisitorProfile(id) {
      this.$router.push("/visitor-options/" + id);
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
