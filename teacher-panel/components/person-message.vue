<template>
  <div>
    <div class="person-message" :class="{ 'replied-message': replied }">
      <img
        v-if="!replied"
        :src="'https://api.daneshkadeonline.ir/Images/Public/Teacher/' + imageName"
        class="person-message__image"
        alt="تصویر پروفایل"
      />
      <div class="person-message__info">
        <h4 class="person-name" v-if="!replied">{{ personName }}</h4>
        <p class="person-text">
          {{ messageTxt }}
        </p>
      </div>

      <div class="person-message__sidebox">
        <span class="message-time">
          <span class="persian-number"> {{ time }}</span>
          ساعت قبل
        </span>
        <form action="#">
          <label @click="downloadAttachAudio(questionId)">
            <div
              v-html="require('@/static/panel-teacher-icons/microphone-icon.svg?raw')"
            />
          </label>
          <label @click="downloadAttachFile(questionId)">
            <div v-html="require('@/static/panel-teacher-icons/attach.svg?raw')" />
          </label>
          <button
            v-if="!replied && !close"
            type="button"
            class="reply-btn"
            @click="openSendMessageModal(parentId != null ? parentId : questionId)"
          >
            پاسخ
          </button>
        </form>
      </div>
    </div>
    <div class="modal-send-message">
      <div class="content-box">
        <span class="person-name">{{ personName }}</span>
        <p class="person-message custom-scrollbar">{{ messageTxt }}</p>
        <form action="">
          <div class="your-message-heading">پاسخ شما</div>
          <div class="form-row">
            <div class="form-row-col">
              <textarea
                class="message-textarea form-input"
                placeholder="پاسخ به نظرات دوره"
                v-model="yourAnswer"
              ></textarea>
            </div>
          </div>
          <div class="form-row">
            <div for="" class="form-row-col darken-color">
              <div class="separator pseudo-form-input">
                <input
                  type="file"
                  id="upload-file-for-question"
                  @change="uploadAttchedImage"
                />
                <span>بارگذاری فایل ضمیمه</span>
                <span>
                  <label for="upload-file-for-question" class="cover-btn">انتخاب</label>
                </span>
              </div>
            </div>
            <label for="" class="form-row-col record-voice-box">
              <button
                type="button"
                class="record-btn green endR"
                v-if="recordedVoice == ''"
                @mousedown="startRecord"
              >
                <div
                  v-html="require('@/static/panel-teacher-icons/microphone-icon.svg?raw')"
                />
              </button>
              <div class="pseudo-form-input">
                <audio :src="recordedVoice" id="voicePlayer" controls></audio>
                <span class="voice-timer persian-number"></span>
                <div class="btn-container green">
                  <button type="button" class="play-btn" @click="playAudio">
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
                    @click="recordedVoice = ''"
                    v-if="recordedVoice != ''"
                  >
                    <div v-html="require('@/static/panel-teacher-icons/bin.svg?raw')" />
                  </button>
                </div>
              </div>
            </label>
          </div>
          <div class="footer-buttons-container">
            <button type="button" class="form-btn gray-color">انصراف</button>
            <button class="form-btn success" @click.prevent="testSend()">ارسال</button>
          </div>
        </form>
      </div>
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
  name: "person-message",
  props: {
    personName: {
      type: String,
      required: true,
    },
    questionId: {
      type: Number,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    messageTxt: {
      type: String,
      required: true,
    },
    replied: {
      type: Boolean,
      required: false,
      default: false,
    },
    close: {
      type: Boolean,
      required: true,
    },
    imageName: {
      type: String,
      required: false,
    },
    parentId: {
      type: Number,
    },
  },
  data() {
    return {
      recordedVoice: "",
      yourAnswer: "",
      audioBase64Data: "",
      selectedAttachImage: "",
      replyTo: "",
    };
  },
  methods: {
    async downloadAttachFile(id) {
      const download = await this.$axios.get(
        "/api/Teacher/TeacherQuestionAndAlert/GetQuestionAttachImageBase64/" + id,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (download.data.statusCode == 200 && download.data.message == "Success") {
        if (download.data.data.attachImageBase64 != null) {
          var a = document.createElement("a");
          a.href = "data:image/png;base64," + download.data.data.attachImageBase64;
          a.download = "Image" + new Date().getTime() + ".png";
          a.click();
        } else {
          this.$swal({
            text: "عکسی وجود ندارد",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "ادامه",
          });
        }
      }
    },
    async downloadAttachAudio(id) {
      const audioresp = await this.$axios.get(
        "/api/Teacher/TeacherQuestionAndAlert/GetQuestionAudioBase64/" + id,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );

      if (audioresp.data.statusCode == 200 && audioresp.data.message == "Success") {
        const audioPlayerModal = document.querySelector(".audioPlayerModal");
        this.audioBase64Data = audioresp.data.data.audioBase64;
        audioPlayerModal.style.display = "flex";
        // audioPlayerModal.style.visibility = "visible";
      }
    },
    closePlayer() {
      const audioPlayerModal = document.querySelector(".audioPlayerModal");
      this.audioBase64Data = "";
      audioPlayerModal.style.display = "none";
    },
    openSendMessageModal(parentId) {
      this.replyTo = parentId;
      const sendMsgModal = document.querySelector(".modal-send-message");
      sendMsgModal.style.display = "flex";
    },
    startRecord() {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        const audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", (event) => {
          audioChunks.push(event.data);
        });
        const endBut = document.querySelector(".endR");
        endBut.addEventListener("mouseup", () => {
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
      // while (player.duration === Infinity) {
      //   await new Promise((r) => setTimeout(r, 1000));
      //   player.currentTime = 10000000 * Math.random();
      // }
      // let duration = player.duration;
      // console.log(duration);
      player.play();
    },
    uploadAttchedImage(event) {
      const attachedImg = event.target.files[0];
      this.createBase64Image(attachedImg);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedAttachImage = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },
    testSend() {
      console.log(this.replyTo);
    },
  },
};
</script>
