<template>
  <header class="dashboard-header">
    <div v-if="loading" class="header-skeleton">
      <span>
        <skeleton
          class="skeleton header-text-skeleton"
          width="130px"
          height="30px"
          borderRadius="5px"
        />
      </span>
      <span class="header-skeleton-left">
        <span>
          <skeleton
            class="skeleton left-section"
            width="30px"
            height="30px"
            borderRadius="5px"
          />
          <skeleton
            class="skeleton left-section"
            width="30px"
            height="20px"
            borderRadius="5px"
          />
        </span>
        <span>
          <skeleton
            class="skeleton left-section"
            width="30px"
            height="30px"
            borderRadius="5px"
          />
          <skeleton
            class="skeleton left-section"
            width="30px"
            height="20px"
            borderRadius="5px"
          />
        </span>
        <span>
          <skeleton
            class="skeleton left-section"
            width="30px"
            height="30px"
            borderRadius="5px"
          />
          <skeleton
            class="skeleton left-section"
            width="30px"
            height="20px"
            borderRadius="5px"
          />
        </span>
        <span>
          <skeleton
            class="skeleton left-section"
            width="30px"
            height="30px"
            borderRadius="5px"
          />
          <skeleton
            class="skeleton left-section"
            width="30px"
            height="20px"
            borderRadius="5px"
          />
        </span>
      </span>
    </div>
    <template v-else>
      <span> داشبورد </span>
      <div class="left-section">
        <button href="#" class="newspaper-btn dashboard-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="cls-1"
            width="22"
            height="20.359"
            viewBox="0 0 22 20.359"
          >
            <g id="newspaper" transform="translate(0.001 0.001)">
              <path
                id="Path_261"
                data-name="Path 261"
                d="M20.889,0H4.793a1.112,1.112,0,0,0-1.11,1.11V2.8H1.11A1.112,1.112,0,0,0,0,3.906V18.195a2.166,2.166,0,0,0,2.148,2.163H13.563a.322.322,0,1,0,0-.645H3.7a2.157,2.157,0,0,0,.625-1.519V10.659a.322.322,0,1,0-.645,0v7.536a1.521,1.521,0,0,1-1.511,1.519H2.163A1.521,1.521,0,0,1,.644,18.195V3.906A.467.467,0,0,1,1.11,3.44H3.683V9.456a.322.322,0,1,0,.645,0V1.11A.466.466,0,0,1,4.793.644h16.1a.466.466,0,0,1,.466.466V18.195a1.521,1.521,0,0,1-1.519,1.519H14.766a.322.322,0,1,0,0,.645h5.069A2.166,2.166,0,0,0,22,18.195V1.11A1.112,1.112,0,0,0,20.889,0Zm0,0"
              />
              <path
                id="Path_262"
                data-name="Path 262"
                d="M147.336,166.852h4.42a.763.763,0,0,0,.763-.763v-4.42a.763.763,0,0,0-.763-.763h-4.42a.763.763,0,0,0-.763.763v4.42A.763.763,0,0,0,147.336,166.852Zm-.118-5.182a.118.118,0,0,1,.118-.118h4.42a.118.118,0,0,1,.118.118v4.42a.118.118,0,0,1-.118.118h-4.42a.118.118,0,0,1-.118-.118Zm0,0"
                transform="translate(-140.276 -153.993)"
              />
              <path
                id="Path_263"
                data-name="Path 263"
                d="M305.013,161.551h5.981a.322.322,0,0,0,0-.645h-5.981a.322.322,0,0,0,0,.645Zm0,0"
                transform="translate(-291.599 -153.993)"
              />
              <path
                id="Path_264"
                data-name="Path 264"
                d="M305.013,223.231h5.981a.322.322,0,0,0,0-.645h-5.981a.322.322,0,0,0,0,.645Zm0,0"
                transform="translate(-291.599 -213.022)"
              />
              <path
                id="Path_265"
                data-name="Path 265"
                d="M305.013,284.907h5.981a.322.322,0,0,0,0-.645h-5.981a.322.322,0,0,0,0,.645Zm0,0"
                transform="translate(-291.599 -272.048)"
              />
              <path
                id="Path_266"
                data-name="Path 266"
                d="M146.9,346.583h12.775a.322.322,0,0,0,0-.645H146.9a.322.322,0,0,0,0,.645Zm0,0"
                transform="translate(-140.276 -331.074)"
              />
              <path
                id="Path_267"
                data-name="Path 267"
                d="M146.9,408.262h12.775a.322.322,0,1,0,0-.645H146.9a.322.322,0,1,0,0,.645Zm0,0"
                transform="translate(-140.276 -390.103)"
              />
              <path
                id="Path_268"
                data-name="Path 268"
                d="M146.766,41.89V38.484a.174.174,0,0,1,.1-.16.492.492,0,0,1,.241-.055.51.51,0,0,1,.289.068.853.853,0,0,1,.22.294l1.013,1.957V38.479a.169.169,0,0,1,.1-.157.581.581,0,0,1,.483,0,.169.169,0,0,1,.1.157v3.41a.175.175,0,0,1-.1.157.476.476,0,0,1-.239.058.41.41,0,0,1-.394-.215l-1.128-2.109V41.89a.175.175,0,0,1-.1.157.528.528,0,0,1-.48,0,.175.175,0,0,1-.1-.157Zm0,0"
                transform="translate(-140.46 -36.625)"
              />
              <path
                id="Path_269"
                data-name="Path 269"
                d="M220.645,41.89V38.484a.179.179,0,0,1,.089-.157.378.378,0,0,1,.21-.058h1.868a.177.177,0,0,1,.16.089.381.381,0,0,1,.055.2.388.388,0,0,1-.058.215.179.179,0,0,1-.157.089h-1.485v1.049h.8a.183.183,0,0,1,.157.081.322.322,0,0,1,.058.192.316.316,0,0,1-.055.181.181.181,0,0,1-.16.081h-.8v1.055h1.485a.179.179,0,0,1,.157.089.388.388,0,0,1,.058.215.381.381,0,0,1-.055.2.177.177,0,0,1-.16.089h-1.868a.378.378,0,0,1-.21-.058A.179.179,0,0,1,220.645,41.89Zm0,0"
                transform="translate(-211.165 -36.625)"
              />
              <path
                id="Path_270"
                data-name="Path 270"
                d="M284.023,38.542a.23.23,0,0,1,.142-.192.582.582,0,0,1,.294-.081q.189,0,.226.136l.829,2.844.446-1.826q.047-.189.336-.189t.331.189l.446,1.826.829-2.844q.037-.136.226-.136a.583.583,0,0,1,.294.081.23.23,0,0,1,.142.192.2.2,0,0,1-.01.063l-1.039,3.3q-.079.231-.446.231a.647.647,0,0,1-.283-.06.255.255,0,0,1-.152-.171l-.336-1.417-.341,1.417a.255.255,0,0,1-.152.171.646.646,0,0,1-.283.06.659.659,0,0,1-.289-.06.272.272,0,0,1-.157-.171l-1.039-3.3A.2.2,0,0,1,284.023,38.542Zm0,0"
                transform="translate(-271.819 -36.626)"
              />
              <path
                id="Path_271"
                data-name="Path 271"
                d="M393.68,40.915a.409.409,0,0,1,.092-.244.259.259,0,0,1,.207-.123.269.269,0,0,1,.155.065,1.785,1.785,0,0,1,.168.144.77.77,0,0,0,.234.145.84.84,0,0,0,.336.065.723.723,0,0,0,.42-.115.387.387,0,0,0,.168-.341.458.458,0,0,0-.092-.281.73.73,0,0,0-.241-.2q-.149-.081-.328-.157t-.359-.171a2.094,2.094,0,0,1-.331-.212.848.848,0,0,1-.241-.315,1.048,1.048,0,0,1-.092-.448,1.059,1.059,0,0,1,.113-.5.858.858,0,0,1,.3-.336,1.411,1.411,0,0,1,.4-.176,1.809,1.809,0,0,1,.457-.056,2.35,2.35,0,0,1,.289.019,2.671,2.671,0,0,1,.323.062.679.679,0,0,1,.278.135.276.276,0,0,1,.108.216.478.478,0,0,1-.073.242.223.223,0,0,1-.2.125.987.987,0,0,1-.257-.1,1.075,1.075,0,0,0-.467-.1.761.761,0,0,0-.438.108.352.352,0,0,0-.029.561.987.987,0,0,0,.312.184q.186.071.4.178a3.455,3.455,0,0,1,.4.233.98.98,0,0,1,.312.365,1.182,1.182,0,0,1,.126.559,1.031,1.031,0,0,1-.344.831,1.35,1.35,0,0,1-.905.292,1.691,1.691,0,0,1-.855-.2Q393.68,41.156,393.68,40.915Zm0,0"
                transform="translate(-376.765 -36.039)"
              />
            </g>
          </svg>
          <a href="#"> اخبار </a>
          <div class="hover-box news">
            <div class="hover-box__header">
              <span> اخبار </span>
            </div>
            <div class="hover-box__content">
              <div class="items-container">
                <p class="item" v-for="anyNews in news" :key="anyNews.newsId">
                  {{ anyNews.title }}
                </p>
              </div>
            </div>
            <div class="hover-box__footer">
              <a href="https://daneshkadeonline.ir/articles-list">مشاهده همه</a>
            </div>
          </div>
        </button>
        <button href="#" class="articles-btn dashboard-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 19 19"
          >
            <g id="Group_9698" data-name="Group 9698" transform="translate(-361 -47)">
              <g
                id="Rectangle_104"
                class="stroke-1"
                data-name="Rectangle 104"
                transform="translate(361 47)"
                fill="none"
                stroke="#212121"
                stroke-width="1"
              >
                <rect width="9" height="9" rx="2" stroke="none" />
                <rect x="0.5" y="0.5" width="8" height="8" rx="1.5" fill="none" />
              </g>
              <g
                id="Rectangle_105"
                class="stroke-1"
                data-name="Rectangle 105"
                transform="translate(361 57)"
                fill="none"
                stroke="#212121"
                stroke-width="1"
              >
                <rect width="9" height="9" rx="2" stroke="none" />
                <rect
                  x="0.5"
                  y="0.5"
                  width="8"
                  class="stroke-1"
                  height="8"
                  rx="1.5"
                  fill="none"
                />
              </g>
              <g
                id="Rectangle_106"
                class="stroke-1"
                data-name="Rectangle 106"
                transform="translate(371 47)"
                fill="none"
                stroke="#212121"
                stroke-width="1"
              >
                <rect width="9" height="9" rx="2" stroke="none" />
                <rect x="0.5" y="0.5" width="8" height="8" rx="1.5" fill="none" />
              </g>
              <g
                id="Rectangle_107"
                class="stroke-1"
                data-name="Rectangle 107"
                transform="translate(371 57)"
                fill="none"
                stroke="#212121"
                stroke-width="1"
              >
                <rect width="9" height="9" rx="2" stroke="none" />
                <rect x="0.5" y="0.5" width="8" height="8" rx="1.5" fill="none" />
              </g>
            </g>
          </svg>
          <a href="#"> مقالات </a>

          <div class="hover-box">
            <div class="hover-box__header">
              <span> مقالات </span>
            </div>
            <div class="hover-box__content">
              <div class="items-container">
                <div class="item">
                  <div class="image-container">
                    <img src="@/static/imgs/course-image.png" alt="عکس دوره" />
                  </div>
                  <h4 class="article-name">دوره علوم تجربی</h4>
                  <span class="date">00/12/9</span>
                  <p class="article-detail">
                    لورم ایپسوم متن ساختی و نامفهوم برای استفاده در صنعت چاپ
                  </p>
                </div>
                <div class="item">
                  <div class="image-container">
                    <img src="@/static/imgs/course-image.png" alt="عکس دوره" />
                  </div>
                  <h4 class="article-name">دوره علوم تجربی</h4>
                  <span class="date">00/12/9</span>
                  <p class="article-detail">
                    لورم ایپسوم متن ساختی و نامفهوم برای استفاده در صنعت چاپ
                  </p>
                </div>
                <div class="item">
                  <div class="image-container">
                    <img src="@/static/imgs/course-image.png" alt="عکس دوره" />
                  </div>
                  <h4 class="article-name">دوره علوم تجربی</h4>
                  <span class="date">00/12/9</span>
                  <p class="article-detail">
                    لورم ایپسوم متن ساختی و نامفهوم برای استفاده در صنعت چاپ
                  </p>
                </div>
                <div class="item">
                  <div class="image-container">
                    <img src="@/static/imgs/course-image.png" alt="عکس دوره" />
                  </div>
                  <h4 class="article-name">دوره علوم تجربی</h4>
                  <span class="date">00/12/9</span>
                  <p class="article-detail">
                    لورم ایپسوم متن ساختی و نامفهوم برای استفاده در صنعت چاپ
                  </p>
                </div>
                <div class="item">
                  <div class="image-container">
                    <img src="@/static/imgs/course-image.png" alt="عکس دوره" />
                  </div>
                  <h4 class="article-name">دوره علوم تجربی</h4>
                  <span class="date">00/12/9</span>
                  <p class="article-detail">
                    لورم ایپسوم متن ساختی و نامفهوم برای استفاده در صنعت چاپ
                  </p>
                </div>
              </div>
            </div>
            <div class="hover-box__footer">
              <a href="#">مشاهده همه</a>
            </div>
          </div>
        </button>
        <button href="#" class="notifications-btn dashboard-btn bell">
          <span class="unread-notification-count persian-number">{{ alertCount }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21.515"
            height="25.818"
            viewBox="0 0 21.515 25.818"
          >
            <g id="bell" transform="translate(-1.076)">
              <path
                id="Path_90"
                data-name="Path 90"
                class="cls-1"
                d="M158.7,420.841a4.038,4.038,0,0,1-4.034-4.034.807.807,0,1,1,1.614,0,2.42,2.42,0,0,0,4.841,0,.807.807,0,1,1,1.614,0A4.038,4.038,0,0,1,158.7,420.841Zm0,0"
                transform="translate(-146.869 -395.023)"
                fill="#212121"
              />
              <path
                id="Path_91"
                data-name="Path 91"
                class="cls-1"
                d="M40.965,83.364H23.215a1.883,1.883,0,0,1-1.224-3.313,7.21,7.21,0,0,0,2.569-5.521v-3a7.53,7.53,0,0,1,15.061,0v3a7.208,7.208,0,0,0,2.558,5.513,1.882,1.882,0,0,1-1.213,3.321ZM32.09,65.614a5.923,5.923,0,0,0-5.917,5.917v3a8.817,8.817,0,0,1-3.13,6.745.268.268,0,0,0-.1.207.272.272,0,0,0,.269.269h17.75a.272.272,0,0,0,.269-.269.265.265,0,0,0-.095-.2,8.819,8.819,0,0,1-3.133-6.747v-3A5.923,5.923,0,0,0,32.09,65.614Zm0,0"
                transform="translate(-20.256 -60.773)"
                fill="#212121"
              />
              <path
                id="Path_92"
                data-name="Path 92"
                class="cls-1"
                d="M219.475,4.841a.807.807,0,0,1-.807-.807V.807a.807.807,0,1,1,1.614,0V4.034A.807.807,0,0,1,219.475,4.841Zm0,0"
                transform="translate(-207.641)"
                fill="#212121"
              />
            </g>
          </svg>
          <a href="#"> اعلان ها </a>
          <div class="hover-box notification">
            <div class="hover-box__header">
              <span> اطلاعیه </span>
              <span class="persian-number">{{ alertCount }}</span>
            </div>
            <div class="hover-box__content">
              <div class="items-container">
                <p class="item" v-if="alertCount == 0">اعلان جدید وجود ندارد</p>
                <p class="item" v-for="alert in alerts" :key="alert.id">
                  {{ alert.title.substring(0, 45) }}...
                </p>
              </div>
            </div>
            <div class="hover-box__footer">
              <nuxt-link to="/messages">مشاهده همه</nuxt-link>
            </div>
          </div>
        </button>
        <div class="vertical-line"></div>
        <button href="#" class="logout-btn dashboard-btn" @click="logout">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20.346"
            height="20.278"
            viewBox="0 0 20.346 20.278"
          >
            <g id="logout" transform="translate(0 -0.85)">
              <g id="Group_192" data-name="Group 192" transform="translate(0 0.85)">
                <g id="Group_191" data-name="Group 191">
                  <path
                    id="Path_95"
                    data-name="Path 95"
                    class="cls-1"
                    d="M10.139,19.438h-7.6a.845.845,0,0,1-.845-.845V3.385a.845.845,0,0,1,.845-.845h7.6a.845.845,0,0,0,0-1.69h-7.6A2.538,2.538,0,0,0,0,3.385V18.593a2.538,2.538,0,0,0,2.535,2.535h7.6a.845.845,0,0,0,0-1.69Z"
                    transform="translate(0 -0.85)"
                    fill="#202939"
                  />
                </g>
              </g>
              <g id="Group_194" data-name="Group 194" transform="translate(6.759 5.075)">
                <g id="Group_193" data-name="Group 193">
                  <path
                    id="Path_96"
                    data-name="Path 96"
                    class="cls-1"
                    d="M183.435,112.477l-5.137-5.07a.845.845,0,1,0-1.186,1.2l3.671,3.623h-9.837a.845.845,0,0,0,0,1.69h9.837l-3.671,3.623a.845.845,0,1,0,1.186,1.2l5.137-5.07a.845.845,0,0,0,0-1.2Z"
                    transform="translate(-170.1 -107.165)"
                    fill="#202939"
                  />
                </g>
              </g>
            </g>
          </svg>
          <a href="#"> خروج </a>
        </button>
      </div>
    </template>
  </header>
</template>
<script>
import skeleton from "@/components/skeleton-components/skeletonCreator";
export default {
  components: { skeleton },
  data() {
    return {
      loading: true,
      alerts: [],
      alertCount: 0,
      news: "",
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.loading = false;
    // }, 4000);
  },
  async beforeMount() {
    Promise.all([this.getAlerts(), this.getNews()]);
    this.loading = false;
  },
  methods: {
    async getAlerts() {
      const alerts = await this.$axios.get(
        "/api/Teacher/TeacherQuestionAndAlert/GetTeacherAlerts",
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (alerts.data.statusCode == "200" && alerts.data.message == "Success") {
        for (const n of alerts.data.data) {
          if (n.isRead == false) {
            this.alerts.push({
              title: n.alertText,
              id: n.id,
            });
            this.alertCount += 1;
          }
        }
      }
    },
    async getNews() {
      const news = await this.$axios.get("/api/News/Index");
      if (news.data.statusCode == "200" && news.data.message == "Success") {
        this.news = news.data.data.newsItems;
      }
    },
    async logout() {
      const logout = await this.$axios.get("/api/Teacher/TeacherAccount/LogOut", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      this.$cookies.remove("key");
      this.$cookies.remove("refreshToken");
      this.$router.push("/login");
    },
  },
};
</script>
