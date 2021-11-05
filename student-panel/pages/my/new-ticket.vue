<template>
  <div class="panel-student-content-item discount-code">
    <header>
      <p class="section-header">
        <span> ثبت تیکت </span>
      </p>
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
      <p class="section-title-text">
        <span> تیکت </span>
      </p>
    </div>
    <form action="">
      <div class="form-row">
        <label for="" class="form-row-col">
          <input
            type="text"
            v-model="ticketTitle"
            class="form-input"
            placeholder="عنوان تیکت "
            :class="wrongTitle ? 'red' : ''"
          />
          <p class="wrong-text" style="bottom: -4px" v-if="wrongTitle">
            وارد کردن عنوان تیکت اجباری است
          </p>
        </label>
        <label for="" class="form-row-col floated-list-container in-panel">
          <input
            type="text"
            class="form-input"
            v-model="importance"
            readonly
            :class="wrongImportance ? 'red' : ''"
            placeholder="اهمیت"
            @click="toggleDropDowns"
          />
          <p class="wrong-text" style="bottom: -4px" v-if="wrongImportance">
            اهمیت تیکت را به طور صحیح انتخاب کنید
          </p>
          <ul class="floated-list custom-scrollbar">
            <li @click="chooseImportance($event)">کم</li>
            <li @click="chooseImportance($event)">متوسط</li>
            <li @click="chooseImportance($event)">فوری</li>
          </ul>
        </label>
      </div>
      <div class="form-row">
        <label for="" class="form-row-col floated-list-container in-panel">
          <input
            type="text"
            class="form-input"
            v-model="departman"
            readonly
            :class="wrongDepartman ? 'red' : ''"
            placeholder="دپارتمان"
            @click="toggleDropDowns"
          />
          <p class="wrong-text" style="bottom: -4px" v-if="wrongDepartman">
            دپارتمان انتخاب کنید
          </p>
          <ul class="floated-list custom-scrollbar">
            <li @click="chooseDepartman($event)">بخش فروش</li>
            <li @click="chooseDepartman($event)">بخش فنی</li>
            <li @click="chooseDepartman($event)">بخش مالی</li>
          </ul>
        </label>
        <label for="" class="form-row-col"> </label>
      </div>
      <div class="form-row">
        <label for="" class="form-row-col">
          <textarea
            name=""
            id=""
            cols="22"
            rows="0"
            v-model="ticketText"
            :class="wrongTicketText ? 'red' : ''"
            placeholder="متن تیکت"
            class="form-input form-textarea"
          >
          </textarea>
          <p class="wrong-text" style="bottom: 0px" v-if="wrongTicketText">
            پر کردن این بخش اجباری است
          </p>
        </label>
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
        <label for="" class="form-row-col"> </label>
      </div>
      <button
        class="form-btn success"
        @click.prevent="submitTicket"
        :disabled="isSending"
      >
        ارسال تیکت
      </button>
    </form>
  </div>
</template>
<script>
export default {
  layout: "dashboard",
  middleware: "userIsNotLog",
  data() {
    return {
      ticketTitle: "",
      wrongTitle: false,
      wrongImportance: false,
      importance: "",
      departman: "",
      wrongDepartman: false,
      ticketText: "",
      wrongTicketText: false,
      isSending: false,
      ticketImageName: "",
      selectedTicketImage: undefined,
    };
  },
  methods: {
    resetData() {
      this.ticketTitle = "";
      this.wrongTitle = false;
      this.wrongImportance = false;
      this.importance = "";
      this.departman = "";
      this.wrongDepartman = false;
      this.ticketText = "";
      this.wrongTicketText = false;
      this.isSending = false;
      this.ticketImageName = "";
      this.selectedTicketImage = undefined;
    },
    seeAll() {
      const table = document.getElementById("tickets-table");
      table.style.overflowY = "scroll";
      document.querySelector(".table-footer").style.display = "none";
    },
    toggleDropDowns(event) {
      event.stopPropagation();
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    uploadTicketImage(event) {
      try {
        this.ticketImageName = event.target.files[0].name;
        this.selectedTicketImage = event.target.files[0];
      } catch {}
      // this.createBase64Image(NTImg);
    },
    chooseImportance(event) {
      this.importance = event.target.innerHTML.trim();
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    chooseDepartman(event) {
      this.departman = event.target.innerHTML.trim();
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    async submitTicket() {
      this.isSending = true;
      if (this.ticketTitle == "") {
        this.wrongTitle = true;
      } else {
        this.wrongTitle = false;
      }
      if (this.importance == "") {
        this.wrongImportance = true;
      } else {
        this.wrongImportance = false;
      }
      if (this.departman == "") {
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
        this.importance != "" &&
        this.departman != "" &&
        this.ticketText != ""
      ) {
        let formData = new FormData();
        // formData.append("ParentId", null);
        formData.append("Title", this.ticketTitle);
        formData.append("Text", this.ticketText);
        formData.append("Department", this.departman);
        formData.append("Importance", this.importance);
        formData.append("AttachImage", this.selectedTicketImage);
        const postTicket = await this.$axios.post(
          "/api/Student/StudentTicket/AddTicket",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (postTicket.data.statusCode == 200 && postTicket.data.message == "Success") {
          this.$swal({
            text: "تیکت شما ثبت شد.منتظر پاسخ ادمین ها بمانید",
            icon: "success",
            showCloseButton: true,
            confirmButtonText: "تایید",
          });
          this.resetData();
          this.$router.push("/my/support");
        }
      }
      this.isSending = false;
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
