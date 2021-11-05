<template>
  <div class="panel-admin-content-item tickets">
    <div class="panel-table tickets-table">
      <div class="box-header">
        <h3>تیکت ها</h3>
      </div>
      <div class="box-header">
        <form action="">
          <template>
            <div class="filter floated-list-container">
              <input type="text" readonly v-model="filterBy" @click="toggleDropdown" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10.969"
                height="6.03"
                viewBox="0 0 10.969 6.03"
              >
                <g transform="translate(10.719 0.25) rotate(90)">
                  <path
                    data-name="Path 88161"
                    d="M5.445,5.026.506.087A.3.3,0,1,0,.087.506L4.815,5.234.087,9.962a.3.3,0,0,0,0,.419.3.3,0,0,0,.208.088A.289.289,0,0,0,.5,10.381L5.442,5.442A.3.3,0,0,0,5.445,5.026Z"
                    fill="#4a4a4a"
                    stroke="#4a4a4a"
                    stroke-width="0.5"
                  />
                </g>
              </svg>
              <ul class="floated-list">
                <li @click="setFilter($event, 'all')">همه</li>
                <li @click="setFilter($event, 'teacher')">مدرس</li>
                <li @click="setFilter($event, 'student')">دانشجو</li>
              </ul>
            </div>
            <label for="teachers-search-btn" class="search-box" tabindex="0">
              <input
                type="search"
                placeholder="جستجو کنید"
                class="search-btn"
                v-model="searchInput"
                id="teachers-search-btn"
              />
              <img
                src="@/static/icons/search-icon-orange.png"
                alt="آیکون سرچ"
                @click="searchEvent"
              />
            </label>
          </template>
        </form>
      </div>
      <section class="box-content" id="tickets-table">
        <header class="table-row table-header">
          <span>عنوان</span>
          <span>فرستنده</span>
          <span>تاریخ ثبت</span>
          <span>شماره تلفن</span>
          <span>وضعیت</span>
          <span>جزئیات</span>
          <span>حذف</span>
        </header>
        <div
          class="table-row"
          
          v-for="ticket in tickets"
          :key="ticket.id"
        >
          <span class="tickets-detail">
            <small>{{ ticket.title }}</small>
          </span>
          <span class="tickets-detail"> {{ ticket.senderName }} </span>
          <span class="persian-number">
            {{ new Date(ticket.date).toLocaleDateString("fa-ir") }}
          </span>
          <span class="persian-number">
            {{ ticket.phoneNumber }}
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
          <span class="tickets-type seen" v-else>پاسخ مدرس/دانشجو</span>
          <span>
            <nuxt-link :to="'/see-ticket/' + ticket.id" class="delete btn"
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
          <a href="" type="button" @click.prevent="seeAll"> مشاهده همه </a>
        </footer>
      </section>
    </div>
  </div>
</template>
<script>
import skeleton from "@/components/skeleton-creator";
export default {
  layout: "dashboardLay",
  components: { skeleton },
  middleware: "userIsNotLog",
  data() {
    return {
      tickets: "",
      filterBy:
        this.$route.query.userType == undefined
          ? "فیلتر بر اساس"
          : this.$route.query.userType == "all"
          ? "همه"
          : this.$route.query.userType == "teacher"
          ? "مدرس"
          : "دانشجو",
      searchInput: "",
    };
  },
  async mounted() {
    if (Object.keys(this.$route.query).length != 0) {
      let query = "";
      for (const i in this.$route.query) {
        query = query + i + "=" + this.$route.query[i] + "&";
      }
      query = query.slice(0, -1);
      const tickets = await this.$axios.get(`/api/GetTickets?${query}`, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      if (tickets.data.statusCode == 200 && tickets.data.message == "Success") {
        this.tickets = tickets.data.data;
      }
    } else {
      this.getTickets();
    }
  },
  methods: {
    seeAll() {
      const table = document.getElementById("tickets-table");
      table.style.overflowY = "scroll";
      document.querySelector(".table-footer").style.display = "none";
    },
    async getTickets() {
      const tickets = await this.$axios.get("/api/GetTickets?userType=all", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      if (tickets.data.statusCode == 200 && tickets.data.message == "Success") {
        this.tickets = tickets.data.data;
      }
    },
    searchEvent() {
      if (Object.keys(this.$route.query).length != 0) {
        if (this.$route.query.search == undefined) {
          this.$router.push(this.$route.fullPath + "&search=" + this.searchInput);
        } else {
          this.$router.replace({
            query: { ...this.$route.query, search: this.searchInput },
          });
        }
      } else {
        this.$router.push(this.$route.fullPath + "?search=" + this.searchInput);
      }
    },
    setFilter(event, type) {
      this.filterBy = event.target.innerHTML.trim();
      if (Object.keys(this.$route.query).length != 0) {
        if (this.$route.query.userType == undefined) {
          this.$router.push(this.$route.fullPath + "&userType=" + type);
        } else {
          this.$router.replace({ query: { ...this.$route.query, userType: type } });
        }
      } else {
        this.$router.push(this.$route.fullPath + "?userType=" + type);
      }
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    toggleDropdown() {
      document.querySelector(".floated-list-container").classList.toggle("show");
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
          const deleteResp = await this.$axios.delete(`/api/RemoveTicket/${id}`, {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          });
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
  watch: {
    "$route.query": {
      async handler() {
        if (Object.keys(this.$route.query).length != 0) {
          let query = "";
          for (const i in this.$route.query) {
            query = query + i + "=" + this.$route.query[i] + "&";
          }
          query = query.slice(0, -1);
          const tickets = await this.$axios.get(`/api/GetTickets?${query}`, {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          });
          if (tickets.data.statusCode == 200 && tickets.data.message == "Success") {
            this.tickets = tickets.data.data;
          }
        } else {
          this.getTickets();
        }
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
