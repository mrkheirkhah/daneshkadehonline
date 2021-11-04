<template>
  <div>
    <div class="panel-admin-content-item news-management">
      <header>
        <p class="section-header">مدیریت اخبار</p>
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
        <p class="section-title-text">هدر</p>
      </div>
      <form action="">
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              v-model="newsTitle"
              placeholder="عنوان"
            />
          </label>
          <label for="" class="form-row-col">
            <!-- <input
              type="text"
              class="form-input"
              v-model="newsLink"
              placeholder="آدرس لینک کوتاه"
            /> -->
            <input
              type="number"
              class="form-input"
              v-model="readTime"
              placeholder="تایم مطالعه (عدد)"
            />
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <textarea
              name=""
              cols="22"
              rows="0"
              v-model="shortDescription"
              placeholder="توضیحات"
              class="form-input form-textarea"
            ></textarea>
          </label>
          <label for="" class="form-row-col">
            <!-- <label for="" class="form-row-col"> -->
            <!-- <input
                type="number"
                class="form-input"
                v-model="readTime"
                placeholder="تایم مطالعه (عدد)"
              /> -->
            <!-- </label> -->
            <div for="" class="form-row-col darken-color">
              <div class="separator pseudo-form-input">
                <input
                  type="file"
                  id="upload-course-image"
                  @change="selectNewsImage($event)"
                />
                <span v-if="imageName == ''">بارگذاری تصویر خبر</span>
                <span v-else>{{ imageName }}</span>
                <span>
                  <label for="upload-course-image" class="cover-btn">انتخاب</label>
                </span>
              </div>
            </div>
          </label>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col floated-list-container in-panel">
            <template v-if="submitType != 'edit'">
              <input
                type="text"
                class="form-input"
                v-model="groupDrop"
                readonly
                placeholder="دسته خبر"
                @click="toggleDropDowns"
              />
              <ul class="floated-list custom-scrollbar">
                <li
                  v-for="option in groups"
                  :key="option.index"
                  @click.prevent="chooseGroup($event, option.id)"
                >
                  {{ option.groupTitle }}
                </li>
              </ul>
            </template>
            <input
              v-else
              type="text"
              readonly
              class="form-input"
              :value="groupDrop"
              placeholder="دسته خبر"
            />
          </label>
          <label for="" class="form-row-col"> </label>
        </div>
        <div class="form-row" v-if="subGroup.length > 0">
          <label for="" class="form-row-col floated-list-container in-panel">
            <input
              type="text"
              class="form-input"
              v-model="subGroupDrop"
              readonly
              placeholder="دسته خبر"
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
              placeholder="دسته خبر"
              @click="toggleDropDowns"
            />
            <ul class="floated-list custom-scrollbar">
              <li
                v-for="option in subTwoGroup"
                :key="option.index"
                @click="chooseSubTwoGroup($event, option.id)"
              >
                {{ option.groupTitle }}
              </li>
            </ul>
          </label>
          <label for="" class="form-row-col" v-else></label>
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
          <p class="section-title-text">توضیحات</p>
        </div>
        <div>
          <ckeditorNuxt v-model="content" :config="editorConfig" />
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
          <p class="section-title-text">آپشن ها</p>
        </div>
        <header>
          <p class="section-header">آپلود تبلیغ خاص برای این خبر</p>
        </header>
        <div class="form-row">
          <div for="" class="form-row-col darken-color">
            <div class="separator pseudo-form-input">
              <input
                type="file"
                id="upload-ads-news-1"
                @change="selectNewsFirstAd($event)"
              />
              <span>آپلود تبلیغ اول</span>
              <span>
                <label for="upload-ads-news-1" class="cover-btn">انتخاب</label>
              </span>
            </div>
          </div>
          <div for="" class="form-row-col darken-color">
            <div class="separator pseudo-form-input">
              <input
                type="file"
                id="upload-ads-news-2"
                @change="selectNewsSecondAd($event)"
              />
              <span>آپلود تبلیغ دوم</span>
              <span>
                <label for="upload-ads-news-2" class="cover-btn">انتخاب</label>
              </span>
            </div>
          </div>
        </div>
        <div class="form-row">
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              v-model="firstAdLink"
              placeholder="آدرس تبلیغ اول"
            />
          </label>
          <label for="" class="form-row-col">
            <input
              type="text"
              class="form-input"
              v-model="secondAdLink"
              placeholder="آدرس تبلیغ دوم"
            />
          </label>
        </div>
        <!-- <header class="mt-5">
          <p class="section-header">مشاهده نظرات این خبر</p>
        </header> -->
        <!-- <a href="#" class="form-btn" target="_blank">مشاهده</a> -->

        <button class="form-btn" @click.prevent="submitNewNews" :disabled="isSending">
          ثبت و نهایی کردن
        </button>
      </form>
    </div>
    <div class="panel-admin-content-item">
      <div class="panel-table news-list">
        <div class="box-header">
          <h3>لیست اخبار</h3>
          <form action="">
            <label for="news-list-search-btn" class="search-box" tabindex="0">
              <input
                type="search"
                placeholder="جستجو کنید"
                class="search-btn"
                ref="searchInput"
                id="news-list-search-btn"
              />
              <img
                src="@/static/icons/search-icon-orange.png"
                @click.prevent="searchEvent"
                alt="آیکون سرچ"
              />
            </label>
          </form>
        </div>
        <section class="box-content custom-scrollbar" id="news-table">
          <header class="table-row table-header">
            <span>نام مقاله</span>
            <span>تاریخ</span>
            <span>ایجاد کننده</span>
            <span class="delete">حذف</span>
            <span class="edit">ویرایش</span>
          </header>
          <div class="table-row" v-for="news in newsData" :key="news.id">
            <span>{{ news.newsTitle }}</span>
            <span class="persian-number">{{
              new Date(news.createDate).toLocaleDateString("fa-IR")
            }}</span>
            <span>{{ news.creatorName }}</span>
            <span class="delete">
              <button @click.prevent="deleteNews(news.id)">حذف</button>
            </span>
            <span class="edit">
              <button @click.prevent="editNews(news.id)">ویرایش</button>
            </span>
          </div>

          <footer class="table-footer">
            <hr />
            <a href="" type="button" @click.prevent="seeAll"> مشاهده همه </a>
          </footer>
        </section>
      </div>
      <div class="news">
        <div class="panel-table">
          <div class="box-header">
            <h3>نظرات اخبار</h3>
            <form action="">
              <div class="filter floated-list-container" @click="toggleDropDowns">
                <input type="text" readonly value="فیلتر بر اساس" />
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
                  <li>پاسخ داده شده</li>
                  <li>رد شده</li>
                  <li>تائید شده</li>
                </ul>
              </div>
              <label for="news-comments-search-btn" class="search-box" tabindex="0">
                <input
                  type="search"
                  placeholder="جستجو کنید"
                  class="search-btn"
                  id="news-comments-search-btn"
                />
                <img src="@/static/icons/search-icon-orange.png" alt="آیکون سرچ" />
              </label>
            </form>
          </div>
        </div>
        <div class="container-md container-fluid comments-ads-container">
          <div class="row">
            <div class="col-12 px-0">
              <section class="news-content comments">
                <div class="messages custom-scrollbar">
                  <div class="messages-box">
                    <template v-for="commentGroup in commentGroups">
                      <div
                        class="person-message"
                        v-for="comment in commentGroup"
                        :key="comment.commentId"
                        :class="comment.parentId != null ? 'replied-message' : ''"
                      >
                        <img
                          :src="
                            comment.avatarImageName == null
                              ? '/image/person-profile.png'
                              : 'https://api.daneshkadeonline.ir/Images/Public/Student/' +
                                comment.avatarImageName
                          "
                          class="person-message__image"
                          alt="تصویر پروفایل"
                        />
                        <div class="person-message__info">
                          <h4 class="person-name">{{ comment.userName }}</h4>
                          <p class="person-text">{{ comment.commentText }}</p>
                        </div>

                        <div class="person-message__sidebox">
                          <span class="message-time">
                            <span class="persian-number">
                              {{
                                Math.floor(
                                  (new Date(
                                    Date.now() + new Date().getTimezoneOffset() * 60000
                                  ).getTime() -
                                    new Date(comment.createDate).getTime()) /
                                    3600000
                                )
                              }}
                            </span>
                            ساعت قبل

                            <span class="like">
                              <span class="persian-number count">{{
                                comment.likeCount
                              }}</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20.736"
                                height="31.126"
                                viewBox="0 0 33.736 31.126"
                              >
                                <g data-name="heart (1)" transform="translate(1 1)">
                                  <path
                                    data-name="Path 713"
                                    d="M23.255,0a8.474,8.474,0,0,0-7.387,4.323A8.474,8.474,0,0,0,8.481,0C3.8,0,0,4.344,0,9.028,0,20.792,15.868,29,15.868,29S31.736,20.792,31.736,9.028C31.736,4.344,27.938,0,23.255,0Zm0,0"
                                    fill="none"
                                    stroke="#8f96a2"
                                    stroke-width="2"
                                  />
                                </g>
                              </svg>
                            </span>
                          </span>
                          <!-- <a href="#" class="reply-btn">پاسخ</a> -->
                          <div class="options">
                            <button
                              type="button"
                              class="reject"
                              @click.prevent="deleteComment(comment.commentId)"
                            >
                              حذف
                            </button>
                            <button
                              type="button"
                              class="confirm"
                              v-if="!comment.isAccepted"
                              @click.prevent="confirmComment(comment.commentId)"
                            >
                              تائید
                            </button>
                            <a
                              href=""
                              class="reply-btn"
                              @click.prevent="
                                replayComment(comment.commentId, comment.userName)
                              "
                              >پاسخ</a
                            >
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </section>
              <section class="news-content messages-form-box">
                <div class="aside">نظر خود را اینجا بنویسید</div>
                <form action="#">
                  <input
                    type="text"
                    readonly
                    :value="replayTo"
                    placeholder="نام و نام خانوادگی"
                  />
                  <textarea
                    class="message"
                    placeholder="نظر شما"
                    v-model="replayCommentText"
                  ></textarea>
                  <button class="submit-comment" @click.prevent="sendReplay">
                    ثبت نظر
                  </button>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ckeditorNuxt from "@/components/ckeditorNuxt";
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  components: {
    ckeditorNuxt,
    "ckeditor-nuxt": () => {
      if (process.client) {
        return import("@blowstack/ckeditor-nuxt");
      }
    },
  },
  data() {
    return {
      content: "",
      newsTitle: "",
      newsLink: "",
      readTime: "",
      shortDescription: "",
      newsData: "",

      groups: "",
      subGroup: "",
      subTwoGroup: "",
      submitType: "add",

      groupDrop: "",
      selectedGroup: "",
      subGroupDrop: "",
      subGroupId: "",
      subTwoGroupDrop: "",
      subTwoGroupId: "",

      imageName: "",
      newsImg: "",
      firstAdBase64: "",
      secondAdBase64: "",
      editThis: "",

      firstAdLink: "",
      secondAdLink: "",
      firstAdFileName: "",
      secondAdFileName: "",
      searchInput: "",

      commentGroups: "",

      // replay comments
      replayTo: "",
      replayToId: "",
      replayCommentText: "",
      editorConfig: {
        language: "fa",
      },
      isSending: false,
    };
  },
  async mounted() {
    await Promise.all([this.getNewsData(), this.getGroups(), this.getNewsComments()]);
  },
  methods: {
    seeAll() {
      const table = document.getElementById("news-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer").style.display = "none");
    },
    resetData() {
      this.content = "";
      this.newsTitle = "";
      this.newsLink = "";
      this.readTime = "";
      this.shortDescription = "";
      this.editThis = "";

      this.groups = "";
      this.subGroup = "";
      this.subTwoGroup = "";
      this.submitType = "add";

      this.groupDrop = "";
      this.selectedGroup = "";
      this.subGroupDrop = "";
      this.subGroupId = "";
      this.subTwoGroupDrop = "";
      this.subTwoGroupId = "";

      this.imageName = "";
      this.newsImg = "";
      this.firstAdBase64 = "";
      this.secondAdBase64 = "";

      this.firstAdLink = "";
      this.secondAdLink = "";
      this.firstAdFileName = "";
      this.secondAdFileName = "";
      this.searchInput = "";
    },
    toggleDropDowns(event) {
      event.stopPropagation();
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    async getGroups() {
      const groups = await this.$axios.get("/api/Public/ProfileActions/GetNewsGroups", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      this.groups = groups.data.data;
    },
    async getNewsComments() {
      this.commentGroups = [];
      const newsComments = await this.$axios.get(
        "/api/Admin/AdminComment/GetNewsComments",
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      for (const comment of newsComments.data.data) {
        if (comment.parentId == null) {
          let group = [];
          group.push(comment);
          this.commentGroups.push(group);
        }
      }
      for (const comment of newsComments.data.data) {
        if (comment.parentId != null) {
          for (const i of this.commentGroups) {
            for (const j of i) {
              if (comment.parentId == j.commentId) {
                i.push(comment);
              }
            }
          }
        }
      }
    },
    async getNewsData() {
      const newsData = await this.$axios.get("/api/Admin/AdminNews/News", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      this.newsData = newsData.data.data;
    },
    async chooseGroup(event, id) {
      this.groupDrop = event.target.innerHTML.trim();
      this.selectedGroup = id;
      event.target.closest(".floated-list-container").classList.toggle("show");
      const subGroup = await this.$axios.get(
        `/api/Public/ProfileActions/GetNewsGroups/${this.selectedGroup}`,
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
    async chooseSubGroup(event, id) {
      this.subGroupDrop = event.target.innerHTML.trim();
      this.subGroupId = id;
      this.selectedGroup = id;
      event.target.closest(".floated-list-container").classList.toggle("show");
      const subTwoGroup = await this.$axios.get(
        `/api/Public/ProfileActions/GetNewsGroups/${this.subGroupId}`,
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
    selectNewsImage(event) {
      try {
        this.imageName = event.target.files[0].name;
        this.newsImg = event.target.files[0];
        // this.newsImageBase64(courseImage);
      } catch {}
    },
    // newsImageBase64(fileObject) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     this.newsImg = e.target.result;
    //   };
    //   reader.readAsDataURL(fileObject);
    // },
    selectNewsFirstAd(event) {
      try {
        this.firstAdFileName = event.target.files[0].name;
        this.firstAdBase64 = event.target.files[0];
        // this.newsFirstAdImageBase64(courseImage);
      } catch {}
    },
    selectNewsSecondAd(event) {
      try {
        this.secondAdFileName = event.target.files[0].name;
        this.secondAdBase64 = event.target.files[0];
        // this.newsSecondAdImageBase64(courseImage);
      } catch {}
    },
    // newsFirstAdImageBase64(fileObject) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     this.firstAdBase64 = e.target.result;
    //   };
    //   reader.readAsDataURL(fileObject);
    // },
    // newsSecondAdImageBase64(fileObject) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     this.secondAdBase64 = e.target.result;
    //   };
    //   reader.readAsDataURL(fileObject);
    // },
    async submitNewNews() {
      this.isSending = true;
      if (this.submitType == "add") {
        if (
          this.selectedGroup != "" &&
          this.newsTitle.trim() != "" &&
          this.shortDescription.trim() != "" &&
          this.content != "" &&
          this.readTime != ""
        ) {
          let formData = new FormData();
          formData.append("groupId", this.selectedGroup);
          formData.append("title", this.newsTitle);
          formData.append("shortDescription", this.shortDescription);
          formData.append("text", this.content);
          formData.append("readTime", this.readTime);
          formData.append("newsImage", this.newsImg);
          formData.append("firstAdsImage", this.firstAdBase64);
          formData.append("firstAdsLink", this.firstAdLink);
          formData.append("secondAdsImage", this.secondAdBase64);
          formData.append("secondAdsLink", this.secondAdLink);
          const submitNewsResp = await this.$axios.post(
            "/api/Admin/AdminNews/News",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (
            submitNewsResp.data.statusCode == 200 &&
            submitNewsResp.data.message == "Success"
          ) {
            this.$swal({
              text: "ثبت شد",
              icon: "success",
              showCloseButton: true,
              confirmButtonText: "تایید",
            });
            this.resetData();
            this.getNewsData();
          }
        } else {
          this.$swal({
            text: "اطلاعات را کامل کنید",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: "تایید",
          });
        }
      } else if (this.submitType == "edit") {
        let formData = new FormData();
        formData.append("newsId", this.editThis);
        formData.append("title", this.newsTitle);
        formData.append("shortDescription", this.shortDescription);
        formData.append("text", this.content);
        formData.append("readTime", this.readTime);
        formData.append("newsImage", this.newsImg);
        formData.append("firstAdsImage", this.firstAdBase64);
        formData.append("firstAdsLink", this.firstAdLink);
        formData.append("secondAdsImage", this.secondAdBase64);
        formData.append("secondAdsLink", this.secondAdLink);
        const submitNewsResp = await this.$axios.put(
          "/api/Admin/AdminNews/News",
          formData,
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        if (
          submitNewsResp.data.statusCode == 200 &&
          submitNewsResp.data.message == "Success"
        ) {
          this.$swal({
            text: "ثبت شد",
            icon: "success",
            confirmButtonText: "تایید",
            showCloseButton: true,
          });
          this.resetData();
          this.getNewsData();
        }
      }
      this.isSending = false;
    },
    async editNews(id) {
      this.submitType = "edit";
      const newsForEdit = await this.$axios.get(`/api/Admin/AdminNews/News/${id}`, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      this.editThis = id;
      const newsData = newsForEdit.data.data;
      this.firstAdLink = newsData.firstAdsLink;
      this.groupDrop = newsData.groupTitle;
      this.readTime = newsData.readTime;
      this.secondAdLink = newsData.secondAdsLink;
      this.shortDescription = newsData.shortDescription;
      this.content = newsData.text;
      this.newsTitle = newsData.title;
    },
    async deleteNews(id) {
      this.$swal({
        text: "از حذف خبر اطمینان دارید؟",
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "بله",
        cancelButtonText: "خیر",
      }).then(async (clickedBut) => {
        if (clickedBut.isConfirmed) {
          const deleteResponse = await this.$axios.delete(
            `/api/Admin/AdminNews/News/${id}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("key")}`,
              },
            }
          );
          if (
            deleteResponse.data.statusCode == 200 &&
            deleteResponse.data.message == "Success"
          ) {
            this.$swal({
              text: "با موفقیت انجام شد",
              icon: "success",
              showCloseButton: true,
              confirmButtonText: "بستن",
            });
            this.resetData();
            this.getNewsData();
          } else {
            this.$swal({
              text: "مشکلی رخ داده است!لطفا بعدا دوباره تلاش کنید",
              icon: "error",
              showCloseButton: true,
              confirmButtonText: "ادامه",
            });
          }
        } else {
        }
      });
    },
    async searchEvent() {
      this.searchInput = this.$refs.searchInput.value;
      const newsResp = await this.$axios.get(
        `/api/Admin/AdminNews/News?search=${this.searchInput}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (newsResp.data.statusCode == 200 && newsResp.data.message == "Success") {
        this.newsData = newsResp.data.data;
      }
    },
    // replay comments
    async confirmComment(id) {
      const changeStatusResp = await this.$axios.get(
        `/api/Admin/AdminComment/UpdateNewsCommentStatus/${id}/true`,
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
          text: "تایید شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
        this.getNewsComments();
      }
    },
    async deleteComment(id) {
      const deleteResp = await this.$axios.delete(
        `/api/Admin/AdminComment/DeleteNewsCommentStatus/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (deleteResp.data.statusCode == 200 && deleteResp.data.message == "Success") {
        this.$swal({
          text: "حذف شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
        this.getNewsData();
      }
    },
    replayComment(id, name) {
      this.replayTo = name;
      this.replayToId = id;
    },
    async sendReplay() {
      const replayResp = await this.$axios.post(
        "/api/Admin/AdminComment/AddNewsComment",
        {
          parentId: this.replayToId,
          commentText: this.replayCommentText,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (replayResp.data.statusCode == 200 && replayResp.data.message == "Success") {
        this.getNewsComments();
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
