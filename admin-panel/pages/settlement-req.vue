<template>
  <div class="settlement-request">
    <div class="panel-table settlement-request-list">
      <div class="box-header">
        <h3>در انتظار تایید</h3>
        <form action="">
          <!-- <button class="form-btn confirm-all">تائید همه</button> -->
          <label for="settlement-request-search-btn" class="search-box" tabindex="0">
            <input
              type="search"
              placeholder="جستجو کنید"
              class="search-btn"
              v-model="searchInput0"
            />
            <img
              src="@/static/icons/search-icon-orange.png"
              alt="آیکون سرچ"
              @click="searchEvent(0)"
            />
          </label>
        </form>
      </div>
      <section class="box-content custom-scrollbar" id="settlement-table">
        <header class="table-row table-header">
          <span>نام مدرس </span>
          <span class="date">تاریخ</span>
          <span class="time">ساعت</span>
          <span>مبلغ</span>
          <span>شماره کارت</span>
          <span>شماره شبا</span>
          <span class="confirm-reject"> تائید / رد </span>
        </header>
        <div class="table-row" v-for="request in requests" :key="request.id">
          <span>{{ request.name }}</span>
          <span class="persian-number date">{{
            new Date(request.createDate).toLocaleDateString("fa-IR")
          }}</span>
          <span class="persian-number time">{{
            new Date(request.createDate).toLocaleTimeString("fa-IR")
          }}</span>
          <span class="persian-number">{{ request.requestAmount }}</span>
          <span class="persian-number">{{ request.cardNumber }}</span>
          <span class="persian-number">{{ request.shebaNumber }}</span>
          <span class="confirm-reject">
            <button class="confirm" @click.prevent="changeStatus(request.id, '1')">
              تائید
            </button>
            /
            <button class="reject" @click.prevent="changeStatus(request.id, '3')">
              رد
            </button>
          </span>
        </div>

        <footer class="table-footer">
          <hr />
          <a href="" type="button" @click.prevent="seeAll"> مشاهده همه </a>
        </footer>
      </section>
    </div>
    <div class="panel-table settlement-request-list">
      <div class="box-header">
        <h3>در انتظار پرداخت</h3>
        <form action="">
          <!-- <button class="form-btn confirm-all">تائید همه</button> -->
          <label for="settlement-request-search-btn" class="search-box" tabindex="0">
            <input
              type="search"
              placeholder="جستجو کنید"
              class="search-btn"
              v-model="searchInput1"
            />
            <img
              src="@/static/icons/search-icon-orange.png"
              alt="آیکون سرچ"
              @click="searchEvent(1)"
            />
          </label>
        </form>
      </div>
      <section class="box-content custom-scrollbar" id="in-pay-list-table">
        <header class="table-row table-header">
          <span>نام مدرس </span>
          <span class="date">تاریخ</span>
          <span class="time">ساعت</span>
          <span>مبلغ</span>
          <span>شماره کارت</span>
          <span>شماره شبا</span>
          <span class="confirm-reject"> پرداخت / بازگشت به در انتظار تایید </span>
        </header>
        <div class="table-row" v-for="request in inPayList" :key="request.id">
          <span>{{ request.name }}</span>
          <span class="persian-number date">{{
            new Date(request.createDate).toLocaleDateString("fa-IR")
          }}</span>
          <span class="persian-number time">{{
            new Date(request.createDate).toLocaleTimeString("fa-IR")
          }}</span>
          <span class="persian-number">{{ request.requestAmount }}</span>
          <span class="persian-number">{{ request.cardNumber }}</span>
          <span class="persian-number">{{ request.shebaNumber }}</span>
          <span class="confirm-reject">
            <button class="reject" @click.prevent="changeStatus(request.id, '0')">
              بازگشت
            </button>
            /
            <button class="confirm" @click.prevent="openPayModal(request.id)">
              پرداخت
            </button>
          </span>
        </div>

        <footer class="in-pay-list-footer">
          <hr />
          <a href="" type="button" @click.prevent="seeAllInPayList"> مشاهده همه </a>
        </footer>
      </section>
    </div>

    <div class="panel-table settlement-request-list">
      <div class="box-header">
        <h3>پرداخت شده</h3>
        <form action="">
          <!-- <button class="form-btn confirm-all">تائید همه</button> -->
          <label for="settlement-request-search-btn" class="search-box" tabindex="0">
            <input
              type="search"
              placeholder="جستجو کنید"
              class="search-btn"
              v-model="searchInput2"
            />
            <img
              src="@/static/icons/search-icon-orange.png"
              alt="آیکون سرچ"
              @click="searchEvent(2)"
            />
          </label>
        </form>
      </div>
      <section class="box-content custom-scrollbar" id="payed-table">
        <header class="table-row table-header">
          <span>نام مدرس </span>
          <span class="date">تاریخ</span>
          <span class="time">ساعت</span>
          <span>مبلغ</span>
          <span>شماره کارت</span>
          <span>شماره شبا</span>
          <span>شماره بایگانی</span>
        </header>
        <div class="table-row" v-for="request in payed" :key="request.id">
          <span>{{ request.name }}</span>
          <span class="persian-number date">{{
            new Date(request.createDate).toLocaleDateString("fa-IR")
          }}</span>
          <span class="persian-number time">{{
            new Date(request.createDate).toLocaleTimeString("fa-IR")
          }}</span>
          <span class="persian-number">{{ request.requestAmount }}</span>
          <span class="persian-number">{{ request.cardNumber }}</span>
          <span class="persian-number">{{ request.shebaNumber }}</span>
          <span class="persian-number">{{ request.archiveCode }}</span>
        </div>

        <footer class="payed-footer">
          <hr />
          <a href="" type="button" @click.prevent="seeAllPayed"> مشاهده همه </a>
        </footer>
      </section>
    </div>
    <div class="panel-table settlement-request-list">
      <div class="box-header">
        <h3>رد شده</h3>
        <form action="">
          <!-- <button class="form-btn confirm-all">تائید همه</button> -->
          <label for="settlement-request-search-btn" class="search-box" tabindex="0">
            <input
              type="search"
              placeholder="جستجو کنید"
              class="search-btn"
              v-model="searchInput3"
            />
            <img
              src="@/static/icons/search-icon-orange.png"
              alt="آیکون سرچ"
              @click="searchEvent(3)"
            />
          </label>
        </form>
      </div>
      <section class="box-content custom-scrollbar" id="rejected-table">
        <header class="table-row table-header">
          <span>نام مدرس </span>
          <span class="date">تاریخ</span>
          <span class="time">ساعت</span>
          <span>مبلغ</span>
          <span>شماره کارت</span>
          <span>شماره شبا</span>
        </header>
        <div class="table-row" v-for="request in rejected" :key="request.id">
          <span>{{ request.name }}</span>
          <span class="persian-number date">{{
            new Date(request.createDate).toLocaleDateString("fa-IR")
          }}</span>
          <span class="persian-number time">{{
            new Date(request.createDate).toLocaleTimeString("fa-IR")
          }}</span>
          <span class="persian-number">{{ request.requestAmount }}</span>
          <span class="persian-number">{{ request.cardNumber }}</span>
          <span class="persian-number">{{ request.shebaNumber }}</span>
        </div>

        <footer class="rejected-footer">
          <hr />
          <a href="" type="button" @click.prevent="seeAllRejected"> مشاهده همه </a>
        </footer>
      </section>
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
      requests: "",
      searchInput: "",
      inPayList: "",
      payed: "",
      rejected: "",
      archiveCode: "",
      payThisId: "",
      searchInput0: "",
      searchInput1: "",
      searchInput2: "",
      searchInput3: "",
    };
  },
  mounted() {
    Promise.all([
      this.getAwaitReq(),
      this.getInPayList(),
      this.getPayed(),
      this.getRejected(),
    ]);
  },
  methods: {
    seeAll() {
      const table = document.getElementById("settlement-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer").style.display = "none");
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
    async getAwaitReq() {
      const requests = await this.$axios.get(
        `/api/Admin/AdminSettlementRequest/GetSettlementRequests?status=0`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (requests.data.statusCode == 200 && requests.data.message == "Success") {
        this.requests = requests.data.data;
      }
    },
    async getRejected() {
      const requests = await this.$axios.get(
        `/api/Admin/AdminSettlementRequest/GetSettlementRequests?status=3`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      // console.log(requests);
      if (requests.data.statusCode == 200 && requests.data.message == "Success") {
        this.rejected = requests.data.data;
      }
    },
    async getInPayList() {
      const requests = await this.$axios.get(
        `/api/Admin/AdminSettlementRequest/GetSettlementRequests?status=1`,
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
        `/api/Admin/AdminSettlementRequest/GetSettlementRequests?status=2`,
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
        `/api/Admin/AdminSettlementRequest/ChangeSettlementRequestStatus/${id}?status=${type}`,
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
        `/api/Admin/AdminSettlementRequest/ChangeSettlementRequestStatus/${this.payThisId}?status=2&archiveCode=${this.archiveCode}`,
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
      Promise.all([
        this.getAwaitReq(),
        this.getInPayList(),
        this.getPayed(),
        this.getRejected(),
      ]);
    },
    async searchEvent(id) {
      if (id == 0) {
        this.searchInput = this.searchInput0;
      } else if (id == 1) {
        this.searchInput = this.searchInput1;
      } else if (id == 2) {
        this.searchInput = this.searchInput2;
      } else {
        this.searchInput = this.searchInput3;
      }
      const requests = await this.$axios.get(
        `/api/Admin/AdminSettlementRequest/GetSettlementRequests?search=${this.searchInput}&status=${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (requests.data.statusCode == 200 && requests.data.message == "Success") {
        if (id == 0) {
          this.requests = requests.data.data;
        } else if (id == 1) {
          this.inPayList = requests.data.data;
        } else if (id == 2) {
          this.payed = requests.data.data;
        } else {
          this.rejected = requests.data.data;
        }
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
