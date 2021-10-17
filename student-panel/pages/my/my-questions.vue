<template>
  <div class="panel-table my-questions">
    <div class="box-header">
      <h3>
        <skeleton
          v-if="loading"
          class="skeleton"
          width="95px"
          height="30px"
          borderRadius="5px"
        />
        <span v-else> سوالات من </span>
      </h3>
    </div>
    <section class="box-content custom-scrollbar" id="questions-table">
      <header class="table-row table-header">
        <template v-if="loading">
          <span v-for="i in 6" :key="i">
            <skeleton class="skeleton" width="35px" height="20px" borderRadius="5px" />
          </span>
        </template>
        <template v-else>
          <span>نام دوره</span>
          <span>تاریخ</span>
          <span>ساعت</span>
          <span>جزئیات</span>
          <span>توضیحات</span>
          <span>وضعیت</span>
          <span>حذف</span>
        </template>
      </header>
      <template v-if="loading">
        <div class="table-row" v-for="i in 4" :key="i.index">
          <span v-for="j in 6" :key="j">
            <skeleton class="skeleton" width="35px" height="20px" borderRadius="5px" />
          </span>
        </div>
      </template>
      <template v-else>
        <div class="table-row" v-for="question in myMessages" :key="question.questionId">
          <span>{{ question.courseName }}</span>
          <span class="persian-number">{{
            new Date(question.sendDate).toLocaleDateString("fa-IR")
          }}</span>
          <span class="persian-number">{{
            new Date(question.sendDate).toLocaleTimeString("fa-IR")
          }}</span>
          <span class="details">
            <button
              type="button"
              class="file-btn"
              v-if="question.isAttachFile"
              @click="downloadAttachFile(question.questionId)"
            >
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
            </button>
            <button
              v-if="question.isAudio"
              type="button"
              class="play-btn"
              @click="downloadAttachAudio(question.questionId)"
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
          </span>
          <span @click="seeMyQuestion(question.text)">مشاهده</span>
          <span class="question-state">
            <button class="view-answer"></button>
            <span class="state" v-if="question.status == 'NotAnswered'">
              پاسخ داده نشده
            </span>
            <span class="question-state" v-else-if="question.status == 'Answered'">
              <nuxt-link
                :to="'/my/question-response/' + question.questionId"
                class="view-answer"
              >
                مشاهده پاسخ
              </nuxt-link>
              <span class="state"> </span>
            </span>
            <span class="question-state" v-else-if="question.status == 'Closed'">
              <nuxt-link
                class="view-answer"
                :to="'/my/question-response/'+question.questionId"
                v-if="question.responseCount > 0"
              >
                مشاهده پاسخ
              </nuxt-link>
              <span class="state"> بسته شده </span>
            </span>
          </span>
          <span>
            <button class="delete btn" @click="deleteQuestion(question.questionId)">
              حذف
            </button>
          </span>
        </div>

        <!-- <div class="table-row">
          <span> دوره رضایی</span>
          <span class="persian-number">99/02/18</span>
          <span class="persian-number">12:34</span>
          <span class="details">
            <button type="button" class="file-btn">
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
            </button>
            <button type="button" class="play-btn">
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
          </span>
          <span>مشاهده</span>
          <span class="question-state">
            <button class="view-answer">مشاهده پاسخ</button>
            <span class="state"> </span>
          </span>
          <span>
            <button class="delete btn">حذف</button>
          </span>
        </div> -->
        <!-- <div class="table-row">
          <span> دوره رضایی</span>
          <span class="persian-number">99/02/18</span>
          <span class="persian-number">12:34</span>
          <span class="details">
            <button type="button" class="file-btn">
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
            </button>
            <button type="button" class="play-btn">
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
          </span>
          <span>مشاهده</span>
          <span class="question-state">
            <button class="view-answer">مشاهده پاسخ</button>
            <span class="state"> بسته شده </span>
          </span>
          <span>
            <button class="delete btn">حذف</button>
          </span>
        </div> -->
        <!-- <div class="table-row">
          <span> دوره رضایی</span>
          <span class="persian-number">99/02/18</span>
          <span class="persian-number">12:34</span>
          <span class="details">
            <button type="button" class="file-btn">
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
            </button>
            <button type="button" class="play-btn">
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
          </span>
          <span>مشاهده</span>
          <span class="question-state">
            <button class="view-answer"></button>
            <span class="state"> پاسخ داده نشده </span>
          </span>
          <span>
            <button class="delete btn">حذف</button>
          </span>
        </div> -->
      </template>

      <footer class="table-footer">
        <hr />
        <skeleton
          v-if="loading"
          class="skeleton"
          width="150px"
          height="30px"
          borderRadius="5px"
        />
        <a href="" type="button" @click.prevent="seeAll" v-else> مشاهده همه سوالات </a>
      </footer>
    </section>
    <div class="basic-modal question-item-detail">
      <div class="content-box">
        <header>
          <button class="close-btn" @click.prevent="closeQuestionModal">&times;</button>
        </header>
        <h4 class="title">سوال شما</h4>
        <p class="details custom-scrollbar">{{ myQuestionText }}</p>
      </div>
    </div>
    <div class="basic-modal question-item-teacher-answer">
      <!--this modal use voice-info css component-->
      <div class="content-box">
        <header>
          <button class="close-btn">&times;</button>
        </header>
        <h4 class="title">پاسخ مدرس</h4>
        <p class="message custom-scrollbar">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
          طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
          لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود
          ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده،
          شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای
          طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد،
          در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط
          سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی
          سوالات پیوسته اهل دنیای
        </p>
        <footer>
          <!-- <span class="question-state-text closed">این سوال از طرف مدرس بسته شده</span> -->
          <a href="#" class="question-state-text open">برای ادامه پرسش کلیک کنید</a>
          <div class="voice-info">
            <div class="size-box">
              <span class="persian-number size">128 کیلو بایت</span>
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
            <div class="play-box">
              <span class="duration persian-number"> 00:34 </span>
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
import skeleton from "@/components/skeleto-creator";
export default {
  components: { skeleton },
  layout: "dashboard",
  middleware: "userIsNotLog",
  data() {
    return {
      loading: false,
      myMessages: "",
      myQuestionText: "",
      audioBase64Data: "",
    };
  },
  async mounted() {
    this.getQuestions();
  },
  methods: {
    seeAll() {
      const table = document.getElementById("questions-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer").style.display = "none");
    },
    async getQuestions() {
      this.myMessages = "";
      this.loading = true;
      const messages = await this.$axios.get(
        "/api/Student/StudentQuestion/GetQuestions",
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      this.myMessages = messages.data.data;
      this.loading = false;
    },
    async deleteQuestion(id) {
      const deleteResp = await this.$axios.delete(
        `/api/Student/StudentQuestion/RemoveQuestion/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (deleteResp.data.statusCode == 200 && deleteResp.data.message == "Success") {
        this.$swal({
          text: "با موفقیت حذف شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "ادامه",
        });
        this.getQuestions();
      }
    },
    seeMyQuestion(text) {
      this.myQuestionText = text;
      const modal = document.querySelector(".question-item-detail");
      modal.style.visibility = "visible";
      modal.style.opacity = "1";
    },
    closeQuestionModal() {
      const modal = document.querySelector(".question-item-detail");
      modal.style.visibility = "hidden";
      modal.style.opacity = "0";
    },
    async downloadAttachAudio(id) {
      const audioresp = await this.$axios.get(
        "/api/Student/StudentQuestion/GetQuestionAudioBase64/" + id,
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
    async downloadAttachFile(id) {
      const download = await this.$axios.get(
        "/api/Student/StudentQuestion/GetQuestionAttachImageBase64/" + id,
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
    closePlayer() {
      const audioPlayerModal = document.querySelector(".audioPlayerModal");
      this.audioBase64Data = "";
      audioPlayerModal.style.display = "none";
    },
  },
};
</script>
<style lang="scss">
// @import "@/assets/styles/stu-panel.scss";
@import "@/assets/swal-style.scss";
</style>
