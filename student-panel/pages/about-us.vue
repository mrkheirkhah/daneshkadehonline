<template>
  <div>
    <div class="about-us">
      <div class="banner">
        <div class="bg-image"></div>
        <h2 class="title">درباره ما</h2>
        <div class="banner-overlay"></div>
      </div>
      <main class="container mt-5">
        <div class="get-know-us">
          <h3 class="rb-title">آشنایی با ما</h3>
          <div class="detail">{{ aboutData.description }}</div>

          <div class="team-information row">
            <div class="istatistic-table">
              <div class="table-cell">
                <h3 class="count persian-number">{{ aboutData.coursesOrganized }}</h3>
                <span class="detail">دوره های برگزار شده</span>
              </div>
              <div class="table-cell">
                <h3 class="count persian-number">{{ aboutData.ongoingCourses }}</h3>
                <span class="detail">دوره های در حال برگزاری</span>
              </div>
              <div class="table-cell">
                <h3 class="count persian-number">{{ aboutData.regularCustomers }}</h3>
                <span class="detail">تعداد مشتریان ثابت ما</span>
              </div>
              <div class="table-cell">
                <h3 class="count persian-number">{{ aboutData.teamMembers }}</h3>
                <span class="detail">اعضای تیم ما</span>
              </div>
            </div>
            <div class="istatistic col-12 col-md-9 order-1 order-md-0">
              <img src="@/static/images/main-page-images/our-team.png" alt="عکس تیم ما" />
            </div>
            <div class="experience col-12 col-md-3">
              <h2>
                <span class="count persian-number">18</span>
                سال
              </h2>
              <h2>تجربه</h2>
            </div>
          </div>
        </div>
        <div class="our-team-members">
          <div class="row d-flex justify-content-between px-3 align-items-center">
            <h3 class="rb-title col-auto">اعضای تیم ما</h3>
            <div class="bullets col-auto">
              <div class="bullet"></div>
              <div class="bullet"></div>
              <div class="bullet active"></div>
              <div class="bullet"></div>
            </div>
          </div>
          <div class="swiper-container" v-swiper="aboutUsOption">
            <div class="members-container swiper-wrapper">
              <div
                class="member swiper-slide"
                v-for="member in teamMembers"
                :key="member.id"
              >
                <div class="image-container">
                  <img
                    :src="
                      'https://api.daneshkadeonline.ir/Images/Public/TeamMember/' +
                      member.imageName
                    "
                    alt="عکس مدیر"
                  />
                  <div class="overlay">
                    <div class="social-media">
                      <a :href="member.facebook" target="blank">
                        <img
                          src="@/static/images/main-page-images/facebook-social.png"
                          alt="فیسبوک"
                        />
                      </a>
                      <a :href="member.linkedin" target="blank">
                        <img
                          src="@/static/images/main-page-images/linkedin-social.png"
                          alt="لینکدین"
                        />
                      </a>
                      <a :href="member.instagram" target="blank">
                        <img
                          src="@/static/images/main-page-images/instagram-social.png"
                          alt="اینستاگرام"
                        />
                      </a>
                      <a :href="member.telegram" target="blank">
                        <img
                          src="@/static/images/main-page-images/telegram-social.png"
                          alt="تلگرام"
                        />
                      </a>
                      <a :href="member.twiter" target="blank">
                        <img
                          src="@/static/images/main-page-images/twitter-social.png"
                          alt="توئیتر"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div class="info">
                  <h4 class="name">{{ member.name }}</h4>
                  <small class="job">{{ member.role }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import mainHeader from "@/components/main-pages/header";
import mainFooter from "@/components/main-pages/footer";
export default {
  components: { mainHeader, mainFooter },
  layout: "mainPages",
  data() {
    return {
      aboutData: "",
      teamMembers: "",
      aboutUsOption: {
        direction: "horizontal",
        loop: false,
        spaceBetween: 20,
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          400: {
            slidesPerView: 2,
          },
          750: {
            slidesPerView: 3,
          },
          900: {
            slidesPerView: 4,
          },
          1800: {
            slidesPerView: 5,
          },
          2500: {
            slidesPerView: 6,
          },
        },
        pagination: {
          el: ".bullets",
        },
      },
    };
  },
  mounted() {
    this.getTeamMembers();
    this.getAboutData();
  },
  methods: {
    async getTeamMembers() {
      const teamMembers = await this.$axios.get("/api/Home/GetTeamMembers");
      console.log(teamMembers);
      this.teamMembers = teamMembers.data.data;
    },
    async getAboutData() {
      const aboutData = await this.$axios.get("/api/Home/About");
      // console.log(aboutData);
      this.aboutData = aboutData.data.data;
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
@import "@/assets/styles/pages/about-us.scss";
</style>
