<template>
  <div>
    <div class="panel-admin-content-item notifications">
      <header>
        <p class="section-header">پیام و اعلانات</p>
      </header>
      <div class="tab">
        <div>
          <button type="button" class="tab-btn active">پیام ها</button>
        </div>
      </div>
      <div class="messages-box">
        <form action="">
          <div class="form-row">
            <div class="form-row-col">
              <input
                type="search"
                class="form-input"
                placeholder="بر اساس نام یا شماره موبایل"
              />
              <button class="search-btn">
                <img src="@/static/icons/search-icon-orange.png" alt="آیکون سرچ" />
              </button>
            </div>
          </div>
        </form>
        <div class="messages custom-scrollbar">
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
                  <p class="person-text">{{ message.text }}</p>
                </div>

                <div class="person-message__sidebox">
                  <span class="message-time">
                    <span class="persian-number"
                      >{{
                        Math.floor(
                          (new Date(
                            Date.now() + new Date().getTimezoneOffset() * 60000
                          ).getTime() -
                            new Date(message.sendDate).getTime()) /
                            3600000
                        )
                      }}
                    </span>
                    ساعت قبل</span
                  >
                  <form action="#">
                    <button
                      type="button"
                      class="confirm"
                      v-if="message.parentId == null"
                      @click.prevent="seeResponses(message.questionId)"
                    >
                      مشاهده پاسخ ها
                    </button>
                    <label @click.prevent="downloadAttachAudio(message.questionId)">
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
                    </label>
                    <label @click="downloadAttachFile(message.questionId)">
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
                            />
                            <path
                              data-name="Path 721"
                              d="M198.776-.048a3.254,3.254,0,0,0-4.6,0L191.967,2.16a.651.651,0,1,0,.92.92L195.095.873a1.952,1.952,0,1,1,2.761,2.76l-4.049,4.049a1.952,1.952,0,0,1-2.76,0,.651.651,0,0,0-.92.92,3.253,3.253,0,0,0,4.6,0l4.049-4.049A3.253,3.253,0,0,0,198.776-.048Z"
                              transform="translate(-184.112 1)"
                              fill="#e13535"
                            />
                          </g>
                        </g>
                      </svg>
                    </label>
                  </form>
                </div>
              </div>
            </template>
          </div>
        </div>
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
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  data() {
    return {
      messageGroups: [],
      messages: [],
      msgCount: "",
      audioBase64Data: "",
    };
  },
  beforeMount() {
    if (this.$route.params.id == undefined || isNaN(this.$route.params.id)) {
      this.$router.push("/teachers-list");
    } else {
      this.getMessages();
    }
  },
  methods: {
    async getMessages() {
      (this.messageGroups = []), (this.messages = []);
      this.loading = true;
      const messages = await this.$axios.get(
        `/api/Admin/AdminQuestion/GetQuestions?teacherId=${this.$route.params.id}`,
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
      // this.loading = false;
    },
    async seeResponses(id) {
      const msgResp = await this.$axios.get(
        `/api/Admin/AdminQuestion/GetQuestionResponses/${id}`,
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
        "/api/Admin/AdminManageTeacher/GetQuestionAttachImageBase64/" + id,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      // console.log(download);
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
        "/api/Admin/AdminManageTeacher/GetQuestionAudioBase64/" + id,
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
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
