<template>
  <div>
    <div class="panel-admin-content-item main-page">
      <header>
        <p class="section-header">
          <span> مشاهده تیکت </span>
        </p>
      </header>
      <form action="">
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="text"
              :value="ticketTitle"
              class="form-input"
              placeholder="عنوان تیکت"
              disabled
            />
          </label>
          <label for="" class="form-row-col">
            <input
              type="text"
              :value="status"
              class="form-input"
              placeholder="وضعیت"
              disabled
            />
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="text"
              :value="importance"
              class="form-input"
              placeholder="اهمیت"
              disabled
            />
          </label>
          <label for="" class="form-row-col">
            <input
              type="text"
              :value="departman"
              class="form-input"
              placeholder="دپارتمان"
              disabled
            />
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="text"
              :value="ticketDate"
              class="form-input"
              placeholder="تاریخ ارسال"
              disabled
            />
          </label>
          <label for="" class="form-row-col"> </label>
        </div>
        <div class="options-buttons">
          <button
            class="form-btn success"
            @click.prevent="sendMessage"
            v-if="status != 'بسته شده'"
          >
            ارسال پاسخ
          </button>
          <button
            class="form-btn red-color"
            @click.prevent="closeTicket"
            v-if="status != 'بسته شده'"
          >
            بستن
          </button>
        </div>
      </form>
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
      </div>
      <section class="chat-window">
        <article
          class="msg-container msg-remote"
          v-for="chat in ticketChats"
          :key="chat.id"
          :class="
            chat.senderType == 'Teacher' || chat.senderType == 'Student'
              ? 'msg-remote'
              : 'msg-self'
          "
        >
          <div class="msg-box">
            <div class="flr">
              <div class="messages">
                <p class="msg">{{ chat.text }}</p>
              </div>
              <span class="timestamp"
                ><span class="username">{{ chat.senderName }}</span>
                <span class="posttime">{{
                  new Date(chat.date).toLocaleDateString("fa-ir")
                }}</span></span
              >
              <form action="#" v-if="chat.isAttach">
                <label>
                  <svg
                    class="download-btn"
                    @click="downloadAttachFile(chat.id)"
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
        </article>
      </section>
    </div>
    <div class="modal-send-message">
      <div class="content-box">
        <form action="">
          <div class="your-message-heading">پیام شما</div>
          <div class="form-row">
            <div class="form-row-col">
              <textarea
                v-model="ticketText"
                class="message-textarea form-input"
                placeholder="متن پیام"
              ></textarea>
            </div>
          </div>
          <div class="form-row">
            <div class="form-row-col darken-color">
              <label for="upload-ticket-image" class="separator pseudo-form-input">
                <input
                  type="file"
                  accept="image/*"
                  id="upload-ticket-image"
                  @change="uploadTicketImage"
                />
                <span v-if="ticketImageName == ''">بارگذاری تصویر ضمیمه</span>
                <span else>{{ ticketImageName }}</span>
                <span>
                  <label for="upload-ticket-image" class="cover-btn">انتخاب</label>
                </span>
              </label>
            </div>
          </div>

          <div class="footer-buttons-container">
            <button type="button" class="form-btn gray-color" @click="closeSendMessage">
              انصراف
            </button>
            <button
              v-if="status != 'بسته شده'"
              class="form-btn success"
              @click.prevent="submitTicket"
              :disabled="isSending"
            >
              ارسال
            </button>
          </div>
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
      ticketTitle: "",
      status: "",
      importance: "",
      departman: "",
      ticketText: "",
      ticketDate: "",
      wrongTicketText: false,
      isSending: false,
      ticketImageName: "",
      selectedTicketImage: undefined,
      ticketChats: "",
    };
  },
  mounted() {
    if (this.$route.params.id == undefined || isNaN(this.$route.params.id)) {
      this.$router.push("/tickets");
    } else {
      this.getTicketDetails();
    }
  },
  methods: {
    uploadTicketImage(event) {
      try {
        this.ticketImageName = event.target.files[0].name;
        this.selectedTicketImage = event.target.files[0];
      } catch {}
      // this.createBase64Image(NTImg);
    },
    sendMessage() {
      const messageModal = document.querySelector(".modal-send-message");
      messageModal.style.opacity = "1";
      messageModal.style.visibility = "visible";
    },
    closeSendMessage() {
      const messageModal = document.querySelector(".modal-send-message");
      messageModal.style.opacity = "0";
      messageModal.style.visibility = "hidden";
    },
    async getTicketDetails() {
      const ticket = await this.$axios.get(
        `/api/ShowTicket?ticketId=${this.$route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (ticket.data.statusCode == 200 && ticket.data.message == "Success") {
        console.log(ticket);
        const ticketDetails = ticket.data.data;
        this.ticketTitle = ticketDetails.title;
        this.departman = ticketDetails.department;
        this.importance = ticketDetails.importance;
        this.status =
          ticketDetails.status == "WaitingForAnswer"
            ? "در انتظار پاسخ"
            : ticketDetails.status == "Closed"
            ? "بسته شده"
            : ticketDetails.status == "Answered"
            ? "پاسخ داده شده"
            : "پاسخ دانشجو";
        this.ticketDate = new Date(ticketDetails.date).toLocaleDateString("fa-ir");
        this.ticketChats = ticketDetails.items;
      }
    },
    async submitTicket() {
      this.isSending = true;
      if (this.ticketTitle == "") {
        this.wrongTitle = true;
      } else {
        this.wrongTitle = false;
      }
      if (this.importanceId == "") {
        this.wrongImportance = true;
      } else {
        this.wrongImportance = false;
      }
      if (this.departmanId == "") {
        this.wrongDepartman = true;
      } else {
        this.wrongDepartman = false;
      }
      if (this.ticketText == "") {
        this.wrongTicketText = true;
      } else {
        this.wrongTicketText = false;
      }
      if (
        this.ticketTitle != "" &&
        this.importanceId != "" &&
        this.departmanId != "" &&
        this.ticketText != ""
      ) {
        let formData = new FormData();
        formData.append("ParentId", this.$route.params.id);
        formData.append("Text", this.ticketText);
        formData.append("AttachImage", this.selectedTicketImage);
        const postTicket = await this.$axios.post("/api/AddTicket", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        });
        if (postTicket.data.statusCode == 200 && postTicket.data.message == "Success") {
          this.$swal({
            text: "تیکت شما ثبت شد.منتظر پاسخ ادمین ها بمانید",
            icon: "success",
            showCloseButton: true,
            confirmButtonText: "تایید",
          });
          this.selectedTicketImage = undefined;
          this.ticketImageName = "";
          this.ticketText = "";
          this.closeSendMessage();
          this.getTicketDetails();
        }
      }
      this.isSending = false;
    },
    async downloadAttachFile(id) {
      const download =await this.$axios.get(`/api/GetAttachFile/${id}`, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      if (download.data.data != null) {
        var a = document.createElement("a");
        a.href = "data:image/png;base64," + download.data.data;
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
    },
    async closeTicket() {
      this.$swal({
        text: "از بستن این تیکت اطمینان دارید؟",
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "بله",
        cancelButtonText: "خیر",
      }).then(async (clickedBut) => {
        if (clickedBut.isConfirmed) {
          const close = await this.$axios.get(
            `/api/closeTicket/${this.$route.params.id}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (close.data.statusCode == 200 && close.data.message == "Success") {
            this.$swal({
              text: "انجام شد",
              icon: "success",
              showCloseButton: true,
              confirmButtonText: "تایید",
            }).then(() => {
              this.getTicketDetails();
            });
          }
        }
      });
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
.download-btn {
  cursor: pointer;
  display: inline;
  padding: 5px;
  height: 30px;
  width: 30px;
}
</style>
