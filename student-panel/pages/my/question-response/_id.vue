<template>
  <div class="panel-student-content-item question-answer continue-question">
    <header>
      <p class="section-header">پرسش و پاسخ</p>
    </header>
    <div class="teacher-answer-box" v-for="answer in answers" :key="answer.questionId">
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
        <h5 class="title section-title-text" v-if="answer.sendBy == 'Teacher'">
          پاسخ مدرس
        </h5>
        <h5 class="title section-title-text" v-if="answer.sendBy == 'Student'">
          پاسخ شما
        </h5>
        <h5 class="title section-title-text" v-if="answer.sendBy == 'Admin'">
          پاسخ ادمین
        </h5>
      </div>
      <p class="message custom-scrollbar">{{ answer.text }}</p>
      <footer>
        <!--this footer use voice-info component here, find this styles in components filter-->
        <div class="voice-info">
          <div
            class="size-box"
            v-if="answer.attachImageBase64 != ''"
            @click="downloadAttachFile(answer.attachImageBase64)"
          >
            <span class="persian-number size"></span>
            <svg
              data-name="link (2)"
              xmlns="http://www.w3.org/2000/svg"
              width="15.618"
              height="15.618"
              viewBox="0 0 15.618 15.618"
            >
              <g data-name="Group 9893" transform="translate(0 0)">
                <g data-name="Group 9892">
                  <path
                    data-name="Path 720"
                    d="M5.481,183.461l-1.84,1.84a1.952,1.952,0,1,1-2.761-2.76l3.681-3.681a1.952,1.952,0,0,1,2.76,0,.651.651,0,0,0,.92-.92,3.253,3.253,0,0,0-4.6,0l-3.681,3.681a3.254,3.254,0,0,0,4.6,4.6l1.84-1.84a.651.651,0,1,0-.92-.92Z"
                    transform="translate(0.993 -171.557)"
                    fill="#e13535"
                  ></path>
                  <path
                    data-name="Path 721"
                    d="M198.776-.048a3.254,3.254,0,0,0-4.6,0L191.967,2.16a.651.651,0,1,0,.92.92L195.095.873a1.952,1.952,0,1,1,2.761,2.76l-4.049,4.049a1.952,1.952,0,0,1-2.76,0,.651.651,0,0,0-.92.92,3.253,3.253,0,0,0,4.6,0l4.049-4.049A3.253,3.253,0,0,0,198.776-.048Z"
                    transform="translate(-184.112 1)"
                    fill="#e13535"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
          <div
            class="play-box"
            v-if="answer.audioFileBase64 != ''"
            @click="downloadAttachAudio(answer.audioFileBase64)"
          >
            <span class="duration persian-number"></span>
            <button type="button" class="play-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28.869"
                height="33.423"
                viewBox="0 0 28.869 33.423"
              >
                <g data-name="Group 9921">
                  <path
                    d="M61.581,12.855,41.84.686a4.564,4.564,0,0,0-6.957,3.887V28.8a4.612,4.612,0,0,0,4.555,4.624h.02a4.581,4.581,0,0,0,2.366-.712,1.3,1.3,0,1,0-1.358-2.225,2,2,0,0,1-1.015.331A2.025,2.025,0,0,1,37.49,28.8V4.573a1.958,1.958,0,0,1,2.983-1.668L60.214,15.074a1.958,1.958,0,0,1-.009,3.34L45.932,27.152a1.3,1.3,0,1,0,1.361,2.223l14.271-8.738a4.564,4.564,0,0,0,.016-7.783Z"
                    transform="translate(-34.883 0)"
                    fill="#212121"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </div>
    <div v-if="!loading && answers[0].parentStatus != 'Closed'">
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
        <p class="section-title-text">ادامه پرسش</p>
      </div>
      <form action="">
        <div class="form-row">
          <div for="" class="form-row-col darken-color">
            <div class="separator pseudo-form-input">
              <input
                type="file"
                id="upload-file-for-restof-question"
                @change="uploadAttchedImage"
              />
              <span v-if="uploadedFileName == ''">بارگذاری فایل ضمیمه</span>
              <span v-else>{{ uploadedFileName }}</span>
              <span>
                <label for="upload-file-for-restof-question" class="cover-btn"
                  >انتخاب</label
                >
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
          <div class="form-row-col">
            <textarea
              class="form-textarea large-height form-input"
              placeholder="توضیحات شما"
              v-model="answerText"
            ></textarea>
          </div>
        </div>
        <button class="form-btn" @click.prevent="continueQuestion">ارسال سوال</button>
      </form>
    </div>
    <div class="basic-modal audioPlayerModal">
      <div class="content-box">
        <header>
          <div class="empty"></div>
          <h2 class="title">پخش ویس</h2>
          <button class="close-btn" @click="closePlayer()">&times;</button>
        </header>
        <br />
        <div class="player-container">
          <audio
            controls
            class="audio-player"
            :src="'data:audio/wav;base64,' + audioBase64Data"
          ></audio>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "dashboard",
  middleware: "userIsNotLog",
  data() {
    return {
      answers: "",
      audioBase64Data: "",
      uploadedFileName: "",
      selectedAttachImage: "",
      recordedVoice: "",
      timerInterval: null,
      secs: 0,
      mins: 0,
      timerInterval: null,
      loading: true,
      answerText: "",
    };
  },
  async mounted() {
    if (this.$route.params.id != undefined) {
      this.getAnswers();
    } else {
      this.$router.push("/my/my-questions");
    }
  },
  methods: {
    async getAnswers() {
      const answers = await this.$axios.get(
        `/api/Student/StudentQuestion/GetQuestionResponses/${this.$route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      this.answers = answers.data.data;
      this.loading = false;
    },
    resetData() {
      this.answers = "";
      this.audioBase64Data = "";
      this.uploadedFileName = "";
      this.selectedAttachImage = "";
      this.recordedVoice = "";
      this.timerInterval = null;
      this.secs = 0;
      this.mins = 0;
      this.loading = true;
      this.answerText = "";
    },
    downloadAttachFile(id) {
      var a = document.createElement("a");
      a.href = "data:image/png;base64," + id;
      a.download = "Image" + new Date().getTime() + ".png";
      a.click();
    },
    downloadAttachAudio(id) {
      const audioPlayerModal = document.querySelector(".audioPlayerModal");
      this.audioBase64Data = id;
      audioPlayerModal.style.display = "flex";
    },
    closePlayer() {
      const audioPlayerModal = document.querySelector(".audioPlayerModal");
      this.audioBase64Data = "";
      audioPlayerModal.style.display = "none";
    },

    uploadAttchedImage(event) {
      const attachedImg = event.target.files[0];
      this.uploadedFileName = event.target.files[0].name;
      this.createBase64Image(attachedImg);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedAttachImage = e.target.result;
      };
      reader.readAsDataURL(fileObject);
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
        const endBut = document.querySelector(".endR");
        endBut.addEventListener("mouseup", () => {
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
    async playAudio() {
      const player = document.getElementById("voicePlayer");
      // player.addEventListener("loadedmetadata", function () {
      //   alert(player.duration);
      // });
      player.play();
    },
    async continueQuestion() {
      const sendAnswerResp = await this.$axios.post(
        "/api/Student/StudentQuestion/SendQuestionResponse",
        {
          parentId: this.$route.params.id,
          text: this.answerText,
          attachImageBase64: this.selectedAttachImage,
          audioFileBase64: this.recordedVoice,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        sendAnswerResp.data.statusCode == 200 &&
        sendAnswerResp.data.message == "Success"
      ) {
        this.$swal({
          text: "سوال شما ثبت شد.لطفا منتظر تایید و پاسخ مدرس باشید",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
        this.resetData();
        this.getAnswers();
      }
    },
  },
};
</script>
<style lang="scss">
// @import "@/assets/styles/stu-panel.scss";
@import "@/assets/swal-style.scss";
</style>
