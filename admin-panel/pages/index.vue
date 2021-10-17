<template>
  <div class="main-content">
    <div class="panel-admin-content-item main-content">
      <header class="mb-4">
        <p class="section-header">صفحه اصلی پنل ادمین</p>
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

          <p class="persian-number">{{ loadData.toDayIncome }}</p>
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

          <p class="persian-number">{{ loadData.currentWeekIncome }}</p>
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

          <p class="persian-number">{{ loadData.currentMonthIncome }}</p>
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

          <p class="persian-number">{{ loadData.allIncome }}</p>
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
        <p class="section-title-text">آپشن ها</p>
      </div>
      <form action="#">
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              v-model="defCommision"
              placeholder="تنظیم کمیسیون"
            />
          </label>
          <label for="" class="form-row-col">
            <input
              type="number"
              class="form-input"
              v-model="defVolume"
              placeholder="میزان حجم پایه"
            />
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <button class="form-btn success" @click.prevent="submitCommision">
              ثبت کمیسیون
            </button>
          </label>
          <label for="" class="form-row-col">
            <button class="form-btn success" @click.prevent="submitVolume">
              ثبت حجم
            </button>
          </label>
        </div>
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
        <p class="section-title-text">آمار</p>
      </div>
      <div class="istatistic-admin">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>روز</th>
              <th>هفته</th>
              <th>ماه</th>
              <th>سال</th>
              <th>کل</th>
            </tr>
          </thead>
          <tbody v-if="loadData">
            <tr>
              <th class="side-th">تعداد معلمین</th>
              <td class="persian-number">{{ loadData.teachers.day }}</td>
              <td class="persian-number">{{ loadData.teachers.week }}</td>
              <td class="persian-number">{{ loadData.teachers.month }}</td>
              <td class="persian-number">{{ loadData.teachers.year }}</td>
              <td class="persian-number">{{ loadData.teachers.all }}</td>
            </tr>
            <tr>
              <th class="side-th">تعداد دانشجو</th>
              <td class="persian-number">{{ loadData.students.day }}</td>
              <td class="persian-number">{{ loadData.students.week }}</td>
              <td class="persian-number">{{ loadData.students.month }}</td>
              <td class="persian-number">{{ loadData.students.year }}</td>
              <td class="persian-number">{{ loadData.students.all }}</td>
            </tr>
            <tr>
              <th class="side-th">تعداد نظرات دوره ها</th>
              <td class="persian-number">{{ loadData.courseComments.day }}</td>
              <td class="persian-number">{{ loadData.courseComments.week }}</td>
              <td class="persian-number">{{ loadData.courseComments.month }}</td>
              <td class="persian-number">{{ loadData.courseComments.year }}</td>
              <td class="persian-number">{{ loadData.courseComments.all }}</td>
            </tr>
            <tr>
              <th class="side-th">تعداد نظرات خبر ها</th>
              <td class="persian-number">{{ loadData.newsComments.day }}</td>
              <td class="persian-number">{{ loadData.newsComments.week }}</td>
              <td class="persian-number">{{ loadData.newsComments.month }}</td>
              <td class="persian-number">{{ loadData.newsComments.year }}</td>
              <td class="persian-number">{{ loadData.newsComments.all }}</td>
            </tr>
            <tr>
              <th class="side-th">تعداد سوالات</th>
              <td class="persian-number">{{ loadData.questions.day }}</td>
              <td class="persian-number">{{ loadData.questions.week }}</td>
              <td class="persian-number">{{ loadData.questions.month }}</td>
              <td class="persian-number">{{ loadData.questions.year }}</td>
              <td class="persian-number">{{ loadData.questions.all }}</td>
            </tr>
            <tr>
              <th class="side-th">تعداد دوره ها</th>
              <td class="persian-number">{{ loadData.courses.day }}</td>
              <td class="persian-number">{{ loadData.courses.week }}</td>
              <td class="persian-number">{{ loadData.courses.month }}</td>
              <td class="persian-number">{{ loadData.courses.year }}</td>
              <td class="persian-number">{{ loadData.courses.all }}</td>
            </tr>
            <tr>
              <th class="side-th">تعداد اخبار</th>
              <td class="persian-number">{{ loadData.newses.day }}</td>
              <td class="persian-number">{{ loadData.newses.week }}</td>
              <td class="persian-number">{{ loadData.newses.month }}</td>
              <td class="persian-number">{{ loadData.newses.year }}</td>
              <td class="persian-number">{{ loadData.newses.all }}</td>
            </tr>
            <tr>
              <th class="side-th">تعداد ویزیتور ها</th>
              <td class="persian-number">{{ loadData.visitors.day }}</td>
              <td class="persian-number">{{ loadData.visitors.week }}</td>
              <td class="persian-number">{{ loadData.visitors.month }}</td>
              <td class="persian-number">{{ loadData.visitors.year }}</td>
              <td class="persian-number">{{ loadData.visitors.all }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import barChart from "@/plugins/chart.js";
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  components: { barChart },
  data() {
    return {
      defCommision: "",
      defVolume: "",
      loadData: "",
      loading: true,
      chartData: null,
      chartSort: 0,
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
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
    await Promise.all([this.getDefCommision(), this.getDefVolume(), this.getLoadData()]);

    const chartDataApi = await this.$axios.get(`/api/Admin/AdminHome/GetChart/0`, {
      headers: {
        Authorization: `Bearer ${this.$cookies.get("key")}`,
      },
    });
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
  },
  methods: {
    async getChartData(id) {
      this.chartSort = id;
      this.loading = true;
      const chartDataApi = await this.$axios.get(`/api/Admin/AdminHome/GetChart/${id}`, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });

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
    async getLoadData() {
      const loadData = await this.$axios.get("/api/Admin/AdminHome/Index", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      // console.log(loadData);
      if (loadData.data.statusCode == 200 && loadData.data.message == "Success") {
        this.loadData = loadData.data.data;
      }
    },
    async getDefCommision() {
      const commision = await this.$axios.get(
        "/api/Admin/AdminManageSiteInfo/DefaultCommission",
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (commision.data.statusCode == 200 && commision.data.message == "Success") {
        this.defCommision = commision.data.data;
      }
    },
    async getDefVolume() {
      const volume = await this.$axios.get(
        "/api/Admin/AdminManageSiteInfo/DefaultVolume",
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (volume.data.statusCode == 200 && volume.data.message == "Success") {
        this.defVolume = volume.data.data;
      }
    },
    async submitVolume() {
      const submitVolumeResp = await this.$axios.get(
        `/api/Admin/AdminManageSiteInfo/DefaultVolume/${this.defVolume}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        submitVolumeResp.data.statusCode == 200 &&
        submitVolumeResp.data.message == "Success"
      ) {
        this.$swal({
          text: "انجام شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
        this.getDefVolume();
      }
    },
    async submitCommision() {
      const submitCommisionResp = await this.$axios.get(
        `/api/Admin/AdminManageSiteInfo/DefaultCommission/${this.defCommision}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        submitCommisionResp.data.statusCode == 200 &&
        submitCommisionResp.data.message == "Success"
      ) {
        this.$swal({
          text: "انجام شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
        this.getDefCommision();
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
