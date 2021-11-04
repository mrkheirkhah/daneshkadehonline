<template>
  <div class="main-content">
    <div class="panel-visitor-content-item main-content">
      <header class="mb-4">
        <p class="section-header">صفحه اصلی</p>
      </header>
      <div class="finanical-btn-container main-widget-admin">
        <button class="finanical-btn day">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="43.334"
            height="52"
            viewBox="0 0 43.334 52"
          >
            <g data-name="low-price (1)" transform="translate(-39.999)">
              <g data-name="Group 223" transform="translate(39.999)">
                <g data-name="Group 222">
                  <path
                    class="cls-1"
                    data-name="Path 112"
                    d="M82.466,30.333H76.4V.867A.867.867,0,0,0,75.532,0H47.8a.867.867,0,0,0-.867.867V30.333H40.866a.867.867,0,0,0-.6,1.492l20.8,19.933a.867.867,0,0,0,1.2,0l20.8-19.933a.867.867,0,0,0-.6-1.492Zm-20.8,19.6L43.022,32.067H47.8a.867.867,0,0,0,.867-.867V1.733h26V31.2a.867.867,0,0,0,.867.867H80.31Z"
                    transform="translate(-39.999)"
                  />
                  <path
                    class="cls-1"
                    data-name="Path 113"
                    d="M197.2,91.467a3.467,3.467,0,0,1,3.467,3.467H202.4a5.205,5.205,0,0,0-4.333-5.122V88h-1.733v1.811a5.2,5.2,0,0,0,.867,10.322,3.467,3.467,0,1,1-3.467,3.467H192a5.205,5.205,0,0,0,4.333,5.122v1.811h1.733v-1.811A5.2,5.2,0,0,0,197.2,98.4a3.467,3.467,0,1,1,0-6.933Z"
                    transform="translate(-175.533 -78.467)"
                  />
                  <rect
                    class="cls-1"
                    data-name="Rectangle 56"
                    width="1"
                    height="1"
                    transform="translate(10.834 4)"
                  />
                  <rect
                    class="cls-1"
                    data-name="Rectangle 57"
                    width="2"
                    height="1"
                    transform="translate(13.834 4)"
                  />
                  <rect
                    id="Rectangle_58"
                    class="cls-1"
                    data-name="Rectangle 58"
                    width="2"
                    height="1"
                    transform="translate(16.834 4)"
                  />
                  <rect
                    id="Rectangle_59"
                    class="cls-1"
                    data-name="Rectangle 59"
                    width="2"
                    height="1"
                    transform="translate(20.834 4)"
                  />
                  <rect
                    id="Rectangle_60"
                    class="cls-1"
                    data-name="Rectangle 60"
                    width="2"
                    height="1"
                    transform="translate(23.834 4)"
                  />
                  <rect
                    id="Rectangle_61"
                    class="cls-1"
                    data-name="Rectangle 61"
                    width="2"
                    height="1"
                    transform="translate(27.834 4)"
                  />
                  <rect
                    id="Rectangle_62"
                    class="cls-1"
                    data-name="Rectangle 62"
                    width="2"
                    height="1"
                    transform="translate(30.834 4)"
                  />
                </g>
              </g>
            </g>
          </svg>

          <span class="finanical-btn_title">
            درآمد امروز
            <br />
            <small>تومان</small>
          </span>

          <p class="persian-number">
            {{ Number(buttonsData.toDayIncome).toLocaleString() }}
          </p>
        </button>
        <button class="finanical-btn week">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="43.334"
            height="52"
            viewBox="0 0 43.334 52"
          >
            <g data-name="low-price (1)" transform="translate(-39.999)">
              <g data-name="Group 223" transform="translate(39.999)">
                <g data-name="Group 222">
                  <path
                    class="cls-1"
                    data-name="Path 112"
                    d="M82.466,30.333H76.4V.867A.867.867,0,0,0,75.532,0H47.8a.867.867,0,0,0-.867.867V30.333H40.866a.867.867,0,0,0-.6,1.492l20.8,19.933a.867.867,0,0,0,1.2,0l20.8-19.933a.867.867,0,0,0-.6-1.492Zm-20.8,19.6L43.022,32.067H47.8a.867.867,0,0,0,.867-.867V1.733h26V31.2a.867.867,0,0,0,.867.867H80.31Z"
                    transform="translate(-39.999)"
                  />
                  <path
                    class="cls-1"
                    data-name="Path 113"
                    d="M197.2,91.467a3.467,3.467,0,0,1,3.467,3.467H202.4a5.205,5.205,0,0,0-4.333-5.122V88h-1.733v1.811a5.2,5.2,0,0,0,.867,10.322,3.467,3.467,0,1,1-3.467,3.467H192a5.205,5.205,0,0,0,4.333,5.122v1.811h1.733v-1.811A5.2,5.2,0,0,0,197.2,98.4a3.467,3.467,0,1,1,0-6.933Z"
                    transform="translate(-175.533 -78.467)"
                  />
                  <rect
                    class="cls-1"
                    data-name="Rectangle 56"
                    width="1"
                    height="1"
                    transform="translate(10.834 4)"
                  />
                  <rect
                    class="cls-1"
                    data-name="Rectangle 57"
                    width="2"
                    height="1"
                    transform="translate(13.834 4)"
                  />
                  <rect
                    id="Rectangle_58"
                    class="cls-1"
                    data-name="Rectangle 58"
                    width="2"
                    height="1"
                    transform="translate(16.834 4)"
                  />
                  <rect
                    id="Rectangle_59"
                    class="cls-1"
                    data-name="Rectangle 59"
                    width="2"
                    height="1"
                    transform="translate(20.834 4)"
                  />
                  <rect
                    id="Rectangle_60"
                    class="cls-1"
                    data-name="Rectangle 60"
                    width="2"
                    height="1"
                    transform="translate(23.834 4)"
                  />
                  <rect
                    id="Rectangle_61"
                    class="cls-1"
                    data-name="Rectangle 61"
                    width="2"
                    height="1"
                    transform="translate(27.834 4)"
                  />
                  <rect
                    id="Rectangle_62"
                    class="cls-1"
                    data-name="Rectangle 62"
                    width="2"
                    height="1"
                    transform="translate(30.834 4)"
                  />
                </g>
              </g>
            </g>
          </svg>
          <span class="finanical-btn_title">
            درآمد هفته
            <br />
            <small>تومان</small>
          </span>

          <p class="persian-number">
            {{ Number(buttonsData.currentWeekIncome).toLocaleString() }}
          </p>
        </button>
        <button class="finanical-btn mounth">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="43.334"
            height="52"
            viewBox="0 0 43.334 52"
          >
            <g data-name="low-price (1)" transform="translate(-39.999)">
              <g data-name="Group 223" transform="translate(39.999)">
                <g data-name="Group 222">
                  <path
                    class="cls-1"
                    data-name="Path 112"
                    d="M82.466,30.333H76.4V.867A.867.867,0,0,0,75.532,0H47.8a.867.867,0,0,0-.867.867V30.333H40.866a.867.867,0,0,0-.6,1.492l20.8,19.933a.867.867,0,0,0,1.2,0l20.8-19.933a.867.867,0,0,0-.6-1.492Zm-20.8,19.6L43.022,32.067H47.8a.867.867,0,0,0,.867-.867V1.733h26V31.2a.867.867,0,0,0,.867.867H80.31Z"
                    transform="translate(-39.999)"
                  />
                  <path
                    class="cls-1"
                    data-name="Path 113"
                    d="M197.2,91.467a3.467,3.467,0,0,1,3.467,3.467H202.4a5.205,5.205,0,0,0-4.333-5.122V88h-1.733v1.811a5.2,5.2,0,0,0,.867,10.322,3.467,3.467,0,1,1-3.467,3.467H192a5.205,5.205,0,0,0,4.333,5.122v1.811h1.733v-1.811A5.2,5.2,0,0,0,197.2,98.4a3.467,3.467,0,1,1,0-6.933Z"
                    transform="translate(-175.533 -78.467)"
                  />
                  <rect
                    class="cls-1"
                    data-name="Rectangle 56"
                    width="1"
                    height="1"
                    transform="translate(10.834 4)"
                  />
                  <rect
                    class="cls-1"
                    data-name="Rectangle 57"
                    width="2"
                    height="1"
                    transform="translate(13.834 4)"
                  />
                  <rect
                    id="Rectangle_58"
                    class="cls-1"
                    data-name="Rectangle 58"
                    width="2"
                    height="1"
                    transform="translate(16.834 4)"
                  />
                  <rect
                    id="Rectangle_59"
                    class="cls-1"
                    data-name="Rectangle 59"
                    width="2"
                    height="1"
                    transform="translate(20.834 4)"
                  />
                  <rect
                    id="Rectangle_60"
                    class="cls-1"
                    data-name="Rectangle 60"
                    width="2"
                    height="1"
                    transform="translate(23.834 4)"
                  />
                  <rect
                    id="Rectangle_61"
                    class="cls-1"
                    data-name="Rectangle 61"
                    width="2"
                    height="1"
                    transform="translate(27.834 4)"
                  />
                  <rect
                    id="Rectangle_62"
                    class="cls-1"
                    data-name="Rectangle 62"
                    width="2"
                    height="1"
                    transform="translate(30.834 4)"
                  />
                </g>
              </g>
            </g>
          </svg>
          <span class="finanical-btn_title">
            درآمد ماه
            <br />
            <small>تومان</small>
          </span>

          <p class="persian-number">
            {{ Number(buttonsData.currentMonthIncome).toLocaleString() }}
          </p>
        </button>
        <button class="finanical-btn total">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="43.334"
            height="52"
            viewBox="0 0 43.334 52"
          >
            <g data-name="low-price (1)" transform="translate(-39.999)">
              <g data-name="Group 223" transform="translate(39.999)">
                <g data-name="Group 222">
                  <path
                    class="cls-1"
                    data-name="Path 112"
                    d="M82.466,30.333H76.4V.867A.867.867,0,0,0,75.532,0H47.8a.867.867,0,0,0-.867.867V30.333H40.866a.867.867,0,0,0-.6,1.492l20.8,19.933a.867.867,0,0,0,1.2,0l20.8-19.933a.867.867,0,0,0-.6-1.492Zm-20.8,19.6L43.022,32.067H47.8a.867.867,0,0,0,.867-.867V1.733h26V31.2a.867.867,0,0,0,.867.867H80.31Z"
                    transform="translate(-39.999)"
                  />
                  <path
                    class="cls-1"
                    data-name="Path 113"
                    d="M197.2,91.467a3.467,3.467,0,0,1,3.467,3.467H202.4a5.205,5.205,0,0,0-4.333-5.122V88h-1.733v1.811a5.2,5.2,0,0,0,.867,10.322,3.467,3.467,0,1,1-3.467,3.467H192a5.205,5.205,0,0,0,4.333,5.122v1.811h1.733v-1.811A5.2,5.2,0,0,0,197.2,98.4a3.467,3.467,0,1,1,0-6.933Z"
                    transform="translate(-175.533 -78.467)"
                  />
                  <rect
                    class="cls-1"
                    data-name="Rectangle 56"
                    width="1"
                    height="1"
                    transform="translate(10.834 4)"
                  />
                  <rect
                    class="cls-1"
                    data-name="Rectangle 57"
                    width="2"
                    height="1"
                    transform="translate(13.834 4)"
                  />
                  <rect
                    id="Rectangle_58"
                    class="cls-1"
                    data-name="Rectangle 58"
                    width="2"
                    height="1"
                    transform="translate(16.834 4)"
                  />
                  <rect
                    id="Rectangle_59"
                    class="cls-1"
                    data-name="Rectangle 59"
                    width="2"
                    height="1"
                    transform="translate(20.834 4)"
                  />
                  <rect
                    id="Rectangle_60"
                    class="cls-1"
                    data-name="Rectangle 60"
                    width="2"
                    height="1"
                    transform="translate(23.834 4)"
                  />
                  <rect
                    id="Rectangle_61"
                    class="cls-1"
                    data-name="Rectangle 61"
                    width="2"
                    height="1"
                    transform="translate(27.834 4)"
                  />
                  <rect
                    id="Rectangle_62"
                    class="cls-1"
                    data-name="Rectangle 62"
                    width="2"
                    height="1"
                    transform="translate(30.834 4)"
                  />
                </g>
              </g>
            </g>
          </svg>

          <span class="finanical-btn_title">
            درآمد کل
            <br />
            <small>تومان</small>
          </span>

          <p class="persian-number">
            {{ Number(buttonsData.totalIncome).toLocaleString() }}
          </p>
        </button>
      </div>
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
        <p class="section-title-text">چارت</p>
      </div>
      <section class="box-item transaction-chart">
        <header>
          <span>تعداد تراکنش ها</span>
          <div class="chart-times">
            <a
              href="#"
              :class="{ active: chartSort == 1 }"
              @click.prevent="getChartData(1)"
            >
              روزانه
            </a>
            <a
              href="#"
              :class="{ active: chartSort == 0 }"
              @click.prevent="getChartData(0)"
            >
              هفتگی
            </a>
            <a
              href="#"
              @click.prevent="getChartData(2)"
              :class="{ active: chartSort == 2 }"
            >
              ماهانه
            </a>
          </div>
        </header>

        <client-only>
          <barChart
            v-if="!loading"
            :height="200"
            :chartdata="chartData"
            :options="options"
          ></barChart>
        </client-only>
        <footer>
          <p>برای مشاهده دقیق اطلاعات هر ستون نشانگر موس را روی ان ببرید</p>
        </footer>
      </section>
    </div>
  </div>
</template>

<script>
import barChart from "@/plugins/chart.js";
export default {
  layout: "dashboardLay",
  middleware: "block",
  components: { barChart },
  head() {
    return {
      title: "پنل ویزیتور",
    };
  },
  data() {
    return {
      buttonsData: "",
      loading: true,
      chartData: null,
      chartSort: 0,
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontFamily: "IRANSansX",
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                fontFamily: "IRANSansX",
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  async mounted() {
    if (this.$route.params.id == undefined) {
      this.$router.push("/");
    } else {
      const isVisitorExist = await this.$axios.get(
        `/api/Visitor/VisitorHome/CheckAnyPageLink/${this.$route.params.id}`
      );
      if (
        isVisitorExist.data.statusCode == 200 &&
        isVisitorExist.data.message == "Success"
      ) {
        const [homeData, chartDataApi, visitorBlock] = await Promise.all([
          this.getHomeData(),
          this.$axios.get(`/api/Visitor/VisitorHome/GetChart/${this.$route.params.id}/0`),
        ]);
        let labels = [];
        let counts = [];
        chartDataApi.data.data.forEach((item) => {
          labels.push(item.time);
          counts.push(item.count);
        });
        this.chartData = {
          labels: labels,
          datasets: [
            {
              label: "",
              borderColor: "#249EBF",
              pointBackgroundColor: "white",
              borderWidth: 1,
              pointBorderColor: "#249EBF",
              backgroundColor: "transparent",
              data: counts,
            },
          ],
        };
        this.loading = false;
      } else {
        // redirect to main page
      }
    }
  },
  methods: {
    async getHomeData() {
      const homeData = await this.$axios.get(
        `/api/Visitor/VisitorHome/Index?pageLink=${this.$route.params.id}`
      );
      if (homeData.data.statusCode == 200 && homeData.data.message == "Success") {
        this.buttonsData = homeData.data.data;
      }
    },
    async getChartData(id) {
      this.chartSort = id;
      this.loading = true;
      const chartDataApi = await this.$axios.get(
        `/api/Visitor/VisitorHome/GetChart/${this.$route.params.id}/${id}`
      );

      let labels = [];
      let counts = [];
      chartDataApi.data.data.forEach((item) => {
        labels.push(item.time);
        counts.push(item.count);
      });
      this.chartData = {
        labels: labels,
        datasets: [
          {
            label: "",
            data: counts,
            borderColor: "#249EBF",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "#249EBF",
            backgroundColor: "transparent",
          },
        ],
      };
      this.loading = false;
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
