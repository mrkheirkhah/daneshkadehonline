<template>
  <div class="panel-table tickets">
    <div class="box-header">
      <h3>
        <skeleton
          v-if="loading"
          class="skeleton"
          width="95px"
          height="30px"
          borderRadius="5px"
        />
        <span v-else> لیست تیکت ها </span>
      </h3>
      <div class="add-ticket">
        <nuxt-link to="new-ticket" class="form-btn success"> تیکت جدید </nuxt-link>
      </div>
    </div>
    <section class="box-content custom-scrollbar" id="tickets-table">
      <header class="table-row table-header">
        <template v-if="loading">
          <span v-for="i in 6" :key="i">
            <skeleton class="skeleton" width="35px" height="20px" borderRadius="5px" />
          </span>
        </template>
        <template v-else>
          <span>عنوان</span>
          <span>تاریخ ثبت</span>
          <span>وضعیت</span>
          <span>جزئیات</span>
          <span>حذف</span>
        </template>
      </header>
      <template v-if="loading">
        <div class="table-row package-type" v-for="i in 4" :key="i.index">
          <span v-for="j in 6" :key="j">
            <skeleton class="skeleton" width="35px" height="20px" borderRadius="5px" />
          </span>
        </div>
      </template>
      <template v-else>
        <div class="table-row" v-for="ticket in tickets" :key="ticket.id">
          <span class="tickets-detail">
            <small>{{ ticket.title }}</small>
          </span>
          <span class="persian-number">
            {{ new Date(ticket.date).toLocaleDateString("fa-ir") }}
          </span>
          <span class="tickets-type seen" v-if="ticket.status == 'Answered'"
            >پاسخ داده شده</span
          >
          <span
            class="tickets-type not-seen"
            v-else-if="ticket.status == 'WaitingForAnswer'"
            >در انتظار پاسخ</span
          >
          <span class="tickets-type closed" v-else-if="ticket.status == 'Closed'"
            >بسته شده</span
          >
          <span class="tickets-type seen" v-else>پاسخ دانشجو</span>
          <span>
            <nuxt-link class="delete btn" :to="'/my/see-ticket/' + ticket.id"
              >مشاهده</nuxt-link
            >
          </span>
          <span>
            <button class="delete btn" @click.prevent="deleteTicket(ticket.id)">
              حذف
            </button>
          </span>
        </div>
      </template>

      <footer class="table-footer">
        <hr />
        <skeleton
          v-if="loading"
          class="skeleton"
          width="150px"
          height="30px"
          borderRadius="5px"
        />
        <a href="" type="button" @click.prevent="seeAll" v-else> مشاهده همه تیکت ها </a>
      </footer>
    </section>
  </div>
</template>

<script>
import skeleton from "@/components/skeleto-creator";
export default {
  layout: "dashboard",
  components: { skeleton },
  middleware: "userIsNotLog",
  data() {
    return {
      loading: false,
      tickets: "",
    };
  },
  mounted() {
    this.getTickets();
  },
  methods: {
    seeAll() {
      const table = document.getElementById("tickets-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer").style.display = "none");
    },
    async getTickets() {
      const tickets = await this.$axios.get("/api/Student/StudentTicket/GetTickets", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      if (tickets.data.statusCode == 200 && tickets.data.message == "Success") {
        this.tickets = tickets.data.data;
        this.loading = false;
      }
    },
    async deleteTicket(id) {
      this.$swal({
        text: "از پاک کردن این تیکت اطمینان دارید؟",
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "بله",
        cancelButtonText: "خیر",
      }).then(async (clickedBut) => {
        if (clickedBut.isConfirmed) {
          const deleteResp = await this.$axios.delete(
            `/api/Student/StudentTicket/RemoveTicket/${id}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (deleteResp.data.statusCode == 200 && deleteResp.data.message == "Success") {
            this.$swal({
              text: "انجام شد",
              icon: "success",
              showCloseButton: true,
              confirmButtonText: "تایید",
            }).then(() => {
              this.getTickets();
            });
          }
        }
      });
    },
  },
};
</script>
<style lang="scss">
// @import "@/assets/styles/stu-panel.scss";
@import "@/assets/swal-style.scss";
.add-ticket {
  .form-btn {
    margin: 25px 5px 15px 20px;
  }
}
</style>
