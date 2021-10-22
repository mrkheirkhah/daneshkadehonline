<template>
  <div class="assortment">
    <div class="panel-admin-content-item assortment">
      <header>
        <p class="section-header">دسته بندی اخبار</p>
      </header>

      <form action="">
        <!-- <div class="section-title">
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
          <p class="section-title-text">افزودن مدرک (تخصص)</p>
        </div> -->
        <!-- <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              v-model="degreText"
              placeholder="نام تخصص"
            />
          </label>

          <label class="form-row-col guide-section">
            <label for="is-degree-mandatory" class="checkbox-label">
              <span class="checkbox-container">
                <input
                  type="checkbox"
                  name=""
                  class="form-checkbox"
                  id="is-degree-mandatory"
                  v-model="degreImageRequired"
                />
                <img
                  src="@/static/icons/check-mark.svg"
                  class="check-mark"
                  alt="check-icon"
                />
              </span>
              عکس مدرک اجباری است
            </label>
          </label>
        </div>
        <button class="form-btn success" @click.prevent="editDegre">تائید</button>
        <div class="panel-table specialty-list">
          <div class="box-header">
            <h3>لیست تخصص ها</h3>
          </div>
          <section class="box-content custom-scrollbar" id="degreTable">
            <header class="table-row table-header">
              <span>نام تخصص</span>
              <span>تعداد مدرس</span>
              <span>نیاز به عکس</span>
              <span>ویرایش</span>
              <span>حذف</span>
            </header>

            <div class="table-row" v-for="degre in degres" :key="degre.id">
              <span>{{ degre.title }}</span>
              <span class="persian-number">{{ degre.teacherCount }}</span>
              <span class="edit" v-if="degre.isRequiredImage == true"> دارد </span>
              <span class="delete" v-else> ندارد </span>
              <span class="edit">
                <button @click.prevent="getEditDegre(degre.id)">ویرایش</button>
              </span>
              <span class="delete">
                <button @click.prevent="deleteDegre(degre.id)">حذف</button>
              </span>
            </div>

            <footer class="table-degre-footer">
              <hr />
              <a href="" type="button" @click.prevent="seeAllDegre"> مشاهده همه </a>
            </footer>
          </section>
        </div> -->

        <!-- <div class="form-row">
          <label for="" class="form-row-col">
            <input type="text" class="form-input has-cover-btn" placeholder="نام دسته" />
            <button type="button" class="cover-btn">تائید</button>
          </label>
          <label for="" class="form-row-col"> </label>
        </div> -->
        <!-- <div class="form-row">
          <label
            for=""
            class="form-row-col in-panel floated-list-container"
            @click="toggleDropdown"
          >
            <input
              type="text"
              readonly
              class="form-input"
              :value="selectOne"
              placeholder="سلکت اول"
            />
            <ul class="floated-list custom-scrollbar">
              <li
                v-for="degre in degres"
                :key="degre.id"
                @click="setSelectOne($event, degre.id)"
              >
                {{ degre.title }}
              </li>

              <li @click="setSelectOneNew($event)">آیتم جدید</li>
            </ul>
          </label>
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              v-model="degreText"
              placeholder="متن جایگزین"
            />
          </label>
        </div>
        <div class="form-row">
          <button class="form-btn success" @click.prevent="editDegre">تائید</button>
          <button class="form-btn red-color" @click.prevent="deleteDegre">حذف</button>
        </div> -->

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
          <p class="section-title-text">افزودن گروه اخبار</p>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              v-model="firstRowText"
              placeholder="متن دسته"
            />
          </label>
          <div class="form-row-col sort-cols">
            <button class="form-btn success" @click.prevent="submitFristRow">
              تائید
            </button>
          </div>
        </div>
        <div class="form-row">
          <label
            for=""
            class="form-row-col in-panel floated-list-container"
            @click="toggleDropdown"
          >
            <input
              type="text"
              readonly
              class="form-input"
              :value="selectTwo"
              placeholder="زیر دسته اول"
            />
            <ul class="floated-list custom-scrollbar">
              <li
                @click="setSelectTwo($event, group.groupId)"
                v-for="group in groups"
                :key="group.groupId"
              >
                {{ group.groupTitle }}
              </li>
            </ul>
          </label>
          <label for="" style="display: flex" class="form-row-col">
            <input
              style="width: 50%"
              type="text"
              class="form-input"
              v-model="secondRowText"
              placeholder="متن دسته"
            />
            <button
              class="form-btn success"
              style="display: inline-flex; margin-top: 22px"
              @click.prevent="submitSecondRow"
            >
              تائید
            </button>
          </label>
        </div>
        <div class="form-row">
          <label
            for=""
            class="form-row-col in-panel floated-list-container"
            @click="toggleDropdown"
          >
            <input
              type="text"
              readonly
              class="form-input"
              v-model="selectThree"
              placeholder="زیر دسته اول"
            />
            <ul class="floated-list custom-scrollbar">
              <li
                @click="setSelectThree($event, group.groupId)"
                v-for="group in groups"
                :key="group.groupId"
              >
                {{ group.groupTitle }}
              </li>
            </ul>
          </label>
          <label
            for=""
            class="form-row-col in-panel floated-list-container"
            @click="toggleDropdown"
          >
            <input
              type="text"
              readonly
              class="form-input"
              v-model="selectFour"
              placeholder="زیر دسته دوم"
            />
            <ul class="floated-list custom-scrollbar">
              <li
                @click="setSelectFour($event, group.groupId)"
                v-for="group in twoSubGroup"
                :key="group.groupId"
              >
                {{ group.groupTitle }}
              </li>
            </ul>
          </label>
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              v-model="thirdRowText"
              placeholder="متن دسته"
            />
          </label>
          <div class="form-row-col sort-cols">
            <button class="form-btn success" @click.prevent="submitThirdRow">
              تائید
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="panel-table gategory-list">
      <div class="box-header">
        <h3>لیست دسته ها</h3>
      </div>
      <section class="box-content custom-scrollbar" id="groupTable">
        <header class="table-row table-header">
          <span>نام دسته</span>
          <span>تعداد خبر ها</span>
          <span>تعداد زیرمجموعه</span>
          <span>ویرایش</span>
          <span>حذف</span>
          <span>مشاهده زیر دسته</span>
        </header>
        <div class="table-row" v-for="group in groups" :key="group.groupId">
          <span>{{ group.groupTitle }}</span>
          <span class="persian-number">{{ group.newsCount }}</span>
          <span class="persian-number">{{ group.subCount }}</span>
          <span @click="editGroup(group.groupId, group.groupTitle)">ویرایش</span>
          <span @click="deleteGroup(group.groupId)">حذف</span>
          <span @click="seeSubGroup(group.groupId)" v-if="group.subCount > 0"
            >مشاهده</span
          >
          <span v-else></span>
        </div>
        <footer class="table-footer">
          <hr />
          <a href="" type="button" @click.prevent="seeAll"> مشاهده همه </a>
        </footer>
      </section>
    </div>
    <div class="panel-table gategory-list" v-if="seeSubGroupData.length > 0">
      <div class="box-header">
        <h3>لیست زیر دسته ها</h3>
      </div>
      <section class="box-content custom-scrollbar" id="subGroupTable">
        <header class="table-row table-header">
          <span>نام دسته</span>
          <span>تعداد خبر ها</span>
          <span>تعداد زیرمجموعه</span>
          <span>ویرایش</span>
          <span>حذف</span>
          <span>مشاهده زیر دسته</span>
        </header>
        <div
          class="table-row"
          v-for="subGroup in seeSubGroupData"
          :key="subGroup.groupId"
        >
          <span>{{ subGroup.groupTitle }}</span>
          <span class="persian-number">{{ subGroup.newsCount }}</span>
          <span class="persian-number">{{ subGroup.subCount }}</span>
          <span @click="editGroup(subGroup.groupId, subGroup.groupTitle)">ویرایش</span>
          <span @click="deleteGroup(subGroup.groupId)">حذف</span>
          <span @click="seeTwoSubGroup(subGroup.groupId)" v-if="subGroup.subCount > 0"
            >مشاهده</span
          >
          <span v-else></span>
        </div>
        <footer class="table-sub-footer">
          <hr />
          <a href="" type="button" @click.prevent="seeAllSub"> مشاهده همه </a>
        </footer>
      </section>
    </div>
    <div class="panel-table gategory-list" v-if="seeTwoSubGroupData.length > 0">
      <div class="box-header">
        <h3>لیست زیر دسته ها</h3>
      </div>
      <section class="box-content custom-scrollbar" id="subTwoGroupTable">
        <header class="table-row table-header">
          <span>نام دسته</span>
          <span>تعداد خبر ها</span>
          <span>تعداد زیرمجموعه</span>
          <span>ویرایش</span>
          <span>حذف</span>
        </header>
        <div
          class="table-row"
          v-for="subGroup in seeTwoSubGroupData"
          :key="subGroup.groupId"
        >
          <span>{{ subGroup.groupTitle }}</span>
          <span class="persian-number">{{ subGroup.newsCount }}</span>
          <span class="persian-number">{{ subGroup.subCount }}</span>
          <span @click="editGroup(subGroup.groupId, subGroup.groupTitle)">ویرایش</span>
          <span @click="deleteGroup(subGroup.groupId)">حذف</span>
        </div>
        <footer class="table-twoSub-footer">
          <hr />
          <a href="" type="button" @click.prevent="seeAllTwoSub"> مشاهده همه </a>
        </footer>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  data() {
    return {
      selectOne: "",
      selectOneId: "",
      selectTwo: "",
      selectThree: "",
      selectFour: "",
      degres: "",
      degreText: "",
      addNewDegre: true,

      // groups
      groups: "",
      subGroups: "",
      twoSubGroup: "",
      selectTwoId: "",
      selectThreeId: "",
      selectFourId: "",
      degreImageRequired: false,
      editThisIdDegre: "",
      // first row
      firstRowText: "",
      secondRowText: "",
      thirdRowText: "",
      // edit group
      buttonForEdit: false,
      editThisId: "",
      // see sub group
      seeSubGroupData: "",
      seeTwoSubGroupData: "",
    };
  },
  async mounted() {
    await Promise.all([this.getGroups(), this.getDegre()]);
  },
  methods: {
    seeAll() {
      const table = document.getElementById("groupTable");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer").style.display = "none");
    },
    seeAllSub() {
      const table = document.getElementById("subGroupTable");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-sub-footer").style.display = "none");
    },
    seeAllTwoSub() {
      const table = document.getElementById("subTwoGroupTable");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-twoSub-footer").style.display =
        "none");
    },
    seeAllDegre() {
      const table = document.getElementById("degreTable");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-degre-footer").style.display =
        "none");
    },
    async getDegre() {
      const degre = await this.$axios.get("/api/Admin/AdminGroup/GetDegreeEducations", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      // console.log(degre);
      if ((degre.data.statusCode == 200) & (degre.data.message == "Success")) {
        this.degres = degre.data.data;
      }
    },
    toggleDropdown() {
      event.stopPropagation();
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    setSelectOne(event, id) {
      this.addNewDegre = false;
      this.selectOneId = id;
      this.selectOne = event.target.innerHTML.trim();
    },
    setSelectOneNew(event) {
      this.selectOne = event.target.innerHTML.trim();
      this.addNewDegre = true;
    },
    async setSelectTwo(event, id) {
      this.selectTwo = event.target.innerHTML.trim();
      this.selectTwoId = id;
      const groupsResp = await this.$axios.get(
        `/api/Admin/AdminGroup/GetNewsGroups/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (groupsResp.data.statusCode == 200 && groupsResp.data.message == "Success") {
        this.subGroups = groupsResp.data.data;
      }
    },
    async setSelectThree(event, id) {
      this.selectThree = event.target.innerHTML.trim();
      this.selectThreeId = id;
      const groupsResp = await this.$axios.get(
        `/api/Admin/AdminGroup/GetNewsGroups/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (groupsResp.data.statusCode == 200 && groupsResp.data.message == "Success") {
        this.twoSubGroup = groupsResp.data.data;
      }
    },
    setSelectFour(event, id) {
      this.selectFour = event.target.innerHTML.trim();
      this.selectFourId = id;
    },
    async submitFristRow() {
      if (this.buttonForEdit == false) {
        const firstRowResp = await this.$axios.post(
          `/api/Admin/AdminGroup/NewsGroup?groupTitle=${this.firstRowText}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (
          firstRowResp.data.statusCode == 200 &&
          firstRowResp.data.message == "Success"
        ) {
          this.firstRowText = "";
          this.getGroups();
        }
      } else {
        const editGroupResp = await this.$axios.put(
          `/api/Admin/AdminGroup/NewsGroup?groupId=${this.editThisId}&groupTitle=${this.firstRowText}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (
          editGroupResp.data.statusCode == 200 &&
          editGroupResp.data.message == "Success"
        ) {
          this.firstRowText = "";
          this.buttonForEdit = false;
          this.editThisId = "";
          this.getGroups();
        }
      }
    },
    async submitSecondRow() {
      const secondRowResp = await this.$axios.post(
        `/api/Admin/AdminGroup/NewsGroup?groupTitle=${this.secondRowText}&parentId=${this.selectTwoId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        secondRowResp.data.statusCode == 200 &&
        secondRowResp.data.message == "Success"
      ) {
        this.getGroups();
        const groupsResp = await this.$axios.get(
          `/api/Admin/AdminGroup/GetNewsGroups/${this.selectTwoId}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (groupsResp.data.statusCode == 200 && groupsResp.data.message == "Success") {
          this.subGroups = groupsResp.data.data;
        }
        this.firstRowText = "";
        this.secondRowText = "";
        this.selectTwoId = "";
        this.selectTwo = "";
        this.selectThree = "";
        this.selectThreeId = "";
      }
    },
    async submitThirdRow() {
      const thirdRowResp = await this.$axios.post(
        `/api/Admin/AdminGroup/NewsGroup?groupTitle=${this.thirdRowText}&parentId=${this.selectFourId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (thirdRowResp.data.statusCode == 200 && thirdRowResp.data.message == "Success") {
        this.getGroups();
        this.firstRowText = "";
        this.secondRowText = "";
        this.selectTwoId = "";
        this.selectTwo = "";
        this.selectThree = "";
        this.selectThreeId = "";
        this.selectFourId = "";
        this.selectFour = "";
        this.thirdRowText = "";
      }
    },
    async getGroups() {
      const groupsResp = await this.$axios.get("/api/Admin/AdminGroup/GetNewsGroups", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      console.log(groupsResp);
      if (groupsResp.data.statusCode == 200 && groupsResp.data.message == "Success") {
        this.groups = groupsResp.data.data;
      }
    },
    async getEditDegre(id) {
      this.addNewDegre = false;
      this.editThisIdDegre = id;
      const editDegreResp = await this.$axios.get(
        `/api/Admin/AdminGroup/DegreeEducation/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      // console.log(editDegreResp);
      if (
        editDegreResp.data.statusCode == 200 &&
        editDegreResp.data.message == "Success"
      ) {
        this.degreImageRequired = editDegreResp.data.data.isRequiredImage;
        this.degreText = editDegreResp.data.data.title;
      }
    },
    async editDegre() {
      if (this.addNewDegre == false) {
        const editResp = await this.$axios.put(
          `/api/Admin/AdminGroup/DegreeEducation?eduId=${this.editThisIdDegre}&educationTitle=${this.degreText}&isRequiredImage=${this.degreImageRequired}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (editResp.data.statusCode == 200 && editResp.data.message == "Success") {
          this.getDegre();
          this.degreText = "";
          this.selectOne = "";
          this.selectOneId = "";
          this.degreImageRequired = false;
          this.addNewDegre = true;
        }
      } else {
        const addResp = await this.$axios.post(
          `/api/Admin/AdminGroup/DegreeEducation?educationTitle=${this.degreText}&isRequiredImage=${this.degreImageRequired}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (addResp.data.statusCode == 200 && addResp.data.message == "Success") {
          this.getDegre();
          this.degreText = "";
          this.selectOne = "";
          this.selectOneId = "";
          this.degreImageRequired = false;
        }
      }
    },
    editGroup(id, title) {
      this.buttonForEdit = true;
      this.editThisId = id;
      this.firstRowText = title;
    },
    async seeSubGroup(id) {
      const seeSubGroupResp = await this.$axios.get(
        `/api/Admin/AdminGroup/GetNewsGroups/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        seeSubGroupResp.data.statusCode == 200 &&
        seeSubGroupResp.data.message == "Success"
      ) {
        this.seeSubGroupData = seeSubGroupResp.data.data;
      }
    },
    async seeTwoSubGroup(id) {
      const seeSubGroupResp = await this.$axios.get(
        `/api/Admin/AdminGroup/GetNewsGroups/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        seeSubGroupResp.data.statusCode == 200 &&
        seeSubGroupResp.data.message == "Success"
      ) {
        this.seeTwoSubGroupData = seeSubGroupResp.data.data;
      }
    },
    async deleteGroup(id) {
      const deleteResp = await this.$axios.delete(
        `/api/Admin/AdminGroup/NewsGroup/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (deleteResp.data.statusCode == 200 && deleteResp.data.message == "Success") {
        this.getGroups();
        this.seeSubGroupData = "";
        this.seeTwoSubGroupData = "";
      }
    },
    async deleteDegre(id) {
      const deleteResp = await this.$axios.delete(
        `/api/Admin/AdminGroup/DegreeEducation/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (deleteResp.data.statusCode == 200 && deleteResp.data.message == "Success") {
        this.getDegre();
        this.degreText = "";
        this.selectOne = "";
        this.selectOneId = "";
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
