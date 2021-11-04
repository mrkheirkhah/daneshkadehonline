<template>
  <div class="about-us">
    <div class="panel-admin-content-item about-us">
      <header>
        <p class="section-header">سوالات متداول</p>
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
        <p class="section-title-text">عنوان صفحه</p>
      </div>
      <form action="">
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              v-model="pageTitle"
              placeholder="عنوان صفحه"
            />
          </label>
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              v-model="pageDescription"
              placeholder="توضیحات صفحه"
            />
          </label>
        </div>
        <button class="form-btn" @click.prevent="changePageTitle" :disabled="isSending">
          تائید
        </button>
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
        <p class="section-title-text">افزودن سوال</p>
      </div>
      <form action="">
        <div class="form-row">
          <label for="" class="form-row-col">
            <textarea
              type="text"
              class="message-textarea form-input"
              style="resize: vertical"
              v-model="questionText"
              placeholder="سوال"
            ></textarea>
          </label>
          <label for="" class="form-row-col">
            <textarea
              type="text"
              class="message-textarea form-input"
              style="resize: vertical"
              v-model="answerText"
              placeholder="جواب"
            ></textarea>
          </label>
        </div>

        <button
          class="form-btn"
          @click.prevent="addQuestion"
          v-if="submitType == 'add'"
          :disabled="isSendingQuestion"
        >
          افزودن
        </button>
        <button
          class="form-btn"
          @click.prevent="submitEditQuestion"
          v-else
          :disabled="isSendingQuestion"
        >
          ویرایش
        </button>
      </form>
    </div>
    <div class="panel-table about-us-list">
      <div class="box-header">
        <h3>لیست سوالات</h3>
      </div>
      <section class="box-content custom-scrollbar" id="questions-table">
        <header class="table-row table-header">
          <span>سوال </span>
          <span>پاسخ </span>
          <span class="edit">ویرایش</span>
          <span class="delete">حذف</span>
        </header>
        <div class="table-row" v-for="question in questionsList" :key="question.id">
          <span>{{ question.title }}</span>
          <span class="persian-number">{{ question.text }}</span>
          <span class="edit">
            <button @click.prevent="editQuestion(question.id)">ویرایش</button>
          </span>
          <span class="delete">
            <button @click.prevent="deleteQuestion(question.id)">حذف</button>
          </span>
        </div>

        <footer class="table-footer">
          <hr />
          <a href="" type="button" @click.prevent="seeAll"> مشاهده همه </a>
        </footer>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  data() {
    return {
      pageTitle: "",
      pageDescription: "",
      submitType: "add",
      // add question data
      questionsList: "",
      questionText: "",
      answerText: "",

      editThisId: "",
      isSending: false,
      isSendingQuestion: false,
    };
  },
  async mounted() {
    await Promise.all([this.pageDetails(), this.questions()]);
  },
  methods: {
    seeAll() {
      const table = document.getElementById("questions-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer").style.display = "none");
    },
    resetData() {
      this.pageDescription = "";
      this.pageDescription = "";

      // add member data
      this.questionsList = "";
      this.questionText = "";
      this.answerText = "";
      this.submitType = "add";
      this.editThisId = "";
    },
    async pageDetails() {
      const pageDetails = await this.$axios.get(
        "/api/Admin/AdminManageSiteInfo/FrequentlyQuestion",
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (pageDetails.data.statusCode == 200 && pageDetails.data.message == "Success") {
        this.pageTitle = pageDetails.data.data.pageTitle;
        this.pageDescription = pageDetails.data.data.pageDescription;
      }
    },
    async changePageTitle() {
      this.isSending = true;
      const changePageResp = await this.$axios.post(
        "/api/Admin/AdminManageSiteInfo/FrequentlyQuestion",
        {
          pageTitle: this.pageTitle,
          pageDescription: this.pageDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        changePageResp.data.statusCode == 200 &&
        changePageResp.data.message == "Success"
      ) {
        this.$swal({
          text: "ثبت شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
        this.pageDetails();
      }
      this.isSending = false;
    },

    // add question
    async questions() {
      const questions = await this.$axios.get(
        "/api/Admin/AdminManageSiteInfo/GetFrequentlyQuestions",
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (questions.data.statusCode == 200 && questions.data.message == "Success") {
        this.questionsList = questions.data.data;
      }
    },
    async addQuestion() {
      this.isSendingQuestion = true;
      const addQuestionResp = await this.$axios.post(
        `/api/Admin/AdminManageSiteInfo/AddFrequentlyQuestion`,
        {
          title: this.questionText,
          text: this.answerText,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        addQuestionResp.data.statusCode == 200 &&
        addQuestionResp.data.message == "Success"
      ) {
        this.$swal({
          text: "ثبت شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
        this.resetData();
        this.questions();
      }
      this.isSendingQuestion = false;
    },
    async submitEditQuestion() {
      this.isSendingQuestion = true;
      const editQuestionResp = await this.$axios.put(
        `/api/Admin/AdminManageSiteInfo/EditFrequentlyQuestion`,
        {
          id: this.editThisId,
          title: this.questionText,
          text: this.answerText,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        editQuestionResp.data.statusCode == 200 &&
        editQuestionResp.data.message == "Success"
      ) {
        this.$swal({
          text: "ویرایش شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
        this.resetData();
        this.questions();
      }
      this.isSendingQuestion = false;
    },
    async editQuestion(id) {
      this.editThisId = id;
      const editDetails = await this.$axios.get(
        `/api/Admin/AdminManageSiteInfo/GetFrequentlyQuestion/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (editDetails.data.statusCode == 200 && editDetails.data.message == "Success") {
        this.submitType = "edit";
        const details = editDetails.data.data;
        this.questionText = details.title;
        this.answerText = details.text;
      }
    },
    async deleteQuestion(id) {
      this.$swal({
        text: "از پاک کردن این سوال اطمینان دارید؟",
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "بله",
        cancelButtonText: "خیر",
      }).then(async (clickedBut) => {
        if (clickedBut.isConfirmed) {
          const blockResp = await this.$axios.delete(
            `/api/Admin/AdminManageSiteInfo/RemoveFrequentlyQuestion/${id}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (blockResp.data.statusCode == 200 && blockResp.data.message == "Success") {
            this.$swal({
              text: "انجام شد",
              icon: "success",
              showCloseButton: true,
              confirmButtonText: "تایید",
            }).then(() => {
              this.resetData();
              this.questions()();
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
</style>
