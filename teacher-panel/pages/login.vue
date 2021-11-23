<template>
  <div>
    <div class="signin-signup">
      <main class="signin-signup-content">
        <form action="" class="form-box" @submit.prevent="setNumberForVerify">
          <header class="signin-signup-header">
            <img src="@/static/logo.png" alt="لوگو" />
          </header>
          <h1 class="title">ورود / ثبت نام</h1>
          <label for="mobile-number" class="input-label">
            <input
              v-model="phoneNumber"
              type="tel"
              name=""
              :class="wrongNumber ? 'red' : ''"
              id="mobile-number"
              placeholder="شماره موبایل خود را وارد کنید"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="11"
            />
            <span class="icon-container">
              <img
                src="@/static/panel-teacher-icons/smartphone-icon.svg"
                alt="آیکون موبایل"
              />
            </span>
            <p class="wrong-text" v-if="wrongNumber">
              شماره خود را صحیح وارد کنید
            </p>
          </label>
          <div class="link-container">
            <a href="#" @click="showPolicyModal" class="form-link"
              >قوانین و مقررات
            </a>
            را میپذیرم
          </div>
          <a class="enter-btn" @click.prevent="setNumberForVerify"> ادامه </a>
        </form>
      </main>
      <div class="empty"></div>
    </div>
    <!-- <template v-if="showModal">
      <div class="signin-signup-modal">
        <div class="content-box">
          <header>
            <div class="empty"></div>
            <h2 class="title">حساب کاربری با این نام پیدا نشد</h2>
            <button class="close-btn" @click.prevent="toggleModal">&times;</button>
          </header>
          <a
            href=""
            type="button"
            @click.prevent="
              goToREgister();
              toggleModal();
            "
            class="send-via-mobile form-btn red-color-outline"
            >ثبت نام</a
          >
          <a
            href=""
            type="button"
            @click.prevent="toggleModal"
            class="send-via-mobile form-btn red-color"
            >لغو</a
          >
        </div>
      </div>
    </template> -->
  </div>
</template>

<script>
export default {
  middleware: "userIsLog",
  layout: "withoutSidebar",
  data() {
    return {
      phoneNumber: "",
      showModal: false,
      wrongNumber: false
    };
  },
  head() {
    return {
      title: "ثبت نام/ورود | دانشکده آنلاین",
      meta: [{ name: "robots", content: "noindex,nofollow" }]
    };
  },
  methods: {
    async setNumberForVerify() {
      if (this.phoneNumber != "" && this.phoneNumber.length == 11) {
        this.$store.commit("login/SET_PHONE_NUMBER", this.phoneNumber);
        const getTeacherExist = await this.$axios.get(
          "/api/Teacher/TeacherAccount/CheckTeacherExist/" + this.phoneNumber
        );
        if (
          getTeacherExist.data.message == "Success" &&
          getTeacherExist.data.statusCode == 200
        ) {
          // this.$axios.get("/api/VerifyCode/Send/" + this.phoneNumber);
          this.$router.push("/verification-code/login");
        } else if (
          getTeacherExist.data.message == "NotFound" &&
          getTeacherExist.data.statusCode == 404
        ) {
          this.goToRegister();
        }
      } else {
        this.wrongNumber = true;
      }
    },
    goToRegister() {
      this.$axios.get("/api/VerifyCode/Send/" + this.phoneNumber);
      this.$router.push("/verification-code/register");
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    showPolicyModal() {
      this.$swal({
          confirmButtonText: 'می‌پذیرم',
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
  },
  watch: {
    phoneNumber: {
      handler() {
        if (this.phoneNumber[0] != 0) {
          this.phoneNumber = "";
        }
        if (this.phoneNumber.length >= 2) {
          if (this.phoneNumber[1] != 9) {
            this.phoneNumber = this.phoneNumber[0];
          }
        }
      },
      deep: true
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/styles/swal-style.scss";
</style>
