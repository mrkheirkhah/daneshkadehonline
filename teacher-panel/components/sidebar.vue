<template>
  <aside class="panel-teacher-aside">
    <!-- button for mobile sidebar -->
    <span class="hamburger-button hamburger-skeleton" v-if="loading">
      <skeleton
        class="skeleton"
        width="30px"
        height="18px"
        borderRadius="5px"
      />
    </span>
    <button
      class="hamburger-button"
      @click.prevent="toggle_teacher_panel"
      v-else
    >
      <div class="hamburger-line"></div>
      <div class="hamburger-line"></div>
      <div class="hamburger-line"></div>
    </button>
    <div class="panel-top panel">
      <div class="teacher-profile">
        <span v-if="loading">
          <skeleton
            class="skeleton"
            width="102px"
            height="102px"
            type="circle"
            borderRadius="5px"
          />
        </span>
        <img
          v-else
          :src="profImagedata"
          class="teacher-profile-image"
          alt="تصویر پروفایل مدرس"
        />
        <span v-if="loading" class="dis-block mt">
          <skeleton
            class="skeleton"
            width="110px"
            height="35px"
            borderRadius="5px"
          />
        </span>
        <h2 v-else>{{ name }}</h2>
      </div>
      <div>
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
            x2="350"
            y2="10"
            style="stroke: rgb(112, 112, 112)"
          ></line>
        </svg>
      </div>
      <!-- We will see skeleton until the data is fully loaded -->
      <div v-if="loading" class="sidebar-skeleton">
        <div v-for="i in 6" :key="i">
          <span v-if="loading">
            <skeleton
              class="skeleton"
              width="30px"
              height="30px"
              borderRadius="5px"
            />
          </span>
          <span v-if="loading">
            <skeleton
              class="skeleton"
              style="margin-right: 10px"
              width="150px"
              height="30px"
              borderRadius="5px"
            />
          </span>
        </div>
      </div>
      <div v-else class="panel-item-container top custom-scrollbar">
        <nuxt-link
          class="panel-item"
          to="/"
          v-intro="
            'پروفایل کاربری شامل اطلاعات کامل و به منظور هویت شما در پلتفرم دانشکده آنلاین میباشد و تکمیل تمام فیلد های آن لازم است تا پروفایل شما فعال بشود .'
          "
        >
          <div class="sidebar-links">
            <div
              class="sidebar-links-icon"
              v-html="require('@/static/panel-teacher-icons/user.svg?raw')"
            />
            پروفایل
          </div>
        </nuxt-link>
        <nuxt-link
          class="panel-item"
          to="/my-courses"
          v-intro="'در این صفحه میتوانید اشتراک آموزشی خود را ایجاد کنید .'"
        >
          <div class="sidebar-links">
            <div
              class="sidebar-links-icon"
              v-html="require('@/static/panel-teacher-icons/book.svg?raw')"
            />
            ایجاد اشتراک آموزشی
          </div>
        </nuxt-link>
        <nuxt-link
          class="panel-item"
          to="/create-package"
          v-intro="
            'برای ایجاد یک پکیج و بارگذاری فایل های آن ، ابتدا باید درخواست ثبت پکیج ثبت کنید و کامل توضیح دهید که پکیج آموزشی شما در چه زمینه است و چه قیمتی را برای آن درنظر دارید .'
          "
        >
          <div class="sidebar-links">
            <div
              class="sidebar-links-icon"
              v-html="require('@/static/panel-teacher-icons/zip.svg?raw')"
            />
            ثبت پکیج آموزشی
          </div>
        </nuxt-link>
        <nuxt-link
          class="panel-item"
          to="/discount-code"
          v-intro="
            'در این قسمت شما میتوانید برای دوره های خود کد تخفیف اختصاصی ایجاد کنید و به صلاح دید خود از آن استفاده کنید .'
          "
        >
          <div class="sidebar-links">
            <!-- most be change icon -->
            <div
              class="sidebar-links-icon"
              v-html="require('@/static/panel-teacher-icons/percent.svg?raw')"
            />
            ایجاد کد تخفیف
          </div>
        </nuxt-link>
        <nuxt-link
          class="panel-item"
          to="/buy-volume"
          v-intro="
            'درصورت نیاز به حجم بیشتر به منظور ذخیره ویدیو ها در اشتراک ، میتوانید فضای حجمی بیشتر خریداری کنید (فضای حجمی فقط برای اشتراک ها میباشد)'
          "
        >
          <div class="sidebar-links">
            <div
              class="sidebar-links-icon"
              v-html="require('@/static/panel-teacher-icons/storage.svg?raw')"
            />
            خرید حجم
          </div>
        </nuxt-link>
        <nuxt-link
          class="panel-item"
          to="/withdraw"
          v-intro="
            'در این قسمت میتوانید درخواست برداشت از درآمد خود را ثبت کنید تا مبلغ برای شما واریز گردد'
          "
        >
          <div class="sidebar-links">
            <div
              class="sidebar-links-icon"
              v-html="require('@/static/panel-teacher-icons/wallet.svg?raw')"
            />
            برداشت از کیف پول
          </div>
        </nuxt-link>
        <nuxt-link
          class="panel-item"
          to="/transactions"
          v-intro="
            'در این قسمت میتوانید گزارش های مربوط به تراکنش ها را مشاهده کنید .'
          "
        >
          <div class="sidebar-links">
            <div
              class="sidebar-links-icon"
              v-html="require('@/static/panel-teacher-icons/coin-icon.svg?raw')"
            />
            گزارشات مالی
          </div>
        </nuxt-link>
        <nuxt-link class="panel-item" to="/messages">
          <div class="sidebar-links">
            <!-- most be change icon -->
            <div
              class="sidebar-links-icon"
              v-html="require('@/static/panel-teacher-icons/messages.svg?raw')"
            />
            پیام ها و اعلانات
          </div>
        </nuxt-link>
        <!-- dropdown in sidebar -->
        <!-- <div class="panel-item panel-dropdown">
          <div class="dropdown-preview" @click="togglePanel">
            <div class="right-section">
              <div
                class="sidebar-links-icon"
                v-html="require('@/static/panel-teacher-icons/speedometer.svg?raw')"
              />
              داشبورد
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="angle-bottom"
              width="11.545"
              height="8.921"
              viewBox="0 0 11.545 8.921"
            >
              <defs></defs>
              <g
                id="Group_174"
                data-name="Group 174"
                transform="translate(1.184 7.737) rotate(-90)"
              >
                <line
                  id="Line_16"
                  data-name="Line 16"
                  class="cls-1 angle-bottom-line"
                  x1="8"
                  transform="matrix(-0.819, 0.574, -0.574, -0.819, 6.553, 0)"
                />
                <line
                  id="Line_17"
                  data-name="Line 17"
                  class="cls-1 angle-bottom-line"
                  x1="8"
                  transform="matrix(-0.819, -0.574, 0.574, -0.819, 6.553, 9.177)"
                />
              </g>
            </svg>
          </div>
          <ul class="dropdown-container">
            <li class="dropdown-item">
              <nuxt-link class="sidebar-links" to="/">
                <div
                  class="sidebar-links-icon"
                  v-html="require('@/static/panel-teacher-icons/leftArrow.svg?raw')"
                />
                دسته دو
              </nuxt-link>
            </li>
            <li class="dropdown-item">
              <nuxt-link class="sidebar-links" to="/">
                <div
                  class="sidebar-links-icon"
                  v-html="require('@/static/panel-teacher-icons/leftArrow.svg?raw')"
                />
                دسته دو
              </nuxt-link>
            </li>
            <li class="dropdown-item">
              <nuxt-link class="sidebar-links" to="/">
                <div
                  class="sidebar-links-icon"
                  v-html="require('@/static/panel-teacher-icons/leftArrow.svg?raw')"
                />

                دسته دو
              </nuxt-link>
            </li>
            <li class="dropdown-item">
              <nuxt-link class="sidebar-links" to="/">
                <div
                  class="sidebar-links-icon"
                  v-html="require('@/static/panel-teacher-icons/leftArrow.svg?raw')"
                />

                دسته دو
              </nuxt-link>
            </li>
          </ul>
        </div> -->

        <!-- <nuxt-link class="panel-item" to="/documents">
          <div class="sidebar-links">
            <div
              class="sidebar-links-icon"
              v-html="require('@/static/panel-teacher-icons/brush-icon.svg?raw')"
            />
            مدارک محرمانه
          </div>
        </nuxt-link> -->
      </div>
    </div>
    <!-- bottom sidebar -->
    <div class="panel-bottom panel">
      <!-- We will see skeleton until the data is fully loaded -->
      <div v-if="loading" class="sidebar-skeleton">
        <!-- create 3 row of skeleton for bottom sidebar -->
        <div v-for="i in 4" :key="i">
          <span v-if="loading">
            <skeleton
              class="skeleton"
              width="30px"
              height="30px"
              borderRadius="5px"
            />
          </span>
          <span v-if="loading">
            <skeleton
              class="skeleton"
              style="margin-right: 10px"
              width="150px"
              height="30px"
              borderRadius="5px"
            />
          </span>
        </div>
      </div>
      <div v-else class="panel-item-container custom-scrollbar">
        <nuxt-link
          class="panel-item"
          to="/profile"
          v-intro="'در این صفحه میتوانید اطلاعات پروفایل خود را ویرایش کنید .'"
        >
          <div class="sidebar-links">
            <div
              class="sidebar-links-icon"
              v-html="require('@/static/panel-teacher-icons/settings.svg?raw')"
            />
            تنظیمات
          </div>
        </nuxt-link>
        <nuxt-link
          class="panel-item"
          to="/support"
          v-intro="
            'در صورت نیاز به راهنمایی بیشتر میتوانید برای دریافت پشتیبانی تیکت ثبت کنید .'
          "
        >
          <div class="sidebar-links">
            <div
              class="sidebar-links-icon"
              v-html="require('@/static/panel-teacher-icons/headphone.svg?raw')"
            />
            پشتیبانی
          </div>
        </nuxt-link>
        <a class="panel-item" href="" type="button" @click.prevent="startIntro">
          <div class="sidebar-links">
            <div
              class="sidebar-links-icon"
              v-html="require('@/static/panel-teacher-icons/info.svg?raw')"
            />
            راهنمای پنل
          </div>
        </a>
      </div>
    </div>
  </aside>
</template>

<script>
import skeleton from "@/components/skeleton-components/skeletonCreator";
export default {
  components: { skeleton },
  data() {
    return {
      loading: true,
      name: "",
      profImage: ""
    };
  },
  async beforeMount() {
    const token = this.$cookies.get("key");

    const getData = await this.$axios
      .post(
        "/api/Teacher/TeacherAccount/check-teacher-auth",
        {},
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`
          }
        }
      )
      .catch(e => {
        console.log("e");
      });
    if (getData.data.statusCode == "200") {
      const name = getData.data.data.teacherName;
      const phone = getData.data.data.phoneNumber;
      this.name = name;
      this.loading = false;
      this.profImage = getData.data.data.profileImageName;
    }
  },
  mounted() {},
  methods: {
    startIntro() {
      this.$intro()
        .setOption("nextLabel", "بعدی")
        .setOption("prevLabel", "قبلی")
        .setOption("doneLabel", "اتمام")
        .start();
    },
    toggle_teacher_panel() {
      const panel_teacher_aside = document.querySelector(
        ".panel-teacher-aside"
      );
      panel_teacher_aside.classList.toggle("show");
    },
    togglePanel() {
      document
        .querySelector(".dropdown-preview")
        .parentNode.classList.toggle("expanded");
    }
  },
  computed: {
    profImagedata() {
      return (
        "https://api.daneshkadeonline.ir/Images/Public/Teacher/" +
        this.profImage
      );
    }
  },
  // close sidebar when navigate between pages
  watch: {
    $route: {
      handler() {
        const panel_teacher_aside = document.querySelector(
          ".panel-teacher-aside"
        );
        if (panel_teacher_aside.classList.contains("show")) {
          panel_teacher_aside.classList.remove("show");
        }
      },
      deep: true
    }
  }
};
</script>
<style lang="scss">
.introjs-tooltipReferenceLayer * {
  font-family: "IRANSansX" !important;
}
</style>
