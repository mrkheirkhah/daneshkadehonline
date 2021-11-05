<template>
  <div class="panel-teacher-content-item tickets">
    <div class="panel-table tickets-table">
      <div class="box-header">
        <h3>تیکت ها</h3>
      </div>
      <div class="add-ticket">
        <nuxt-link to="new-ticket" class="form-btn success"> تیکت جدید </nuxt-link>
      </div>
      <section class="box-content" id="tickets-table">
        <transactionsTableSkeleton v-if="loading" />
        <template v-else>
          <header class="table-row table-header">
            <span>عنوان</span>
            <span>تاریخ ثبت</span>
            <span>وضعیت</span>
            <span>جزئیات</span>
            <span>حذف</span>
            <!-- <label
              for="tickets-search-btn"
              class="tickets-search-box"
              tabindex="0"
            > -->
            <!-- <input
                type="search"
                placeholder="جستجو کنید"
                class="tickets-search-btn"
                id="tickets-search-btn"
              />
              <img src="@/static/panel-teacher-icons/search-icon.svg" alt="آیکون سرچ" /> -->
            <!-- </label> -->
          </header>
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
            <span class="tickets-type seen" v-else>پاسخ مدرس</span>
            <span>
              <nuxt-link class="delete btn" :to="'see-ticket/' + ticket.id"
                >مشاهده</nuxt-link
              >
            </span>
            <span>
              <button class="delete btn" @click.prevent="deleteTicket(ticket.id)">
                حذف
              </button>
            </span>
          </div>

          <footer class="table-footer">
            <hr />
            <a href="" type="button" @click="seeAll"> مشاهده همه </a>
          </footer>
        </template>
      </section>
    </div>
  </div>
</template>
<script>
import transactionsTableSkeleton from "@/components/pages-skeleton/transactions-table-skeleton";
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  components: { transactionsTableSkeleton },
  data() {
    return {
      loading: true,
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
      document.querySelector(".table-footer").style.display = "none";
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
            `/api/Teacher/TeacherTicket/RemoveTicket/${id}`,
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
    async getTickets() {
      const tickets = await this.$axios.get("/api/Teacher/TeacherTicket/GetTickets", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      if (tickets.data.statusCode == 200 && tickets.data.message == "Success") {
        this.tickets = tickets.data.data;
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/swal-style.scss";
</style>
