<template>
  <div class="news">
    <div class="banner expand">
      <div class="bg-image"></div>
      <h2 class="title">
        <!-- <template v-if="loading">
          <skeleton
            v-if="loading"
            class="skeleton"
            width="120px"
            height="35px"
            borderRadius="5px"
          />
        </template> -->
        <!-- <span v-else>
          {{ newsDetail.title }}
        </span> -->
      </h2>
      <!-- <p class="banner-detail">{{ newsDetail.shortDescription }}</p> -->
      <div class="banner-overlay"></div>
    </div>

    <div class="container-md container-fluid main-container">
      <div class="row">
        <aside class="news-info col-12 col-lg-2">
          <div class="item">
            <img src="@/static/images/main-page-images/time-black.png" alt="زمان" />
            <span class="title">زمان مطالعه</span>
            <template v-if="loading">
              <skeleton
                v-if="loading"
                class="skeleton"
                width="80px"
                height="20px"
                borderRadius="5px"
              />
            </template>
            <span class="persian-number" v-else>{{ newsDetail.readTime }}</span>
          </div>
          <div class="item">
            <img src="@/static/images/main-page-images/chat-black.png" alt="نظرات" />
            <span class="title">نظرات</span>
            <template v-if="loading">
              <skeleton
                v-if="loading"
                class="skeleton"
                width="80px"
                height="20px"
                borderRadius="5px"
              />
            </template>
            <span class="persian-number" v-else>{{ newsDetail.commentCount }}</span>
          </div>
          <div class="item">
            <span class="title">به اشتراک گذاری</span>

            <div class="social-media">
              <template v-if="loading">
                <skeleton
                  class="skeleton"
                  width="20px"
                  height="20px"
                  borderRadius="5px"
                />
                <skeleton
                  class="skeleton mr-2"
                  width="20px"
                  height="20px"
                  borderRadius="5px"
                />
                <skeleton
                  class="skeleton mr-2"
                  width="20px"
                  height="20px"
                  borderRadius="5px"
                />
              </template>
              <template v-else>
                <a
                  :href="
                    'https://www.linkedin.com/sharing/share-offsite/?url=https://www.daneshkadeonline.ir' +
                    $route.fullPath
                  "
                  target="_blank"
                >
                  <svg
                    class="linkedin"
                    xmlns="http://www.w3.org/2000/svg"
                    width="35.041"
                    height="39.333"
                    viewBox="0 0 35.041 39.333"
                  >
                    <path
                      data-name="Path 89153"
                      d="M8.478,151.625H1.848A1.35,1.35,0,0,0,.5,152.973v24.989a1.349,1.349,0,0,0,1.348,1.348H8.478a1.349,1.349,0,0,0,1.348-1.348V152.973A1.349,1.349,0,0,0,8.478,151.625ZM7.518,177H2.808V153.933H7.518Zm0,0"
                      transform="translate(-0.461 -139.977)"
                    />
                    <path
                      data-name="Path 89154"
                      d="M4.7,0A4.7,4.7,0,1,0,9.4,4.7,4.707,4.707,0,0,0,4.7,0Zm0,7.1A2.394,2.394,0,1,1,7.1,4.7,2.4,2.4,0,0,1,4.7,7.1Zm0,0"
                    />
                    <path
                      data-name="Path 89155"
                      d="M176.549,154.559a8.6,8.6,0,0,0-5.672-1.992,8.7,8.7,0,0,0-3.684.9v-.546a1.288,1.288,0,0,0-1.287-1.287h-6.751a1.287,1.287,0,0,0-1.287,1.287v25.11a1.287,1.287,0,0,0,1.287,1.287h6.885a1.154,1.154,0,0,0,1.154-1.154V163.189a2.388,2.388,0,0,1,2.284-2.4,2.358,2.358,0,0,1,2.427,2.354v15.045a1.13,1.13,0,0,0,1.13,1.13h6.617a1.13,1.13,0,0,0,1.13-1.13V163.6a11.744,11.744,0,0,0-4.231-9.038Zm1.923,22.447h-4.26V163.139a4.663,4.663,0,0,0-9.327,0v13.867h-4.71V153.937h4.71v1.677h0a1.153,1.153,0,0,0,1.918.864,6.394,6.394,0,0,1,4.115-1.6,6.289,6.289,0,0,1,4.151,1.457,9.441,9.441,0,0,1,3.4,7.266Zm0,0"
                      transform="translate(-145.74 -139.981)"
                    />
                  </svg>
                </a>

                <a href="#">
                  <svg
                    class="instagram"
                    data-name="instagram (14)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="39.333"
                    height="39.333"
                    viewBox="0 0 39.333 39.333"
                  >
                    <path
                      data-name="Path 89150"
                      d="M28.685,0H10.646A10.659,10.659,0,0,0,0,10.647V28.686A10.659,10.659,0,0,0,10.646,39.333H28.686A10.659,10.659,0,0,0,39.332,28.686V10.647A10.659,10.659,0,0,0,28.685,0Zm8.341,28.686a8.351,8.351,0,0,1-8.341,8.341H10.646A8.351,8.351,0,0,1,2.3,28.686V10.647a8.351,8.351,0,0,1,8.341-8.341H28.686a8.351,8.351,0,0,1,8.341,8.341Zm0,0"
                      transform="translate(0.001 0)"
                    />
                    <path
                      data-name="Path 89151"
                      d="M126.759,116a10.755,10.755,0,1,0,10.755,10.755A10.767,10.767,0,0,0,126.759,116Zm0,19.2a8.449,8.449,0,1,1,8.449-8.449A8.459,8.459,0,0,1,126.759,135.208Zm0,0"
                      transform="translate(-107.092 -107.092)"
                    />
                    <path
                      data-name="Path 89152"
                      d="M361.155,66.285a3.178,3.178,0,1,0,3.178,3.178A3.182,3.182,0,0,0,361.155,66.285Zm0,4.05a.872.872,0,1,1,.872-.872A.873.873,0,0,1,361.155,70.335Zm0,0"
                      transform="translate(-330.476 -61.193)"
                    />
                  </svg>
                </a>
                <a
                  :href="
                    'https://twitter.com/intent/tweet?url=https://www.daneshkadeonline.ir' +
                    $route.fullPath
                  "
                  target="_blank"
                >
                  <svg
                    class="twitter"
                    xmlns="http://www.w3.org/2000/svg"
                    width="39.333"
                    height="32.474"
                    viewBox="0 0 39.333 32.474"
                  >
                    <path
                      d="M14.966,32.474C8.4,32.474,3.213,31.327.73,29.327l-.048-.039-.044-.044a2.019,2.019,0,0,1-.53-2.123l.023-.063a2.056,2.056,0,0,1,1.876-1.291A16.95,16.95,0,0,0,6.49,25.15a8.507,8.507,0,0,1-4.483-5.18,1.836,1.836,0,0,1,.641-2.141,1.874,1.874,0,0,1,.559-.286A12.405,12.405,0,0,1,.663,12.984l-.015-.051-.011-.052a1.912,1.912,0,0,1,.886-2.052,1.9,1.9,0,0,1,.907-.256A9.591,9.591,0,0,1,1.7,8.363,9.249,9.249,0,0,1,2.689,2.2l.244-.488a1.36,1.36,0,0,1,2.179-.354l.444.445C9.067,5.484,12.212,7.231,17.65,8.426a9.634,9.634,0,0,1,2.6-5.554A9.125,9.125,0,0,1,26.765,0h.016a13.051,13.051,0,0,1,5.386,1.753c1.159-.379,2.555-.967,4-1.587a1.829,1.829,0,0,1,2.047.36,1.8,1.8,0,0,1,.39,1.975q-.158.44-.358.862a1.832,1.832,0,0,1,.533.368,1.978,1.978,0,0,1,.492,1.849l-.018.063A7.546,7.546,0,0,1,36.225,9.8c-.236,12.544-9.682,22.669-21.259,22.669ZM2.942,28.043c2.339,1.323,6.8,2.124,12.024,2.124a18.011,18.011,0,0,0,13.352-6.075A21.764,21.764,0,0,0,33.923,9.324V9.261a1.359,1.359,0,0,1,.725-1.2,4.9,4.9,0,0,0,2.12-2.345,1.36,1.36,0,0,1-1.31-2.142,7.488,7.488,0,0,0,.514-.814c-1.251.525-2.439,1-3.471,1.31a1.475,1.475,0,0,1-1.135-.122,11.238,11.238,0,0,0-4.578-1.638,7.172,7.172,0,0,0-6.9,7.268,1.361,1.361,0,0,1-1.624,1.335C12,9.675,8.281,7.823,4.418,3.941a6.81,6.81,0,0,0-.449,3.982,8.416,8.416,0,0,0,2,3.873,1.36,1.36,0,0,1-1.373,2.211,6.23,6.23,0,0,1-1.268-.487,11.491,11.491,0,0,0,3.94,4.569,1.36,1.36,0,0,1-.87,2.478,6.115,6.115,0,0,1-1.805-.39,6.2,6.2,0,0,0,4.95,3.507,1.36,1.36,0,0,1,.4,2.543,16.344,16.344,0,0,1-7,1.815Zm0,0"
                      transform="translate(0 0)"
                    />
                  </svg>
                </a>
              </template>
            </div>
          </div>
          <div class="item link">
            <span class="title">لینک کوتاه</span>
            <template v-if="loading">
              <skeleton class="skeleton" width="80px" height="20px" borderRadius="5px" />
            </template>
            <a href="#" class="link" v-else>
              com/c/{{ newsDetail.shortLinkKey }}
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
            </a>
          </div>
        </aside>
        <main class="news-content col-12 col-lg-10">
          <template v-if="loading">
            <skeleton class="skeleton" width="70%" height="20px" borderRadius="5px" />
            <br />
            <skeleton class="skeleton mt" width="60%" height="20px" borderRadius="5px" />
            <br />
            <skeleton class="skeleton mt" width="50%" height="20px" borderRadius="5px" />
            <br />
            <skeleton class="skeleton mt" width="30%" height="20px" borderRadius="5px" />
          </template>
          <template v-else>
            <div class="part">
              <h2 class="part-title">{{ newsDetail.title }}</h2>
              <p class="part-detail">{{ newsDetail.shortDescription }}</p>
            </div>

            <div v-html="newsDetail.text"></div>
          </template>
          <!-- <div class="part">
            <h4 class="part-title">یک عنوان تستی</h4>
            <p class="part-detail">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
              طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
              لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف
              بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
              آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت
            </p>
          </div>
          <div class="table-of-content">
            <a href="#">
              <span class="left-arrow">&larr;</span>

              یک عنوان تستی
            </a>
            <a href="#">
              <span class="left-arrow">&larr;</span>

              لورم ایپسوم متن ساختگی
            </a>
            <a href="#">
              <span class="left-arrow">&larr;</span>

              چگونه میتوان دنیای بهتری را ساخت؟
            </a>
            <a href="#">
              <span class="left-arrow">&larr;</span>

              سخن پایانی و نتیجه گیری
            </a>
          </div>
          <p class="paragraph">
            لورم ایپسوم
            <em class="highlight-text"> متن ساختگی با تولید </em>
            سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
            بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
            تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
            کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان
            را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
          </p>
          <div class="part">
            <h4 class="part-title">یک عنوان تستی</h4>
            <p class="part-detail">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
              طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
              لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف
              بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
              آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت
            </p>
          </div> -->
        </main>
      </div>
    </div>
    <div class="container-md container-fluid comments-ads-container" v-if="!loading">
      <div class="row">
        <div class="col-lg-2 col-12 ads-box-container">
          <div class="ads-box">
            <div class="ads"></div>
            <div class="ads"></div>
          </div>
        </div>
        <div class="col-lg-10 col-12 px-0">
          <section class="news-content comments">
            <header>
              <img src="@/static/images/main-page-images/chat.svg" alt="آیکون چت" />
              <h3>نظرات کاربران</h3>
            </header>
            <div class="messages custom-scrollbar">
              <div class="messages-box" v-if="commentsLoaded">
                <template v-for="commentGroup in commentGroups">
                  <div
                    class="person-message"
                    v-for="comment in commentGroup"
                    :key="comment.commentId"
                    :class="comment.parentId != null ? 'replied-message' : ''"
                  >
                    <img
                      :src="
                        comment.avatarImageName == null
                          ? '@/static/images/main-page-images/person-profile.png'
                          : 'https://api.daneshkadeonline.ir/Images/Public/Student/' +
                            comment.avatarImageName
                      "
                      class="person-message__image"
                      alt="تصویر پروفایل"
                    />
                    <div class="person-message__info">
                      <h4 class="person-name">{{ comment.userName }}</h4>
                      <p class="person-text">{{ comment.commentText }}</p>
                    </div>

                    <div class="person-message__sidebox">
                      <span class="message-time">
                        <span class="persian-number">
                          {{
                            Math.floor(
                              (new Date(
                                Date.now() + new Date().getTimezoneOffset() * 60000
                              ).getTime() -
                                new Date(comment.createDate).getTime()) /
                                3600000
                            )
                          }}
                        </span>
                        ساعت قبل
                        <span
                          class="like"
                          :class="
                            likedComments.includes(comment.commentId) ? 'liked' : ''
                          "
                          @click="likeComment($event, comment.commentId)"
                        >
                          <span class="persian-number count">{{
                            comment.likeCount
                          }}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20.736"
                            height="31.126"
                            viewBox="0 0 33.736 31.126"
                          >
                            <g data-name="heart (1)" transform="translate(1 1)">
                              <path
                                data-name="Path 713"
                                d="M23.255,0a8.474,8.474,0,0,0-7.387,4.323A8.474,8.474,0,0,0,8.481,0C3.8,0,0,4.344,0,9.028,0,20.792,15.868,29,15.868,29S31.736,20.792,31.736,9.028C31.736,4.344,27.938,0,23.255,0Zm0,0"
                                fill="none"
                                stroke="#8f96a2"
                                stroke-width="2"
                              />
                            </g>
                          </svg>
                        </span>
                      </span>
                      <a
                        href="#"
                        class="reply-btn"
                        @click.prevent="replayThis(comment.commentId, comment.userName)"
                        >پاسخ</a
                      >
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </section>
          <section class="news-content messages-form-box">
            <div class="aside">نظر خود را اینجا بنویسید</div>
            <form action="#">
              <template v-if="!replayToCommentName == ''">
                پاسخ به:
                <input
                  type="text"
                  :value="replayToCommentName"
                  placeholder="پاسخ به"
                  disabled
                />
              </template>
              <input
                type="text"
                v-if="!studentIsLogin"
                :class="noName ? 'red' : ''"
                v-model="commentName"
                placeholder="نام و نام خانوادگی"
              />
              <p class="wrong-text" v-if="noName">نام خود را وارد کنید</p>
              <!-- <input
                type="email"
                v-if="!studentIsLogin"
                v-model="commentEmail"
                placeholder="ایمیل"
              /> -->
              <textarea
                class="message"
                v-model="commentText"
                :class="noText ? 'red' : ''"
                placeholder="نظر شما"
              ></textarea>
              <p class="wrong-text" v-if="noText">متن کامنت خالی است!</p>
              <button class="submit-comment" @click.prevent="addComment">ثبت نظر</button>
            </form>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import skeleton from "@/components/skeleto-creator";
export default {
  layout: "mainPages",
  components: { skeleton },
  data() {
    return {
      newsDetail: "",
      commentGroups: [],
      studentIsLogin: "",
      commentName: "",
      commentEmail: "",
      commentText: "",
      commentsLoaded: false,
      likedComments: "",

      // form validation
      noText: false,
      noName: false,
      // replay
      replayToCommentName: "",
      replayToCommentId: "",
      loading: true,
    };
  },
  async beforeMount() {
    if (this.$route.params.id == undefined || isNaN(this.$route.params.id)) {
      this.$router.push("/articles-list");
    }
  },
  async mounted() {
    if (this.$cookies.get("key")) {
      const getData = await this.$axios.post(
        "/api/Student/StudentAccount/check-student-auth",
        {},
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (getData.data.statusCode == "200" && getData.data.message == "Success") {
        this.studentIsLogin = true;
      } else {
        this.$cookies.remove("refreshToken");
        this.$cookies.remove("key");
        this.studentIsLogin = false;
      }
    } else if (this.$cookies.get("refreshToken")) {
      const token = this.$cookies.get("refreshToken");
      const getToken = await this.$axios.post("/api/Student/StudentAccount/refresh", {
        refreshToken: token,
      });
      if (getToken.data.statusCode == 200 && getToken.data.message == "Success") {
        this.studentIsLogin = true;
        this.$store.dispatch("login/setLoginDetails", getToken);
      } else {
        this.studentIsLogin = false;
        this.$cookies.remove("refreshToken");
      }
    }
    const [news, comments, liked] = await Promise.all([
      this.$axios.get(`/api/News/Show/${this.$route.params.id}`),
      this.getComments(),
      this.commentLiked(this.$route.params.id),
    ]);
    // console.log(news);
    if (news.data.statusCode == 200 && news.data.message == "Success") {
      this.newsDetail = news.data.data;
      document.querySelector(
        ".bg-image"
      ).style.backgroundImage = `url(https://api.daneshkadeonline.ir/Images/Public/News/${news.data.data.imageName})`;
    } else {
      console.log("course");
    }
    this.loading = false;
  },
  methods: {
    replayThis(id, name) {
      this.replayToCommentName = name;
      this.replayToCommentId = id;
    },
    newsImage(image) {
      if (image != undefined)
        return "https://api.daneshkadeonline.ir/Images/Public/News/" + image;
    },
    async getComments() {
      this.commentGroups = [];
      const comments = await this.$axios.get(
        `/api/News/GetComments/${this.$route.params.id}`
      );
      if (comments.data.statusCode == 200 && comments.data.message == "Success") {
        for (const comment of comments.data.data) {
          if (comment.parentId == null) {
            let group = [];
            group.push(comment);
            this.commentGroups.push(group);
          }
        }
        for (const comment of comments.data.data) {
          if (comment.parentId != null) {
            for (const i of this.commentGroups) {
              for (const j of i) {
                if (comment.parentId == j.commentId) {
                  i.push(comment);
                }
              }
            }
          }
        }
        // for (const comment of comments.data.data) {
        //   if (comment.parentId == null) {
        //     let group = [];
        //     group.push(comment);
        //     this.commentGroups.push(group);
        //   } else {
        //     for (const i of this.commentGroups) {
        //       for (const j of i) {
        //         if (comment.parentId == j.commentId) {
        //           i.push(comment);
        //         }
        //       }
        //     }
        //   }
        // }
        this.commentsLoaded = true;
      }
    },
    async addComment() {
      if (!this.$cookies.get("key") && !this.$cookies.get("refreshToken")) {
        if (this.commentText.trim() == "" || this.commentName.trim() == "") {
          if (this.commentText.trim() == "") {
            this.noText = true;
          } else {
            this.noText = false;
          }
          if (this.commentName.trim() == "") {
            this.noName = true;
          } else {
            this.noName = false;
          }
        } else {
          const commentResp = await this.$axios.post("/api/News/AddComment", {
            id: this.$route.params.id,
            parentId: this.replayToCommentId == "" ? null : this.replayToCommentId,
            userName: this.commentName,
            commentText: this.commentText,
          });
          if (
            commentResp.data.statusCode == 200 &&
            commentResp.data.message == "Success"
          ) {
            this.$swal({
              text: "کامنت شما ثبت شد! بعد از تایید ادمین ها نشان داده خواهد شد",
              icon: "success",
              showCloseButton: true,
              confirmButtonText: "تایید",
            });
            this.getComments();
            this.commentName = "";
            this.commentText = "";
            this.noText = false;
            this.noName = false;
            this.replayToCommentId = "";
            this.replayToCommentName = "";
          }
        }
      } else if (!this.$cookies.get("key") && this.$cookies.get("refreshToken")) {
        this.refreshToken().then((res) => {
          if (res == true) {
            this.commentLogin();
          }
        });
      } else {
        this.commentLogin();
      }
    },
    async commentLogin() {
      if (this.commentText.trim() == "") {
        this.noText = true;
      } else {
        const commentResp = await this.$axios.post(
          "/api/News/AddComment",
          {
            id: this.$route.params.id,
            parentId: this.replayToCommentId == "" ? null : this.replayToCommentId,
            userName: this.commentName,
            commentText: this.commentText,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (commentResp.data.statusCode == 200 && commentResp.data.message == "Success") {
          this.$swal({
            text: "کامنت شما ثبت شد! بعد از تایید ادمین ها نشان داده خواهد شد",
            icon: "success",
            showCloseButton: true,
            confirmButtonText: "تایید",
          });
          this.getComments();
          this.commentName = "";
          this.commentText = "";
          this.noText = false;
          this.noName = false;
          this.replayToCommentId = "";
          this.replayToCommentName = "";
        }
      }
    },
    async refreshToken() {
      const token = this.$cookies.get("refreshToken");
      const getToken = await this.$axios.post("/api/Student/StudentAccount/refresh", {
        refreshToken: token,
      });
      if (getToken.data.statusCode == 200 && getToken.data.message == "Success") {
        await this.$store.dispatch("login/setLoginDetails", getToken);
        return true;
      } else {
        this.studentIsLogin = false;
        this.$cookies.remove("refreshToken");
        return false;
      }
    },
    async likeComment(event, id) {
      event.target.closest(".like").classList.toggle("liked");
      let myIp = "";
      await fetch("https://api.ipify.org?format=json")
        .then((x) => x.json())
        .then(({ ip }) => {
          myIp = ip;
        });
      if (this.studentIsLogin == true) {
        if (!this.$cookies.get("key") && this.$cookies.get("refreshToken")) {
          this.refreshToken().then(async (res) => {
            if (res == true) {
              const likeResp = await this.$axios.get(`/api/News/CommentLike/${id}`, {
                headers: {
                  Authorization: `Bearer ${this.$cookies.get("key")}`,
                },
              });
            }
          });
        } else if (this.$cookies.get("key")) {
          const likeResp = await this.$axios.get(`/api/News/CommentLike/${id}`, {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          });
        }
      } else {
        const likeResp = await this.$axios.get(
          `/api/Course/CommentLike/${id}?ip=${myIp}`
        );
      }
    },
    async commentLiked(id) {
      let myIp = "";
      await fetch("https://api.ipify.org?format=json")
        .then((x) => x.json())
        .then(({ ip }) => {
          myIp = ip;
        });
      if (this.studentIsLogin == true) {
        if (!this.$cookies.get("key") && this.$cookies.get("refreshToken")) {
          this.refreshToken().then(async (res) => {
            if (res == true) {
              const checkLike = await this.$axios.get(`/api/News/GetNewsLikeList/${id}`, {
                headers: {
                  Authorization: `Bearer ${this.$cookies.get("key")}`,
                },
              });
              if (
                checkLike.data.statusCode == 200 &&
                checkLike.data.message == "Success"
              ) {
                this.likedComments = checkLike.data.data;
              }
            }
          });
        } else if (this.$cookies.get("key")) {
          const checkLike = await this.$axios.get(`/api/News/GetNewsLikeList/${id}`, {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          });
          if (checkLike.data.statusCode == 200 && checkLike.data.message == "Success") {
            // console.log(checkLike);
            this.likedComments = checkLike.data.data;
          }
        }
      } else {
        const checkLike = await this.$axios.get(
          `/api/News/GetNewsLikeList/${id}?ip=${myIp}`
        );
        if (checkLike.data.statusCode == 200 && checkLike.data.message == "Success") {
          this.likedComments = checkLike.data.data;
        }
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
@import "@/assets/styles/pages/news.scss";
.wrong-text {
  position: relative;
  display: block;
  width: 100%;
  font-size: 10px;
  color: $active-color;
}
textarea.message.red,
input.red {
  border: 1px solid red !important;
}
</style>
