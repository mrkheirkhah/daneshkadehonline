<template>
  <div class="panel-teacher-content-item finanical">
    <div class="two-part-section">
      <div class="main-section">
        <div class="finanical-btn-container">
          <template v-if="loading">
            <button class="finanical-btn box-item" v-for="i in 4" :key="i">
              <span>
                <skeleton
                  class="skeleton left-section"
                  width="40px"
                  height="40px"
                  borderRadius="5px"
                />
              </span>
              <span class="finanical-btn_title">
                <span>
                  <skeleton
                    class="skeleton"
                    width="65px"
                    height="17px"
                    borderRadius="5px"
                  />
                  <br />
                  <skeleton
                    class="skeleton"
                    width="35px"
                    height="12px"
                    borderRadius="5px"
                  />
                </span>
              </span>
            </button>
          </template>
          <template v-else>
            <topCard
              icon="wallet"
              title="موجودی حساب"
              smallTitle="تومان"
              :text="boxDetails.wallet"
            />
            <topCard
              icon="today-sale"
              title="فروش امروز"
              smallTitle="تومان"
              :text="boxDetails.toDaySell"
            />
            <topCard
              icon="percent-icon"
              title="تراکنش های امروز"
              smallTitle="عدد"
              :text="boxDetails.toDayTransactions"
            />
            <topCard
              icon="income"
              title="درآمد کل"
              smallTitle="تومان"
              :text="boxDetails.totalIncome"
            />
          </template>
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
              class="persian-number"
              v-if="!loading"
              :height="300"
              :chartdata="chartData"
              :options="options"
            ></barChart>
          </client-only>
          <footer>
            <p>برای مشاهده دقیق اطلاعات هر ستون نشانگر موس را روی آن ببرید</p>
          </footer>
        </section>
      </div>
      <div class="aside-section">
        <aside class="box-item courses-aside">
          <header>
            <h3>
              <span v-if="loading">
                <skeleton
                  class="skeleton"
                  width="65px"
                  height="17px"
                  borderRadius="5px"
                />
              </span>
              <span v-else> دوره ها </span>
            </h3>
          </header>
          <div class="items-container" v-if="loading">
            <asideItemSkeleton />
            <asideItemSkeleton />
            <asideItemSkeleton />
            <asideItemSkeleton />
            <asideItemSkeleton />
            <asideItemSkeleton />
          </div>
          <div class="items-container" v-else>
            <div v-if="coursesData.length == 0" class="no-data-message">
              دوره ای ثبت نشده است
            </div>
            <template v-for="course in coursesData" v-else>
              <aside-items
                :key="course.id"
                :img="course.imageName"
                :title="course.courseName"
                :detail="course.shortDescription"
              />
            </template>
          </div>
          <footer>
            <hr />
            <span v-if="loading">
              <skeleton class="skeleton" width="100px" height="20px" borderRadius="5px" />
            </span>
            <nuxt-link to="/my-courses" v-else> مشاهده همه </nuxt-link>
          </footer>
        </aside>
      </div>
    </div>

    <div class="fullwidth-section" v-if="showReq">
      <div class="panel-table transaction-table">
        <div class="box-header">
          <h3>تعداد تراکنش ها</h3>
          <span class="persian-number">{{ orders.length }} تراکنش</span>
        </div>
        <section class="box-content" id="transactions-table">
          <header class="table-row table-header">
            <span class="course-owner">نام و نام خانوادگی</span>
            <span>دسته</span>
            <span>تاریخ</span>
            <span>ساعت</span>
            <span>قیمت (تومان)</span>
          </header>
          <transaction-table
            v-for="order in orders"
            :key="order.index"
            :name="order.studentName"
            :course="order.courseName"
            :date="order.orderData"
            :time="order.orderTime"
            :price="Number(order.price).toLocaleString()"
          />
          <footer class="table-footer">
            <hr />
            <a href="" @click.prevent="seeAll"> مشاهده همه </a>
          </footer>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import skeleton from "@/components/skeleton-components/skeletonCreator";
import asideItemSkeleton from "@/components/pages-skeleton/aside-item-skeleton";
import barChart from "@/plugins/chart.js";
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  components: { barChart, skeleton, asideItemSkeleton },
  head() {
    return {
      title: "پنل مدرس",
    };
  },
  data() {
    return {
      boxDetails: [],
      chartSort: 0,
      loading: true,
      orders: [],
      coursesData: [],
      showReq: true,
      chartData: null,
      // options: {
      //   cornerRadius: 20,
      //   scales: {
      //     yAxes: [
      //       {
      //         ticks: {
      //           beginAtZero: true,
      //         },
      //       },
      //     ],
      //   },
      //   legend: {
      //     display: false,
      //   },
      //   responsive: true,
      // },
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
              scaleFontSize: 80,
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
    const [getOrders, getBoxDetails, getCourseData, chartDataApi] = await Promise.all([
      this.$axios.get("/api/Teacher/TeacherHome/GetOrders", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      }),
      this.$axios.get("/api/Teacher/TeacherHome/GetBoxDetail", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      }),
      this.$axios.get("/api/Teacher/TeacherCourse/Course", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      }),
      this.$axios.get("/api/Teacher/TeacherHome/GetChart/0", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      }),
    ]);
    if (
      getOrders.data.statusCode == 200 &&
      getOrders.data.message == "Success" &&
      getBoxDetails.data.statusCode == 200 &&
      getBoxDetails.data.message == "Success" &&
      getCourseData.data.statusCode == 200 &&
      getCourseData.data.message == "Success"
    ) {
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
            // backgroundColor: [
            //   "rgb(255, 53,53)",
            //   "rgba(6, 214, 160)",
            //   "rgb(255, 53,53)",
            //   "rgba(6, 214, 160)",
            //   "rgb(255, 53,53)",
            //   "rgba(6, 214, 160)",
            //   "rgb(255, 53,53)",
            // ],
          },
        ],
      };
      this.boxDetails = getBoxDetails.data.data;
      for (const n of getCourseData.data.data) {
        this.coursesData.push({
          courseName: n.courseName,
          id: n.courseId,
          imageName: n.courseImageName,
          shortDescription: n.shortDescription,
        });
      }
      this.coursesData.slice(0, 5);
      if (getOrders.data.data.length != 0) {
        for (const n of getOrders.data.data) {
          this.orders.push({
            courseName: n.courseName,
            price: n.price,
            studentName: n.studentName,
            orderData: new Date(n.createDate).toLocaleDateString(),
            orderTime: new Date(n.createDate).toTimeString().slice(0, 5),
          });
        }
      } else {
        this.showReq = false;
      }
      this.loading = false;
    } else {
      this.$swal({
        text: "مشکلی رخ داده است!لطفا دوباره امتحان کرده یا صفحه را رفرش کنید",
        icon: "error",
        showCloseButton: true,
        confirmButtonText: "تلاش مجدد!",
      });
    }
  },
  methods: {
    seeAll() {
      const table = document.getElementById("transactions-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer").style.display = "none");
    },
    async getChartData(id) {
      this.chartSort = id;
      this.loading = true;
      const chartDataApi = await this.$axios.get(
        "/api/Teacher/TeacherHome/GetChart/" + id,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
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
            // backgroundColor: [
            //   "rgb(255, 53,53)",
            //   "rgba(6, 214, 160)",
            //   "rgb(255, 53,53)",
            //   "rgba(6, 214, 160)",
            //   "rgb(255, 53,53)",
            //   "rgba(6, 214, 160)",
            //   "rgb(255, 53,53)",
            //   "rgb(255, 53,53)",
            //   "rgba(6, 214, 160)",
            //   "rgb(255, 53,53)",
            //   "rgba(6, 214, 160)",
            //   "rgb(255, 53,53)",
            //   "rgba(6, 214, 160)",
            //   "rgb(255, 53,53)",
            //   "rgb(255, 53,53)",
            //   "rgba(6, 214, 160)",
            //   "rgb(255, 53,53)",
            //   "rgba(6, 214, 160)",
            //   "rgb(255, 53,53)",
            //   "rgba(6, 214, 160)",
            //   "rgb(255, 53,53)",
            //   "rgb(255, 53,53)",
            //   "rgba(6, 214, 160)",
            //   "rgb(255, 53,53)",
            //   "rgba(6, 214, 160)",
            //   "rgb(255, 53,53)",
            //   "rgba(6, 214, 160)",
            //   "rgb(255, 53,53)",
            //   "rgb(255, 53,53)",
            //   "rgba(6, 214, 160)",
            //   "rgb(255, 53,53)",
            // ],
          },
        ],
      };
      this.loading = false;
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/swal-style.scss";
</style>
