<template>
  <div class="panel-teacher-content-item sell-host-volume">
    <header>
      <p class="section-header red">
        <skeleton
          v-if="loading"
          class="skeleton"
          width="85px"
          height="30px"
          borderRadius="5px"
        />
        <span v-else> خرید حجم </span>
      </p>
    </header>
    <div class="volumes-container">
      <template v-if="loading">
        <div class="volume" v-for="n in 3" :key="n">
          <h3 class="volume-title">
            <skeleton
              v-if="loading"
              class="skeleton"
              width="140px"
              height="40px"
              borderRadius="5px"
            />
          </h3>
          <span class="volume-price persian-number">
            <skeleton
              v-if="loading"
              class="skeleton"
              width="100px"
              height="80px"
              borderRadius="5px"
            />
          </span>
          <small class="currency">
            <skeleton
              v-if="loading"
              class="skeleton mt"
              width="70px"
              height="25px"
              borderRadius="5px"
            />
          </small>
          <skeleton
            v-if="loading"
            class="skeleton"
            width="250px"
            height="50px"
            borderRadius="5px"
          />
        </div>
      </template>
      <template v-else>
        <div class="volume" v-for="volume in volumes" :key="volume.id">
          <h3 class="volume-title persian-number">{{ volume.title }}</h3>
          <span class="volume-price persian-number">{{ volume.price }}</span>
          <small class="currency">هزار تومان</small>
          <form
            style="display: none"
            action="https://sep.shaparak.ir/OnlinePG/OnlinePG"
            method="post"
            :id="'volume-form-' + volume.id"
          >
            <input type="hidden" name="Token" :id="'volume-' + volume.id" />
            <input name="GetMethod" type="text" value="true" style="visibility: hidden" />
          </form>
          <a href="#" class="volume-btn" @click.prevent="buyVolume(volume.id)"
            >خرید حجم</a
          >
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import skeleton from "@/components/skeleton-components/skeletonCreator";
export default {
  middleware: "userIsNotLog",
  layout: "dashboardLay",
  components: {
    skeleton,
  },
  head() {
    return {
      title: "خرید حجم",
    };
  },
  data() {
    return {
      volumes: [],
      loading: true,
    };
  },
  async mounted() {
    if (Object.keys(this.$route.query).length != 0) {
      const datac = await this.$axios.get(
        `/api/Payment/VerifyPaymentVolume?MID=${this.$route.query["MID"]}&RefNum=${this.$route.query["RefNum"]}&ResNum=${this.$route.query["ResNum"]}&State=${this.$route.query["State"]}&TraceNo=${this.$route.query["TraceNo"]}&Amount=${this.$route.query["Amount"]}&Rrn=${this.$route.query["Rrn"]}&SecurePan=${this.$route.query["SecurePan"]}&Status=${this.$route.query["Status"]}&Token=${this.$route.query["Token"]}&HashedCardNumber=${this.$route.query["HashedCardNumber"]}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (datac.data.statusCode == 200 && datac.data.message == "Success") {
        this.$swal({
          text: "پرداخت انجام شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        }).then(() => {
          this.$router.replace({ query: null });
        });
      }
    }
  },
  async beforeMount() {
    const getVolumes = await this.$axios.get("/api/Teacher/TeacherBuyVolume/GetVolumes", {
      headers: {
        Authorization: `Bearer ${this.$cookies.get("key")}`,
      },
    });
    if (getVolumes.data.statusCode == 200 && getVolumes.data.message == "Success") {
      for (const n of getVolumes.data.data) {
        this.volumes.push({
          title: n.title,
          id: n.id,
          price: n.price,
          volumeVal: n.volumeValue,
        });
      }
      this.loading = false;
    } else {
      this.$swal({
        text: "مشکلی رخ داده است!صفحه را رفرش کرده یا بعدا دوباره امتحان کنید",
        icon: "error",
        showCloseButton: true,
        confirmButtonText: "تلاش مجدد!",
      });
    }
  },
  methods: {
    async buyVolume(id) {
      const token = await this.$axios.get(`/api/Payment/GenerateTokenVolume/${id}`, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      if (token.data.statusCode == 200 && token.data.message == "Success") {
        const volumeId = "volume-" + id;
        const formTag = document.getElementById(volumeId);
        formTag.setAttribute("value", token.data.data);
        document.getElementById("volume-form-" + id).submit();
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/swal-style.scss";
</style>
