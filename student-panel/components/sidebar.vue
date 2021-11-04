<template>
  <aside class="panel-aside">
    <span class="hamburger-button hamburger-skeleton" v-if="loading">
      <skeleton class="skeleton" width="30px" height="18px" borderRadius="5px" />
    </span>
    <button class="hamburger-button" @click.prevent="toggle_student_panel" v-else>
      <div class="hamburger-line"></div>
      <div class="hamburger-line"></div>
      <div class="hamburger-line"></div>
    </button>
    <div class="panel-top panel">
      <div class="teacher-profile">
        <span v-if="loading">
          <skeleton
            class="skeleton"
            width="102px"
            height="102px"
            type="circle"
            borderRadius="5px"
          />
        </span>
        <img
          v-else
          :src="profImagedata"
          class="teacher-profile-image"
          alt="تصویر پروفایل شما"
        />
        <span v-if="loading" class="dis-block mt">
          <skeleton class="skeleton" width="110px" height="35px" borderRadius="5px" />
        </span>
        <h2 v-else>{{ name }}</h2>
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
      <div v-if="loading" class="sidebar-skeleton">
        <div v-for="i in 6" :key="i">
          <span v-if="loading">
            <skeleton class="skeleton" width="30px" height="30px" borderRadius="5px" />
          </span>
          <span v-if="loading">
            <skeleton
              class="skeleton"
              style="margin-right: 10px"
              width="150px"
              height="30px"
              borderRadius="5px"
            />
          </span>
        </div>
      </div>
      <div class="panel-item-container top custom-scrollbar" v-else>
        <nuxt-link class="panel-item" to="/my/">
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
        <nuxt-link class="panel-item" to="/my/q&a">
          <div class="sidebar-links">
            <svg
              aria-hidden="true"
              width="21"
              height="33"
              focusable="false"
              data-prefix="far"
              data-icon="comments"
              class="svg-inline--fa fa-comments"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path
                fill="currentColor"
                d="M208 0C322.9 0 416 78.8 416 176C416 273.2 322.9 352 208 352C189.3 352 171.2 349.7 153.9 345.8C123.3 364.8 79.13 384 24.95 384C14.97 384 5.93 378.1 2.018 368.9C-1.896 359.7-.0074 349.1 6.739 341.9C7.26 341.5 29.38 317.4 45.73 285.9C17.18 255.8 0 217.6 0 176C0 78.8 93.13 0 208 0zM164.6 298.1C179.2 302.3 193.8 304 208 304C296.2 304 368 246.6 368 176C368 105.4 296.2 48 208 48C119.8 48 48 105.4 48 176C48 211.2 65.71 237.2 80.57 252.9L104.1 277.8L88.31 308.1C84.74 314.1 80.73 321.9 76.55 328.5C94.26 323.4 111.7 315.5 128.7 304.1L145.4 294.6L164.6 298.1zM441.6 128.2C552 132.4 640 209.5 640 304C640 345.6 622.8 383.8 594.3 413.9C610.6 445.4 632.7 469.5 633.3 469.9C640 477.1 641.9 487.7 637.1 496.9C634.1 506.1 625 512 615 512C560.9 512 516.7 492.8 486.1 473.8C468.8 477.7 450.7 480 432 480C350 480 279.1 439.8 245.2 381.5C262.5 379.2 279.1 375.3 294.9 369.9C322.9 407.1 373.9 432 432 432C446.2 432 460.8 430.3 475.4 426.1L494.6 422.6L511.3 432.1C528.3 443.5 545.7 451.4 563.5 456.5C559.3 449.9 555.3 442.1 551.7 436.1L535.9 405.8L559.4 380.9C574.3 365.3 592 339.2 592 304C592 237.7 528.7 183.1 447.1 176.6L448 176C448 159.5 445.8 143.5 441.6 128.2H441.6z"
              ></path>
            </svg>
            پرسش و پاسخ
          </div>
        </nuxt-link>
        <!-- <div class="panel-item panel-dropdown">
          <div class="dropdown-preview" @click="togglePanel">
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
              <nuxt-link to="/">
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
              </nuxt-link>
            </li>
            <li class="dropdown-item">
              <nuxt-link to="/">
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
              </nuxt-link>
            </li>
            <li class="dropdown-item">
              <nuxt-link to="/">
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
              </nuxt-link>
            </li>
            <li class="dropdown-item">
              <nuxt-link to="/">
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
              </nuxt-link>
            </li>
          </ul>
        </div> -->
        <!-- <nuxt-link class="panel-item" to="/my/course-download">
          <div class="sidebar-links">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="23.692"
              viewBox="0 0 24 23.692"
            >
              <defs></defs>
              <path
                id="Path_77"
                data-name="Path 77"
                class="cls-1"
                d="M7.2,22.472a4.11,4.11,0,0,0,1.237-2.944c0-.832,1.37-2.507,2.771-3.08.405-.166.957-.295,1.288.032l.384.379,0,0a2.845,2.845,0,0,0,3.978,0l6.932-6.843a.688.688,0,0,0,0-.982L14.845.2a.71.71,0,0,0-.994,0L6.918,7.047a2.757,2.757,0,0,0,0,3.927l.388.383a.7.7,0,0,1,.206.535c0,1.362-2.188,3.471-3.294,3.471A4.2,4.2,0,0,0,0,19.528H0a4.11,4.11,0,0,0,1.237,2.944,4.252,4.252,0,0,0,5.964,0Zm7.147-20.8L22.3,9.529l-2.983,2.945L11.364,4.621ZM2.231,21.49a2.74,2.74,0,0,1-.825-1.962,2.8,2.8,0,0,1,2.813-2.776,4.791,4.791,0,0,0,3.073-1.643,5.2,5.2,0,0,0,1.627-3.216A2.082,2.082,0,0,0,8.3,10.375l-.388-.383a1.382,1.382,0,0,1,0-1.963L10.37,5.6l7.955,7.853-2.457,2.426a1.425,1.425,0,0,1-1.989,0l-.388-.383a2.479,2.479,0,0,0-2.821-.333c-1.683.688-3.639,2.744-3.639,4.363a2.739,2.739,0,0,1-.825,1.962,2.833,2.833,0,0,1-3.975,0Z"
                transform="translate(0 0)"
              />
            </svg>
            دانلود دوره
          </div>
        </nuxt-link> -->
        <nuxt-link class="panel-item" to="/my/my-questions">
          <div class="sidebar-links">
            <svg
              aria-hidden="true"
              width="21"
              height="33"
              focusable="false"
              data-prefix="far"
              data-icon="circle-question"
              class="svg-inline--fa fa-circle-question"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM256 336c-18 0-32 14-32 32s13.1 32 32 32c17.1 0 32-14 32-32S273.1 336 256 336zM289.1 128h-51.1C199 128 168 159 168 198c0 13 11 24 24 24s24-11 24-24C216 186 225.1 176 237.1 176h51.1C301.1 176 312 186 312 198c0 8-4 14.1-11 18.1L244 251C236 256 232 264 232 272V288c0 13 11 24 24 24S280 301 280 288V286l45.1-28c21-13 34-36 34-60C360 159 329 128 289.1 128z"
              ></path>
            </svg>
            سوالات من
          </div>
        </nuxt-link>
        <nuxt-link class="panel-item" to="/my/my-courses">
          <div class="sidebar-links">
            <svg
              aria-hidden="true"
              width="21"
              height="33"
              focusable="false"
              data-prefix="fas"
              data-icon="book"
              class="svg-inline--fa fa-book"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M448 336v-288C448 21.49 426.5 0 400 0H96C42.98 0 0 42.98 0 96v320c0 53.02 42.98 96 96 96h320c17.67 0 32-14.33 32-31.1c0-11.72-6.607-21.52-16-27.1v-81.36C441.8 362.8 448 350.2 448 336zM143.1 128h192C344.8 128 352 135.2 352 144C352 152.8 344.8 160 336 160H143.1C135.2 160 128 152.8 128 144C128 135.2 135.2 128 143.1 128zM143.1 192h192C344.8 192 352 199.2 352 208C352 216.8 344.8 224 336 224H143.1C135.2 224 128 216.8 128 208C128 199.2 135.2 192 143.1 192zM384 448H96c-17.67 0-32-14.33-32-32c0-17.67 14.33-32 32-32h288V448z"
              ></path>
            </svg>
            دوره های من
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="panel-bottom panel">
      <!-- We will see skeleton until the data is fully loaded -->
      <div v-if="loading" class="sidebar-skeleton">
        <!-- create 3 row of skeleton for bottom sidebar -->
        <div v-for="i in 4" :key="i">
          <span v-if="loading">
            <skeleton class="skeleton" width="30px" height="30px" borderRadius="5px" />
          </span>
          <span v-if="loading">
            <skeleton
              class="skeleton"
              style="margin-right: 10px"
              width="150px"
              height="30px"
              borderRadius="5px"
            />
          </span>
        </div>
      </div>
      <div class="panel-item-container custom-scrollbar">
        <nuxt-link class="panel-item" to="/my/change-password">
          <div class="sidebar-links">
            <svg
              aria-hidden="true"
              width="21"
              height="33"
              focusable="false"
              data-prefix="fas"
              data-icon="unlock-keyhole"
              class="svg-inline--fa fa-unlock-keyhole"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M384 224L144 224V144C144 99.88 179.9 64 224 64s80 35.88 80 80V160h64V144C368 64.59 303.4 0 224 0S80 64.59 80 144V224L64 224c-35.35 0-64 28.65-64 64v160C0 483.3 28.65 512 64 512h320c35.35 0 64-28.66 64-63.1v-160C448 252.7 419.3 224 384 224zM256 384c0 17.67-14.33 32-32 32S192 401.7 192 384v-32c0-17.67 14.33-31.1 32-31.1S256 334.3 256 352V384z"
              ></path>
            </svg>
            تغییر رمز
          </div>
        </nuxt-link>
        <nuxt-link class="panel-item" to="/my/transactions">
          <div class="sidebar-links">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="25"
              height="35"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 484 484"
              style="enable-background: new 0 0 484 484"
              xml:space="preserve"
            >
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        d="M410.413,70.88C364.706,25.172,303.934,0,239.293,0c-47.493,0-93.076,13.591-132.383,39.378l-2.909-2.985      C93.086,25.194,77.521,20.808,62.366,24.662c-15.155,3.854-26.735,15.14-30.975,30.192L4.369,150.781      c-4.239,15.05-0.255,30.72,10.658,41.917c8.308,8.524,19.31,13.101,30.775,13.101c3.595,0,7.236-0.45,10.854-1.37l96.591-24.548      c15.156-3.852,26.736-15.137,30.978-30.189c3.54-12.562,1.331-25.547-5.836-36.012C197.287,104.713,218.107,100,239.293,100      c78.299,0,142,63.701,142,142s-63.701,142-142,142c-40.717,0-79.54-17.527-106.514-48.087      c-18.243-20.667-49.903-22.642-70.573-4.399c-10.013,8.838-15.985,21.046-16.816,34.376      c-0.831,13.329,3.579,26.185,12.417,36.198C103.753,454.144,169.903,484,239.293,484c64.641,0,125.414-25.172,171.121-70.88      c45.708-45.708,70.88-106.479,70.88-171.12S456.121,116.588,410.413,70.88z M164.975,144.269      c-2.28,8.092-8.506,14.159-16.654,16.23L51.73,185.046c-8.146,2.072-16.513-0.287-22.38-6.307      c-5.867-6.02-8.009-14.444-5.73-22.536l27.023-95.928c2.279-8.092,8.504-14.16,16.652-16.231      c8.15-2.071,16.516,0.286,22.383,6.307l33.072,33.933l32.604,33.454c0.003,0.003,0.006,0.005,0.009,0.008l3.883,3.984      C165.113,127.751,167.255,136.177,164.975,144.269z M396.271,398.978C354.341,440.908,298.592,464,239.293,464      c-63.656,0-124.34-27.39-166.492-75.147c-5.303-6.008-7.948-13.722-7.45-21.719s4.082-15.323,10.089-20.625      c5.695-5.026,12.777-7.494,19.835-7.494c8.313,0,16.589,3.427,22.51,10.133C148.553,384.007,192.841,404,239.293,404      c89.328,0,162-72.673,162-162s-72.673-162-162-162c-26.21,0-51.956,6.312-74.942,18.314l-11.509-11.809l-31.691-32.517      C156.439,31.715,197.037,20,239.293,20c59.299,0,115.048,23.092,156.978,65.022c41.931,41.93,65.022,97.679,65.022,156.978      S438.201,357.047,396.271,398.978z"
                      />
                    </g>
                  </g>
                  <g>
                    <path
                      d="M420.202,336.007c-1.397,0-2.817-0.294-4.17-0.916c-5.019-2.306-7.217-8.244-4.911-13.262     c11.395-24.793,17.172-51.315,17.172-78.829c0-35.76-10.031-70.57-29.01-100.666c-2.945-4.672-1.547-10.847,3.125-13.792     c4.672-2.948,10.846-1.547,13.793,3.125c20.994,33.294,32.092,71.793,32.092,111.334c0,30.417-6.392,59.749-18.999,87.18     C427.611,333.846,423.987,336.007,420.202,336.007z"
                    />
                  </g>
                  <g>
                    <path
                      d="M375.291,107.724c-2.45,0-4.904-0.895-6.834-2.701c-13.866-12.987-29.525-23.772-46.542-32.057     c-4.966-2.418-7.031-8.403-4.614-13.369c2.417-4.965,8.403-7.031,13.368-4.614c18.817,9.162,36.131,21.086,51.46,35.442     c4.031,3.775,4.238,10.104,0.463,14.135C380.623,106.662,377.96,107.724,375.291,107.724z"
                    />
                  </g>
                </g>
                <g>
                  <path
                    d="M284.002,329c-8.014,0-15.548-3.121-21.214-8.787l-44.499-44.5c-5.675-5.675-8.784-13.202-8.776-21.228    c-0.007-0.161-0.011-0.322-0.011-0.485V151c0-16.542,13.458-30,30-30s30,13.458,30,30v91.073l35.714,35.713v0    c11.695,11.697,11.695,30.729,0,42.426C299.55,325.879,292.016,329,284.002,329z M229.502,253.729    c0.006,0.132,0.01,0.263,0.012,0.396c0.001,0.083,0,0.165,0,0.248c-0.035,2.726,1.001,5.283,2.918,7.199l44.499,44.5    c1.889,1.889,4.4,2.929,7.071,2.929s5.183-1.04,7.071-2.929c3.898-3.898,3.898-10.243,0-14.142l-38.643-38.642    c-1.875-1.875-2.929-4.419-2.929-7.071V151c0-5.514-4.486-10-10-10c-5.514,0-10,4.486-10,10V253.729z"
                  />
                </g>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
            تاریخچه فاکتور ها
          </div>
        </nuxt-link>
        <!-- <nuxt-link class="panel-item" to="/">
          <div class="sidebar-links">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22.435"
              height="21.5"
              viewBox="0 0 22.435 21.5"
            >
              <defs></defs>
              <g
                id="presentation_1_"
                data-name="presentation (1)"
                transform="translate(0 -1)"
              >
                <path
                  id="Path_80"
                  data-name="Path 80"
                  class="cls-1"
                  d="M11.967,23.543a.468.468,0,0,1-.467-.467V17.467a.467.467,0,0,1,.935,0v5.609A.468.468,0,0,1,11.967,23.543Z"
                  transform="translate(-0.75 -1.043)"
                />
                <path
                  id="Path_81"
                  data-name="Path 81"
                  class="cls-1"
                  d="M16.174,23.739a.467.467,0,0,1-.259-.079l-4.207-2.8a.467.467,0,1,1,.518-.778l4.207,2.8a.467.467,0,0,1-.259.856Z"
                  transform="translate(-0.75 -1.239)"
                />
                <path
                  id="Path_82"
                  data-name="Path 82"
                  class="cls-1"
                  d="M7.467,23.739a.467.467,0,0,1-.26-.856l4.207-2.8a.467.467,0,0,1,.518.778l-4.207,2.8A.457.457,0,0,1,7.467,23.739Z"
                  transform="translate(-0.456 -1.239)"
                />
                <path
                  id="Path_83"
                  data-name="Path 83"
                  class="cls-1"
                  d="M20.565,4.739H1.87A1.87,1.87,0,0,1,1.87,1h18.7a1.87,1.87,0,0,1,0,3.739Zm-18.7-2.8a.935.935,0,1,0,0,1.87h18.7a.935.935,0,0,0,0-1.87Z"
                />
                <path
                  id="Path_84"
                  data-name="Path 84"
                  class="cls-1"
                  d="M19.293,17.087H3.4a1.4,1.4,0,0,1-1.4-1.4V4.467A.468.468,0,0,1,2.467,4H20.228a.468.468,0,0,1,.467.467V15.685A1.4,1.4,0,0,1,19.293,17.087ZM2.935,4.935v10.75a.468.468,0,0,0,.467.467H19.293a.468.468,0,0,0,.467-.467V4.935Z"
                  transform="translate(-0.13 -0.196)"
                />
                <path
                  id="Path_85"
                  data-name="Path 85"
                  class="cls-1"
                  d="M6.467,14.478a.467.467,0,0,1-.331-.8L9.876,9.942a.467.467,0,0,1,.59-.059l2.448,1.632,3.471-4.339a.468.468,0,1,1,.73.584l-3.739,4.674a.467.467,0,0,1-.624.1l-2.486-1.656L6.8,14.343a.469.469,0,0,1-.33.136Z"
                  transform="translate(-0.391 -0.391)"
                />
              </g>
            </svg>
            اطلاع رسانی
          </div>
        </nuxt-link>
        <nuxt-link class="panel-item" to="/">
          <div class="sidebar-links">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22.435"
              height="21.5"
              viewBox="0 0 22.435 21.5"
            >
              <defs></defs>
              <g
                id="presentation_1_"
                data-name="presentation (1)"
                transform="translate(0 -1)"
              >
                <path
                  id="Path_80"
                  data-name="Path 80"
                  class="cls-1"
                  d="M11.967,23.543a.468.468,0,0,1-.467-.467V17.467a.467.467,0,0,1,.935,0v5.609A.468.468,0,0,1,11.967,23.543Z"
                  transform="translate(-0.75 -1.043)"
                />
                <path
                  id="Path_81"
                  data-name="Path 81"
                  class="cls-1"
                  d="M16.174,23.739a.467.467,0,0,1-.259-.079l-4.207-2.8a.467.467,0,1,1,.518-.778l4.207,2.8a.467.467,0,0,1-.259.856Z"
                  transform="translate(-0.75 -1.239)"
                />
                <path
                  id="Path_82"
                  data-name="Path 82"
                  class="cls-1"
                  d="M7.467,23.739a.467.467,0,0,1-.26-.856l4.207-2.8a.467.467,0,0,1,.518.778l-4.207,2.8A.457.457,0,0,1,7.467,23.739Z"
                  transform="translate(-0.456 -1.239)"
                />
                <path
                  id="Path_83"
                  data-name="Path 83"
                  class="cls-1"
                  d="M20.565,4.739H1.87A1.87,1.87,0,0,1,1.87,1h18.7a1.87,1.87,0,0,1,0,3.739Zm-18.7-2.8a.935.935,0,1,0,0,1.87h18.7a.935.935,0,0,0,0-1.87Z"
                />
                <path
                  id="Path_84"
                  data-name="Path 84"
                  class="cls-1"
                  d="M19.293,17.087H3.4a1.4,1.4,0,0,1-1.4-1.4V4.467A.468.468,0,0,1,2.467,4H20.228a.468.468,0,0,1,.467.467V15.685A1.4,1.4,0,0,1,19.293,17.087ZM2.935,4.935v10.75a.468.468,0,0,0,.467.467H19.293a.468.468,0,0,0,.467-.467V4.935Z"
                  transform="translate(-0.13 -0.196)"
                />
                <path
                  id="Path_85"
                  data-name="Path 85"
                  class="cls-1"
                  d="M6.467,14.478a.467.467,0,0,1-.331-.8L9.876,9.942a.467.467,0,0,1,.59-.059l2.448,1.632,3.471-4.339a.468.468,0,1,1,.73.584l-3.739,4.674a.467.467,0,0,1-.624.1l-2.486-1.656L6.8,14.343a.469.469,0,0,1-.33.136Z"
                  transform="translate(-0.391 -0.391)"
                />
              </g>
            </svg>
            داده ها و آمار
          </div>
        </nuxt-link> -->
      </div>
    </div>
  </aside>
</template>

<script>
import skeleton from "@/components/skeleto-creator";
export default {
  components: { skeleton },
  data() {
    return {
      loading: true,
      name: "",
      profImage: "",
    };
  },
  async beforeMount() {
    const token = this.$cookies.get("key");
    // if (this.$store.state.login.name != "") {
    //   this.name = this.$store.state.login.name;
    //   this.loading = false;
    // } else {
    const getData = await this.$axios.post(
      "/api/Student/StudentAccount/check-student-auth",
      {},
      {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      }
    );
    if (getData.data.statusCode == 200 && getData.data.message == "Success") {
      const name = getData.data.data.studentName;
      const phone = getData.data.data.phoneNumber;
      this.name = name;
      this.$store.commit("login/SET_LOGIN_DETAILS", { name, phone });
      this.loading = false;
      this.profImage = getData.data.data.profileImageName;
    }
    // }
  },
  mounted() {},
  computed: {
    profImagedata() {
      return "https://api.daneshkadeonline.ir/Images/Public/Student/" + this.profImage;
    },
  },
  methods: {
    toggle_student_panel() {
      const panel_teacher_aside = document.querySelector(".panel-aside");
      panel_teacher_aside.classList.toggle("show");
    },
    togglePanel() {
      document.querySelector(".dropdown-preview").parentNode.classList.toggle("expanded");
    },
  },
  watch: {
    $route: {
      handler() {
        const panel_aside = document.querySelector(".panel-aside");
        if (panel_aside.classList.contains("show")) {
          panel_aside.classList.remove("show");
        }
      },
      deep: true,
    },
  },
};
</script>
