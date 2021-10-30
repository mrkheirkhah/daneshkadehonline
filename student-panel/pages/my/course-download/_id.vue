<template>
  <div class="panel-student-content-item download-course">
    <header>
      <p class="section-header">
        <skeleton
          v-if="loading"
          class="skeleton"
          width="95px"
          height="35px"
          borderRadius="5px"
        />
        <span v-else> دانلود دوره </span>
      </p>
    </header>
    <div v-if="loading" class="sidebar-skeleton">
      <div v-for="i in 5" :key="i">
        <skeleton class="skeleton" width="100%" height="45px" borderRadius="5px" />
      </div>
    </div>
    <template v-for="pack in myPacks">
      <div :key="myPacks.indexOf(pack)">
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
              width="85px"
              height="30px"
              borderRadius="5px"
            />
            <span v-else> {{ pack.packageName }} </span>
          </p>
        </div>

        <div class="course-parts">
          <template>
            <div
              class="course-part"
              v-for="episode in pack.downloadItems"
              :key="episode.episodeId"
            >
              <div class="name-order">
                <div class="part-order">
                  <span class="persian-number">{{
                    pack.downloadItems.indexOf(episode) + 1
                  }}</span>
                </div>
                <h4 class="name">{{ episode.episodeName }}</h4>
              </div>
              <div class="info">
                <span class="duration persian-number">{{ episode.time }} </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                >
                  <g>
                    <g>
                      <path
                        d="M176.739,41.848a.741.741,0,0,0,.739-.739v-.37a.739.739,0,1,0-1.478,0v.37A.741.741,0,0,0,176.739,41.848Z"
                        transform="translate(-159.739 -36.304)"
                      />
                      <path
                        d="M176.739,308a.741.741,0,0,0-.739.739v.37a.739.739,0,0,0,1.478,0v-.37A.741.741,0,0,0,176.739,308Z"
                        transform="translate(-159.739 -279.543)"
                      />
                      <path
                        d="M41.109,176h-.37a.739.739,0,1,0,0,1.478h.37a.739.739,0,1,0,0-1.478Z"
                        transform="translate(-36.304 -159.739)"
                      />
                      <path
                        d="M309.109,176h-.37a.739.739,0,1,0,0,1.478h.37a.739.739,0,0,0,0-1.478Z"
                        transform="translate(-279.543 -159.739)"
                      />
                      <path
                        d="M81.257,80.222a.732.732,0,0,0-1.035,1.035l.259.259a.715.715,0,0,0,1.035,0,.715.715,0,0,0,0-1.035Z"
                        transform="translate(-72.609 -72.609)"
                      />
                      <path
                        d="M80.48,269.422l-.259.259a.714.714,0,0,0,0,1.035.714.714,0,0,0,1.035,0l.259-.259a.732.732,0,0,0-1.035-1.035Z"
                        transform="translate(-72.609 -244.328)"
                      />
                      <path
                        d="M269.68,80.222l-.259.259a.714.714,0,0,0,0,1.035.714.714,0,0,0,1.035,0l.259-.259a.732.732,0,1,0-1.035-1.035Z"
                        transform="translate(-244.328 -72.609)"
                      />
                      <path
                        d="M177.478,107.465v-6.726a.739.739,0,1,0-1.478,0v7.022a.73.73,0,0,0,.222.517l8.093,8.093a.714.714,0,0,0,1.035,0,.714.714,0,0,0,0-1.035Z"
                        transform="translate(-159.739 -90.761)"
                      />
                      <path
                        d="M17,0A17,17,0,1,0,34,17,17,17,0,0,0,17,0Zm0,32.522A15.522,15.522,0,1,1,32.522,17,15.52,15.52,0,0,1,17,32.522Z"
                      />
                    </g>
                  </g>
                </svg>
                <a
                  href=""
                  type="button"
                  @click.prevent="downloadEpisode(episode.episodeName, episode.episodeId)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                  >
                    <g data-name="Group 9821" transform="translate(14.375)">
                      <path
                        id="Path_696"
                        data-name="Path 696"
                        d="M12.125,21.25a.625.625,0,0,1-.625-.625v-20a.625.625,0,1,1,1.25,0v20A.625.625,0,0,1,12.125,21.25Z"
                        transform="translate(-11.5)"
                      />
                    </g>
                    <g data-name="Group 9822" transform="translate(9.375 15.001)">
                      <path
                        id="Path_697"
                        data-name="Path 697"
                        d="M13.125,18.25a.628.628,0,0,1-.443-.182l-5-5a.625.625,0,0,1,.884-.884l4.559,4.557,4.558-4.557a.625.625,0,1,1,.884.884l-5,5A.623.623,0,0,1,13.125,18.25Z"
                        transform="translate(-7.5 -12.001)"
                      />
                    </g>
                    <g data-name="Group 9823" transform="translate(0 20)">
                      <path
                        data-name="Path 698"
                        d="M26.875,26H3.125A3.129,3.129,0,0,1,0,22.875v-6.25a.625.625,0,1,1,1.25,0v6.25A1.877,1.877,0,0,0,3.125,24.75h23.75a1.877,1.877,0,0,0,1.875-1.875v-6.25a.625.625,0,1,1,1.25,0v6.25A3.129,3.129,0,0,1,26.875,26Z"
                        transform="translate(0 -16)"
                      />
                    </g>
                  </svg>
                </a>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import skeleton from "@/components/skeleto-creator";
export default {
  components: { skeleton },
  layout: "dashboard",
  middleware: "userIsNotLog",
  head() {
    return {
      title: "دانلود دوره ها",
    };
  },
  data() {
    return {
      loading: true,
      myPacks: "",
    };
  },
  async mounted() {
    // this.$router.push("/my/coming-soon");
    // setTimeout(() => {
    //   this.loading = false;
    // }, 4000);
    if (this.$route.params.id != undefined) {
      const myPacks = await this.$axios.get(
        `/api/Student/StudentCourse/GetPackagesForDownload/${this.$route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      this.myPacks = myPacks.data.data;
      this.loading = false;
    } else {
      this.$router.push("/my/my-courses");
    }
  },
  methods: {
    async downloadEpisode(name, id) {
      const download = await this.$axios.get("/api/Course/DownloadVideo/" + id, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      if (download.data.statusCode == 200 && download.data.message == "Success") {
        if (download.data.data.attachImageBase64 != null) {
          var a = document.createElement("a");
          a.href = "data:image/png;base64," + download.data.data.attachImageBase64;
          a.download = name + ".mp4";
          a.click();
        } else {
          this.$swal({
            text: "ویدیو وجود ندارد",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "ادامه",
          });
        }
      }
    },
  },
};
</script>
//
<style lang="scss">
// @import "@/assets/styles/stu-panel.scss";
//
@import "@/assets/swal-style.scss";
</style>
