<template>
  <aside class="panel-aside">
    <button class="hamburger-button" @click.prevent="toggle_visitor_panel">
      <div class="hamburger-line"></div>
      <div class="hamburger-line"></div>
      <div class="hamburger-line"></div>
    </button>
    <div class="panel-top panel">
      <div class="profile">
        <img
          src="/image/teacher-profile-image.png"
          class="profile-image"
          alt="تصویر پروفایل ویزیتور"
        />
        <h2>{{ name }}</h2>
      </div>

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
          x2="350"
          y2="10"
          style="stroke: rgb(112, 112, 112)"
        ></line>
      </svg>
      <div class="panel-item-container top custom-scrollbar">
        <nuxt-link class="panel-item" :to="'/' + this.$route.params.id">
          <div class="sidebar-links">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20.023"
              height="24"
              viewBox="0 0 20.023 24"
            >
              <defs></defs>
              <g id="user_3_" data-name="user (3)" transform="translate(0 0)">
                <path
                  id="Path_73"
                  data-name="Path 73"
                  class="cls-1"
                  d="M92.812,11.561A5.593,5.593,0,0,0,96.9,9.868,5.594,5.594,0,0,0,98.593,5.78,5.594,5.594,0,0,0,96.9,1.693a5.779,5.779,0,0,0-8.174,0A5.593,5.593,0,0,0,87.032,5.78a5.594,5.594,0,0,0,1.694,4.087A5.6,5.6,0,0,0,92.812,11.561ZM89.72,2.688a4.373,4.373,0,0,1,6.185,0A4.179,4.179,0,0,1,97.187,5.78a4.179,4.179,0,0,1-1.282,3.093,4.372,4.372,0,0,1-6.185,0A4.178,4.178,0,0,1,88.438,5.78,4.179,4.179,0,0,1,89.72,2.688Zm0,0"
                  transform="translate(-82.952 0)"
                />
                <path
                  id="Path_74"
                  data-name="Path 74"
                  class="cls-1"
                  d="M19.975,254.178a14.278,14.278,0,0,0-.194-1.516,11.949,11.949,0,0,0-.373-1.525,7.532,7.532,0,0,0-.627-1.422,5.36,5.36,0,0,0-.945-1.232,4.167,4.167,0,0,0-1.358-.853,4.692,4.692,0,0,0-1.733-.314,1.759,1.759,0,0,0-.94.4c-.282.184-.611.4-.979.631a5.61,5.61,0,0,1-1.266.558,4.917,4.917,0,0,1-3.1,0,5.59,5.59,0,0,1-1.265-.558c-.364-.233-.694-.445-.98-.631a1.757,1.757,0,0,0-.939-.4,4.686,4.686,0,0,0-1.733.314,4.164,4.164,0,0,0-1.358.853,5.361,5.361,0,0,0-.945,1.232,7.544,7.544,0,0,0-.627,1.422,11.975,11.975,0,0,0-.373,1.525,14.182,14.182,0,0,0-.194,1.517c-.032.458-.048.935-.048,1.417a3.985,3.985,0,0,0,1.184,3.015,4.26,4.26,0,0,0,3.05,1.112H15.79a4.261,4.261,0,0,0,3.05-1.112,3.984,3.984,0,0,0,1.184-3.015c0-.484-.016-.961-.049-1.418Zm-2.1,3.414a2.868,2.868,0,0,1-2.08.725H4.233a2.869,2.869,0,0,1-2.08-.725,2.6,2.6,0,0,1-.747-2c0-.45.015-.894.044-1.32a12.789,12.789,0,0,1,.176-1.366,10.564,10.564,0,0,1,.328-1.344,6.145,6.145,0,0,1,.51-1.156,3.974,3.974,0,0,1,.695-.91,2.764,2.764,0,0,1,.9-.562,3.236,3.236,0,0,1,1.108-.214c.049.026.137.076.279.169.289.188.622.4.991.639a6.968,6.968,0,0,0,1.59.71,6.323,6.323,0,0,0,3.963,0,6.978,6.978,0,0,0,1.59-.711c.377-.241.7-.45.99-.638.142-.092.23-.143.279-.169a3.239,3.239,0,0,1,1.108.214,2.769,2.769,0,0,1,.9.562,3.963,3.963,0,0,1,.695.91,6.121,6.121,0,0,1,.51,1.156,10.537,10.537,0,0,1,.328,1.344,12.9,12.9,0,0,1,.176,1.366h0c.03.425.045.868.045,1.319a2.6,2.6,0,0,1-.747,2Zm0,0"
                  transform="translate(0 -235.723)"
                />
              </g>
            </svg>
            پروفایل کاربری
          </div>
        </nuxt-link>
        <nuxt-link class="panel-item" :to="'/transactions/' + this.$route.params.id">
          <div class="sidebar-links">
            <svg
              id="coin"
              xmlns="http://www.w3.org/2000/svg"
              width="21.044"
              height="21.044"
              viewBox="0 0 21.044 21.044"
            >
              <defs>
                <style>
                  .cls-1 {
                    fill: #212121;
                  }
                </style>
              </defs>
              <path
                id="Path_78"
                data-name="Path 78"
                class="cls-1"
                d="M10.522,0A10.522,10.522,0,1,0,21.044,10.522,10.534,10.534,0,0,0,10.522,0Zm0,19.659a9.137,9.137,0,1,1,9.137-9.137A9.147,9.147,0,0,1,10.522,19.659Z"
              />
              <path
                id="Path_79"
                data-name="Path 79"
                class="cls-1"
                d="M76.281,34.866V30.935a1.992,1.992,0,0,1,.971.773.692.692,0,1,0,1.156-.762A3.37,3.37,0,0,0,76.281,29.5V28.4a.692.692,0,0,0-1.385,0v1.1a3.378,3.378,0,0,0,0,6.613V40.04a1.992,1.992,0,0,1-.971-.773.692.692,0,1,0-1.156.762A3.37,3.37,0,0,0,74.9,41.477v1.1a.692.692,0,0,0,1.385,0v-1.1a3.378,3.378,0,0,0,0-6.613ZM73.594,32.8a1.994,1.994,0,0,1,1.3-1.867v3.734A1.994,1.994,0,0,1,73.594,32.8Zm2.687,7.237V36.306a1.989,1.989,0,0,1,0,3.734Z"
                transform="translate(-65.067 -24.966)"
              />
            </svg>

            تراکنش ها
          </div>
        </nuxt-link>
        <nuxt-link class="panel-item" :to="'/withdraw/' + this.$route.params.id">
          <div class="sidebar-links">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="32"
              viewBox="0 0 52.5 52.498"
            >
              <g id="XMLID_1441_" transform="translate(0 -0.011)">
                <g id="XMLID_561_" transform="translate(0 0.011)">
                  <path
                    id="XMLID_592_"
                    class="cls-1"
                    d="M49.424,28.309H48.4V21.131a5.956,5.956,0,0,0-4.639-5.8L39.093,7.247A5.123,5.123,0,0,0,33.186,4.9L29.792,1.508a5.127,5.127,0,0,0-7.243,0L8.874,15.184H5.947A5.954,5.954,0,0,0,0,21.131v25.43a5.954,5.954,0,0,0,5.947,5.947H19.585a1.025,1.025,0,0,0,0-2.051H5.947a3.9,3.9,0,0,1-3.9-3.9V21.131a3.9,3.9,0,0,1,3.9-3.9h36.5a3.9,3.9,0,0,1,3.9,3.9v7.178H38.76a5.537,5.537,0,0,0,0,11.074h7.588v7.178a3.9,3.9,0,0,1-3.9,3.9H28.813a1.025,1.025,0,1,0,0,2.051H42.451A5.954,5.954,0,0,0,48.4,46.561V39.383h1.025A3.08,3.08,0,0,0,52.5,36.307V31.385A3.08,3.08,0,0,0,49.424,28.309ZM35.452,6.842a3.05,3.05,0,0,1,1.864,1.431l3.99,6.911H19.2L33.122,7.149a3.05,3.05,0,0,1,2.33-.307ZM24,2.958a3.071,3.071,0,0,1,4.342,0l2.905,2.905L15.1,15.184H11.774Zm26.45,33.349a1.027,1.027,0,0,1-1.025,1.025H38.76a3.486,3.486,0,1,1,0-6.973H49.424a1.027,1.027,0,0,1,1.025,1.025Z"
                    transform="translate(0 -0.011)"
                    fill="#fff"
                  />
                  <path
                    id="XMLID_1063_"
                    class="cls-1"
                    d="M367.355,319.988a1.026,1.026,0,1,0,.725.3A1.033,1.033,0,0,0,367.355,319.988Z"
                    transform="translate(-328.767 -287.178)"
                    fill="#fff"
                  />
                  <path
                    id="XMLID_1068_"
                    class="cls-1"
                    d="M227.025,491.988a1.026,1.026,0,1,0,.725.3A1.033,1.033,0,0,0,227.025,491.988Z"
                    transform="translate(-202.826 -441.541)"
                    fill="#fff"
                  />
                </g>
              </g>
            </svg>
            برداشت از حساب
          </div>
        </nuxt-link>
        <!-- <div class="panel-item panel-dropdown">
          <div class="dropdown-preview">
            <div class="right-section">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22.81"
                height="18.622"
                viewBox="0 0 22.81 18.622"
              >
                <defs></defs>
                <path
                  id="speedometer"
                  class="cls-1"
                  d="M22.81,11.4a11.3,11.3,0,0,1-2.3,6.869.891.891,0,0,1-1.421-1.075A9.621,9.621,0,1,0,1.782,11.4a9.529,9.529,0,0,0,1.942,5.794A.891.891,0,0,1,2.3,18.269,11.4,11.4,0,0,1,11.405,0,11.4,11.4,0,0,1,22.81,11.4ZM17.051,6.034a.891.891,0,0,1,0,1.26l-2.9,2.9a3.118,3.118,0,1,1-1.26-1.26l2.9-2.9a.891.891,0,0,1,1.26,0ZM12.74,11.679a1.334,1.334,0,1,0-1.334,1.334A1.336,1.336,0,0,0,12.74,11.679Zm0,0"
                  transform="translate(0 0)"
                />
              </svg>
              داشبورد
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="angle-bottom"
              width="11.545"
              height="8.921"
              viewBox="0 0 11.545 8.921"
            >
              <defs></defs>
              <g
                id="Group_174"
                data-name="Group 174"
                transform="translate(1.184 7.737) rotate(-90)"
              >
                <line
                  id="Line_16"
                  data-name="Line 16"
                  class="cls-1 angle-bottom-line"
                  x1="8"
                  transform="matrix(-0.819, 0.574, -0.574, -0.819, 6.553, 0)"
                />
                <line
                  id="Line_17"
                  data-name="Line 17"
                  class="cls-1 angle-bottom-line"
                  x1="8"
                  transform="matrix(-0.819, -0.574, 0.574, -0.819, 6.553, 9.177)"
                />
              </g>
            </svg>
          </div>
          <ul class="dropdown-container">
            <li class="dropdown-item">
              <a href="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11.672"
                  height="5.654"
                  viewBox="0 0 11.672 5.654"
                >
                  <g
                    id="Group_182"
                    data-name="Group 182"
                    transform="translate(-1120.538 -242.667)"
                  >
                    <g id="left-arrow" transform="translate(1120.538 242.667)">
                      <g id="Group_181" data-name="Group 181" transform="translate(0 0)">
                        <path
                          id="Path_86"
                          data-name="Path 86"
                          d="M11.215,134.371H1.56l1.6-1.592a.456.456,0,0,0-.643-.646L.134,134.5h0a.456.456,0,0,0,0,.645h0l2.382,2.371a.456.456,0,0,0,.643-.646l-1.6-1.592h9.656a.456.456,0,1,0,0-.912Z"
                          transform="translate(0 -132)"
                          fill="#212121"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
                دسته دو
              </a>
            </li>
            <li class="dropdown-item">
              <a href="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11.672"
                  height="5.654"
                  viewBox="0 0 11.672 5.654"
                >
                  <g
                    id="Group_182"
                    data-name="Group 182"
                    transform="translate(-1120.538 -242.667)"
                  >
                    <g id="left-arrow" transform="translate(1120.538 242.667)">
                      <g id="Group_181" data-name="Group 181" transform="translate(0 0)">
                        <path
                          id="Path_86"
                          data-name="Path 86"
                          d="M11.215,134.371H1.56l1.6-1.592a.456.456,0,0,0-.643-.646L.134,134.5h0a.456.456,0,0,0,0,.645h0l2.382,2.371a.456.456,0,0,0,.643-.646l-1.6-1.592h9.656a.456.456,0,1,0,0-.912Z"
                          transform="translate(0 -132)"
                          fill="#212121"
                        />
                      </g>
                    </g>
                  </g>
                </svg>
                دسته دو
              </a>
            </li>
            <li class="dropdown-item">
              <a href="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11.672"
                  height="5.654"
                  viewBox="0 0 11.672 5.654"
                >
                  <g
                    id="Group_182"
                    data-name="Group 182"
                    transform="translate(-1120.538 -242.667)"
                  >
                    <g id="left-arrow" transform="translate(1120.538 242.667)">
                      <g id="Group_181" data-name="Group 181" transform="translate(0 0)">
                        <path
                          id="Path_86"
                          data-name="Path 86"
                          d="M11.215,134.371H1.56l1.6-1.592a.456.456,0,0,0-.643-.646L.134,134.5h0a.456.456,0,0,0,0,.645h0l2.382,2.371a.456.456,0,0,0,.643-.646l-1.6-1.592h9.656a.456.456,0,1,0,0-.912Z"
                          transform="translate(0 -132)"
                          fill="#212121"
                        />
                      </g>
                    </g>
                  </g>
                </svg>

                دسته دو
              </a>
            </li>
            <li class="dropdown-item">
              <a href="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11.672"
                  height="5.654"
                  viewBox="0 0 11.672 5.654"
                >
                  <g
                    id="Group_182"
                    data-name="Group 182"
                    transform="translate(-1120.538 -242.667)"
                  >
                    <g id="left-arrow" transform="translate(1120.538 242.667)">
                      <g id="Group_181" data-name="Group 181" transform="translate(0 0)">
                        <path
                          id="Path_86"
                          data-name="Path 86"
                          d="M11.215,134.371H1.56l1.6-1.592a.456.456,0,0,0-.643-.646L.134,134.5h0a.456.456,0,0,0,0,.645h0l2.382,2.371a.456.456,0,0,0,.643-.646l-1.6-1.592h9.656a.456.456,0,1,0,0-.912Z"
                          transform="translate(0 -132)"
                          fill="#212121"
                        />
                      </g>
                    </g>
                  </g>
                </svg>

                دسته دو
              </a>
            </li>
          </ul>
        </div> -->
        <nuxt-link class="panel-item" :to="'/settlement-req/' + this.$route.params.id">
          <div class="sidebar-links">
            <svg
              aria-hidden="true"
              width="21"
              height="33"
              focusable="false"
              data-prefix="fas"
              data-icon="table"
              class="svg-inline--fa fa-table"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M448 32H64.05C28.7 32 .0492 60.65 .0492 96v320c0 35.35 28.65 64 64 64h383.1c35.35 0 64-28.65 64-64V96C512 60.65 483.4 32 448 32zM224 416H64v-96h160V416zM224 256H64V160h160V256zM448 416h-160v-96h160V416zM448 256h-160V160h160V256z"
              ></path>
            </svg>
            جدول درخواست تسویه
          </div>
        </nuxt-link>
        <nuxt-link class="panel-item" :to="'/profile/' + this.$route.params.id">
          <div class="sidebar-links">
            <svg
              aria-hidden="true"
              width="21"
              height="25"
              focusable="false"
              data-prefix="fas"
              data-icon="info"
              class="svg-inline--fa fa-info"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192 512"
            >
              <path
                fill="currentColor"
                d="M160 448h-32V224c0-17.69-14.33-32-32-32L32 192c-17.67 0-32 14.31-32 32s14.33 31.1 32 31.1h32v192H32c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32S177.7 448 160 448zM96 128c26.51 0 48-21.49 48-48S122.5 32.01 96 32.01s-48 21.49-48 48S69.49 128 96 128z"
              ></path>
            </svg>
            اطلاعات شما
          </div>
        </nuxt-link>
      </div>
    </div>
  </aside>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      name: "",
      profImage: "",
    };
  },
  async beforeMount() {
    const profData = await this.$axios.get(
      `/api/Visitor/VisitorProfile/Profile/${this.$route.params.id}`
    );
    if (profData.data.statusCode == 200 && profData.data.message == "Success") {
      this.name = profData.data.data.visitorName;
    }
  },
  mounted() {},
  methods: {
    toggle_visitor_panel() {
      const panel_teacher_aside = document.querySelector(".panel-aside");
      panel_teacher_aside.classList.toggle("show");
    },
    togglePanel() {
      document.querySelector(".dropdown-preview").parentNode.classList.toggle("expanded");
    },
  },
  computed: {
    // profImagedata() {
    //   return "https://api.daneshkadeonline.ir/Images/Public/Teacher/" + this.profImage;
    // },
  },
  // close sidebar when navigate between pages
  watch: {
    $route: {
      handler() {
        const panel_teacher_aside = document.querySelector(".panel-aside");
        if (panel_teacher_aside.classList.contains("show")) {
          panel_teacher_aside.classList.remove("show");
        }
      },
      deep: true,
    },
  },
};
</script>
