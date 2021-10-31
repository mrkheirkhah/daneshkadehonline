<template>
  <div>
    <div class="panel-teacher-content-item withdraw-wallet">
      <header>
        <p class="section-header">
          <skeleton
            v-if="loading"
            class="skeleton"
            width="85px"
            height="30px"
            borderRadius="5px"
          />
          <span v-else> برداشت از کیف پول </span>
        </p>
      </header>
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
        <p class="section-title-text">
          <skeleton
            v-if="loading"
            class="skeleton"
            width="95px"
            height="35px"
            borderRadius="5px"
          />
          <span v-else> برداشت </span>
        </p>
      </div>
      <form action="#">
        <template v-if="loading">
          <div class="form-row">
            <skeleton
              class="skeleton discount-inp-skeleton form-row-col"
              width="150px"
              height="50px"
              borderRadius="5px"
            />
          </div>
          <div class="hint-text">
            <skeleton
              class="skeleton discount-inp-skeleton form-row-col"
              width="300px"
              height="35px"
              borderRadius="5px"
            />
          </div>
          <skeleton
            v-if="loading"
            class="skeleton form-btn-skeleton"
            width="150px"
            height="50px"
            borderRadius="5px"
          />
        </template>
        <template v-else>
          <div class="form-row">
            <div class="form-row-col">
              <input
                type="number"
                class="form-input"
                v-model="withdrawReq"
                placeholder="به تومان وارد شود"
              />
              <span class="hint-text persian-number"
                >{{ priceUnderSuggestionPrice }} تومان</span
              >
            </div>
          </div>
          <div class="hint-text">
            کل مبلغ کیف پول
            <span class="walletbalane persian-number">{{ walletAmount }}</span> تومان
            &nbsp;
            <a href="" type="button" class="withdraw-total" @click.prevent="withdrawAll"
              >برداشت کل مبلغ!</a
            >
          </div>
          <button class="form-btn" @click.prevent="witdraw">برداشت</button>
        </template>
      </form>
    </div>
    <div class="panel-table transaction-table">
      <div class="box-header">
        <h3>لیست درخواست تسویه</h3>
      </div>
      <section class="box-content custom-scrollbar" id="settlement-table">
        <header class="table-row table-header">
          <span class="course-owner">قیمت (تومان)</span>
          <span class="date">تاریخ</span>
          <span class="time">ساعت</span>
          <span>وضعیت</span>
        </header>
        <div class="table-row" v-for="settlement in settlements" :key="settlement.id">
          <span class="persian-number">{{
            settlement.requestAmount.toLocaleString()
          }}</span>
          <span class="persian-number date">{{
            new Date(settlement.createDate).toLocaleDateString("fa-IR")
          }}</span>
          <span class="persian-number time">{{
            new Date(settlement.createDate).toLocaleTimeString("fa-IR")
          }}</span>
          <span class="green" v-if="settlement.status == 'Payed'">واریز شده</span>
          <span class="yellow" v-else-if="settlement.status == 'AwaitingApproval'"
            >در انتظار تایید</span
          >
          <span class="yellow" v-else-if="settlement.status == 'InPayList'"
            >در انتظار پرداخت</span
          >
          <span class="yellow" v-else-if="settlement.status == 'NotAccepted'"
            >رد شده</span
          >
        </div>
        <footer class="table-footer">
          <hr />
          <a href="" type="button" @click.prevent="seeAll"> مشاهده همه درخواست ها </a>
        </footer>
      </section>
    </div>
  </div>
</template>

<script>
import skeleton from "@/components/skeleton-components/skeletonCreator";
export default {
  layout: "dashboardLay",
  components: { skeleton },
  middleware: "userIsNotLog",
  head() {
    return {
      title: "برداشت از حساب",
    };
  },
  data() {
    return {
      loading: true,
      withdrawReq: "",
      walletAmount: "",
      settlements: "",
      priceUnderSuggestionPrice: 0,
    };
  },
  async mounted() {
    const walletData = await this.$axios.get("/api/Teacher/TeacherHome/GetBoxDetail", {
      headers: {
        Authorization: `Bearer ${this.$cookies.get("key")}`,
      },
    });
    if (walletData.data.statusCode == 200 && walletData.data.message == "Success") {
      this.walletAmount = walletData.data.data.wallet;
      this.loading = false;
    }
    await this.getSettlements();
  },
  methods: {
    seeAll() {
      const table = document.getElementById("settlement-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer").style.display = "none");
    },
    async getSettlements() {
      const settlements = await this.$axios.get(
        `/api/Teacher/TeacherSettlementRequest/GetSettlementRequests`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (settlements.data.statusCode == 200 && settlements.data.message == "Success") {
        this.settlements = settlements.data.data;
      }
    },
    withdrawAll() {
      this.withdrawReq = Number(this.walletAmount);
    },
    async witdraw() {
      if (
        this.withdrawReq != "" &&
        Number(this.withdrawReq) <= Number(this.walletAmount) &&
        Number(this.withdrawReq) > 0
      ) {
        const withdrawResp = await this.$axios.post(
          `/api/Teacher/TeacherSettlementRequest/AddSettlementRequest?requestAmount=${this.withdrawReq}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (
          withdrawResp.data.statusCode == 200 &&
          withdrawResp.data.message == "Success"
        ) {
          this.$swal({
            text: "ثبت شد!منتظر تایید ادمین باشید",
            icon: "success",
            showCloseButton: true,
            confirmButtonText: "تایید",
          });
          this.withdrawReq = "";
        }
      } else {
        this.$swal({
          text: "مبلغ درخواستی بیشتر از موجودی است",
          icon: "error",
          showCloseButton: true,
          confirmButtonText: "ویرایش",
        });
      }
    },
  },
  watch: {
    withdrawReq: {
      handler() {
        this.priceUnderSuggestionPrice = Number(this.withdrawReq).toLocaleString();
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/swal-style.scss";
</style>
