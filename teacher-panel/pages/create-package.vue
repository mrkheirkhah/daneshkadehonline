<template>
  <div class="package">
    <div class="panel-teacher-content-item package-registration">
      <header>
        <p class="section-header">
          <skeleton
            v-if="loading"
            class="skeleton"
            width="85px"
            height="30px"
            borderRadius="5px"
          />
          <span v-else> ثبت پکیج </span>
        </p>
      </header>
      <form action="#">
        <!-- skeleton -->
        <template v-if="loading">
          <div class="form-row">
            <skeleton
              v-if="loading"
              class="skeleton discount-inp-skeleton form-row-col"
              width="150px"
              height="50px"
              borderRadius="5px"
            />
            <skeleton
              v-if="loading"
              class="skeleton discount-inp-skeleton form-row-col"
              width="150px"
              height="50px"
              borderRadius="5px"
            />
          </div>
          <div class="form-row">
            <skeleton
              v-if="loading"
              class="skeleton discount-inp-skeleton form-row-col"
              width="150px"
              height="50px"
              borderRadius="5px"
            />
            <skeleton
              v-if="loading"
              class="skeleton discount-inp-skeleton form-row-col"
              width="150px"
              height="50px"
              borderRadius="5px"
            />
          </div>
          <div class="form-row">
            <skeleton
              v-if="loading"
              class="skeleton discount-inp-skeleton form-row-col"
              width="150px"
              height="50px"
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
            <label for="" class="form-row-col">
              <input
                type="text"
                class="form-input"
                v-model="packTitle"
                placeholder="عنوان پکیج"
              />
            </label>
            <label for="" class="form-row-col">
              <!-- <dropdownInp
                placeholder="مدرک تحصیلی"
                v-model="dropSelect"
                listAndId="select-package-registration"
                :options="degree"
              /> -->
              <div class="floated-list-container">
                <input
                  type="text"
                  class="form-input"
                  v-model="groupDrop"
                  readonly
                  placeholder="دسته بندی "
                  @click="toggleDropDowns"
                />
                <ul class="floated-list custom-scrollbar">
                  <li
                    v-for="anyDegree in degree"
                    :key="anyDegree.index"
                    @click="chooseGroup($event, anyDegree.id)"
                  >
                    {{ anyDegree.title }}
                  </li>
                </ul>
              </div>
            </label>
          </div>
          <div class="form-row" v-if="subGroup.length > 0">
            <label for="" class="form-row-col floated-list-container in-panel">
              <input
                type="text"
                class="form-input"
                v-model="subGroupDrop"
                readonly
                placeholder="دسته دوره"
                @click="toggleDropDowns"
              />
              <ul class="floated-list custom-scrollbar">
                <li
                  v-for="option in subGroup"
                  :key="option.index"
                  @click="chooseSubGroup($event, option.id)"
                >
                  {{ option.groupTitle }}
                </li>
              </ul>
            </label>
            <label
              for=""
              class="form-row-col floated-list-container in-panel"
              v-if="subTwoGroup.length > 0"
            >
              <input
                type="text"
                class="form-input"
                v-model="subTwoGroupDrop"
                readonly
                placeholder="دسته دوره"
                @click="toggleDropDowns"
              />
              <ul class="floated-list custom-scrollbar">
                <li
                  v-for="option in subTwoGroup"
                  :key="option.index"
                  @click="chooseSubTwoGroup"
                >
                  {{ option.title }}
                </li>
              </ul>
            </label>
            <label for="" class="form-row-col" v-else></label>
          </div>
          <div class="form-row">
            <label for="" class="form-row-col">
              <input
                type="number"
                class="form-input"
                v-model="suggestionPrice"
                placeholder="قیمت پیشنهادی شما برای دوره"
              />
              <span class="hint-text persian-number"
                >{{ priceUnderSuggestionPrice }} تومان</span
              >
              <label class="cover-btn default-cursor">تومان</label>
            </label>
            <label for="" class="form-row-col">
              <input
                type="number"
                v-model="sectionsCount"
                class="form-input"
                placeholder="تعداد قسمت ها"
              />
            </label>
          </div>
          <div class="form-row">
            <div class="form-row-col">
              <textarea
                class="form-textarea large-height form-input"
                placeholder="توضیحات پکیج"
                v-model="description"
              ></textarea>
            </div>
          </div>
          <button class="form-btn" @click.prevent="packageReq">ارسال درخواست</button>
        </template>
      </form>
    </div>
    <div class="panel-table my-requests" v-if="myRequests.length != 0">
      <div class="box-header">
        <h3>درخواست های من</h3>
      </div>
      <section id="courses-table" class="box-content custom-scrollbar">
        <header class="table-row table-header">
          <span>نام دوره</span>
          <span>تاریخ</span>
          <span>تعداد جلسات</span>
          <span>قیمت (تومان)</span>
          <span>وضعیت</span>
          <span>حذف</span>
        </header>
        <div class="table-row" v-for="myRequest in myRequests" :key="myRequest.id">
          <span>{{ myRequest.reqTitle }}</span>
          <span class="persian-number">{{ myRequest.reqDate }}</span>
          <span class="persian-number">{{ myRequest.sectionsCount }}</span>
          <span class="persian-number">{{
            myRequest.suggestionPrice.toLocaleString()
          }}</span>
          <span v-if="myRequest.isAccepted == true">تائید شده</span>
          <span v-else-if="myRequest.isAccepted == null" class="yellow"
            >در انتظار تایید</span
          >
          <span v-else-if="myRequest.isAccepted == false" class="red">رد شده</span>

          <span>
            <button
              class="delete btn"
              @click="deleteReq(myRequest.id)"
              v-if="myRequest.isAccepted != true"
            >
              حذف
            </button>
          </span>
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
  middleware: "userIsNotLog",
  components: { skeleton },
  data() {
    return {
      degree: [],
      myRequests: [],
      groupDrop: "",
      selectedGroup: "",
      subGroup: [],
      subGroupDrop: "",
      subGroupId: "",
      subTwoGroup: [],
      subTwoGroupDrop: "",
      subTwoGroupId: "",

      packTitle: "",
      suggestionPrice: "",
      sectionsCount: "",
      description: "",
      loading: true,
      priceUnderSuggestionPrice: 0,
    };
  },
  async beforeMount() {
    this.getLoadData();
  },
  methods: {
    seeAll() {
      const table = document.getElementById("courses-table");
      table.style.overflowY = "scroll";
      document.querySelector(".table-footer").style.display = "none";
    },
    toggleDropDowns(event) {
      event.stopPropagation();
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    async chooseGroup(event, id) {
      this.groupDrop = event.target.innerHTML.trim();
      this.selectedGroup = id;
      event.target.closest(".floated-list-container").classList.toggle("show");
      const subGroup = await this.$axios.get(
        `/api/Public/ProfileActions/GetCourseGroups/${this.selectedGroup}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (subGroup.data.statusCode == 200 && subGroup.data.message == "Success") {
        this.subGroup = subGroup.data.data;
      }
    },
    async getLoadData() {
      this.degree = [];
      this.myRequests = [];
      this.loading = true;
      this.groupDrop = "";
      this.selectedGroup = "";
      this.subGroup = [];
      this.subGroupDrop = "";
      this.subGroupId = "";
      this.subTwoGroup = [];
      this.subTwoGroupDrop = "";
      this.subTwoGroupId = "";
      this.packTitle = "";
      this.suggestionPrice = "";
      this.sectionsCount = "";
      this.description = "";
      let [groups, getMyReq] = await Promise.all([
        this.$axios.get("/api/Public/ProfileActions/GetCourseGroups", {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }),
        this.$axios.get("/api/Teacher/TeacherPackageRequest/PackageRequest", {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }),
      ]);
      if (
        getMyReq.data.statusCode == 200 &&
        getMyReq.data.message == "Success" &&
        getMyReq.data.data.legth != 0
      ) {
        for (const n of getMyReq.data.data) {
          this.myRequests.push({
            reqTitle: n.title,
            id: n.id,
            sectionsCount: n.sectionsCount,
            suggestionPrice: n.suggestionPrice,
            isAccepted: n.isAccepted,
            reqDate: new Date(n.createDate).toLocaleDateString(),
          });
        }
      }
      if (groups.data.statusCode == 200 && groups.data.message == "Success") {
        for (const n of groups.data.data) {
          this.degree.push({ title: n.groupTitle, id: n.id });
        }
      } else {
        this.$swal({
          text: "مشکلی رخ داده است!لطفا دوباره امتحان کرده یا صفحه را رفرش کنید",
          icon: "error",
          showCloseButton: true,
          confirmButtonText: "تلاش مجدد!",
        });
      }
      this.loading = false;
    },
    async chooseSubGroup(event, id) {
      this.subGroupDrop = event.target.innerHTML.trim();
      this.subGroupId = id;
      this.selectedGroup = id;
      event.target.closest(".floated-list-container").classList.toggle("show");
      const subTwoGroup = await this.$axios.get(
        `/api/Public/ProfileActions/GetCourseGroups/${this.subGroupId}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (subTwoGroup.data.statusCode == 200 && subTwoGroup.data.message == "Success") {
        this.subTwoGroup = subTwoGroup.data.data;
      }
    },
    chooseSubTwoGroup(event, id) {
      this.subTwoGroupDrop = event.target.innerHTML.trim();
      this.subTwoGroupId = id;
      this.selectedGroup = id;
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    async packageReq() {
      if (
        this.packTitle != "" &&
        this.selectedDegree != "" &&
        this.suggestionPrice != "" &&
        this.sectionsCount != "" &&
        this.description != ""
      ) {
        // const cc = { goToLogin: false, fullResponse: true };
        const packReqResponse = await this.$axios.post(
          "/api/Teacher/TeacherPackageRequest/PackageRequest",
          {
            title: this.packTitle,
            courseGroupId: Number(this.selectedGroup),
            suggestionPrice: Number(this.suggestionPrice),
            sectionsCount: Number(this.sectionsCount),
            description: this.description,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (
          packReqResponse.data.statusCode == 200 &&
          packReqResponse.data.message == "Success"
        ) {
          this.$swal({
            text: "درخواست شما با موفقیت ثبت شد!",
            icon: "success",
            showCloseButton: true,
            confirmButtonText: "ادامه",
          });
          this.getLoadData();
        }
      } else {
        this.$swal({
          text: "فیلد ها را پر کنید",
          icon: "error",
          showCloseButton: true,
          confirmButtonText: "تلاش مجدد",
        });
      }
    },
    async deleteReq(reqId) {
      try {
        const deleteReqREsponse = await this.$axios.delete(
          "/api/Teacher/TeacherPackageRequest/PackRequest/" + reqId,
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (
          deleteReqREsponse.data.statusCode == 200 &&
          deleteReqREsponse.data.message == "Success"
        ) {
          this.$swal({
            text: "با موفقیت پاک شد",
            icon: "success",
            showCloseButton: true,
            confirmButtonText: "ادامه",
          });
          this.getLoadData();
        } else {
          this.$swal({
            text: "مشکلی رخ داده است!دوباره امتحان کنید",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "ادامه",
          });
        }
      } catch {
        this.$swal({
          text: "مشکلی رخ داده است!بعدا دوباره امتحان کنید",
          icon: "error",
          showCloseButton: true,
          confirmButtonText: "ادامه",
        });
      }
    },
  },
  watch: {
    dropSelect: {
      handler() {
        for (const n of this.degree) {
          if (n.title === this.dropSelect) {
            this.selectedDegree = n.id;
          }
        }
      },
      deep: true,
    },
    suggestionPrice: {
      handler() {
        this.priceUnderSuggestionPrice = Number(this.suggestionPrice).toLocaleString();
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/swal-style.scss";
</style>
