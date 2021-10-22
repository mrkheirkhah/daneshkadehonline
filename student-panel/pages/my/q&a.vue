<template>
  <div class="panel-student-content-item question-answer">
    <header>
      <p class="section-header">پرسش و پاسخ</p>
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
      <p class="section-title-text">ایجاد پرسش</p>
    </div>
    <form action="">
      <div class="form-row">
        <div for="" class="form-row-col darken-color">
          <div class="separator pseudo-form-input">
            <input
              type="file"
              id="upload-file-for-question"
              @change="uploadAttchedImage"
            />
            <span v-if="uploadedFileName == ''">بارگذاری فایل ضمیمه</span>
            <span v-else>{{ uploadedFileName }}</span>
            <span>
              <label for="upload-file-for-question" class="cover-btn">انتخاب</label>
            </span>
          </div>
        </div>
        <label for="" class="form-row-col record-voice-box">
          <button
            type="button"
            class="record-btn endR"
            v-if="recordedVoice == ''"
            @mousedown="startRecord"
            @touchstart="startRecord"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12.593"
              height="19.9"
              viewBox="0 0 12.593 19.9"
            >
              <g transform="translate(0.2 0.2)">
                <g data-name="Group 9896" transform="translate(2.681)">
                  <g data-name="Group 9895">
                    <path
                      data-name="Path 722"
                      d="M169.723,0a3.42,3.42,0,0,0-3.416,3.416V10.13a3.416,3.416,0,0,0,6.832.023V3.416A3.42,3.42,0,0,0,169.723,0Zm1.992,10.153a1.993,1.993,0,0,1-3.985-.023V3.416a1.993,1.993,0,1,1,3.985,0Z"
                      transform="translate(-166.307)"
                      fill="#e13535"
                      stroke="#f8f8f9"
                      stroke-width="0.4"
                    />
                  </g>
                </g>
                <g data-name="Group 9898" transform="translate(5.385 15.586)">
                  <g data-name="Group 9897">
                    <rect
                      data-name="Rectangle 166"
                      width="1.423"
                      height="3.203"
                      fill="#e13535"
                      stroke="#f8f8f9"
                      stroke-width="0.4"
                    />
                  </g>
                </g>
                <g data-name="Group 9900" transform="translate(3.511 18.077)">
                  <g data-name="Group 9899">
                    <path
                      data-name="Path 723"
                      d="M192.567,474.628h-3.748a.712.712,0,0,0,0,1.423h3.748a.712.712,0,0,0,0-1.423Z"
                      transform="translate(-188.107 -474.628)"
                      fill="#e13535"
                      stroke="#f8f8f9"
                      stroke-width="0.4"
                    />
                  </g>
                </g>
                <g data-name="Group 9902" transform="translate(0 8.943)">
                  <g data-name="Group 9901">
                    <path
                      data-name="Path 724"
                      d="M107.4,234.822a.712.712,0,0,0-.712.712v.569a4.673,4.673,0,0,1-9.347,0v-.569a.712.712,0,1,0-1.423,0v.569a6.1,6.1,0,0,0,12.193,0v-.569A.712.712,0,0,0,107.4,234.822Z"
                      transform="translate(-95.922 -234.822)"
                      fill="#e13535"
                      stroke="#f8f8f9"
                      stroke-width="0.4"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </button>
          <div class="pseudo-form-input">
            <audio :src="recordedVoice" controls id="voicePlayer"></audio>
            <span class="voice-timer persian-number"
              >{{ mins < 10 ? "0" + mins : mins }}:{{
                secs < 10 ? "0" + secs : secs
              }}</span
            >
            <div class="btn-container">
              <button
                type="button"
                class="play-btn"
                @click="playAudio"
                v-if="recordedVoice != ''"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28.869"
                  height="33.423"
                  viewBox="0 0 28.869 33.423"
                >
                  <g data-name="Group 9921">
                    <path
                      data-name="Path 743"
                      d="M61.581,12.855,41.84.686a4.564,4.564,0,0,0-6.957,3.887V28.8a4.612,4.612,0,0,0,4.555,4.624h.02a4.581,4.581,0,0,0,2.366-.712,1.3,1.3,0,1,0-1.358-2.225,2,2,0,0,1-1.015.331A2.025,2.025,0,0,1,37.49,28.8V4.573a1.958,1.958,0,0,1,2.983-1.668L60.214,15.074a1.958,1.958,0,0,1-.009,3.34L45.932,27.152a1.3,1.3,0,1,0,1.361,2.223l14.271-8.738a4.564,4.564,0,0,0,.016-7.783Z"
                      transform="translate(-34.883 0)"
                      fill="#212121"
                    />
                  </g>
                </svg>
              </button>
              <button
                type="button"
                class="delete-btn"
                @click="
                  recordedVoice = '';
                  mins = 0;
                  secs = 0;
                  timerInterval = null;
                "
                v-if="recordedVoice != ''"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30.457"
                  height="37.5"
                  viewBox="0 0 30.457 37.5"
                >
                  <path
                    data-name="Path 739"
                    d="M223.276,154.7a.878.878,0,0,0-.878.878v16.6a.878.878,0,0,0,1.756,0v-16.6A.878.878,0,0,0,223.276,154.7Zm0,0"
                    transform="translate(-202.867 -141.117)"
                    fill="#e13535"
                  />
                  <path
                    data-name="Path 740"
                    d="M105.276,154.7a.878.878,0,0,0-.878.878v16.6a.878.878,0,0,0,1.756,0v-16.6A.878.878,0,0,0,105.276,154.7Zm0,0"
                    transform="translate(-95.229 -141.117)"
                    fill="#e13535"
                  />
                  <path
                    data-name="Path 741"
                    d="M2.491,11.162V32.8a4.845,4.845,0,0,0,1.288,3.342A4.325,4.325,0,0,0,6.917,37.5H23.533a4.324,4.324,0,0,0,3.138-1.357A4.845,4.845,0,0,0,27.959,32.8V11.162a3.355,3.355,0,0,0-.861-6.6H22.6v-1.1A3.45,3.45,0,0,0,19.124,0h-7.8A3.45,3.45,0,0,0,7.848,3.468v1.1h-4.5a3.355,3.355,0,0,0-.861,6.6ZM23.533,35.742H6.917A2.781,2.781,0,0,1,4.247,32.8V11.24H26.2V32.8a2.781,2.781,0,0,1-2.67,2.942ZM9.6,3.468a1.692,1.692,0,0,1,1.721-1.713h7.8a1.692,1.692,0,0,1,1.721,1.713v1.1H9.6ZM3.352,6.322H27.1a1.581,1.581,0,0,1,0,3.162H3.352a1.581,1.581,0,1,1,0-3.162Zm0,0"
                    transform="translate(0.003 0.002)"
                    fill="#e13535"
                  />
                  <path
                    data-name="Path 742"
                    d="M164.276,154.7a.878.878,0,0,0-.878.878v16.6a.878.878,0,0,0,1.756,0v-16.6A.878.878,0,0,0,164.276,154.7Zm0,0"
                    transform="translate(-149.048 -141.117)"
                    fill="#e13535"
                  />
                </svg>
              </button>
            </div>
          </div>
        </label>
      </div>
      <div class="form-row">
        <label for="" class="form-row-col floated-list-container">
          <input
            type="text"
            readonly
            placeholder="انتخاب دوره"
            @click="toggleDropdown"
            :value="courseDrop"
            class="form-input"
          />
          <ul class="floated-list custom-scrollbar">
            <li
              @click="selectDropDown($event, course.courseId)"
              v-for="course in myCourses"
              :key="course.courseId"
              v-if="course.isInCourse.item1 == 1"
            >
              {{ course.courseName }}
            </li>
          </ul>
        </label>
        <!-- <label for="" class="form-row-col"> 
          <input
            type="text"
            list="select-relavant-course-question"
            class="form-input"
            placeholder="انتخاب دوره"
          />
          <datalist id="select-relavant-course-question">
            <option value="دوره اول" />
            <option value="دوره دوم" />
            <option value="دوره سوم" />
          </datalist>
        </label> -->
        <label class="form-row-col"> </label>
      </div>
      <div class="form-row">
        <div class="form-row-col">
          <textarea
            class="form-textarea large-height form-input"
            placeholder="توضیحات دوره"
            v-model="questionText"
          ></textarea>
        </div>
      </div>
      <button class="form-btn" @click.prevent="sendQuestion">ارسال سوال</button>
    </form>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  middleware: "userIsNotLog",
  data() {
    return {
      courseDrop: "",
      recordedVoice: "",
      selectedAttachImage: "",
      uploadedFileName: "",
      questionText: "",
      myCourses: "",
      questionToCourse: "",
      secs: 0,
      mins: 0,
      timerInterval: null,
    };
  },
  mounted() {
    this.getCourses();
    // this.$router.push("/my/coming-soon");
  },
  methods: {
    resetData() {
      this.courseDrop = "";
      this.recordedVoice = "";
      this.selectedAttachImage = "";
      this.uploadedFileName = "";
      this.questionText = "";
      this.myCourses = "";
      this.questionToCourse = "";
      this.timerInterval = null;
      this.mins = 0;
      this.secs = 0;
    },
    async getCourses() {
      const myCourses = await this.$axios.get("/api/Student/StudentCourse/GetCourses", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      this.myCourses = myCourses.data.data;
    },
    async sendQuestion() {
      if (this.questionToCourse == "") {
        this.$swal({
          text: "دوره ی مورد نظر را انتخاب کنید",
          icon: "error",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
      } else if (this.questionText == "") {
        this.$swal({
          text: "متن سوال خالی است",
          icon: "error",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
      } else {
        let formData = new FormData();
        formData.append("courseId", this.questionToCourse);
        formData.append("text", this.questionText);
        formData.append("attachImage", this.selectedAttachImage);
        formData.append("audioFileBase64", this.recordedVoice);
        const questionSendResp = await this.$axios.post(
          `/api/Student/StudentQuestion/SendNewQuestion`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (
          questionSendResp.data.statusCode == 200 &&
          questionSendResp.data.message == "Success"
        ) {
          this.$swal({
            text: "سوال شما ثبت شد.لطفا منتظر تایید و پاسخ مدرس باشید",
            icon: "success",
            showCloseButton: true,
            confirmButtonText: "تایید",
          });
          this.resetData();
        }
      }
    },
    toggleDropdown() {
      document.querySelector(".floated-list-container").classList.toggle("show");
    },
    selectDropDown(event, id) {
      this.courseDrop = event.target.innerHTML.trim();
      this.questionToCourse = id;
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    uploadAttchedImage(event) {
      try {
        this.selectedAttachImage = event.target.files[0];
        this.uploadedFileName = event.target.files[0].name;
      } catch {}
      // this.createBase64Image(attachedImg);
    },
    // createBase64Image(fileObject) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     this.selectedAttachImage = e.target.result;
    //   };
    //   reader.readAsDataURL(fileObject);
    // },
    async playAudio() {
      const player = document.getElementById("voicePlayer");
      // player.addEventListener("loadedmetadata", function () {
      //   alert(player.duration);
      // });
      player.play();
    },
    startRecord() {
      this.timerInterval = setInterval(() => {
        this.secs = this.secs + 1;
        if (this.secs == 60) {
          this.mins = this.mins + 1;
        }
      }, 1000);
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        const audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", (event) => {
          audioChunks.push(event.data);
        });
        document.addEventListener("mouseup", () => {
          clearInterval(this.timerInterval);
          mediaRecorder.stop();
          stream
            .getTracks() // get all tracks from the MediaStream
            .forEach((track) => track.stop());
        });
        document.addEventListener("touchend", () => {
          clearInterval(this.timerInterval);
          mediaRecorder.stop();
          stream
            .getTracks() // get all tracks from the MediaStream
            .forEach((track) => track.stop());
        });
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          this.createDownloadLink(audioBlob);
        });
      });
    },
    createDownloadLink(blob) {
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        let base64 = reader.result;
        base64 = base64.replace("application/octet-stream;", "audio/mp3;");
        this.recordedVoice = base64;
      };
    },
  },
};
</script>
<style lang="scss">
// @import "@/assets/styles/stu-panel.scss";
@import "@/assets/swal-style.scss";
</style>
