<template>
  <div class="signin-signup">
    <main class="signin-signup-content">
      <form
        action=""
        class="form-box custom-scrollbar"
        @submit.prevent="register"
      >
        <header class="signin-signup-header">
          <img src="@/static/logo.png" alt="لوگو" />
        </header>
        <h1 class="title">ثبت نام</h1>
        <label for="teacher-fullname" class="input-label">
          <input
            type="text"
            name=""
            v-model="fullName"
            id="teacher-fullname"
            :class="wrongName ? 'red' : ''"
            @keyup="checkPersian($event)"
            placeholder="نام و نام خانوادگی را وارد کنید"
          />
          <span class="icon-container">
            <img
              src="@/static/panel-teacher-icons/name-icon.svg"
              alt="آیکون کاربر"
            />
          </span>
          <p class="wrong-text" v-if="wrongName">نام خود را صحیح وارد کنید</p>
        </label>
        <label for="teacher-mellicode" class="input-label">
          <input
            type="number"
            name=""
            v-model="nationalCardNumber"
            :class="wrongCode ? 'red' : ''"
            id="teacher-mellicode"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            maxlength="10"
            placeholder="کد ملی خود را وارد کنید"
          />
          <span class="icon-container">
            <img
              src="@/static/panel-teacher-icons/flag-icon.svg"
              alt="آیکون پرچم"
            />
          </span>
          <p class="wrong-text" v-if="wrongCode">
            کد ملی خود را صحیح وارد کنید
          </p>
        </label>
        <label for="teacher-password" class="input-label">
          <input
            type="number"
            name=""
            :placeholder="phoneNumber"
            id="teacher-phone-number"
            disabled
          />
          <span class="icon-container">
            <img
              src="@/static/panel-teacher-icons/smartphone-icon.svg"
              alt="آیکون موبایل"
            />
          </span>
        </label>
        <label for="teacher-password" class="input-label">
          <input
            type="password"
            name=""
            v-model="password"
            :class="wrongPass ? 'red' : wrongPassLength ? 'red' : ''"
            id="teacher-password"
            placeholder="رمز عبور خود را وارد کنید"
          />
          <span class="icon-container">
            <img
              src="@/static/panel-teacher-icons/lock-icon.svg"
              alt="آیکون قفل"
            />
          </span>
          <p class="wrong-text" v-if="wrongPass">
            رمز یا تکرار رمز صحیح نمیباشد
          </p>
          <p class="wrong-text" v-if="wrongPassLength">
            طول رمز باید بیشتر یا مساوی هشت کاراکتر باشد
          </p>
        </label>
        <label for="teacher-repeat-password" class="input-label">
          <input
            type="password"
            name=""
            :class="wrongPass ? 'red' : wrongPassLength ? 'red' : ''"
            v-model="repeatPassword"
            id="teacher-repeat-password"
            placeholder="تائید رمز عبور"
          />
          <span class="icon-container">
            <img
              src="@/static/panel-teacher-icons/lock-icon.svg"
              alt="آیکون قفل"
            />
          </span>
          <p class="wrong-text" v-if="wrongPass">
            رمز یا تکرار رمز صحیح نمیباشد
          </p>
          <p class="wrong-text" v-if="wrongPassLength">
            طول رمز باید بیشتر یا مساوی هشت کاراکتر باشد
          </p>
        </label>
        <div>
          <label for="remember-me" class="checkbox-label">
            <span class="checkbox-container">
              <input
                type="checkbox"
                name=""
                v-model="rememberMe"
                class="form-checkbox"
                id="remember-me"
              />
              <img
                src="@/static/panel-teacher-icons/checkmark-red.svg"
                class="check-mark"
                alt="check-icon"
              />
            </span>
            مرا به خاطر بسپار
          </label>
          <label for="accept-terms" class="checkbox-label">
            <span class="checkbox-container">
              <input
                type="checkbox"
                v-model="acceptTerms"
                name=""
                class="form-checkbox"
                id="accept-terms"
              />
              <img
                src="@/static/panel-teacher-icons/checkmark-red.svg"
                class="check-mark"
                alt="check-icon"
              />
            </span>
            <div class="link-container">
              <a href="#" @click="showPolicyModal" class="form-link">قوانین و مقررات </a> را
              میپذیرم
            </div>
          </label>
        </div>
        <button class="enter-btn">ورود به پنل</button>
      </form>
    </main>
    <div class="empty"></div>
  </div>
</template>

<script>
export default {
  layout: "withoutSidebar",
  middleware: "userIsLog",
  head() {
    return {
      title: "ثبت نام | دانشکده آنلاین",
      meta: [{ name: "robots", content: "noindex,nofollow" }]
    };
  },
  data() {
    return {
      fullName: "",
      nationalCardNumber: "",
      password: "",
      repeatPassword: "",
      phoneNumber: this.$store.state.login.phoneNumber,
      rememberMe: false,
      acceptTerms: false,
      wrongCode: false,
      wrongName: false,
      wrongPass: false,
      wrongPassLength: false
    };
  },
  beforeCreate() {
    if (this.$store.state.login.phoneNumber == "") {
      this.$router.push("/login");
    }
  },
  methods: {
    async register() {
      if (this.fullName.trim() == "") {
        this.wrongName = true;
      } else {
        this.wrongName = false;
      }
      if (
        this.nationalCardNumber.length < 10 ||
        this.nationalCardNumber.length > 10
      ) {
        this.wrongCode = true;
      } else {
        this.wrongCode = false;
      }
      if (this.password.length < 8) {
        this.wrongPassLength = true;
      } else {
        this.wrongPassLength = false;
        if (this.password !== this.repeatPassword) {
          this.wrongPass = true;
        } else {
          this.wrongPass = false;
        }
      }
      if (
        this.fullName.trim() != "" &&
        this.nationalCardNumber.length == 10 &&
        this.password.length >= 8 &&
        this.password === this.repeatPassword
      ) {
        if (this.acceptTerms === false) {
          this.$swal({
            text: "قوانین سایت را مطالعه و تایید کنید!",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: "تلاش مجدد!"
          });
        } else {
          try {
            const registerData = await this.$axios.$post(
              "/api/Teacher/TeacherAccount/Register",
              {
                teacherName: this.fullName,
                nationalCardNumber: this.nationalCardNumber,
                phoneNumber: this.$store.state.login.phoneNumber,
                password: this.password,
                verifyCode: this.$route.params.code
              }
            );
            if (registerData.data.tokenString) {
              this.$store.dispatch("login/setRegisterData", registerData);
              this.$router.push("/complete-profile");
            }
          } catch (e) {
            this.$swal({
              text: "مشکلی رخ داده است.کمی بعد دوباره امتحان کنید",
              icon: "warning",
              showCloseButton: true,
              confirmButtonText: "تلاش مجدد!"
            });
          }
        }
      }
      // } else if (
      //   this.nationalCardNumber.length < 10 ||
      //   this.nationalCardNumber.length > 10
      // ) {
      //   this.wrongCode = true;
      // } else {
      //   if (this.password === this.repeatPassword) {
      //     try {
      //       const registerData = await this.$axios.$post(
      //         "/api/Teacher/TeacherAccount/Register",
      //         {
      //           teacherName: this.fullName,
      //           nationalCardNumber: this.nationalCardNumber,
      //           phoneNumber: this.$store.state.login.phoneNumber,
      //           password: this.password,
      //           verifyCode: this.$route.params.code,
      //         }
      //       );
      //       if (registerData.data.tokenString) {
      //         this.$store.dispatch("login/setRegisterData", registerData);
      //         this.$router.push("/complete-profile");
      //       }
      //     } catch (e) {
      //       this.$swal({
      //         text: "مشکلی رخ داده است.کمی بعد دوباره امتحان کنید",
      //         icon: "warning",
      //         showCloseButton: true,
      //         confirmButtonText: "تلاش مجدد!",
      //       });
      //     }
      //   } else {
      //     this.$swal({
      //       text: "رمز و تکرار برابر نیستند!",
      //       icon: "warning",
      //       showCloseButton: true,
      //       confirmButtonText: "تلاش مجدد!",
      //     });
      //   }
      // }
    },
    checkPersian(e) {
      // javascript
      if (
        !/^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF7\u200C\u200F ]+$/.test(
          e.target.value
        )
      ) {
        e.target.value = "";
      }
    },
    showPolicyModal() {
      this.$swal({
        confirmButtonText: "می‌پذیرم",
        title: "قوانین مقررات تدریس در پلتفرم دانشکده آنلاین",
        html: `<div style="max-height: 250px; overflow-y: auto"><p style="line-height: 32px; font-size: 16px;color: rgba(0,0,0,0.55);padding: 0px 7px; text-align: justify">قرارداد پیمانکاری حاضر و ضمایم آن به نحو مندرج در ماده 2، یک مجموعه غیرقابل تفکیک را تشکیل داده و از این پس قرارداد نامیده می‌شود .
ماده 1: موضوع قرارداد
موضوع قرارداد عبارتنداز همکاری مدرس با پلتفرم آموزشی و فرهنگی دانشکده آنلاین، در زمینه فروش پکیج‌های آموزشی و برگزاری کلاس های آنلاین در مدت زمان معین و به شرح مواد مذکور در این قرارداد.
تبصره 1: باتوجه به ماهیت قرارداد حاضر، قبول و تایید قرارداد توسط مدرس موجب ایجاد هیچگونه رابطه استخدامی میان مدرس و کارفرما نمیشود.
ماده 2: اسناد و مدارک پیوست
1-2- پیوست شماره 1: اطلاعاتی که مدرس در هنگام ثبت نام در سایت دانشکده آنلاین وارد میکند :
نام و نام خانوادگی
کد ملی
شماره تماس
آدرس
عکس کارت ملی
تصویر مدرس
2-2- پیوست شماره 5: شرح خدمات مدرس

ماده 3: مدت قرارداد
1-3- مدت این قرارداد از زمانی که مدرس در پلتفرم  دانشکده آنلاین ثبت نام خود را تکمیل نماید ، تا زمانی که پروفایل مدرس در پلتفرم دانشکده آنلاین  فعال است  و اشتراک درحال برگذاری در سایت دارد ، میباشد.

ماده 4: مبلغ قرارداد و نحوه پرداخت
1-4- حق‌الزحمه مدرس برای انجام موضوع این قرارداد به شرح ذیل می‌باشد:
2-4- حق الزحمه مدرس به صورت درصد از میزان فروش پکیج‌ها و مطالب آموزشی مدرس خواهد بود که معادل 80 درصد از هر فروش پکیج میباشد.
3-4- حق الزحمه به صورت درخواست برداشت از طرف مدرس، به شماره کارت موجود در پروفایل مدرس در وجه مدرس پرداخت می‌گردد.
ماده 5: حقوق و تعهدات مدرس
1-5- مدرس متعهد گردید که تمامی مساعی و کوشش خود را برای ایجاد شرایط مناسب جهت حسن انجام خدماتِ موضوعِ این قرارداد بکار گیرد و امور محوله تحت موضوع این قرارداد را به نحو احسن و مطابق با اصول فنی و در زمان مقرر در این قرارداد به انجام رساند.
2-5- مدرس با آگاهی کامل از قوانین جمهوری اسلامی ایران، آئین‌نامه‌ها و دستورالعمل‌ها و نظامنامه‌های مرتبط با موضوع قرارداد متعهد می‌گردد شرح وظایف خود را به طور کامل، دقیق و مطابق با موازین قانونی، علمی و عرفی اجرایی نماید.
3-5- مدرس متعهد گردید که محتوای تولید شده مغایرتی با قوانین موضوعه جمهوری اسلامی ایران، اخلاق حسنه، عرف و شرع مقدس اسلام نداشته باشد. در غیر این صورت کلیه‌ی مسئولیت‌های آن بر عهده وی بوده و در صورت ورود ضرر از این رهگذر به کارفرما، مدرس متعهد است که کلیه ضررهای مادی و معنوی وارده را جبران کند.
4-5- مدرس متعهد گردید که در راستای اجرای موضوع این قرارداد، حق مالکیت فکری اشخاص ثالث را به طور کامل رعایت نماید. در غیر این صورت کلیه‌ی مسئولیت‌های نقض آن بر عهده وی بوده و در صورت ورود ضرر از این رهگذر به کارفرما، مدرس متعهد است که کلیه ضررهای مادی و معنوی وارده را جبران کند.
5-5- مدرس متعهد گردید که در صورت ایراد کارفرما به محتوای تولید شده، ظرف مدت 1 روز ایرادات را برطرف کرده و مجدداً برای کارفرما ارسال نماید.
6-5- مدرس متعهد میگردد در صورت ایجاد اشتراک در سایت هر هفته حداقل 60 دقیقه محتوای ویدیویی را با رعایت کلیه موارد فنی در حساب کاربری خود آپلود نماید.
7-5- مدرس متعهد گردید در صورت تاخیر بیش از 3 روز در آپلود محتوای ویدئویی متعهد به پرداخت مبلغ روزانه 1000،000 ریال وجه التزام تاخیر در انجام تعهد می باشد که از مبلغ حق الزحمه کسر خواهد شد.
8-5- درصورت ایجاد اشتراک توسط مدرس در وب سایت، به دلیل دارا بودن مدت زمان اشتراک، مدرس تعهد مینماید، زمان اشتراک خود را به پایان رساند در غیر این صورت کلیه مطالب و پکیج‌های آموزشی مدرس توسط کارفرما توقیف خواهد شد و تمام مبلغ باقی مانده از فروش آموزش که نزد سایت قراردارد و هنوز به مدرس پرداخت نشده ، به عنوان وجه التزام مقطوع از مبلغ حق الزحمه کسر خواهد شد.
9-5- مدرس موظف است در طول جلسات آنلاین آموزشی با آمادگی کامل علمی حضور یابد و برنامه آموزشی خود را در ابتدای شروع جلسه یا ترم آموزشی به کارفرما ارائه نماید.
10-5- مدرس تعهد مینماید در طول مدت همکاری از تبلیغات شخصی بپرهیزد و از علامت تجاری، شماره تماس خصوصی در محتواهای تولیدشده و جلسات آنلاین استفاده ننماید.
11-5- در صورت عدم ایجاد اشتراک توسط مدرس در سایت، برنامه زمان بندی برای ساخت و آپلود محتوای ویدئویی توسط مدرس در طول هفته وجود نخواهد داشت.
ماده 6: حقوق و تعهدات پلتفرم دانشکده آنلاین که از این پس کارفرما نامیده میشود
1-6- کارفرما متعهد گردید که نسبت به پرداخت حق الزحمه مدرس بر طبق مفاد این قرارداد در زمان تعیین شده اقدام نمایید.</p></div>`,
        icon: "info",
        showCloseButton: true,
        heightAuto: true
      });
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/styles/swal-style.scss";
</style>
