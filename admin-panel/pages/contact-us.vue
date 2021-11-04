<template>
  <div class="contact-us">
    <div class="panel-admin-content-item contact-us">
      <header>
        <p class="section-header">تماس با ما</p>
      </header>
      <form action="">
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="tel"
              class="form-input"
              v-model="firstNumber"
              placeholder="شماره تماس اول"
            />
          </label>
          <label for="" class="form-row-col">
            <input
              type="tel"
              class="form-input"
              v-model="secondNumber"
              placeholder="شماره تماس دوم"
            />
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="email"
              class="form-input"
              v-model="firstEmail"
              placeholder="ایمیل اول"
            />
          </label>
          <label for="" class="form-row-col">
            <input
              type="email"
              class="form-input"
              v-model="secondEmail"
              placeholder="ایمیل دوم"
            />
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <textarea
              name=""
              cols="22"
              rows="0"
              placeholder="آدرس"
              v-model="address"
              class="form-input form-textarea"
            ></textarea>
          </label>
          <label for="" class="form-row-col">
            <label for="" class="form-row-col">
              <input
                type="text"
                class="form-input"
                v-model="mapLink"
                placeholder="لینک نقشه"
              />
            </label>
          </label>
        </div>
        <button class="form-btn" @click.prevent="changeContactUs" :disabled="isSending">
          تائید
        </button>
      </form>
    </div>
    <div class="panel-table contact-us-list">
      <div class="box-header">
        <h3>لیست پیام ها</h3>
        <form action="">
          <div class="filter floated-list-container" @click="toggleDropDowns">
            <input
              type="text"
              readonly
              v-model="filterMessages"
              placeholder="فیلتر بر اساس"
            />
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
              <li @click.prevent="chooseFilter($event, 0)">دیده شده</li>
              <li @click.prevent="chooseFilter($event, 1)">دیده نشده</li>
              <li @click.prevent="chooseFilter($event, 2)">پاسخ داده شده</li>
            </ul>
          </div>
          <label for="contact-us-search-btn" class="search-box" tabindex="0">
            <input
              type="search"
              placeholder="جستجو کنید"
              class="search-btn"
              id="contact-us-search-btn"
            />
            <img src="@/static/icons/search-icon-orange.png" alt="آیکون سرچ" />
          </label>
        </form>
      </div>
      <section class="box-content custom-scrollbar" id="messages-table">
        <header class="table-row table-header">
          <span>نام </span>
          <span class="email">ایمیل</span>
          <span>تاریخ</span>
          <span class="view">دیدن پیام</span>
          <span class="status">وضعیت</span>
        </header>
        <div class="table-row" v-for="message in contactMessages" :key="message.id">
          <span> {{ message.name }} </span>
          <span class="persian-number email">{{ message.email }}</span>
          <span class="persian-number">{{
            new Date(message.createDate).toLocaleDateString("fa-IR")
          }}</span>
          <span class="view">
            <button @click.prevent="openSendMessageModal(message.id, message.text)">
              مشاهده
            </button>
          </span>
          <span class="seen status" v-if="message.status == 'Read'">دیده شده</span>
          <span class="not-seen status" v-else-if="message.status == 'NotRead'"
            >دیده نشده</span
          >
          <span class="answered status" v-else-if="message.status == 'Answered'"
            >پاسخ داده شده</span
          >
        </div>

        <footer class="table-footer">
          <hr />
          <a href="" type="button" @click.prevent="seeAll"> مشاهده همه </a>
        </footer>
      </section>
    </div>
    <div class="modal-send-message contact-us">
      <div class="content-box">
        <form action="">
          <div class="your-message-heading">متن پیام</div>
          <p class="user-message">{{ messageText }}</p>
          <button class="i-seen form-btn" @click.prevent="readMessage">خواندم</button>
          <div class="your-message-heading">پاسخ شما</div>
          <div class="form-row">
            <div class="form-row-col">
              <textarea
                class="message-textarea form-input"
                v-model="replayText"
                placeholder="متن پیام"
              ></textarea>
            </div>
          </div>

          <div class="footer-buttons-container">
            <button type="button" class="form-btn gray-color" @click="closeModal">
              انصراف
            </button>
            <button class="form-btn success" @click.prevent="sendReplay">ارسال</button>
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
      firstNumber: "",
      secondNumber: "",
      firstEmail: "",
      secondEmail: "",
      address: "",
      mapLink: "",

      // contact messages
      contactMessages: "",
      messageText: "",
      replayToThisMessage: "",
      replayText: "",
      filterMessages: "",
      isSending: false,
    };
  },
  async mounted() {
    this.getContactUsData();
    this.getMessages();
  },
  methods: {
    async getContactUsData() {
      const contactUsInfo = await this.$axios.get(
        "/api/Admin/AdminManageSiteInfo/ContactInfo",
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        contactUsInfo.data.statusCode == 200 &&
        contactUsInfo.data.message == "Success"
      ) {
        const contactUsData = contactUsInfo.data.data;
        this.firstNumber = contactUsData.firstPhoneNumber;
        this.secondNumber = contactUsData.secondPhoneNumber;
        this.firstEmail = contactUsData.firstEmail;
        this.secondEmail = contactUsData.secondEmail;
        this.address = contactUsData.contactAddress;
        this.mapLink = contactUsData.mapLink;
      }
    },
    async changeContactUs() {
      this.isSending = true;
      const changeResp = await this.$axios.post(
        "/api/Admin/AdminManageSiteInfo/ContactInfo",
        {
          firstPhoneNumber: this.firstNumber,
          secondPhoneNumber: this.secondNumber,
          firstEmail: this.firstEmail,
          secondEmail: this.secondEmail,
          mapLink: this.mapLink,
          contactAddress: this.address,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (changeResp.data.statusCode == 200 && changeResp.data.message == "Success") {
        this.getContactUsData();
      }
      this.isSending = false;
    },

    // get contact messages
    seeAll() {
      const table = document.getElementById("messages-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer").style.display = "none");
    },
    toggleDropDowns(event) {
      event.stopPropagation();
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    async chooseFilter(event, id) {
      this.filterMessages = event.target.innerHTML.trim();
      const messages = await this.$axios.get(
        `/api/Admin/AdminManageSiteInfo/GetContacts?status=${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      // console.log(messages);
      if (messages.data.statusCode == 200 && messages.data.message == "Success") {
        this.contactMessages = messages.data.data;
      }
    },
    async getMessages() {
      const messages = await this.$axios.get(
        "/api/Admin/AdminManageSiteInfo/GetContacts",
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      // console.log(messages);
      if (messages.data.statusCode == 200 && messages.data.message == "Success") {
        this.contactMessages = messages.data.data;
      }
    },
    openSendMessageModal(id, text) {
      this.replayToThisMessage = id;
      this.messageText = text;
      const modal = document.querySelector(".modal-send-message.contact-us");
      modal.style.visibility = "visible";
      modal.style.opacity = "1";
    },
    closeModal() {
      this.replayToThisMessage = "";
      this.messageText = "";
      this.replayText = "";
      const modal = document.querySelector(".modal-send-message.contact-us");
      modal.style.visibility = "hidden";
      modal.style.opacity = "0";
    },
    async readMessage() {
      const readMessages = await this.$axios.get(
        `/api/Admin/AdminManageSiteInfo/ContactRead/${this.replayToThisMessage}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (readMessages.data.statusCode == 200 && readMessages.data.message == "Success") {
        this.$swal({
          text: "وضعیت تغییر کرد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
      }
    },
    async sendReplay() {
      const sendMessages = await this.$axios.post(
        `/api/Admin/AdminManageSiteInfo/SendContactResponse?contactId=${this.replayToThisMessage}&response=${this.replayText}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (sendMessages.data.statusCode == 200 && sendMessages.data.message == "Success") {
        this.$({
          text: "وضعیت تغییر کرد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
        this.closeModal();
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
