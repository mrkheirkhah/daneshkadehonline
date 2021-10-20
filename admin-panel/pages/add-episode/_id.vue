<template>
  <div>
    <div class="panel-admin-content-item add-course">
      <div class="adding-course">
        <header>
          <p class="section-header">افزودن قسمت های دوره</p>
        </header>
        <form>
          <div class="form-row">
            <div for="" class="form-row-col darken-color">
              <div class="separator pseudo-form-input">
                <input type="file" id="upload-course-parts" @change="uploadPart" />
                <span v-if="videoPartName == ''">بارگذاری قسمت های دوره</span>
                <span v-else>{{ videoPartName }}</span>
                <span>
                  <label for="upload-course-parts" class="cover-btn">انتخاب</label>
                </span>
              </div>
              <span class="hint-text" v-if="uploadPercentage > 0">
                در حال آپلود : {{ uploadPercentage }} درصد (لطفا منتظر بمانید)
              </span>
            </div>
            <label for="" class="form-row-col">
              <input
                type="text"
                class="form-input"
                placeholder=" تایم ویدیو به ساعت"
                v-model="videoTime"
              />
            </label>
          </div>
          <div class="form-row">
            <div for="" class="form-row-col darken-color">
              <input
                type="text"
                class="form-input"
                placeholder="عنوان قسمت"
                v-model="videoTitle"
              />
            </div>
            <label class="form-row-col guide-section">
              <label for="part-2-to-free" class="checkbox-label">
                <span class="checkbox-container">
                  <input
                    type="checkbox"
                    name=""
                    class="form-checkbox"
                    id="part-2-to-free"
                    v-model="isFree"
                  />
                  <img
                    src="@/static/icons/check-mark.svg"
                    class="check-mark"
                    alt="check-icon"
                  />
                </span>
                انتخاب بعنوان قسمت رایگان
              </label>
            </label>
            <button class="form-btn success" v-if="!edit" @click.prevent="uploadVideo">
              ثبت قسمت
            </button>
            <button
              class="form-btn success"
              v-if="edit"
              @click.prevent="submitEditEpisode"
            >
              ویرایش قسمت
            </button>
          </div>
          <hr />
          <div class="course-parts-container custom-scrollbar">
            <div class="form-row" v-for="video in videos" :key="video.id">
              <div class="form-row-col">
                <div class="separator pseudo-form-input">
                  <span>{{ video.episodeTitle }}</span>
                  <span>
                    <button
                      class="cover-btn delete"
                      type="button"
                      @click.prevent="removeEpisode(video.id)"
                    >
                      حذف
                    </button>
                    <button class="cover-btn" type="button">مشاهده</button>
                    <button
                      class="cover-btn"
                      type="button"
                      @click.prevent="editEpisode(video.id)"
                    >
                      ویرایش
                    </button>
                  </span>
                </div>
              </div>
              <label for="" class="form-row-col guide-section">
                <span class="guide-text gray" v-if="video.isFree">رایگان</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="basic-modal show-image">
      <div class="content-box">
        <header>
          <div class="empty"></div>
          <h2 class="title">عکس پروفایل</h2>
          <button type="button" class="close-btn">&times;</button>
        </header>
        <form action="#" class="image profile">
          <img :src="'data:image/png;base64,'" title="عکس پروفایل" alt="عکس معلم" />
        </form>
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
      videoTime: "",
      videoTitle: "",
      isFree: false,
      uploadedPart: "",

      videos: [],
      edit: false,
      episodId: "",
      uploadPercentage: "",
      videoPartName: "",
    };
  },
  methods: {
    uploadPart(event) {
      this.videoPartName = event.target.files[0].name;
      // this.createBase64Image(videoPart);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedPart = e.target.result;
        // console.log(e.target.result);
      };
      reader.readAsDataURL(fileObject);
    },
    async uploadVideo() {
      let formData = new FormData();
      const imagefile = document.querySelector("#upload-course-parts");

      if (this.videoTitle == "" || this.videoTime == "" || this.videoPartName == "") {
        this.$swal({
          text: "اطلاعات ناقص است",
          icon: "error",
          showCloseButton: true,
          confirmButtonText: "ادامه",
        });
      } else {
        formData.append("CourseId", this.$route.params.id);
        formData.append("EpisodeTitle", this.videoTitle);
        formData.append("EpisodeTime", this.videoTime);
        formData.append("EpisodeVideo", imagefile.files[0]);
        formData.append("IsFree", this.isFree);

        const uploadResponse = await this.$axios.post(
          "/api/Admin/AdminCourse/AddCourseEpisode",
          formData,
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: function (progressEvent) {
              this.uploadPercentage = parseInt(
                Math.round((progressEvent.loaded / progressEvent.total) * 100)
              );
            }.bind(this),
          }
        );
        if (
          uploadResponse.data.statusCode == 200 &&
          uploadResponse.data.message == "Success"
        ) {
          this.$swal({
            text: "آپلود شد!",
            icon: "success",
            showCloseButton: true,
            confirmButtonText: "ادامه",
          }).then(() => {
            this.getVideos();
            this.videoPartName = "";
            this.episodId = "";
            this.videoTitle = "";
            this.videoTime = "";
            this.uploadedPart = "";
            this.uploadPercentage = "";
            this.isFree = false;
          });
        }
      }
    },
    async getVideos() {
      const videos = await this.$axios.get(
        "/api/Admin/AdminCourse/GetCourseEpisodes/" + this.$route.params.id,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      console.log(videos);
      this.videos = videos.data.data;
    },
    async editEpisode(id) {
      const episodeDetails = await this.$axios.get(
        `/api/Admin/AdminCourse/GetEpisodeById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      // console.log(episodeDetails);
      this.videoTime = episodeDetails.data.data.episodeTime;
      this.videoTitle = episodeDetails.data.data.episodeTitle;
      this.isFree = episodeDetails.data.data.isFree;
      this.episodId = episodeDetails.data.data.id;
      this.edit = true;
    },
    async submitEditEpisode() {
      var formData = new FormData();
      var imagefile = document.querySelector("#upload-course-parts");
      if (this.videoTitle == "" || this.videoTime == "") {
        this.$swal({
          text: "اطلاعات ناقص است",
          icon: "error",
          showCloseButton: true,
          confirmButtonText: "ادامه",
        });
      } else {
        formData.append("EpisodeId", this.episodId);
        formData.append("EpisodeTitle", this.videoTitle);
        formData.append("EpisodeTime", this.videoTime);
        formData.append("EpisodeVideo", imagefile.files[0]);
        formData.append("IsFree", this.isFree);
        const editEpisodeResponse = await this.$axios.post(
          `/api/Admin/AdminCourse/EditCourseEpisode`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
            onUploadProgress: function (progressEvent) {
              this.uploadPercentage = parseInt(
                Math.round((progressEvent.loaded / progressEvent.total) * 100)
              );
            }.bind(this),
          }
        );
        if (
          editEpisodeResponse.data.statusCode == 200 &&
          editEpisodeResponse.data.message == "Success"
        ) {
          this.$swal({
            text: "آپلود شد!",
            icon: "success",
            showCloseButton: true,
            confirmButtonText: "ادامه",
          }).then(() => {
            this.getVideos();
            this.episodId = "";
            this.videoPartName = "";
            this.videoTitle = "";
            this.videoTime = "";
            this.uploadedPart = "";
            this.uploadPercentage = "";
            this.isFree = false;
            this.edit = false;
          });
        } else {
          this.$swal({
            text: "مشکلی رخ داده است!لطفا بعدا دوباره تلاش کنید",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "ادامه",
          });
        }
      }
    },
    async removeEpisode(id) {
      this.$swal({
        text: "از حذف کردن این قسمت اطمینان دارید؟",
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "بله",
        cancelButtonText: "خیر",
      }).then(async (clickedBut) => {
        if (clickedBut.isConfirmed) {
          const deleteEpisodeResponse = await this.$axios.get(
            `/api/Admin/AdminCourse/RemoveCourseEpisode/${id}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (
            deleteEpisodeResponse.data.statusCode == 200 &&
            deleteEpisodeResponse.data.message == "Success"
          ) {
            this.$swal({
              text: "با موفقیت انجام شد",
              icon: "success",
              showCloseButton: true,
              confirmButtonText: "بستن",
            });
            this.getVideos();
          } else {
            this.$swal({
              text: "مشکلی رخ داده است!لطفا بعدا دوباره تلاش کنید",
              icon: "error",
              showCloseButton: true,
              confirmButtonText: "ادامه",
            });
          }
        } else {
        }
      });
    },
  },
  async mounted() {
    if (this.$route.params.id == undefined) {
      this.$router.push("/courses-list");
    } else {
      this.getVideos();
    }
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
