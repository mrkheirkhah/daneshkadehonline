<template>
  <div>
    <div class="panel-table main-content-transactions">
      <div class="box-header">
        <h3>لیست تراکنش ها</h3>
        <form action="">
          <label for="main-content-search-btn" class="search-box" tabindex="0">
            <input
              type="search"
              placeholder="جستجو کنید"
              class="search-btn"
              id="main-content-search-btn"
              v-model="searchInput"
            />
            <img
              src="@/static/icons/search-icon-orange.png"
              @click.prevent="searchTransactions"
              alt="آیکون سرچ"
            />
          </label>
        </form>
      </div>
      <section class="box-content custom-scrollbar" id="transactions-table">
        <header class="table-row table-header">
          <span class="name">نام مدرس</span>
          <span class="name">نام دوره</span>
          <span>مبلغ</span>
          <span class="type">مقدار کمیسیون</span>
          <span>درصد کمیسیون</span>
        </header>
        <div
          class="table-row"
          v-for="transaction in transactions"
          :key="transactions.indexOf(transaction)"
        >
          <span class="name">{{ transaction.teacherName }}</span>
          <span class="name">{{ transaction.courseName }}</span>
          <span class="persian-number">{{
            Number(transaction.amount).toLocaleString()
          }}</span>
          <span class="persian-number">{{
            Number(transaction.commission).toLocaleString()
          }}</span>
          <span class="persian-number">{{
            Number(transaction.commissionPercentage).toLocaleString()
          }}</span>
        </div>

        <footer class="table-footer-transactions">
          <hr />
          <a href="" type="button" @click.prevent="seeAllTransactions"> مشاهده همه </a>
        </footer>
      </section>
    </div>
    <div class="settlement-request">
      <div class="panel-table settlement-request-list">
        <div class="box-header">
          <h3>در انتظار تایید</h3>
        </div>
        <section class="box-content custom-scrollbar" id="settlement-table">
          <header class="table-row table-header">
            <span class="date">تاریخ</span>
            <span class="time">ساعت</span>
            <span>مبلغ</span>
            <span class="confirm-reject"> وضعیت </span>
          </header>
          <div class="table-row" v-for="request in settlements" :key="request.id">
            <span class="persian-number date">{{
              new Date(request.createDate).toLocaleDateString("fa-IR")
            }}</span>
            <span class="persian-number time">{{
              new Date(request.createDate).toLocaleTimeString("fa-IR")
            }}</span>
            <span class="persian-number">{{
              Number(request.requestAmount).toLocaleString()
            }}</span>
            <span class="confirm-reject">
              <span>
                <button class="confirm" @click.prevent="changeStatus(request.id, '1')">
                  تائید
                </button>
                /
                <button class="reject" @click.prevent="changeStatus(request.id, '3')">
                  رد
                </button>
              </span>
            </span>
          </div>

          <footer class="table-footer-settlement">
            <hr />
            <a href="" type="button" @click.prevent="seeAllSettlement"> مشاهده همه </a>
          </footer>
        </section>
      </div>
    </div>

    <div class="settlement-request">
      <div class="panel-table settlement-request-list">
        <div class="box-header">
          <h3>در انتظار پرداخت</h3>
        </div>
        <section class="box-content custom-scrollbar" id="in-pay-list-table">
          <header class="table-row table-header">
            <span class="date">تاریخ</span>
            <span class="time">ساعت</span>
            <span>مبلغ</span>
            <span class="confirm-reject"> پرداخت / بازگشت به در انتظار تایید </span>
          </header>
          <div class="table-row" v-for="request in inPayList" :key="request.id">
            <span class="persian-number date">{{
              new Date(request.createDate).toLocaleDateString("fa-IR")
            }}</span>
            <span class="persian-number time">{{
              new Date(request.createDate).toLocaleTimeString("fa-IR")
            }}</span>
            <span class="persian-number">{{
              Number(request.requestAmount).toLocaleString()
            }}</span>
            <span class="confirm-reject">
              <span>
                <button class="reject" @click.prevent="changeStatus(request.id, '0')">
                  بازگشت
                </button>
                /
                <button class="confirm" @click.prevent="openPayModal(request.id)">
                  پرداخت
                </button>
              </span>
            </span>
          </div>

          <footer class="in-pay-list-footer">
            <hr />
            <a href="" type="button" @click.prevent="seeAllInPayList"> مشاهده همه </a>
          </footer>
        </section>
      </div>
    </div>

    <div class="settlement-request">
      <div class="panel-table settlement-request-list">
        <div class="box-header">
          <h3>پرداخت شده</h3>
        </div>
        <section class="box-content custom-scrollbar" id="payed-table">
          <header class="table-row table-header">
            <span class="date">تاریخ</span>
            <span class="time">ساعت</span>
            <span>مبلغ</span>
            <span class="confirm-reject"> شماره بایگانی </span>
          </header>
          <div class="table-row" v-for="request in payed" :key="request.id">
            <span class="persian-number date">{{
              new Date(request.createDate).toLocaleDateString("fa-IR")
            }}</span>
            <span class="persian-number time">{{
              new Date(request.createDate).toLocaleTimeString("fa-IR")
            }}</span>
            <span class="persian-number">{{
              Number(request.requestAmount).toLocaleString()
            }}</span>
            <span class="confirm-reject">
              {{ request.archiveCode }}
            </span>
          </div>

          <footer class="payed-settlement">
            <hr />
            <a href="" type="button" @click.prevent="seeAllPayed"> مشاهده همه </a>
          </footer>
        </section>
      </div>
    </div>

    <div class="settlement-request">
      <div class="panel-table settlement-request-list">
        <div class="box-header">
          <h3>رد شده</h3>
        </div>
        <section class="box-content custom-scrollbar" id="rejected-table">
          <header class="table-row table-header">
            <span class="date">تاریخ</span>
            <span class="time">ساعت</span>
            <span>مبلغ</span>
          </header>
          <div class="table-row" v-for="request in rejected" :key="request.id">
            <span class="persian-number date">{{
              new Date(request.createDate).toLocaleDateString("fa-IR")
            }}</span>
            <span class="persian-number time">{{
              new Date(request.createDate).toLocaleTimeString("fa-IR")
            }}</span>
            <span class="persian-number">{{
              Number(request.requestAmount).toLocaleString()
            }}</span>
          </div>

          <footer class="rejected-settlement">
            <hr />
            <a href="" type="button" @click.prevent="seeAllRejected"> مشاهده همه </a>
          </footer>
        </section>
      </div>
    </div>
    <div class="modal-send-message contact-us">
      <div class="content-box">
        <form action="">
          <div class="your-message-heading">شماره بایگانی</div>
          <div class="form-row">
            <div class="form-row-col">
              <input class="form-input" v-model="archiveCode" placeholder="کد آرشیو" />
            </div>
          </div>

          <div class="footer-buttons-container">
            <button type="button" class="form-btn gray-color" @click="closeModal">
              انصراف
            </button>
            <button class="form-btn success" @click.prevent="submitPay">ارسال</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  data() {
    return {
      transactions: "",
      settlements: "",
      searchInput: "",
      inPayList: "",
      payed: "",
      rejected: "",
      archiveCode: "",
      payThisId: "",
    };
  },
  async mounted() {
    if (this.$route.params.id == undefined || isNaN(this.$route.params.id)) {
      this.$router.push("/add-visitor");
    } else {
      Promise.all([
        this.getTransactions(),
        this.getAwaitReq(),
        this.getInPayList(),
        this.getPayed(),
        this.getRejected(),
      ]);
    }
  },
  methods: {
    seeAllTransactions() {
      const table = document.getElementById("transactions-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer-transactions").style.display =
        "none");
    },
    seeAllSettlement() {
      const table = document.getElementById("settlement-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer-settlement").style.display =
        "none");
    },
    seeAllInPayList() {
      const table = document.getElementById("in-pay-list-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".in-pay-list-footer").style.display =
        "none");
    },
    seeAllPayed() {
      const table = document.getElementById("payed-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".payed-footer").style.display = "none");
    },
    seeAllRejected() {
      const table = document.getElementById("rejected-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".rejected-footer").style.display = "none");
    },
    async getTransactions() {
      const transactions = await this.$axios.get(
        `/api/Admin/AdminManageVisitor/GetVisitorWallets/${this.$route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      // console.log(transactions);
      this.transactions = transactions.data.data;
    },
    async getAwaitReq() {
      const requests = await this.$axios.get(
        `/api/Admin/AdminManageVisitor/GetVisitorSettlementRequests/${this.$route.params.id}?status=0`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (requests.data.statusCode == 200 && requests.data.message == "Success") {
        this.settlements = requests.data.data;
      }
    },
    async getRejected() {
      const requests = await this.$axios.get(
        `/api/Admin/AdminManageVisitor/GetVisitorSettlementRequests/${this.$route.params.id}?status=3`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      console.log(requests);
      if (requests.data.statusCode == 200 && requests.data.message == "Success") {
        this.rejected = requests.data.data;
      }
    },
    async getInPayList() {
      const requests = await this.$axios.get(
        `/api/Admin/AdminManageVisitor/GetVisitorSettlementRequests/${this.$route.params.id}?status=1`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (requests.data.statusCode == 200 && requests.data.message == "Success") {
        this.inPayList = requests.data.data;
      }
    },
    async getPayed() {
      const requests = await this.$axios.get(
        `/api/Admin/AdminManageVisitor/GetVisitorSettlementRequests/${this.$route.params.id}?status=2`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (requests.data.statusCode == 200 && requests.data.message == "Success") {
        this.payed = requests.data.data;
      }
    },
    async changeStatus(id, type) {
      const changeStatusResp = await this.$axios.get(
        `/api/Admin/AdminManageVisitor/ChangeSettlementRequest/${id}?status=${type}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        changeStatusResp.data.statusCode == 200 &&
        changeStatusResp.data.message == "Success"
      ) {
        this.$swal({
          text: "ثبت شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
        Promise.all([
          this.getAwaitReq(),
          this.getInPayList(),
          this.getPayed(),
          this.getRejected(),
        ]);
      }
    },
    openPayModal(id) {
      this.payThisId = id;
      const modal = document.querySelector(".modal-send-message.contact-us");
      modal.style.visibility = "visible";
      modal.style.opacity = "1";
    },
    closeModal() {
      this.payThisId = "";
      const modal = document.querySelector(".modal-send-message.contact-us");
      modal.style.visibility = "hidden";
      modal.style.opacity = "0";
    },
    async submitPay() {
      const submitPayResp = await this.$axios.get(
        `/api/Admin/AdminManageVisitor/ChangeSettlementRequest/${this.payThisId}?status=2&archiveCode=${this.archiveCode}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        submitPayResp.data.statusCode == 200 &&
        submitPayResp.data.message == "Success"
      ) {
        this.$swal({
          text: "ثبت شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
        Promise.all([
          this.getAwaitReq(),
          this.getInPayList(),
          this.getPayed(),
          this.getRejected(),
        ]);
      }
      this.closeModal();
    },
    async searchTransactions(event) {
      if (this.searchInput != "") {
        const transactions = await this.$axios.get(
          `/api/Admin/AdminManageVisitor/GetVisitorWallets/${this.$route.params.id}/${this.searchInput}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (
          transactions.data.statusCode == 200 &&
          transactions.data.message == "Success"
        ) {
          this.transactions = transactions.data.data;
          this.searchInput = "";
        }
      } else {
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
