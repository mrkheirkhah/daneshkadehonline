<template>
  <div>
    <div class="panel-teacher-content-item notifications">
      <header>
        <p class="section-header">
          <!-- skeleton -->
          <skeleton
            v-if="loading"
            class="skeleton"
            width="85px"
            height="30px"
            borderRadius="5px"
          />

          <span v-else> پیام و اعلانات </span>
        </p>
      </header>
      <div class="tab">
        <!-- skeleton -->
        <template v-if="loading">
          <div>
            <skeleton class="skeleton" width="90px" height="45px" borderRadius="5px" />
            <skeleton
              class="skeleton mr-2"
              width="90px"
              height="45px"
              borderRadius="5px"
            />
          </div>
          <skeleton class="skeleton" width="100px" height="35px" borderRadius="5px" />
        </template>
        <template v-else>
          <div>
            <button
              @click="goToMessages"
              type="button"
              class="tab-btn"
              :class="{ active: showMsg }"
            >
              پیام ها
              <span class="unread-notifications-count persian-number">{{
                msgCount
              }}</span>
            </button>
            <button
              type="button"
              @click="goToNotifs"
              class="tab-btn"
              :class="{ active: showNotif }"
            >
              اعلان ها
              <span class="unread-notifications-count persian-number">{{
                alertCount
              }}</span>
            </button>
          </div>
          <template v-if="showMsg">
            <button type="button" class="refresher-btn" @click="getMessages()">
              تازه سازی پیام ها
            </button>
            <button
              type="button"
              class="refresher-btn"
              @click="readMsgs"
              v-if="messageGroups.length != 0"
            >
              خوانده شدن پیام ها
            </button>
          </template>
          <template v-if="showNotif">
            <button type="button" class="refresher-btn" @click="getAlerts()">
              تازه سازی اعلان ها
            </button>
            <button
              type="button"
              class="refresher-btn"
              @click="readAlerts"
              v-if="alerts.length != 0"
            >
              خوانده شدن اعلان ها
            </button>
          </template>
        </template>
      </div>
      <div class="messages-box" v-show="showMsg">
        <form action="" v-if="messageGroups.length != 0">
          <div class="form-row">
            <div class="form-row-col">
              <!-- skeleton -->
              <skeleton
                v-if="loading"
                class="skeleton msg-serach-skeleton mb-2"
                width="85px"
                height="50px"
                borderRadius="5px"
              />

              <template v-else>
                <input
                  type="search"
                  class="form-input"
                  placeholder="بر اساس نام یا شماره موبایل"
                />
                <button class="search-btn">
                  <img
                    src="@/static/panel-teacher-icons/search-icon.svg"
                    alt="آیکون سرچ"
                  />
                </button>
              </template>
            </div>
          </div>
        </form>
        <div class="messages custom-scrollbar" v-if="loading">
          <div class="person-message-box">
            <PersonMsgSkeleton />
            <PersonMsgSkeleton />
          </div>
        </div>
        <div v-else class="messages custom-scrollbar">
          <div v-if="messageGroups.length == 0" class="no-data-message">
            پیام جدید وجود ندارد
          </div>
          <div
            class="person-message-box"
            v-for="messageBox in messageGroups"
            :key="messageBox.index"
          >
            <template v-for="message in messageBox">
              <div
                class="person-message"
                :class="{ 'replied-message': message.sendBy == 'Teacher' }"
                :key="message.questionId"
              >
                <img
                  v-if="message.sendBy != 'Teacher'"
                  :src="
                    'https://api.daneshkadeonline.ir/Images/Public/Teacher/' +
                    message.profileImageName
                  "
                  class="person-message__image"
                  alt="تصویر پروفایل"
                />
                <div class="person-message__info">
                  <h4 class="person-name" v-if="message.sendBy != 'Teacher'">
                    {{ message.name }}
                  </h4>
                  <p class="person-text">
                    {{ message.text }}
                  </p>
                </div>

                <div class="person-message__sidebox">
                  <span class="message-time">
                    <span class="persian-number">
                      {{
                        Math.floor(
                          (new Date(
                            Date.now() + new Date().getTimezoneOffset() * 60000
                          ).getTime() -
                            new Date(message.sendDate).getTime()) /
                            3600000
                        )
                      }}</span
                    >
                    ساعت قبل
                  </span>
                  <form action="#">
                    <label @click="downloadAttachAudio(message.questionId)">
                      <div
                        v-html="
                          require('@/static/panel-teacher-icons/microphone-icon.svg?raw')
                        "
                      />
                    </label>
                    <label @click="downloadAttachFile(message.questionId)">
                      <div
                        v-html="require('@/static/panel-teacher-icons/attach.svg?raw')"
                      />
                    </label>
                    <button
                      v-if="
                        message.sendBy != 'Teacher' && messageBox[0].status != 'Closed'
                      "
                      type="button"
                      class="reply-btn"
                      @click="openSendMessageModal(message.questionId)"
                    >
                      پاسخ
                    </button>
                    <button
                      v-if="
                        message.sendBy != 'Teacher' && messageBox[0].status != 'Closed'
                      "
                      type="button"
                      class="reply-btn"
                      @click="seeResponses(message.questionId)"
                    >
                      مشاهده پاسخ ها
                    </button>
                  </form>
                </div>
              </div>
            </template>
            <footer>
              <button
                v-if="messageBox[0].status != 'Closed'"
                type="button"
                class="end-conversation-btn"
                @click="endChat(messageBox[0].questionId)"
              >
                پایان دادن به این گفتگو
              </button>
              <div v-else class="ended-conversation-text">گفتگو پایان یافته است</div>
            </footer>
          </div>
        </div>
      </div>
      <div class="notifications-box custom-scrollbar" v-show="showNotif">
        <div v-if="alerts.length == 0" class="no-data-message">اعلانی وجود ندارد</div>
        <notification
          v-else
          v-for="alert in alerts"
          :key="alert.id"
          :notifText="alert.title"
          :time="alert.hours"
          :id="alert.id"
        />
      </div>
    </div>
    <div class="modal-send-message">
      <div class="content-box">
        <span class="person-name">{{
          this.modalMsg.length != 0 ? this.modalMsg[0].name : ""
        }}</span>
        <p class="person-message custom-scrollbar">
          {{ this.modalMsg.length != 0 ? this.modalMsg[0].text : "" }}
        </p>
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
                class="record-btn green endR"
                v-if="recordedVoice == ''"
                @mousedown="startRecord"
                @touchstart="startRecord"
              >
                <div
                  v-html="require('@/static/panel-teacher-icons/microphone-icon.svg?raw')"
                />
              </button>
              <div class="pseudo-form-input">
                <audio :src="recordedVoice" id="voicePlayer" controls></audio>
                <span class="voice-timer persian-number"
                  >{{ mins < 10 ? "0" + mins : mins }}:{{
                    secs < 10 ? "0" + secs : secs
                  }}</span
                >
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
                    @click="
                      recordedVoice = '';
                      mins = 0;
                      secs = 0;
                      timerInterval = null;
                    "
                    v-if="recordedVoice != ''"
                  >
                    <div v-html="require('@/static/panel-teacher-icons/bin.svg?raw')" />
                  </button>
                </div>
              </div>
            </label>
          </div>
          <div class="footer-buttons-container">
            <button
              type="button"
              class="form-btn gray-color"
              @click="closeSendMsgModal()"
            >
              انصراف
            </button>
            <button
              class="form-btn success"
              @click.prevent="
                sendAnswer(
                  modalMsg[0].parentId == null
                    ? modalMsg[0].questionId
                    : modalMsg[0].parentId
                )
              "
            >
              ارسال
            </button>
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
import skeleton from "@/components/skeleton-components/skeletonCreator";
import PersonMsgSkeleton from "~/components/pages-skeleton/person-msg-skeleton.vue";
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  components: { skeleton, PersonMsgSkeleton },
  head() {
    return {
      title: "اعلانات و سوالات",
    };
  },
  data() {
    return {
      showMsg: true,
      showNotif: false,
      loading: true,
      alerts: [],
      messages: [],
      messageGroups: [],
      alertCount: 0,
      msgCount: 0,
      modalMsg: [],
      yourAnswer: "",
      selectedAttachImage: "",
      audioBase64Data: "",
      recordedVoice: "",
      timerInterval: null,
      secs: 0,
      mins: 0,
      uploadedFileName: "",
    };
  },
  methods: {
    async seeResponses(id) {
      const msgResp = await this.$axios.get(
        `/api/Teacher/TeacherQuestionAndAlert/QuestionResponses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      for (const i of this.messageGroups) {
        if (i[0].questionId == Number(id)) {
          for (const j of msgResp.data.data) {
            i.push(j);
          }
        }
      }
    },
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
    openSendMessageModal(questionId) {
      for (const i in this.messageGroups) {
        for (const j in this.messageGroups[i]) {
          if (this.messageGroups[i][j].questionId == questionId) {
            this.modalMsg.push(this.messageGroups[i][j]);
          }
        }
      }
      const sendMsgModal = document.querySelector(".modal-send-message");
      sendMsgModal.style.display = "flex";
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
      // while (player.duration === Infinity) {
      //   await new Promise((r) => setTimeout(r, 1000));
      //   player.currentTime = 10000000 * Math.random();
      // }
      // let duration = player.duration;
      // console.log(duration);
      player.play();
    },
    closePlayer() {
      const audioPlayerModal = document.querySelector(".audioPlayerModal");
      this.audioBase64Data = "";
      audioPlayerModal.style.display = "none";
    },
    async sendAnswer(id) {
      let formData = new FormData();
      formData.append("parentId", Number(id));
      formData.append("text", this.yourAnswer);
      formData.append("attachImage", this.selectedAttachImage);
      formData.append("audioFileBase64", this.recordedVoice);
      const sendAnswerResp = await this.$axios.post(
        "/api/Teacher/TeacherQuestionAndAlert/Question",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        sendAnswerResp.data.statusCode == 200 &&
        sendAnswerResp.data.message == "Success"
      ) {
        this.closeSendMsgModal();
        this.getMessages();
      }
    },
    closeSendMsgModal() {
      const sendMsgModal = document.querySelector(".modal-send-message");
      sendMsgModal.style.display = "none";
      this.yourAnswer = "";
      this.selectedAttachImage = "";
      this.recordedVoice = "";
    },
    goToMessages() {
      this.showMsg = true;
      this.showNotif = false;
    },
    goToNotifs() {
      this.showMsg = false;
      this.showNotif = true;
    },
    async getMessages() {
      (this.messageGroups = []), (this.messages = []);
      this.loading = true;
      const messages = await this.$axios.get(
        "/api/Teacher/TeacherQuestionAndAlert/Question/",
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      // console.log(messages);
      this.msgCount = 0;
      if (messages.data.statusCode == 200 && messages.data.message == "Success") {
        for (let i = 0; i < messages.data.data.length; i++) {
          this.messages.push(messages.data.data[i]);
          if (messages.data.data[i].isRead == false) {
            this.msgCount++;
          }
        }
        for (const eachMessage in this.messages) {
          if (this.messages[eachMessage].parentId == null) {
            let group = [];
            group.push(this.messages[eachMessage]);
            this.messageGroups.push(group);
          } else {
            for (const i in this.messageGroups) {
              for (const j in this.messageGroups[i]) {
                if (
                  this.messages[eachMessage].parentId ==
                  this.messageGroups[i][j].questionId
                ) {
                  this.messageGroups[i].push(this.messages[eachMessage]);
                }
              }
            }
          }
        }
      }
      this.loading = false;
    },
    async getAlerts() {
      this.alerts = [];
      this.loading = true;
      const alerts = await this.$axios.get(
        "/api/Teacher/TeacherQuestionAndAlert/GetTeacherAlerts",
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      this.alertCount = 0;
      if (alerts.data.statusCode == "200" && alerts.data.message == "Success") {
        for (const n of alerts.data.data) {
          const date = new Date();
          this.alerts.push({
            title: n.alertText,
            id: n.id,
            hours: Math.floor(
              (date.getTime() - new Date(n.createDate).getTime()) / 3600000
            ),
          });
          if (n.isRead == false) {
            this.alertCount += 1;
          }
        }
      }
      this.loading = false;
    },
    async deleteAlert(alertId) {
      const alerts = await this.$axios.delete(
        "/api/Teacher/TeacherQuestionAndAlert/RemoveTeacherAlert/" + alertId,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      this.getAlerts();
    },
    async readMsgs() {
      const readMsgs = await this.$axios.get(
        "/api/Teacher/TeacherQuestionAndAlert/ReadAllQuestions",
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (readMsgs.data.statusCode == 200 && readMsgs.data.message == "Success") {
        this.getMessages();
      }
    },
    async readAlerts() {
      const readAlerts = await this.$axios.get(
        "/api/Teacher/TeacherQuestionAndAlert/ReadAllAlerts",
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (readAlerts.data.statusCode == 200 && readAlerts.data.message == "Success") {
        this.getAlerts();
      }
    },
    async endChat(id) {
      const endChatResponse = await this.$axios.delete(
        "/api/Teacher/TeacherQuestionAndAlert/CloseQuestion/" + id,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        endChatResponse.data.statusCode == 200 &&
        endChatResponse.data.message == "Success"
      ) {
        this.$swal({
          text: "چت پایان یافت",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "ادامه",
        });
        this.getMessages();
      }
    },
  },
  async beforeMount() {
    await Promise.all([this.getAlerts(), this.getMessages()]);
    // this.loading = false;
  },
  computed: {},
};
</script>
<style lang="scss">
@import "@/assets/styles/swal-style.scss";
</style>
