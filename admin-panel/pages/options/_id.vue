<template>
  <div class="options">
    <div class="panel-admin-content-item options">
      <header>
        <p class="section-header">
          <skeleton
            v-if="loading"
            class="skeleton"
            width="95px"
            height="30px"
            borderRadius="5px"
          />
          <template v-else> آپشن ها </template>
        </p>
      </header>
      <div class="options-buttons">
        <template v-if="loading">
          <skeleton
            v-if="loading"
            class="skeleton"
            width="180px"
            height="40px"
            borderRadius="5px"
          />
          <skeleton
            v-if="loading"
            class="skeleton"
            width="180px"
            height="40px"
            borderRadius="5px"
          /><skeleton
            v-if="loading"
            class="skeleton"
            width="180px"
            height="40px"
            borderRadius="5px"
          /><skeleton
            v-if="loading"
            class="skeleton"
            width="180px"
            height="40px"
            borderRadius="5px"
          />
        </template>
        <template v-else>
          <button class="form-btn" @click.prevent="packReq">لیست درخواست پکیج</button>
          <button class="form-btn" @click.prevent="transactions">لیست تراکنش ها</button>
          <button class="form-btn" @click.prevent="seeMsgs">دیدن پیام های معلم</button>
          <button class="form-btn" @click.prevent="addCourse">افزودن دوره (پکیج)</button>
          <button class="form-btn" @click.prevent="seeCourses">دوره های مدرس</button>
        </template>
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
        <p class="section-title-text">
          <skeleton
            v-if="loading"
            class="skeleton"
            width="180px"
            height="30px"
            borderRadius="5px"
          />
          <template v-else>دریافت کمیسیون از این معلم</template>
        </p>
      </div>
      <form action="">
        <template v-if="loading">
          <div class="form-row">
            <skeleton
              class="skeleton form-row-col"
              width="150px"
              height="50px"
              borderRadius="5px"
            />
            <label for="" class="form-row-col"> </label>
          </div>
          <span class="center">
            <skeleton
              class="skeleton mt"
              width="180px"
              height="40px"
              borderRadius="5px"
            />
          </span>
        </template>
        <template v-else>
          <div class="form-row">
            <label for="" class="form-row-col">
              <input
                type="number"
                class="form-input"
                v-model="commision"
                placeholder="مقدار کمیسیون"
              />
            </label>
            <label for="" class="form-row-col"> </label>
          </div>

          <button class="form-btn" @click.prevent="setCommision" :disabled="isSending">
            تائید کردن
          </button>
        </template>
      </form>
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
            width="90px"
            height="30px"
            borderRadius="5px"
          />
          <template v-else> ریز جزئیات</template>
        </p>
      </div>
      <div class="finanical-btn-container">
        <template v-if="loading">
          <button class="finanical-btn box-item" v-for="i in 4" :key="i">
            <span>
              <skeleton
                class="skeleton left-section"
                width="40px"
                height="40px"
                borderRadius="5px"
              />
            </span>
            <span class="finanical-btn_title">
              <span>
                <skeleton
                  class="skeleton"
                  width="65px"
                  height="17px"
                  borderRadius="5px"
                />
                <br />
                <skeleton
                  class="skeleton"
                  width="35px"
                  height="12px"
                  borderRadius="5px"
                />
              </span>
            </span>
            <p class="persian-number">
              <skeleton class="skeleton" width="35px" height="12px" borderRadius="5px" />
            </p>
          </button>
        </template>
        <template v-else>
          <button class="finanical-btn week">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="43.334"
              height="52"
              viewBox="0 0 43.334 52"
            >
              <g data-name="low-price (1)" transform="translate(-39.999)">
                <g data-name="Group 223" transform="translate(39.999)">
                  <g data-name="Group 222">
                    <path
                      class="cls-1"
                      data-name="Path 112"
                      d="M82.466,30.333H76.4V.867A.867.867,0,0,0,75.532,0H47.8a.867.867,0,0,0-.867.867V30.333H40.866a.867.867,0,0,0-.6,1.492l20.8,19.933a.867.867,0,0,0,1.2,0l20.8-19.933a.867.867,0,0,0-.6-1.492Zm-20.8,19.6L43.022,32.067H47.8a.867.867,0,0,0,.867-.867V1.733h26V31.2a.867.867,0,0,0,.867.867H80.31Z"
                      transform="translate(-39.999)"
                    />
                    <path
                      class="cls-1"
                      data-name="Path 113"
                      d="M197.2,91.467a3.467,3.467,0,0,1,3.467,3.467H202.4a5.205,5.205,0,0,0-4.333-5.122V88h-1.733v1.811a5.2,5.2,0,0,0,.867,10.322,3.467,3.467,0,1,1-3.467,3.467H192a5.205,5.205,0,0,0,4.333,5.122v1.811h1.733v-1.811A5.2,5.2,0,0,0,197.2,98.4a3.467,3.467,0,1,1,0-6.933Z"
                      transform="translate(-175.533 -78.467)"
                    />
                    <rect
                      class="cls-1"
                      data-name="Rectangle 56"
                      width="1"
                      height="1"
                      transform="translate(10.834 4)"
                    />
                    <rect
                      class="cls-1"
                      data-name="Rectangle 57"
                      width="2"
                      height="1"
                      transform="translate(13.834 4)"
                    />
                    <rect
                      id="Rectangle_58"
                      class="cls-1"
                      data-name="Rectangle 58"
                      width="2"
                      height="1"
                      transform="translate(16.834 4)"
                    />
                    <rect
                      id="Rectangle_59"
                      class="cls-1"
                      data-name="Rectangle 59"
                      width="2"
                      height="1"
                      transform="translate(20.834 4)"
                    />
                    <rect
                      id="Rectangle_60"
                      class="cls-1"
                      data-name="Rectangle 60"
                      width="2"
                      height="1"
                      transform="translate(23.834 4)"
                    />
                    <rect
                      id="Rectangle_61"
                      class="cls-1"
                      data-name="Rectangle 61"
                      width="2"
                      height="1"
                      transform="translate(27.834 4)"
                    />
                    <rect
                      id="Rectangle_62"
                      class="cls-1"
                      data-name="Rectangle 62"
                      width="2"
                      height="1"
                      transform="translate(30.834 4)"
                    />
                  </g>
                </g>
              </g>
            </svg>
            <span class="finanical-btn_title">
              درآمد هفته
              <br />
              <small>تومان</small>
            </span>

            <p class="persian-number">{{ cardsDetails.thisWeekIncome }}</p>
          </button>
          <button class="finanical-btn day">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="43.334"
              height="52"
              viewBox="0 0 43.334 52"
            >
              <g data-name="low-price (1)" transform="translate(-39.999)">
                <g data-name="Group 223" transform="translate(39.999)">
                  <g data-name="Group 222">
                    <path
                      class="cls-1"
                      data-name="Path 112"
                      d="M82.466,30.333H76.4V.867A.867.867,0,0,0,75.532,0H47.8a.867.867,0,0,0-.867.867V30.333H40.866a.867.867,0,0,0-.6,1.492l20.8,19.933a.867.867,0,0,0,1.2,0l20.8-19.933a.867.867,0,0,0-.6-1.492Zm-20.8,19.6L43.022,32.067H47.8a.867.867,0,0,0,.867-.867V1.733h26V31.2a.867.867,0,0,0,.867.867H80.31Z"
                      transform="translate(-39.999)"
                    />
                    <path
                      class="cls-1"
                      data-name="Path 113"
                      d="M197.2,91.467a3.467,3.467,0,0,1,3.467,3.467H202.4a5.205,5.205,0,0,0-4.333-5.122V88h-1.733v1.811a5.2,5.2,0,0,0,.867,10.322,3.467,3.467,0,1,1-3.467,3.467H192a5.205,5.205,0,0,0,4.333,5.122v1.811h1.733v-1.811A5.2,5.2,0,0,0,197.2,98.4a3.467,3.467,0,1,1,0-6.933Z"
                      transform="translate(-175.533 -78.467)"
                    />
                    <rect
                      class="cls-1"
                      data-name="Rectangle 56"
                      width="1"
                      height="1"
                      transform="translate(10.834 4)"
                    />
                    <rect
                      class="cls-1"
                      data-name="Rectangle 57"
                      width="2"
                      height="1"
                      transform="translate(13.834 4)"
                    />
                    <rect
                      id="Rectangle_58"
                      class="cls-1"
                      data-name="Rectangle 58"
                      width="2"
                      height="1"
                      transform="translate(16.834 4)"
                    />
                    <rect
                      id="Rectangle_59"
                      class="cls-1"
                      data-name="Rectangle 59"
                      width="2"
                      height="1"
                      transform="translate(20.834 4)"
                    />
                    <rect
                      id="Rectangle_60"
                      class="cls-1"
                      data-name="Rectangle 60"
                      width="2"
                      height="1"
                      transform="translate(23.834 4)"
                    />
                    <rect
                      id="Rectangle_61"
                      class="cls-1"
                      data-name="Rectangle 61"
                      width="2"
                      height="1"
                      transform="translate(27.834 4)"
                    />
                    <rect
                      id="Rectangle_62"
                      class="cls-1"
                      data-name="Rectangle 62"
                      width="2"
                      height="1"
                      transform="translate(30.834 4)"
                    />
                  </g>
                </g>
              </g>
            </svg>

            <span class="finanical-btn_title">
              درآمد امروز
              <br />
              <small>تومان</small>
            </span>

            <p class="persian-number">{{ cardsDetails.todayIncome }}</p>
          </button>
          <button class="finanical-btn total">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="43.334"
              height="52"
              viewBox="0 0 43.334 52"
            >
              <g data-name="low-price (1)" transform="translate(-39.999)">
                <g data-name="Group 223" transform="translate(39.999)">
                  <g data-name="Group 222">
                    <path
                      class="cls-1"
                      data-name="Path 112"
                      d="M82.466,30.333H76.4V.867A.867.867,0,0,0,75.532,0H47.8a.867.867,0,0,0-.867.867V30.333H40.866a.867.867,0,0,0-.6,1.492l20.8,19.933a.867.867,0,0,0,1.2,0l20.8-19.933a.867.867,0,0,0-.6-1.492Zm-20.8,19.6L43.022,32.067H47.8a.867.867,0,0,0,.867-.867V1.733h26V31.2a.867.867,0,0,0,.867.867H80.31Z"
                      transform="translate(-39.999)"
                    />
                    <path
                      class="cls-1"
                      data-name="Path 113"
                      d="M197.2,91.467a3.467,3.467,0,0,1,3.467,3.467H202.4a5.205,5.205,0,0,0-4.333-5.122V88h-1.733v1.811a5.2,5.2,0,0,0,.867,10.322,3.467,3.467,0,1,1-3.467,3.467H192a5.205,5.205,0,0,0,4.333,5.122v1.811h1.733v-1.811A5.2,5.2,0,0,0,197.2,98.4a3.467,3.467,0,1,1,0-6.933Z"
                      transform="translate(-175.533 -78.467)"
                    />
                    <rect
                      class="cls-1"
                      data-name="Rectangle 56"
                      width="1"
                      height="1"
                      transform="translate(10.834 4)"
                    />
                    <rect
                      class="cls-1"
                      data-name="Rectangle 57"
                      width="2"
                      height="1"
                      transform="translate(13.834 4)"
                    />
                    <rect
                      id="Rectangle_58"
                      class="cls-1"
                      data-name="Rectangle 58"
                      width="2"
                      height="1"
                      transform="translate(16.834 4)"
                    />
                    <rect
                      id="Rectangle_59"
                      class="cls-1"
                      data-name="Rectangle 59"
                      width="2"
                      height="1"
                      transform="translate(20.834 4)"
                    />
                    <rect
                      id="Rectangle_60"
                      class="cls-1"
                      data-name="Rectangle 60"
                      width="2"
                      height="1"
                      transform="translate(23.834 4)"
                    />
                    <rect
                      id="Rectangle_61"
                      class="cls-1"
                      data-name="Rectangle 61"
                      width="2"
                      height="1"
                      transform="translate(27.834 4)"
                    />
                    <rect
                      id="Rectangle_62"
                      class="cls-1"
                      data-name="Rectangle 62"
                      width="2"
                      height="1"
                      transform="translate(30.834 4)"
                    />
                  </g>
                </g>
              </g>
            </svg>

            <span class="finanical-btn_title">
              درآمد کل
              <br />
              <small>تومان</small>
            </span>

            <p class="persian-number">{{ cardsDetails.totalIncome }}</p>
          </button>
          <button class="finanical-btn profit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="55.479"
              height="52.742"
              viewBox="0 0 55.479 52.742"
            >
              <g id="business-and-finance" transform="translate(0 0)">
                <path
                  id="Path_102"
                  class="cls-1"
                  data-name="Path 102"
                  d="M55.378,124.931a4.723,4.723,0,0,0-5.679-3.643l-5.783,1.324v-2.364a22.842,22.842,0,0,0,3.226-3.823,22.409,22.409,0,0,0,3.168-7.46,22.858,22.858,0,0,0,.044-9.7,1.084,1.084,0,0,0-2.119.454,20.665,20.665,0,0,1-.039,8.776,20.251,20.251,0,0,1-2.863,6.741,19.29,19.29,0,0,1-1.416,1.869V105.091a1.083,1.083,0,0,0-1.084-1.084H34.261V92.436a1.084,1.084,0,0,0-1.08-1.084l-9.655-.033h0A1.084,1.084,0,0,0,22.44,92.4v6.019H13.867a1.084,1.084,0,0,0-1.084,1.084v10.73H10.369v-1.472a1.083,1.083,0,0,0-1.084-1.083H8.174a20.508,20.508,0,0,1,.885-10.627c.2-.557.431-1.112.681-1.65a1.083,1.083,0,1,0-1.964-.915c-.277.6-.531,1.21-.754,1.826a22.643,22.643,0,0,0-1.046,11.366H1.083A1.083,1.083,0,0,0,0,108.766v19.046A1.083,1.083,0,0,0,1.083,128.9h8.2a1.083,1.083,0,0,0,1.084-1.084v-1.03h4.076l16.511,6.476a13.042,13.042,0,0,0,8.019.5l12.941-3.289a4.714,4.714,0,0,0,3.461-5.539ZM41.75,106.175v16.933l-2.9.663c-.312.071-.626.127-.943.171a11,11,0,0,1-3.633-.105l-.015,0v-1.643a5.018,5.018,0,0,0,.667-4.222,4.866,4.866,0,0,0-.51-1.136q-.074-.121-.155-.236l0,0V106.174H41.75ZM24.607,93.491l7.488.025v21.356l-4.185-1.732-3.3-1.368Zm-9.656,7.1h7.488v10.285l-1.344-.556a1.082,1.082,0,0,0-.414-.083H14.95ZM8.2,126.728H2.167V109.849H8.2Zm43.181,1.641-12.941,3.289a10.89,10.89,0,0,1-6.694-.419l-16.7-6.551a1.082,1.082,0,0,0-.4-.074H10.369V112.4h10.1l7.011,2.9,3.836,1.588a2.71,2.71,0,0,1,1.451,3.511,3.1,3.1,0,0,1-.434.761,2.793,2.793,0,0,1-2.84.98l-.025-.006c-.063-.016-.125-.034-.187-.054l-7.291-2.8-.091-.035a1.084,1.084,0,0,0-.778,2.023s4.111,1.58,7.245,2.789c.063.025.126.047.189.069l2.407.926a19.9,19.9,0,0,0,2.209.752,13.147,13.147,0,0,0,6.17.077l3.738-.855.011,0,7.1-1.625a2.556,2.556,0,0,1,1.2,4.969Zm0,0"
                  transform="translate(0 -81.425)"
                />
                <path
                  id="Path_103"
                  class="cls-1"
                  data-name="Path 103"
                  d="M118.96,7.707a1.079,1.079,0,0,0,.726-.279,20.362,20.362,0,0,1,15.045-5.217A20.323,20.323,0,0,1,140.639,3.5a1.083,1.083,0,1,0,.771-2.025A22.485,22.485,0,0,0,134.874.048a22.53,22.53,0,0,0-16.639,5.771,1.084,1.084,0,0,0,.726,1.888Zm0,0"
                  transform="translate(-105.104 0)"
                />
                <path
                  id="Path_104"
                  class="cls-1"
                  data-name="Path 104"
                  d="M351.819,42.4a1.085,1.085,0,0,0,1.529-.107l8.915-10.262a1.083,1.083,0,1,0-1.635-1.421l-8.915,10.262A1.083,1.083,0,0,0,351.819,42.4Zm0,0"
                  transform="translate(-313.365 -26.963)"
                />
                <path
                  id="Path_105"
                  class="cls-1"
                  data-name="Path 105"
                  d="M406.232,99.738a2.72,2.72,0,1,0,2.72,2.72A2.723,2.723,0,0,0,406.232,99.738Zm0,3.274a.553.553,0,1,1,.553-.553A.554.554,0,0,1,406.232,103.012Zm0,0"
                  transform="translate(-359.789 -88.931)"
                />
                <path
                  id="Path_106"
                  class="cls-1"
                  data-name="Path 106"
                  d="M350.7,32.706a2.72,2.72,0,1,0-2.72-2.72A2.723,2.723,0,0,0,350.7,32.706Zm0-3.274a.553.553,0,1,1-.553.554A.554.554,0,0,1,350.7,29.432Zm0,0"
                  transform="translate(-310.275 -24.311)"
                />
                <path
                  id="Path_107"
                  class="cls-1"
                  data-name="Path 107"
                  d="M91.662,82.321a1.083,1.083,0,1,0,.4-1.316,1.092,1.092,0,0,0-.4,1.316Zm0,0"
                  transform="translate(-81.658 -72.068)"
                />
              </g>
            </svg>
            <span class="finanical-btn_title">
              سود شما از مدرس
              <br />
              <small>تومان</small>
            </span>

            <p class="persian-number">{{ cardsDetails.profit }}</p>
          </button>
          <button class="finanical-btn courses">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25.067"
              height="23.5"
              viewBox="0 0 25.067 23.5"
            >
              <g transform="translate(0 -15)">
                <path
                  class="cls-1"
                  id="Path_284"
                  data-name="Path 284"
                  d="M22.558,24.848a10.027,10.027,0,0,0-20.051.179v.209a.418.418,0,0,0,.418.418h.209v5.569a.418.418,0,1,0,.836,0V25.664a1.255,1.255,0,0,1,1.1,1.243v4.648a1.255,1.255,0,0,1-1.253,1.253H2.924A2.091,2.091,0,0,1,.836,30.719V27.742A2.091,2.091,0,0,1,1.32,26.4a.418.418,0,1,0-.641-.536A2.928,2.928,0,0,0,0,27.742v2.977a2.929,2.929,0,0,0,2.286,2.853v3.146a1.781,1.781,0,1,0,3.563,0V36.2a.888.888,0,0,1,1.776,0v.1a1.671,1.671,0,1,0,3.342,0V30.551a7.41,7.41,0,0,0,5.084-.72,1.252,1.252,0,0,0,.66-1.1V25.935l.852-.344a1.059,1.059,0,0,0,0-1.963l-4.49-1.814a1.436,1.436,0,0,0-1.081,0L7.5,23.628a1.059,1.059,0,0,0,0,1.963l4.49,1.814a1.436,1.436,0,0,0,1.081,0l1.376-.556a.418.418,0,0,0-.313-.775l-1.376.556a.6.6,0,0,1-.455,0l-4.49-1.814a.223.223,0,0,1,0-.414l4.49-1.814a.6.6,0,0,1,.455,0l4.49,1.814a.223.223,0,0,1,0,.414c-1.21.489-1.116.45-1.143.464a.413.413,0,0,0-.22.276c-.018.074-.012-.133-.012,3.171a.417.417,0,0,1-.22.368,6.578,6.578,0,0,1-6.248,0,.415.415,0,0,1-.217-.367V27.638a.418.418,0,1,0-.836,0v1.089a1.25,1.25,0,0,0,.656,1.1,7.391,7.391,0,0,0,1.12.49v5.989a.836.836,0,0,1-1.671,0v-.1a1.723,1.723,0,1,0-3.447,0v.516a.946.946,0,1,1-1.892,0V33.644h.691A2.091,2.091,0,0,0,5.9,31.555V26.907a2.091,2.091,0,0,0-2.089-2.089H3.345a9.191,9.191,0,0,1,18.377,0h-.467a2.091,2.091,0,0,0-2.089,2.089v4.648a2.091,2.091,0,0,0,2.089,2.089h.261a.418.418,0,0,0,.418-.418v-5.81a.418.418,0,1,0-.836,0V32.8A1.255,1.255,0,0,1,20,31.555V26.907a1.255,1.255,0,0,1,1.253-1.253h.888a2.091,2.091,0,0,1,2.089,2.089v2.977a2.1,2.1,0,0,1-.87,1.7.418.418,0,0,0,.488.678,2.934,2.934,0,0,0,1.217-2.375V27.742a2.929,2.929,0,0,0-2.509-2.894Z"
                  fill="#fff"
                />
              </g>
            </svg>
            <span class="finanical-btn_title">
              تعداد دوره ها
              <br />
              <small>عدد</small>
            </span>

            <p class="persian-number">{{ cardsDetails.courseCount }}</p>
          </button>
          <button class="finanical-btn students">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20.023"
              height="24"
              viewBox="0 0 20.023 24"
            >
              <g data-name="user (3)" transform="translate(0 0)">
                <path
                  data-name="Path 73"
                  class="cls-1"
                  d="M92.812,11.561A5.593,5.593,0,0,0,96.9,9.868,5.594,5.594,0,0,0,98.593,5.78,5.594,5.594,0,0,0,96.9,1.693a5.779,5.779,0,0,0-8.174,0A5.593,5.593,0,0,0,87.032,5.78a5.594,5.594,0,0,0,1.694,4.087A5.6,5.6,0,0,0,92.812,11.561ZM89.72,2.688a4.373,4.373,0,0,1,6.185,0A4.179,4.179,0,0,1,97.187,5.78a4.179,4.179,0,0,1-1.282,3.093,4.372,4.372,0,0,1-6.185,0A4.178,4.178,0,0,1,88.438,5.78,4.179,4.179,0,0,1,89.72,2.688Zm0,0"
                  transform="translate(-82.952 0)"
                />
                <path
                  data-name="Path 74"
                  class="cls-1"
                  d="M19.975,254.178a14.278,14.278,0,0,0-.194-1.516,11.949,11.949,0,0,0-.373-1.525,7.532,7.532,0,0,0-.627-1.422,5.36,5.36,0,0,0-.945-1.232,4.167,4.167,0,0,0-1.358-.853,4.692,4.692,0,0,0-1.733-.314,1.759,1.759,0,0,0-.94.4c-.282.184-.611.4-.979.631a5.61,5.61,0,0,1-1.266.558,4.917,4.917,0,0,1-3.1,0,5.59,5.59,0,0,1-1.265-.558c-.364-.233-.694-.445-.98-.631a1.757,1.757,0,0,0-.939-.4,4.686,4.686,0,0,0-1.733.314,4.164,4.164,0,0,0-1.358.853,5.361,5.361,0,0,0-.945,1.232,7.544,7.544,0,0,0-.627,1.422,11.975,11.975,0,0,0-.373,1.525,14.182,14.182,0,0,0-.194,1.517c-.032.458-.048.935-.048,1.417a3.985,3.985,0,0,0,1.184,3.015,4.26,4.26,0,0,0,3.05,1.112H15.79a4.261,4.261,0,0,0,3.05-1.112,3.984,3.984,0,0,0,1.184-3.015c0-.484-.016-.961-.049-1.418Zm-2.1,3.414a2.868,2.868,0,0,1-2.08.725H4.233a2.869,2.869,0,0,1-2.08-.725,2.6,2.6,0,0,1-.747-2c0-.45.015-.894.044-1.32a12.789,12.789,0,0,1,.176-1.366,10.564,10.564,0,0,1,.328-1.344,6.145,6.145,0,0,1,.51-1.156,3.974,3.974,0,0,1,.695-.91,2.764,2.764,0,0,1,.9-.562,3.236,3.236,0,0,1,1.108-.214c.049.026.137.076.279.169.289.188.622.4.991.639a6.968,6.968,0,0,0,1.59.71,6.323,6.323,0,0,0,3.963,0,6.978,6.978,0,0,0,1.59-.711c.377-.241.7-.45.99-.638.142-.092.23-.143.279-.169a3.239,3.239,0,0,1,1.108.214,2.769,2.769,0,0,1,.9.562,3.963,3.963,0,0,1,.695.91,6.121,6.121,0,0,1,.51,1.156,10.537,10.537,0,0,1,.328,1.344,12.9,12.9,0,0,1,.176,1.366h0c.03.425.045.868.045,1.319a2.6,2.6,0,0,1-.747,2Zm0,0"
                  transform="translate(0 -235.723)"
                />
              </g>
            </svg>

            <span class="finanical-btn_title">
              تعداد دانشجویان
              <br />
              <small>نفر</small>
            </span>

            <p class="persian-number">{{ cardsDetails.studentCount }}</p>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import skeleton from "@/components/skeleton-creator";
export default {
  components: { skeleton },
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  data() {
    return {
      loading: true,
      commision: "",
      cardsDetails: "",
      isSending: false,
    };
  },
  async beforeMount() {
    if (this.$route.params.id == undefined || isNaN(this.$route.params.id)) {
      this.$router.push("/teachers-list");
    } else {
      const [commision, fines] = await Promise.all([
        this.$axios.get(
          `/api/Admin/AdminManageTeacher/GetTeacherCommission/${this.$route.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        ),
        this.$axios.get(
          `/api/Admin/AdminManageTeacher/GetTeacherFineDetails/${this.$route.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        ),
      ]);
      if (
        commision.data.statusCode == 200 &&
        commision.data.message == "Success" &&
        fines.data.statusCode == 200 &&
        fines.data.message == "Success"
      ) {
        this.cardsDetails = fines.data.data;
        this.commision = commision.data.data;
      }
    }
    this.loading = false;
  },
  methods: {
    seeMsgs() {
      this.$router.push(`/messages/${this.$route.params.id}`);
    },
    seeCourses() {
      this.$router.push("/seeCourses/" + this.$route.params.id);
    },
    async addCourse() {
      const teacherPhone = await this.$axios.get(
        `/api/Admin/AdminManageTeacher/GetTeacherProfile?teacherId=${this.$route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (teacherPhone.data.statusCode == 200 && teacherPhone.data.message == "Success") {
        this.$router.push(`/add-course/add/${teacherPhone.data.data.phoneNumber}`);
      }
    },
    transactions() {
      this.$router.push(`/transactions-list/${this.$route.params.id}`);
    },
    packReq() {
      this.$router.push(`/package-request/${this.$route.params.id}`);
    },
    async setCommision() {
      this.isSending = true;
      const setCommisionResp = await this.$axios.get(
        `/api/Admin/AdminManageTeacher/ChangeTeacherCommission/${this.$route.params.id}/${this.commision}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (
        setCommisionResp.data.statusCode == 200 &&
        setCommisionResp.data.message == "Success"
      ) {
        this.$swal({
          text: "ثبت شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
      }
      this.isSending = false;
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
</style>
