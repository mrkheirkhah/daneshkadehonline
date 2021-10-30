<template>
  <div class="panel-teacher-content-item my-courses">
    <div class="adding-course">
      <header>
        <p class="section-header">
          <!-- <skeleton
            v-if="loading"
            class="skeleton"
            width="85px"
            height="30px"
            borderRadius="5px"
          /> -->
          <span> افزودن قسمت ها </span>
        </p>
      </header>
      <form>
        <div class="form-row">
          <div for="" class="form-row-col darken-color">
            <div class="separator pseudo-form-input">
              <input
                type="file"
                id="upload-course-parts"
                @change="uploadPart"
                accept="video/*"
              />
              <span v-if="episodeName == ''">بارگذاری قسمت های دوره</span>
              <span v-else>{{ episodeName }}</span>

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
              class="form-input persian-number"
              placeholder=" تایم ویدیو (مثال: 2:12:58)"
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
                  src="@/static/panel-teacher-icons/check-mark.svg"
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
          <button class="form-btn success" v-if="edit" @click.prevent="submitEditEpisode">
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
</template>
<script>
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  head() {
    return {
      title: "افزودن قسمت ها",
    };
  },
  data() {
    return {
      videoTime: "",
      videoTitle: "",
      isFree: false,
      uploadedPart: "",

      videos: [],
      edit: false,
      episodId: "",
      episodeName: "",
      uploadPercentage: "",
    };
  },
  methods: {
    uploadPart(event) {
      this.episodeName = event.target.files[0].name;
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedPart = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },
    async uploadVideo() {
      var formData = new FormData();
      var imagefile = document.querySelector("#upload-course-parts");
      if (imagefile.files[0].type != "video/mp4") {
        this.$swal({
          text: "لطفا ویدیو با فرمت mp4 انتخاب کنید!",
          icon: "error",
          showCloseButton: true,
          confirmButtonText: "ادامه",
        });
        this.episodeName = "";
      } else {
        if (this.videoTitle == "" || this.videoTime == "" || this.episodeName == "") {
          this.$swal({
            text: "اطلاعات ناقص است",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "ادامه",
          });
        } else {
          formData.append("courseId", this.$route.params.id);
          formData.append("EpisodeTitle", this.videoTitle);
          formData.append("EpisodeTime", this.videoTime);
          formData.append("EpisodeVideo", imagefile.files[0]);
          formData.append("IsFree", this.isFree);
          const uploadResponse = await this.$axios.post(
            "/api/Teacher/TeacherCourse/AddCourseEpisode",
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
            uploadResponse.data.statusCode == 200 &&
            uploadResponse.data.message == "Success"
          ) {
            this.$swal({
              text: "آپلود شد!",
              icon: "success",
              showCloseButton: true,
              confirmButtonText: "ادامه",
            }).then(() => {
              this.episodId = "";
              this.videoTitle = "";
              this.videoTime = "";
              this.uploadedPart = "";
              this.episodeName = "";
              this.isFree = false;
              this.uploadPercentage = "";
              this.getVideos();
            });
          } else if (uploadResponse.data.statusCode == 400) {
            this.$swal({
              text: "اطلاعات وارد شده صحیح نیست",
              icon: "error",
              showCloseButton: true,
              confirmButtonText: "ادامه",
            });
          }
        }
      }
    },
    async getVideos() {
      const videos = await this.$axios.get(
        "/api/Teacher/TeacherCourse/GetCourseEpisodes/" + this.$route.params.id,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      // console.log(videos);
      this.videos = videos.data.data;
    },
    async editEpisode(id) {
      const episodeDetails = await this.$axios.get(
        `/api/Teacher/TeacherCourse/GetEpisodeById/${id}`,
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
      if (imagefile.files[0].type != "video/mp4") {
        this.$swal({
          text: "لطفا ویدیو با فرمت mp4 انتخاب کنید!",
          icon: "error",
          showCloseButton: true,
          confirmButtonText: "ادامه",
        });
        this.episodeName = "";
      } else {
        if (this.videoTitle == "" || this.videoTime == "") {
          this.$swal({
            text: "اطلاعات ناقص است",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "ادامه",
          });
        } else {
          formData.append("episodeId", this.episodId);
          formData.append("EpisodeTitle", this.videoTitle);
          formData.append("EpisodeTime", this.videoTime);
          formData.append("EpisodeVideo", imagefile.files[0]);
          formData.append("IsFree", this.isFree);
          const editEpisodeResponse = await this.$axios.post(
            `/api/Teacher/TeacherCourse/EditCourseEpisode`,
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
              this.videoTitle = "";
              this.videoTime = "";
              this.uploadedPart = "";
              this.uploadPercentage = "";
              this.edit = false;
              this.isFree = false;
            });
          } else if (editEpisodeResponse.data.statusCode == 400) {
            this.$swal({
              text: "اطلاعات وارد شده صحیح نیست",
              icon: "error",
              showCloseButton: true,
              confirmButtonText: "ادامه",
            });
          }
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
            `/api/Teacher/TeacherCourse/RemoveCourseEpisode/${id}`,
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
      this.$router.push("/my-courses");
    } else {
      this.getVideos();
    }
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/swal-style.scss";
</style>
