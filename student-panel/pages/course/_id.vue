<template>
  <div>
    <div class="landing-background"></div>
    <div class="container-fluid mb-4 px-md-5 course-box">
      <div class="breadcrumb" v-if="!loading">
        <nuxt-link to="/" class="item">صفحه نخست</nuxt-link>
        <nuxt-link to="/courses-list" class="item">لیست دوره ها</nuxt-link>
        <nuxt-link
          :to="'/courses-list?filter=' + courseDetail.metaParentGroup.item1"
          class="item"
          v-if="courseDetail.metaParentGroup != null"
          >{{ courseDetail.metaParentGroup.item2 }}</nuxt-link
        >
        <nuxt-link
          :to="'/courses-list?filter=' + courseDetail.parentGroup.item1"
          class="item"
          v-if="courseDetail.parentGroup != null"
          >{{ courseDetail.parentGroup.item2 }}</nuxt-link
        >
        <nuxt-link
          :to="'/courses-list?filter=' + courseDetail.group.item1"
          class="item"
          v-if="courseDetail.group != null"
          >{{ courseDetail.group.item2 }}</nuxt-link
        >
      </div>
      <div class="row mt-3">
        <aside class="col-xl-3 col-12 aside-content replacement">
          <div class="aside-item course-info">
            <!-- skeleton -->
            <template v-if="loading">
              <div class="header">
                <h5 class="title">
                  <skeleton
                    v-if="loading"
                    class="skeleton"
                    width="100px"
                    height="25px"
                    borderRadius="5px"
                  />
                </h5>
                <span class="persian-number price">
                  <span class="value"
                    ><skeleton
                      v-if="loading"
                      class="skeleton"
                      width="100px"
                      height="25px"
                      borderRadius="5px"
                  /></span>
                </span>
              </div>
              <div class="body">
                <ul class="info-list">
                  <li>
                    <span
                      ><skeleton
                        v-if="loading"
                        class="skeleton"
                        width="100px"
                        height="25px"
                        borderRadius="5px"
                    /></span>
                    <span class="persian-number"
                      ><skeleton
                        v-if="loading"
                        class="skeleton"
                        width="100px"
                        height="25px"
                        borderRadius="5px"
                    /></span>
                  </li>
                  <li>
                    <span
                      ><skeleton
                        v-if="loading"
                        class="skeleton"
                        width="100px"
                        height="25px"
                        borderRadius="5px"
                    /></span>
                    <span class="persian-number"
                      ><skeleton
                        v-if="loading"
                        class="skeleton"
                        width="100px"
                        height="25px"
                        borderRadius="5px"
                    /></span>
                  </li>

                  <li class="course-status">
                    <span
                      ><skeleton
                        v-if="loading"
                        class="skeleton"
                        width="100px"
                        height="25px"
                        borderRadius="5px"
                    /></span>
                    <span class="persian-number"
                      ><skeleton
                        v-if="loading"
                        class="skeleton"
                        width="100px"
                        height="25px"
                        borderRadius="5px"
                    /></span>
                  </li>
                  <li>
                    <span
                      ><skeleton
                        v-if="loading"
                        class="skeleton"
                        width="100px"
                        height="25px"
                        borderRadius="5px"
                    /></span>
                    <span class="persian-number"
                      ><skeleton
                        v-if="loading"
                        class="skeleton"
                        width="100px"
                        height="25px"
                        borderRadius="5px"
                    /></span>
                  </li>
                </ul>
              </div>
              <div class="footer">
                <skeleton
                  v-if="loading"
                  class="skeleton"
                  width="100%"
                  height="30px"
                  borderRadius="5px"
                />
              </div>
            </template>

            <template v-else>
              <div class="header">
                <h5 class="title">قیمت دوره:</h5>
                <span class="persian-number price" v-if="detailBox.coursePrice != 0">
                  <span class="value">{{ detailBox.coursePrice }}</span>
                  <span class="currency"> تومان </span>
                </span>
                <span class="persian-number price" v-else>
                  <span class="currency"> رایگان! </span>
                </span>
              </div>
              <div class="body">
                <ul class="info-list">
                  <li>
                    <span>تعداد دانشجویان</span>
                    <span class="persian-number">{{ courseDetail.studentCount }}</span>
                  </li>
                  <li>
                    <span>مدت زمان دوره</span>
                    <span class="persian-number">{{ courseDetail.time }} ساعت</span>
                  </li>

                  <li class="course-status">
                    <span>وضعیت دوره</span>
                    <span
                      class="persian-number on-performing"
                      v-if="detailBox.courseStatus == 'InProgress'"
                      >در حال برگزاری</span
                    >
                    <span
                      class="persian-number ended"
                      v-else-if="detailBox.courseStatus == 'Completed'"
                      >تمام شده</span
                    >
                    <span class="persian-number ended" v-else>نامعلوم</span>
                  </li>
                  <li>
                    <span> تاریخ شروع دوره</span>
                    <span class="persian-number">{{
                      new Date(detailBox.createDate).toLocaleDateString("fa-IR")
                    }}</span>
                  </li>
                  <li>
                    <span>آخرین بروز رسانی</span>
                    <span class="persian-number">{{
                      new Date(detailBox.updateDate).toLocaleDateString("fa-IR")
                    }}</span>
                  </li>
                  <li v-if="item1 == 1 && item2 != null">
                    <span>مهلت باقیمانده</span>
                    <span class="persian-number">{{ item2 }}</span>
                  </li>
                </ul>
              </div>
              <div class="footer" v-if="detailBox.coursePrice != 0 && item1 != 1">
                <a href="" type="button" @click.prevent="buyCourse">{{
                  item1 == 2 ? "خرید دوره" : item1 == 0 ? "تمدید دوره" : ""
                }}</a>
              </div>
            </template>
          </div>
          <div class="aside-item teacher-info">
            <!-- skeleton -->
            <template v-if="loading">
              <div class="header">
                <div class="teacher-profile">
                  <skeleton
                    class="skeleton"
                    width="100%"
                    height="100%"
                    type="circle"
                    borderRadius="5px"
                  />
                </div>
                <div class="name-job">
                  <h4>
                    <skeleton
                      v-if="loading"
                      class="skeleton"
                      width="100px"
                      height="25px"
                      borderRadius="5px"
                    />
                  </h4>
                  <h4>
                    <skeleton
                      v-if="loading"
                      class="skeleton"
                      width="50px"
                      height="20px"
                      borderRadius="5px"
                    />
                  </h4>
                </div>
              </div>
              <div class="body">
                <ul class="specialties redbullet-list">
                  <skeleton
                    v-if="loading"
                    class="skeleton"
                    width="100px"
                    height="15px"
                    borderRadius="5px"
                  />
                  <br />
                  <skeleton
                    v-if="loading"
                    class="skeleton"
                    width="100px"
                    height="15px"
                    borderRadius="5px"
                  />
                  <br />
                  <skeleton
                    v-if="loading"
                    class="skeleton"
                    width="100px"
                    height="15px"
                    borderRadius="5px"
                  />
                </ul>
              </div>
              <div class="footer">
                <skeleton
                  v-if="loading"
                  class="skeleton"
                  width="100%"
                  height="30px"
                  borderRadius="5px"
                />
              </div>
            </template>

            <template v-else>
              <div class="header">
                <div class="teacher-profile">
                  <img
                    :src="
                      'https://api.daneshkadeonline.ir/Images/Public/Teacher/' +
                      teacherBox.teacherImageName
                    "
                    alt="عکس مدرس دوره"
                  />
                </div>
                <div class="name-job">
                  <h4>مدرس دوره</h4>
                  <h4>{{ teacherBox.teacherName }}</h4>
                </div>
              </div>
              <div class="body">
                <ul class="specialties redbullet-list">
                  <li
                    v-for="education in teacherBox.educations"
                    :key="teacherBox.educations.indexOf(education)"
                  >
                    {{ education }}
                  </li>
                </ul>
                <p class="details">{{ teacherBox.shortDescription }}</p>
              </div>
              <div class="footer">
                <a href="#">درباره دکتر</a>
              </div>
            </template>
          </div>
          <template v-if="!loading">
            <div class="aside-item sharing">
              <div class="header">
                <h5 class="title">به اشتراک گذاری</h5>
                <div class="social-media">
                  <a
                    :href="
                      'https://twitter.com/intent/tweet?url=https://www.my.daneshkadeonline.ir' +
                      $route.fullPath
                    "
                    target="blank"
                    type="button"
                  >
                    <svg
                      class="twitter"
                      xmlns="http://www.w3.org/2000/svg"
                      width="39.333"
                      height="32.474"
                      viewBox="0 0 39.333 32.474"
                    >
                      <path
                        d="M14.966,32.474C8.4,32.474,3.213,31.327.73,29.327l-.048-.039-.044-.044a2.019,2.019,0,0,1-.53-2.123l.023-.063a2.056,2.056,0,0,1,1.876-1.291A16.95,16.95,0,0,0,6.49,25.15a8.507,8.507,0,0,1-4.483-5.18,1.836,1.836,0,0,1,.641-2.141,1.874,1.874,0,0,1,.559-.286A12.405,12.405,0,0,1,.663,12.984l-.015-.051-.011-.052a1.912,1.912,0,0,1,.886-2.052,1.9,1.9,0,0,1,.907-.256A9.591,9.591,0,0,1,1.7,8.363,9.249,9.249,0,0,1,2.689,2.2l.244-.488a1.36,1.36,0,0,1,2.179-.354l.444.445C9.067,5.484,12.212,7.231,17.65,8.426a9.634,9.634,0,0,1,2.6-5.554A9.125,9.125,0,0,1,26.765,0h.016a13.051,13.051,0,0,1,5.386,1.753c1.159-.379,2.555-.967,4-1.587a1.829,1.829,0,0,1,2.047.36,1.8,1.8,0,0,1,.39,1.975q-.158.44-.358.862a1.832,1.832,0,0,1,.533.368,1.978,1.978,0,0,1,.492,1.849l-.018.063A7.546,7.546,0,0,1,36.225,9.8c-.236,12.544-9.682,22.669-21.259,22.669ZM2.942,28.043c2.339,1.323,6.8,2.124,12.024,2.124a18.011,18.011,0,0,0,13.352-6.075A21.764,21.764,0,0,0,33.923,9.324V9.261a1.359,1.359,0,0,1,.725-1.2,4.9,4.9,0,0,0,2.12-2.345,1.36,1.36,0,0,1-1.31-2.142,7.488,7.488,0,0,0,.514-.814c-1.251.525-2.439,1-3.471,1.31a1.475,1.475,0,0,1-1.135-.122,11.238,11.238,0,0,0-4.578-1.638,7.172,7.172,0,0,0-6.9,7.268,1.361,1.361,0,0,1-1.624,1.335C12,9.675,8.281,7.823,4.418,3.941a6.81,6.81,0,0,0-.449,3.982,8.416,8.416,0,0,0,2,3.873,1.36,1.36,0,0,1-1.373,2.211,6.23,6.23,0,0,1-1.268-.487,11.491,11.491,0,0,0,3.94,4.569,1.36,1.36,0,0,1-.87,2.478,6.115,6.115,0,0,1-1.805-.39,6.2,6.2,0,0,0,4.95,3.507,1.36,1.36,0,0,1,.4,2.543,16.344,16.344,0,0,1-7,1.815Zm0,0"
                        transform="translate(0 0)"
                      />
                    </svg>
                  </a>
                  <a
                    :href="
                      'https://www.linkedin.com/sharing/share-offsite/?url=https://www.my.daneshkadeonline.ir' +
                      $route.fullPath
                    "
                    type="button"
                    target="blank"
                  >
                    <svg
                      class="linkedin"
                      xmlns="http://www.w3.org/2000/svg"
                      width="35.041"
                      height="39.333"
                      viewBox="0 0 35.041 39.333"
                    >
                      <path
                        data-name="Path 89153"
                        d="M8.478,151.625H1.848A1.35,1.35,0,0,0,.5,152.973v24.989a1.349,1.349,0,0,0,1.348,1.348H8.478a1.349,1.349,0,0,0,1.348-1.348V152.973A1.349,1.349,0,0,0,8.478,151.625ZM7.518,177H2.808V153.933H7.518Zm0,0"
                        transform="translate(-0.461 -139.977)"
                      />
                      <path
                        data-name="Path 89154"
                        d="M4.7,0A4.7,4.7,0,1,0,9.4,4.7,4.707,4.707,0,0,0,4.7,0Zm0,7.1A2.394,2.394,0,1,1,7.1,4.7,2.4,2.4,0,0,1,4.7,7.1Zm0,0"
                      />
                      <path
                        data-name="Path 89155"
                        d="M176.549,154.559a8.6,8.6,0,0,0-5.672-1.992,8.7,8.7,0,0,0-3.684.9v-.546a1.288,1.288,0,0,0-1.287-1.287h-6.751a1.287,1.287,0,0,0-1.287,1.287v25.11a1.287,1.287,0,0,0,1.287,1.287h6.885a1.154,1.154,0,0,0,1.154-1.154V163.189a2.388,2.388,0,0,1,2.284-2.4,2.358,2.358,0,0,1,2.427,2.354v15.045a1.13,1.13,0,0,0,1.13,1.13h6.617a1.13,1.13,0,0,0,1.13-1.13V163.6a11.744,11.744,0,0,0-4.231-9.038Zm1.923,22.447h-4.26V163.139a4.663,4.663,0,0,0-9.327,0v13.867h-4.71V153.937h4.71v1.677h0a1.153,1.153,0,0,0,1.918.864,6.394,6.394,0,0,1,4.115-1.6,6.289,6.289,0,0,1,4.151,1.457,9.441,9.441,0,0,1,3.4,7.266Zm0,0"
                        transform="translate(-145.74 -139.981)"
                      />
                    </svg>
                  </a>
                  <a href="#">
                    <svg
                      class="instagram"
                      data-name="instagram (14)"
                      xmlns="http://www.w3.org/2000/svg"
                      width="39.333"
                      height="39.333"
                      viewBox="0 0 39.333 39.333"
                    >
                      <path
                        data-name="Path 89150"
                        d="M28.685,0H10.646A10.659,10.659,0,0,0,0,10.647V28.686A10.659,10.659,0,0,0,10.646,39.333H28.686A10.659,10.659,0,0,0,39.332,28.686V10.647A10.659,10.659,0,0,0,28.685,0Zm8.341,28.686a8.351,8.351,0,0,1-8.341,8.341H10.646A8.351,8.351,0,0,1,2.3,28.686V10.647a8.351,8.351,0,0,1,8.341-8.341H28.686a8.351,8.351,0,0,1,8.341,8.341Zm0,0"
                        transform="translate(0.001 0)"
                      />
                      <path
                        data-name="Path 89151"
                        d="M126.759,116a10.755,10.755,0,1,0,10.755,10.755A10.767,10.767,0,0,0,126.759,116Zm0,19.2a8.449,8.449,0,1,1,8.449-8.449A8.459,8.459,0,0,1,126.759,135.208Zm0,0"
                        transform="translate(-107.092 -107.092)"
                      />
                      <path
                        data-name="Path 89152"
                        d="M361.155,66.285a3.178,3.178,0,1,0,3.178,3.178A3.182,3.182,0,0,0,361.155,66.285Zm0,4.05a.872.872,0,1,1,.872-.872A.873.873,0,0,1,361.155,70.335Zm0,0"
                        transform="translate(-330.476 -61.193)"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div class="aside-item new-courses">
              <div class="header">
                <h5 class="title">دوره های جدید</h5>
              </div>
              <div class="body">
                <ul class="redbullet-list">
                  <li v-for="course in newCourses" :key="course.courseId">
                    <nuxt-link :to="'/course/' + course.courseId">{{
                      course.courseName
                    }}</nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
            <a href="#" class="ask-questions" v-if="studentIsLogin && item1 == 1"
              >سوالات خود را بپرسید</a
            >
            <div class="aside-item related-courses">
              <div class="header">
                <h5 class="title">دوره های مرتبط</h5>
              </div>
              <div class="body">
                <ul class="redbullet-list">
                  <li v-for="course in relatedCourses" :key="course.courseId">
                    <nuxt-link :to="'/course/' + course.courseId">{{
                      course.courseName
                    }}</nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </template>
        </aside>
        <main class="col-xl-9 col-12 main-content">
          <h1 class="course-title">
            <!-- skeleton -->
            <template v-if="loading">
              <skeleton
                v-if="loading"
                class="skeleton"
                width="200px"
                height="35px"
                borderRadius="5px"
              />
            </template>

            <template v-else>
              {{ courseDetail.courseName }}
            </template>
          </h1>
          <p class="course-detail">
            <!-- skeleton -->
            <template v-if="loading">
              <skeleton
                v-if="loading"
                class="skeleton"
                width="70%"
                height="20px"
                borderRadius="5px"
              />
              <br />
              <skeleton
                v-if="loading"
                class="skeleton mt"
                width="50%"
                height="20px"
                borderRadius="5px"
              />
              <br />
              <skeleton
                v-if="loading"
                class="skeleton mt"
                width="30%"
                height="20px"
                borderRadius="5px"
              />
            </template>

            <template v-else>
              {{ courseDetail.shortDescription }}
            </template>
          </p>
          <div class="course-info-table">
            <!-- skeleton -->
            <template v-if="loading">
              <div class="item" v-for="i in 3" :key="i">
                <skeleton
                  v-if="loading"
                  class="skeleton"
                  width="60px"
                  height="60px"
                  borderRadius="5px"
                />
                <div class="bottom">
                  <h6>
                    <skeleton
                      v-if="loading"
                      class="skeleton"
                      width="40px"
                      height="15px"
                      borderRadius="5px"
                    />
                  </h6>
                  <span class="count persian-number">
                    <skeleton
                      v-if="loading"
                      class="skeleton"
                      width="30px"
                      height="15px"
                      borderRadius="5px"
                  /></span>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="item">
                <img src="@/static/images/main-page-images/chat.png" alt="آیکون نظرات" />
                <div class="bottom">
                  <h6>نظرات</h6>
                  <span class="count persian-number">{{
                    courseDetail.commentCount
                  }}</span>
                </div>
              </div>
              <!-- <div class="item">
                <img src="@/static/images/main-page-images/man.png" alt="آیکون دانشجو" />
                <div class="bottom">
                  <h6>شرکت کننده</h6>
                  <span class="count persian-number">{{
                    courseDetail.studentCount
                  }}</span>
                </div>
              </div> -->
              <div class="item">
                <img src="@/static/images/main-page-images/video.png" alt="ایکون ویدئو" />
                <div class="bottom">
                  <h6>جلسات</h6>
                  <span class="count persian-number">{{ courseDetail.fileCount }}</span>
                </div>
              </div>
              <div class="item">
                <img src="@/static/images/main-page-images/time.png" alt="آیکون زمان" />
                <div class="bottom">
                  <h6>زمان دوره</h6>
                  <span class="count persian-number">{{ courseDetail.time }}</span>
                </div>
              </div>
            </template>
          </div>
          <section class="course-content intro">
            <template v-if="loading">
              <skeleton
                v-if="loading"
                class="skeleton"
                width="100%"
                height="20px"
                borderRadius="5px"
              />
              <skeleton
                v-if="loading"
                class="skeleton mt"
                width="80%"
                height="20px"
                borderRadius="5px"
              />
              <skeleton
                v-if="loading"
                class="skeleton mt"
                width="70%"
                height="20px"
                borderRadius="5px"
              />

              <skeleton
                v-if="loading"
                class="skeleton mt"
                width="60%"
                height="20px"
                borderRadius="5px"
              />
              <skeleton
                v-if="loading"
                class="skeleton mt"
                width="20%"
                height="20px"
                borderRadius="5px"
              />
              <skeleton
                v-if="loading"
                class="skeleton mt"
                width="20%"
                height="20px"
                borderRadius="5px"
              />
            </template>
            <div v-html="courseDetail.description" v-else></div>
            <!-- <header>
              <h3>یک عنوان تستی</h3> -->
            <!-- <div class="course-link-box">
              لینک کوتاه دوره
              <span>
                <a href="#" class="link">
                  {{ courseDetail.shortLink }}
                  <svg
                    data-name="link (2)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="15.618"
                    height="15.618"
                    viewBox="0 0 15.618 15.618"
                  >
                    <g data-name="Group 9893" transform="translate(0 0)">
                      <g data-name="Group 9892">
                        <path
                          data-name="Path 720"
                          d="M5.481,183.461l-1.84,1.84a1.952,1.952,0,1,1-2.761-2.76l3.681-3.681a1.952,1.952,0,0,1,2.76,0,.651.651,0,0,0,.92-.92,3.253,3.253,0,0,0-4.6,0l-3.681,3.681a3.254,3.254,0,0,0,4.6,4.6l1.84-1.84a.651.651,0,1,0-.92-.92Z"
                          transform="translate(0.993 -171.557)"
                          fill="#e13535"
                        />
                        <path
                          data-name="Path 721"
                          d="M198.776-.048a3.254,3.254,0,0,0-4.6,0L191.967,2.16a.651.651,0,1,0,.92.92L195.095.873a1.952,1.952,0,1,1,2.761,2.76l-4.049,4.049a1.952,1.952,0,0,1-2.76,0,.651.651,0,0,0-.92.92,3.253,3.253,0,0,0,4.6,0l4.049-4.049A3.253,3.253,0,0,0,198.776-.048Z"
                          transform="translate(-184.112 1)"
                          fill="#e13535"
                        />
                      </g>
                    </g>
                  </svg>
                </a>
              </span>
            </div> -->
            <!-- </header>

            <img
              :src="
                'https://api.daneshkadeonline.ir/Images/Public/Course/' +
                courseDetail.imageName
              "
              alt="بنر معرفی دوره"
              class="course-intro-banner"
            />
            <div class="part">
              <h4 class="part-title">یک عنوان تستی</h4>
              <p class="part-detail">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
                طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
                که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با
                هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته
                حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها
                شناخت
              </p>
             </div> -->
            <div class="table-of-content" v-if="!loading">
              <a href="" v-for="topic in topics" :key="topic.index">
                <span class="left-arrow">&larr;</span>

                {{ topic }}
              </a>
            </div>
            <!-- <p class="paragraph">
              لورم ایپسوم
              <em class="highlight-text"> متن ساختگی با تولید </em>
              سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون
              بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
              تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
              متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            </p>
            <div class="part">
              <h4 class="part-title">یک عنوان تستی</h4>
              <p class="part-detail">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از
                طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
                که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با
                هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته
                حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها
                شناخت
              </p>
            </div>
            <footer>
              <div class="notes">
                <h4>نکته:</h4>
                <p>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
                  از طراحان
                </p>
              </div>
            </footer> -->
          </section>
          <template v-if="!loading">
            <section class="course-content video-lists">
              <header>
                <img
                  src="@/static/images/main-page-images/video-lists.svg"
                  alt="آیکون ویدئو لیست"
                />
                <h3>لیست ویدئو ها</h3>
                <a href="#" class="video-alert">
                  <span>⚠</span>
                  گزارش خرابی ویدئو
                </a>
              </header>
              <client-only>
                <div class="custom-video-player">
                  <div class="video-container" tabindex="0" id="video-container">
                    <div class="playback-animation">
                      <svg class="playback-icons">
                        <use class="hidden" href="#play-icon"></use>
                        <use href="#pause"></use>
                      </svg>
                    </div>
                    <video
                      dir="ltr"
                      controls
                      class="video"
                      preload="metadata"
                      :poster="
                        'https://api.daneshkadeonline.ir/Images/Public/Course/' +
                        courseDetail.imageName
                      "
                    >
                      <source dir="ltr" id="videoSrc" src="" type="video/mp4" />
                    </video>
                    <div class="video-controls">
                      <div class="video-progress">
                        <progress class="progress-bar" value="0" min="0"></progress>
                        <input
                          class="seek"
                          value="0"
                          min="0"
                          max="1"
                          type="range"
                          step="1"
                        />
                        <div class="seek-tooltip">00:00</div>
                      </div>

                      <div class="bottom-controls">
                        <div class="left-controls">
                          <button data-title="پخش (k)" class="play">
                            <svg class="playback-icons">
                              <use href="#play-icon"></use>
                              <use class="hidden" href="#pause"></use>
                            </svg>
                          </button>
                          <button
                            class="forward-backward-btn backward-10"
                            data-title="10 ثانیه قبل"
                          >
                            <img
                              src="@/plugins/our-videoplayer/backward-10.png"
                              alt="10 ثانیه قبل"
                            />
                          </button>
                          <button
                            class="forward-backward-btn forward-30"
                            data-title="30 ثانیه بعد"
                          >
                            <img
                              src="@/plugins/our-videoplayer/forward-30.png"
                              alt="30 ثانیه بعد"
                            />
                          </button>
                          <div class="volume-controls">
                            <button data-title="بیصدا (m)" class="volume-button">
                              <svg>
                                <use class="hidden" href="#volume-mute"></use>
                                <use class="hidden" href="#volume-low"></use>
                                <use href="#volume-high"></use>
                              </svg>
                            </button>

                            <input
                              class="volume"
                              value="1"
                              data-mute="0.5"
                              type="range"
                              max="1"
                              min="0"
                              step="0.01"
                            />
                          </div>

                          <div class="time">
                            <time class="time-elapsed">00:00</time>
                            <span> / </span>
                            <time class="duration">00:00</time>
                          </div>
                        </div>

                        <div class="right-controls">
                          <button data-title="تصویر در تصویر (p)" class="pip-button">
                            <svg>
                              <use href="#pip"></use>
                            </svg>
                          </button>
                          <button data-title="تمام صفحه (f)" class="fullscreen-button">
                            <svg>
                              <use href="#fullscreen"></use>
                              <use href="#fullscreen-exit" class="hidden"></use>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </client-only>
              <div class="course-parts">
                <div
                  class="course-part"
                  v-for="episode in courseEpisodes"
                  :key="courseEpisodes.indexOf(episode)"
                  @click="
                    episode.isFree || item1 == 1
                      ? seeVideo(episode.episodeId)
                      : videoIsNotFree()
                  "
                >
                  <div class="name-order">
                    <div class="part-order">
                      <span class="persian-number">{{
                        courseEpisodes.indexOf(episode) + 1
                      }}</span>
                    </div>
                    <h4 class="name">{{ episode.episodeTitle }}</h4>
                  </div>
                  <div class="info">
                    <span class="isFree" v-if="episode.isFree">رایگان</span>
                    <span class="duration persian-number">{{ episode.episodeTime }}</span>
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
                    <!-- <a href="#">
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
                  </a> -->
                  </div>
                </div>
              </div>
            </section>
            <div class="row">
              <section class="col-12 d-xl-none d-flex aside-content">
                <div class="aside-item new-courses">
                  <div class="header">
                    <h5 class="title">دوره های جدید</h5>
                  </div>
                  <div class="body">
                    <ul class="redbullet-list">
                      <li v-for="course in newCourses" :key="course.courseId">
                        <nuxt-link :to="'/course/' + course.courseId">{{
                          course.courseName
                        }}</nuxt-link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="aside-item related-courses">
                  <div class="header">
                    <h5 class="title">دوره های مرتبط</h5>
                  </div>
                  <div class="body">
                    <ul class="redbullet-list">
                      <li v-for="course in relatedCourses" :key="course.courseId">
                        <nuxt-link :to="'/course/' + course.courseId">{{
                          course.courseName
                        }}</nuxt-link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="aside-item sharing">
                  <div class="header">
                    <h5 class="title">به اشتراک گذاری</h5>
                    <div class="social-media">
                      <a href="#">
                        <svg
                          class="twitter"
                          xmlns="http://www.w3.org/2000/svg"
                          width="39.333"
                          height="32.474"
                          viewBox="0 0 39.333 32.474"
                        >
                          <path
                            d="M14.966,32.474C8.4,32.474,3.213,31.327.73,29.327l-.048-.039-.044-.044a2.019,2.019,0,0,1-.53-2.123l.023-.063a2.056,2.056,0,0,1,1.876-1.291A16.95,16.95,0,0,0,6.49,25.15a8.507,8.507,0,0,1-4.483-5.18,1.836,1.836,0,0,1,.641-2.141,1.874,1.874,0,0,1,.559-.286A12.405,12.405,0,0,1,.663,12.984l-.015-.051-.011-.052a1.912,1.912,0,0,1,.886-2.052,1.9,1.9,0,0,1,.907-.256A9.591,9.591,0,0,1,1.7,8.363,9.249,9.249,0,0,1,2.689,2.2l.244-.488a1.36,1.36,0,0,1,2.179-.354l.444.445C9.067,5.484,12.212,7.231,17.65,8.426a9.634,9.634,0,0,1,2.6-5.554A9.125,9.125,0,0,1,26.765,0h.016a13.051,13.051,0,0,1,5.386,1.753c1.159-.379,2.555-.967,4-1.587a1.829,1.829,0,0,1,2.047.36,1.8,1.8,0,0,1,.39,1.975q-.158.44-.358.862a1.832,1.832,0,0,1,.533.368,1.978,1.978,0,0,1,.492,1.849l-.018.063A7.546,7.546,0,0,1,36.225,9.8c-.236,12.544-9.682,22.669-21.259,22.669ZM2.942,28.043c2.339,1.323,6.8,2.124,12.024,2.124a18.011,18.011,0,0,0,13.352-6.075A21.764,21.764,0,0,0,33.923,9.324V9.261a1.359,1.359,0,0,1,.725-1.2,4.9,4.9,0,0,0,2.12-2.345,1.36,1.36,0,0,1-1.31-2.142,7.488,7.488,0,0,0,.514-.814c-1.251.525-2.439,1-3.471,1.31a1.475,1.475,0,0,1-1.135-.122,11.238,11.238,0,0,0-4.578-1.638,7.172,7.172,0,0,0-6.9,7.268,1.361,1.361,0,0,1-1.624,1.335C12,9.675,8.281,7.823,4.418,3.941a6.81,6.81,0,0,0-.449,3.982,8.416,8.416,0,0,0,2,3.873,1.36,1.36,0,0,1-1.373,2.211,6.23,6.23,0,0,1-1.268-.487,11.491,11.491,0,0,0,3.94,4.569,1.36,1.36,0,0,1-.87,2.478,6.115,6.115,0,0,1-1.805-.39,6.2,6.2,0,0,0,4.95,3.507,1.36,1.36,0,0,1,.4,2.543,16.344,16.344,0,0,1-7,1.815Zm0,0"
                            transform="translate(0 0)"
                          />
                        </svg>
                      </a>
                      <a href="#">
                        <svg
                          class="linkedin"
                          xmlns="http://www.w3.org/2000/svg"
                          width="35.041"
                          height="39.333"
                          viewBox="0 0 35.041 39.333"
                        >
                          <path
                            data-name="Path 89153"
                            d="M8.478,151.625H1.848A1.35,1.35,0,0,0,.5,152.973v24.989a1.349,1.349,0,0,0,1.348,1.348H8.478a1.349,1.349,0,0,0,1.348-1.348V152.973A1.349,1.349,0,0,0,8.478,151.625ZM7.518,177H2.808V153.933H7.518Zm0,0"
                            transform="translate(-0.461 -139.977)"
                          />
                          <path
                            data-name="Path 89154"
                            d="M4.7,0A4.7,4.7,0,1,0,9.4,4.7,4.707,4.707,0,0,0,4.7,0Zm0,7.1A2.394,2.394,0,1,1,7.1,4.7,2.4,2.4,0,0,1,4.7,7.1Zm0,0"
                          />
                          <path
                            data-name="Path 89155"
                            d="M176.549,154.559a8.6,8.6,0,0,0-5.672-1.992,8.7,8.7,0,0,0-3.684.9v-.546a1.288,1.288,0,0,0-1.287-1.287h-6.751a1.287,1.287,0,0,0-1.287,1.287v25.11a1.287,1.287,0,0,0,1.287,1.287h6.885a1.154,1.154,0,0,0,1.154-1.154V163.189a2.388,2.388,0,0,1,2.284-2.4,2.358,2.358,0,0,1,2.427,2.354v15.045a1.13,1.13,0,0,0,1.13,1.13h6.617a1.13,1.13,0,0,0,1.13-1.13V163.6a11.744,11.744,0,0,0-4.231-9.038Zm1.923,22.447h-4.26V163.139a4.663,4.663,0,0,0-9.327,0v13.867h-4.71V153.937h4.71v1.677h0a1.153,1.153,0,0,0,1.918.864,6.394,6.394,0,0,1,4.115-1.6,6.289,6.289,0,0,1,4.151,1.457,9.441,9.441,0,0,1,3.4,7.266Zm0,0"
                            transform="translate(-145.74 -139.981)"
                          />
                        </svg>
                      </a>
                      <a href="#">
                        <svg
                          class="instagram"
                          data-name="instagram (14)"
                          xmlns="http://www.w3.org/2000/svg"
                          width="39.333"
                          height="39.333"
                          viewBox="0 0 39.333 39.333"
                        >
                          <path
                            data-name="Path 89150"
                            d="M28.685,0H10.646A10.659,10.659,0,0,0,0,10.647V28.686A10.659,10.659,0,0,0,10.646,39.333H28.686A10.659,10.659,0,0,0,39.332,28.686V10.647A10.659,10.659,0,0,0,28.685,0Zm8.341,28.686a8.351,8.351,0,0,1-8.341,8.341H10.646A8.351,8.351,0,0,1,2.3,28.686V10.647a8.351,8.351,0,0,1,8.341-8.341H28.686a8.351,8.351,0,0,1,8.341,8.341Zm0,0"
                            transform="translate(0.001 0)"
                          />
                          <path
                            data-name="Path 89151"
                            d="M126.759,116a10.755,10.755,0,1,0,10.755,10.755A10.767,10.767,0,0,0,126.759,116Zm0,19.2a8.449,8.449,0,1,1,8.449-8.449A8.459,8.459,0,0,1,126.759,135.208Zm0,0"
                            transform="translate(-107.092 -107.092)"
                          />
                          <path
                            data-name="Path 89152"
                            d="M361.155,66.285a3.178,3.178,0,1,0,3.178,3.178A3.182,3.182,0,0,0,361.155,66.285Zm0,4.05a.872.872,0,1,1,.872-.872A.873.873,0,0,1,361.155,70.335Zm0,0"
                            transform="translate(-330.476 -61.193)"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <a href="#" class="ask-questions" v-if="studentIsLogin"
                  >سوالات خود را بپرسید</a
                >
              </section>
            </div>

            <section class="course-content comments" v-if="item1 != 1">
              <header>
                <img src="@/static/images/main-page-images/chat.svg" alt="آیکون چت" />
                <h3>نظرات کاربران</h3>
              </header>
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
                            ? '@/static/images/main-page-images/person-profile.png'
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
                          <span
                            class="like"
                            :class="
                              likedComments.includes(comment.commentId) ? 'liked' : ''
                            "
                            @click="likeComment($event, comment.commentId)"
                          >
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
                        <a
                          href=""
                          type="button"
                          class="reply-btn"
                          @click.prevent="replayThis(comment.commentId, comment.userName)"
                          >پاسخ</a
                        >
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </section>
            <section class="course-content messages-form-box" v-if="item1 != 1">
              <div class="aside">نظر خود را اینجا بنویسید</div>
              <form action="#">
                <template v-if="!replayToCommentName == ''">
                  پاسخ به:
                  <input
                    type="text"
                    :value="replayToCommentName"
                    placeholder="نام و نام خانوادگی"
                  />
                </template>
                <input
                  type="text"
                  v-if="!studentIsLogin"
                  v-model="commentName"
                  placeholder="نام و نام خانوادگی"
                />

                <textarea
                  class="message"
                  v-model="commentText"
                  placeholder="نظر شما"
                ></textarea>
                <button class="submit-comment" @click.prevent="addComment">
                  ثبت نظر
                </button>
              </form>
            </section>
            <section
              class="course-content question-answer"
              v-if="studentIsLogin && item1 == 1"
            >
              <header>
                <img src="@/static/images/main-page-images/chat.svg" alt="آیکون چت" />
                <h3>پرسش و پاسخ</h3>
              </header>
              <div class="messages custom-scrollbar">
                <div class="messages custom-scrollbar">
                  <div v-if="messageGroups.length == 0" class="no-data-message">
                    پیام جدید وجود ندارد
                  </div>
                  <div
                    class="person-message-box"
                    v-for="messageBox in messageGroups"
                    :key="messageBox.index"
                  >
                    <template v-for="message in messageBox">
                      <div
                        class="person-message"
                        :class="{ 'replied-message': message.sendBy == 'Teacher' }"
                        :key="message.questionId"
                      >
                        <img
                          v-if="message.sendBy != 'Teacher'"
                          :src="
                            'https://api.daneshkadeonline.ir/Images/Public/Teacher/' +
                            message.profileImageName
                          "
                          class="person-message__image"
                          alt="تصویر پروفایل"
                        />
                        <div class="person-message__info">
                          <h4 class="person-name" v-if="message.sendBy != 'Teacher'">
                            {{ message.name }}
                          </h4>
                          <p class="person-text">
                            {{ message.text }}
                          </p>
                        </div>

                        <div class="person-message__sidebox">
                          <span class="message-time">
                            <span class="persian-number">
                              {{
                                Math.floor(
                                  (new Date(
                                    Date.now() + new Date().getTimezoneOffset() * 60000
                                  ).getTime() -
                                    new Date(message.sendDate).getTime()) /
                                    3600000
                                )
                              }}</span
                            >
                            ساعت قبل
                          </span>
                          <form action="#">
                            <label @click="downloadAttachAudio(message.questionId)">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12.593"
                                height="19.9"
                                viewBox="0 0 12.593 19.9"
                              >
                                <g transform="translate(0.2 0.2)">
                                  <g data-name="Group 9896" transform="translate(2.681)">
                                    <g data-name="Group 9895">
                                      <path
                                        data-name="Path 722"
                                        d="M169.723,0a3.42,3.42,0,0,0-3.416,3.416V10.13a3.416,3.416,0,0,0,6.832.023V3.416A3.42,3.42,0,0,0,169.723,0Zm1.992,10.153a1.993,1.993,0,0,1-3.985-.023V3.416a1.993,1.993,0,1,1,3.985,0Z"
                                        transform="translate(-166.307)"
                                        fill="#e13535"
                                        stroke="#f8f8f9"
                                        stroke-width="0.4"
                                      />
                                    </g>
                                  </g>
                                  <g
                                    data-name="Group 9898"
                                    transform="translate(5.385 15.586)"
                                  >
                                    <g data-name="Group 9897">
                                      <rect
                                        data-name="Rectangle 166"
                                        width="1.423"
                                        height="3.203"
                                        fill="#e13535"
                                        stroke="#f8f8f9"
                                        stroke-width="0.4"
                                      />
                                    </g>
                                  </g>
                                  <g
                                    data-name="Group 9900"
                                    transform="translate(3.511 18.077)"
                                  >
                                    <g data-name="Group 9899">
                                      <path
                                        data-name="Path 723"
                                        d="M192.567,474.628h-3.748a.712.712,0,0,0,0,1.423h3.748a.712.712,0,0,0,0-1.423Z"
                                        transform="translate(-188.107 -474.628)"
                                        fill="#e13535"
                                        stroke="#f8f8f9"
                                        stroke-width="0.4"
                                      />
                                    </g>
                                  </g>
                                  <g
                                    data-name="Group 9902"
                                    transform="translate(0 8.943)"
                                  >
                                    <g data-name="Group 9901">
                                      <path
                                        data-name="Path 724"
                                        d="M107.4,234.822a.712.712,0,0,0-.712.712v.569a4.673,4.673,0,0,1-9.347,0v-.569a.712.712,0,1,0-1.423,0v.569a6.1,6.1,0,0,0,12.193,0v-.569A.712.712,0,0,0,107.4,234.822Z"
                                        transform="translate(-95.922 -234.822)"
                                        fill="#e13535"
                                        stroke="#f8f8f9"
                                        stroke-width="0.4"
                                      />
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </label>
                            <label @click="downloadAttachFile(message.questionId)">
                              <svg
                                data-name="link (2)"
                                xmlns="http://www.w3.org/2000/svg"
                                width="15.618"
                                height="15.618"
                                viewBox="0 0 15.618 15.618"
                              >
                                <g data-name="Group 9893" transform="translate(0 0)">
                                  <g data-name="Group 9892">
                                    <path
                                      data-name="Path 720"
                                      d="M5.481,183.461l-1.84,1.84a1.952,1.952,0,1,1-2.761-2.76l3.681-3.681a1.952,1.952,0,0,1,2.76,0,.651.651,0,0,0,.92-.92,3.253,3.253,0,0,0-4.6,0l-3.681,3.681a3.254,3.254,0,0,0,4.6,4.6l1.84-1.84a.651.651,0,1,0-.92-.92Z"
                                      transform="translate(0.993 -171.557)"
                                      fill="#e13535"
                                    />
                                    <path
                                      data-name="Path 721"
                                      d="M198.776-.048a3.254,3.254,0,0,0-4.6,0L191.967,2.16a.651.651,0,1,0,.92.92L195.095.873a1.952,1.952,0,1,1,2.761,2.76l-4.049,4.049a1.952,1.952,0,0,1-2.76,0,.651.651,0,0,0-.92.92,3.253,3.253,0,0,0,4.6,0l4.049-4.049A3.253,3.253,0,0,0,198.776-.048Z"
                                      transform="translate(-184.112 1)"
                                      fill="#e13535"
                                    />
                                  </g>
                                </g>
                              </svg>
                            </label>
                            <button
                              v-if="
                                message.sendBy != 'Teacher' &&
                                messageBox[0].status != 'Closed'
                              "
                              type="button"
                              class="reply-btn"
                              @click.prevent="seeResponses(message.questionId)"
                            >
                              مشاهده پاسخ ها
                            </button>
                          </form>
                        </div>
                      </div>
                    </template>
                    <footer>
                      <div
                        v-if="messageBox[0].status == 'Closed'"
                        class="ended-conversation-text"
                      >
                        گفتگو پایان یافته است
                      </div>
                    </footer>
                  </div>
                </div>
              </div>

              <footer class="indicators mt-4">
                <a href="#" class="prev"
                  ><img
                    src="@/static/images/main-page-images/chevron-bottom.svg"
                    title="قبلی"
                    alt="قبلی"
                /></a>
                <a href="#" class="persian-number active">1</a>
                <a href="#" class="persian-number">2</a>
                <span>...</span>
                <a href="#" class="persian-number">5</a>
                <a href="#" class="next"
                  ><img
                    src="@/static/images/main-page-images/chevron-bottom.svg"
                    title="بعدی"
                    alt="بعدی"
                /></a>
              </footer>
            </section>
            <!-- <section
              class="course-content answer-form-box"
              v-if="studentIsLogin && item1 == 1"
            >
              <div class="aside">پرسش خود را اینجا مطرح کنید</div>
              <form action="">
                <div class="form-row">
                  <div for="" class="form-row-col darken-color">
                    <div class="separator pseudo-form-input">
                      <input type="file" id="upload-file-for-question" />
                      <span>بارگذاری فایل ضمیمه</span>
                      <span>
                        <label for="upload-file-for-question" class="cover-btn"
                          >انتخاب</label
                        >
                      </span>
                    </div>
                  </div>
                  <label for="" class="form-row-col record-voice-box">
                    <button type="button" class="record-btn">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12.593"
                        height="19.9"
                        viewBox="0 0 12.593 19.9"
                      >
                        <g transform="translate(0.2 0.2)">
                          <g data-name="Group 9896" transform="translate(2.681)">
                            <g data-name="Group 9895">
                              <path
                                data-name="Path 722"
                                d="M169.723,0a3.42,3.42,0,0,0-3.416,3.416V10.13a3.416,3.416,0,0,0,6.832.023V3.416A3.42,3.42,0,0,0,169.723,0Zm1.992,10.153a1.993,1.993,0,0,1-3.985-.023V3.416a1.993,1.993,0,1,1,3.985,0Z"
                                transform="translate(-166.307)"
                                fill="#e13535"
                                stroke="#f8f8f9"
                                stroke-width="0.4"
                              />
                            </g>
                          </g>
                          <g data-name="Group 9898" transform="translate(5.385 15.586)">
                            <g data-name="Group 9897">
                              <rect
                                data-name="Rectangle 166"
                                width="1.423"
                                height="3.203"
                                fill="#e13535"
                                stroke="#f8f8f9"
                                stroke-width="0.4"
                              />
                            </g>
                          </g>
                          <g data-name="Group 9900" transform="translate(3.511 18.077)">
                            <g data-name="Group 9899">
                              <path
                                data-name="Path 723"
                                d="M192.567,474.628h-3.748a.712.712,0,0,0,0,1.423h3.748a.712.712,0,0,0,0-1.423Z"
                                transform="translate(-188.107 -474.628)"
                                fill="#e13535"
                                stroke="#f8f8f9"
                                stroke-width="0.4"
                              />
                            </g>
                          </g>
                          <g data-name="Group 9902" transform="translate(0 8.943)">
                            <g data-name="Group 9901">
                              <path
                                data-name="Path 724"
                                d="M107.4,234.822a.712.712,0,0,0-.712.712v.569a4.673,4.673,0,0,1-9.347,0v-.569a.712.712,0,1,0-1.423,0v.569a6.1,6.1,0,0,0,12.193,0v-.569A.712.712,0,0,0,107.4,234.822Z"
                                transform="translate(-95.922 -234.822)"
                                fill="#e13535"
                                stroke="#f8f8f9"
                                stroke-width="0.4"
                              />
                            </g>
                          </g>
                        </g>
                      </svg>
                    </button>
                    <div class="pseudo-form-input">
                      <audio src="" controls></audio>
                      <span class="voice-timer persian-number">00:12</span>
                      <div class="btn-container">
                        <button type="button" class="play-btn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28.869"
                            height="33.423"
                            viewBox="0 0 28.869 33.423"
                          >
                            <g data-name="Group 9921">
                              <path
                                data-name="Path 743"
                                d="M61.581,12.855,41.84.686a4.564,4.564,0,0,0-6.957,3.887V28.8a4.612,4.612,0,0,0,4.555,4.624h.02a4.581,4.581,0,0,0,2.366-.712,1.3,1.3,0,1,0-1.358-2.225,2,2,0,0,1-1.015.331A2.025,2.025,0,0,1,37.49,28.8V4.573a1.958,1.958,0,0,1,2.983-1.668L60.214,15.074a1.958,1.958,0,0,1-.009,3.34L45.932,27.152a1.3,1.3,0,1,0,1.361,2.223l14.271-8.738a4.564,4.564,0,0,0,.016-7.783Z"
                                transform="translate(-34.883 0)"
                                fill="#212121"
                              />
                            </g>
                          </svg>
                        </button>
                        <button type="button" class="delete-btn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30.457"
                            height="37.5"
                            viewBox="0 0 30.457 37.5"
                          >
                            <path
                              data-name="Path 739"
                              d="M223.276,154.7a.878.878,0,0,0-.878.878v16.6a.878.878,0,0,0,1.756,0v-16.6A.878.878,0,0,0,223.276,154.7Zm0,0"
                              transform="translate(-202.867 -141.117)"
                              fill="#e13535"
                            />
                            <path
                              data-name="Path 740"
                              d="M105.276,154.7a.878.878,0,0,0-.878.878v16.6a.878.878,0,0,0,1.756,0v-16.6A.878.878,0,0,0,105.276,154.7Zm0,0"
                              transform="translate(-95.229 -141.117)"
                              fill="#e13535"
                            />
                            <path
                              data-name="Path 741"
                              d="M2.491,11.162V32.8a4.845,4.845,0,0,0,1.288,3.342A4.325,4.325,0,0,0,6.917,37.5H23.533a4.324,4.324,0,0,0,3.138-1.357A4.845,4.845,0,0,0,27.959,32.8V11.162a3.355,3.355,0,0,0-.861-6.6H22.6v-1.1A3.45,3.45,0,0,0,19.124,0h-7.8A3.45,3.45,0,0,0,7.848,3.468v1.1h-4.5a3.355,3.355,0,0,0-.861,6.6ZM23.533,35.742H6.917A2.781,2.781,0,0,1,4.247,32.8V11.24H26.2V32.8a2.781,2.781,0,0,1-2.67,2.942ZM9.6,3.468a1.692,1.692,0,0,1,1.721-1.713h7.8a1.692,1.692,0,0,1,1.721,1.713v1.1H9.6ZM3.352,6.322H27.1a1.581,1.581,0,0,1,0,3.162H3.352a1.581,1.581,0,1,1,0-3.162Zm0,0"
                              transform="translate(0.003 0.002)"
                              fill="#e13535"
                            />
                            <path
                              data-name="Path 742"
                              d="M164.276,154.7a.878.878,0,0,0-.878.878v16.6a.878.878,0,0,0,1.756,0v-16.6A.878.878,0,0,0,164.276,154.7Zm0,0"
                              transform="translate(-149.048 -141.117)"
                              fill="#e13535"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </label>
                </div>
                <textarea class="message" placeholder="نظر شما"></textarea>
                <button class="submit-comment">ثبت نظر</button>
              </form>
            </section> -->
          </template>
        </main>
      </div>
    </div>
    <svg style="display: none">
      <defs>
        <symbol id="pause" viewBox="0 0 24 24">
          <path
            d="M14.016 5.016h3.984v13.969h-3.984v-13.969zM6 18.984v-13.969h3.984v13.969h-3.984z"
          ></path>
        </symbol>

        <symbol id="play-icon" viewBox="0 0 24 24">
          <path d="M8.016 5.016l10.969 6.984-10.969 6.984v-13.969z"></path>
        </symbol>

        <symbol id="volume-high" viewBox="0 0 24 24">
          <path
            d="M14.016 3.234q3.047 0.656 5.016 3.117t1.969 5.648-1.969 5.648-5.016 3.117v-2.063q2.203-0.656 3.586-2.484t1.383-4.219-1.383-4.219-3.586-2.484v-2.063zM16.5 12q0 2.813-2.484 4.031v-8.063q1.031 0.516 1.758 1.688t0.727 2.344zM3 9h3.984l5.016-5.016v16.031l-5.016-5.016h-3.984v-6z"
          ></path>
        </symbol>

        <symbol id="volume-low" viewBox="0 0 24 24">
          <path
            d="M5.016 9h3.984l5.016-5.016v16.031l-5.016-5.016h-3.984v-6zM18.516 12q0 2.766-2.531 4.031v-8.063q1.031 0.516 1.781 1.711t0.75 2.32z"
          ></path>
        </symbol>

        <symbol id="volume-mute" viewBox="0 0 24 24">
          <path
            d="M12 3.984v4.219l-2.109-2.109zM4.266 3l16.734 16.734-1.266 1.266-2.063-2.063q-1.547 1.313-3.656 1.828v-2.063q1.172-0.328 2.25-1.172l-4.266-4.266v6.75l-5.016-5.016h-3.984v-6h4.734l-4.734-4.734zM18.984 12q0-2.391-1.383-4.219t-3.586-2.484v-2.063q3.047 0.656 5.016 3.117t1.969 5.648q0 2.203-1.031 4.172l-1.5-1.547q0.516-1.266 0.516-2.625zM16.5 12q0 0.422-0.047 0.609l-2.438-2.438v-2.203q1.031 0.516 1.758 1.688t0.727 2.344z"
          ></path>
        </symbol>

        <symbol id="fullscreen" viewBox="0 0 24 24">
          <path
            d="M14.016 5.016h4.969v4.969h-1.969v-3h-3v-1.969zM17.016 17.016v-3h1.969v4.969h-4.969v-1.969h3zM5.016 9.984v-4.969h4.969v1.969h-3v3h-1.969zM6.984 14.016v3h3v1.969h-4.969v-4.969h1.969z"
          ></path>
        </symbol>

        <symbol id="fullscreen-exit" viewBox="0 0 24 24">
          <path
            d="M15.984 8.016h3v1.969h-4.969v-4.969h1.969v3zM14.016 18.984v-4.969h4.969v1.969h-3v3h-1.969zM8.016 8.016v-3h1.969v4.969h-4.969v-1.969h3zM5.016 15.984v-1.969h4.969v4.969h-1.969v-3h-3z"
          ></path>
        </symbol>

        <symbol id="pip" viewBox="0 0 24 24">
          <path
            d="M21 19.031v-14.063h-18v14.063h18zM23.016 18.984q0 0.797-0.609 1.406t-1.406 0.609h-18q-0.797 0-1.406-0.609t-0.609-1.406v-14.016q0-0.797 0.609-1.383t1.406-0.586h18q0.797 0 1.406 0.586t0.609 1.383v14.016zM18.984 11.016v6h-7.969v-6h7.969z"
          ></path>
        </symbol>
      </defs>
    </svg>
    <div class="basic-modal audioPlayerModal">
      <div class="content-box">
        <header>
          <div class="empty"></div>
          <h2 class="title">پخش ویس</h2>
          <button class="close-btn" @click="closePlayer()">&times;</button>
        </header>
        <br />
        <div class="player-container">
          <audio
            controls
            class="audio-player"
            :src="'data:audio/wav;base64,' + audioBase64Data"
          ></audio>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import skeleton from "@/components/skeleto-creator";
export default {
  components: { skeleton },
  layout: "mainPages",

  data() {
    return {
      loading: true,
      courseDetail: "",
      detailBox: "",
      teacherBox: "",
      relatedCourses: "",
      newCourses: "",
      courseEpisodes: "",
      commentGroups: [],
      messageGroups: [],
      studentIsLogin: false,
      videoEpisode: "6",
      // comment
      commentName: "",
      commentEmail: "",
      commentText: "",
      topics: [],
      renderComponent: true,
      likedComments: "",
      // replay
      replayToCommentName: "",
      replayToCommentId: "",

      // course buy
      item1: "2",
      item2: null,

      audioBase64Data: "",
    };
  },
  async beforeMount() {
    if (this.$route.params.id == undefined || isNaN(this.$route.params.id)) {
      this.$router.push("/courses-list");
    }
    const [course, comments, questions] = await Promise.all([
      this.$axios.get(`/api/Course/Show/${this.$route.params.id}`),
      this.getComments(),
      this.getQuestions(),
    ]);
    if (course.data.statusCode == 200 && course.data.message == "Success") {
      this.courseEpisodes = course.data.data.episodeItems;
      this.topics = course.data.data.detail.topics
        .substring(0, course.data.data.detail.topics.length - 1)
        .split(",");
      this.courseDetail = course.data.data.detail;
      this.detailBox = course.data.data.detailBox;
      this.teacherBox = course.data.data.teacherBox;
      this.relatedCourses = course.data.data.relatedCourses;
      this.newCourses = course.data.data.newCourses;
    } else {
      console.log("course");
    }
  },
  async mounted() {
    if (this.$cookies.get("key")) {
      const getData = await this.$axios.post(
        "/api/Student/StudentAccount/check-student-auth",
        {},
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (getData.data.statusCode == "200" && getData.data.message == "Success") {
        this.studentIsLogin = true;
        await this.IsUserInCourse();
      } else {
        this.$cookies.remove("refreshToken");
        this.$cookies.remove("key");
        this.studentIsLogin = false;
      }
    } else if (this.$cookies.get("refreshToken")) {
      const token = this.$cookies.get("refreshToken");
      const getToken = await this.$axios.post("/api/Student/StudentAccount/refresh", {
        refreshToken: token,
      });
      if (getToken.data.statusCode == 200 && getToken.data.message == "Success") {
        this.studentIsLogin = true;
        this.$store.dispatch("login/setLoginDetails", getToken);
        await this.IsUserInCourse();
      } else {
        this.studentIsLogin = false;
        this.$cookies.remove("refreshToken");
      }
    }
    await this.commentLiked(this.$route.params.id);

    // if (!process.server && !window.videoPlayer) {
    const script = document.createElement("script");
    script.onload = this.onScriptLoaded;
    script.type = "text/javascript";
    script.src = "/our-videoplayer/index.js";
    document.head.appendChild(script);
    // } else {
    //   this.onScriptLoaded();
    // }
    this.loading = false;
  },
  methods: {
    onScriptLoaded(event = null) {
      window.videoPlayer();
    },
    createObjectURL(object) {
      return window.URL
        ? window.URL.createObjectURL(object)
        : window.webkitURL.createObjectURL(object);
    },

    async display(videoStream) {
      var video = document.getElementById("videoSrc");
      let r = await this.$axios.get("/api2/2010/05/sintel/trailer.mp4", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
    },

    async getQuestions() {
      this.messageGroups = [];
      const questions = await this.$axios.get(
        `/api/Course/GetQuestions?courseId=${this.$route.params.id}`
      );
      for (const eachMessage of questions.data.data.questionItems) {
        if (eachMessage.parentId == null) {
          let group = [];
          group.push(eachMessage);
          this.messageGroups.push(group);
        } else {
          for (const i of this.messageGroups) {
            for (const j of i) {
              if (eachMessage.parentId == j.questionId) {
                i.push(eachMessage);
              }
            }
          }
        }
      }
    },
    async IsUserInCourse() {
      const userInCourseResp = await this.$axios.get(
        `/api/Course/IsUserInCourse/${this.$route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      this.item1 = userInCourseResp.data.data.item1;
      this.item2 = userInCourseResp.data.data.item2;
    },
    async getComments() {
      this.commentGroups = [];
      const comments = await this.$axios.get(
        `/api/Course/GetComments/${this.$route.params.id}`
      );
      if (comments.data.statusCode == 200 && comments.data.message == "Success") {
        for (const comment of comments.data.data) {
          if (comment.parentId == null) {
            let group = [];
            group.push(comment);
            this.commentGroups.push(group);
          }
        }
        for (const comment of comments.data.data) {
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
      }
    },
    videoIsNotFree() {
      this.$swal({
        text: "برای مشاهده ی این قسمت دوره را خریداری نمایید",
        icon: "warning",
        showCloseButton: true,
        confirmButtonText: "تایید",
      });
    },
    async replayThis(id, name) {
      this.replayToCommentName = name;
      this.replayToCommentId = id;
    },
    async addComment() {
      if (!this.$cookies.get("key") && !this.$cookies.get("refreshToken")) {
        const commentResp = await this.$axios.post("/api/Course/AddComment", {
          id: this.$route.params.id,
          parentId: this.replayToCommentId == "" ? null : this.replayToCommentId,
          userName: this.commentName,
          commentText: this.commentText,
        });
        if (commentResp.data.statusCode == 200 && commentResp.data.message == "Success") {
          this.getComments();
          this.commentName = "";
          this.commentText = "";
          this.replayToCommentId = "";
          this.replayToCommentName = "";
        }
      } else if (!this.$cookies.get("key") && this.$cookies.get("refreshToken")) {
        this.refreshToken().then((res) => {
          if (res == true) {
            this.commentLogin();
          }
        });
      } else {
        this.commentLogin();
      }
    },
    async commentLogin() {
      const commentResp = await this.$axios.post(
        "/api/Course/AddComment",
        {
          id: this.$route.params.id,
          parentId: this.replayToCommentId == "" ? null : this.replayToCommentId,
          userName: this.commentName,
          commentText: this.commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (commentResp.data.statusCode == 200 && commentResp.data.message == "Success") {
        this.getComments();
        this.commentName = "";
        this.commentText = "";
        this.replayToCommentId = "";
        this.replayToCommentName = "";
      }
    },
    async buyCourse() {
      if (!this.$cookies.get("key") && !this.$cookies.get("refreshToken")) {
        this.$router.push("/my/login");
      } else if (!this.$cookies.get("key") && this.$cookies.get("refreshToken")) {
        this.refreshToken().then((res) => {
          if (res == true) {
            this.buyLogin();
          }
        });
      } else {
        this.buyLogin();
      }
    },
    async buyLogin() {
      const buyResp = await this.$axios.get(
        `/api/Student/StudentOrder/BuyCourse/${this.$route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (buyResp.data.data == 3) {
        this.$swal({
          text: "به سبد خرید اضافه شد",
          icon: "success",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
      } else if (buyResp.data.data == 2) {
        this.$swal({
          text: "در سبد خرید موجود است",
          icon: "error",
          showCloseButton: true,
          confirmButtonText: "تایید",
        });
      }
    },
    async refreshToken() {
      const token = this.$cookies.get("refreshToken");
      const getToken = await this.$axios.post("/api/Student/StudentAccount/refresh", {
        refreshToken: token,
      });
      if (getToken.data.statusCode == 200 && getToken.data.message == "Success") {
        await this.$store.dispatch("login/setLoginDetails", getToken);
        this.studentIsLogin = true;
        return true;
      } else {
        this.studentIsLogin = false;
        this.$cookies.remove("refreshToken");
        return false;
      }
    },
    seeVideo(id) {
      document
        .querySelector("#videoSrc")
        .setAttribute("src", "https://api.daneshkadeonline.ir/Course/Video/" + id);
      const videoPlayer = document.querySelector("video");
      videoPlayer.load();
      // videoPlayer.play();
    },
    async downloadAttachAudio(id) {
      const audioresp = await this.$axios.get(
        "/api/Student/StudentQuestion/GetQuestionAudioBase64/" + id,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );

      if (audioresp.data.statusCode == 200 && audioresp.data.message == "Success") {
        const audioPlayerModal = document.querySelector(".audioPlayerModal");
        this.audioBase64Data = audioresp.data.data.audioBase64;
        audioPlayerModal.style.display = "flex";
        // audioPlayerModal.style.visibility = "visible";
      }
    },
    closePlayer() {
      const audioPlayerModal = document.querySelector(".audioPlayerModal");
      this.audioBase64Data = "";
      audioPlayerModal.style.display = "none";
    },
    async downloadAttachFile(id) {
      const download = await this.$axios.get(
        "/api/Student/StudentQuestion/GetQuestionAttachImageBase64/" + id,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      if (download.data.statusCode == 200 && download.data.message == "Success") {
        if (download.data.data.attachImageBase64 != null) {
          var a = document.createElement("a");
          a.href = "data:image/png;base64," + download.data.data.attachImageBase64;
          a.download = "Image" + new Date().getTime() + ".png";
          a.click();
        } else {
          this.$swal({
            text: "عکسی وجود ندارد",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "ادامه",
          });
        }
      }
    },
    async seeResponses(id) {
      const msgResp = await this.$axios.get(`/api/Course/GetQuestionResponses/${id}`, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      for (const i of this.messageGroups) {
        if (i[0].questionId == Number(id)) {
          for (const j of msgResp.data.data) {
            i.push(j);
          }
        }
      }
    },
    async likeComment(event, id) {
      console.log(event);
      event.target.closest(".like").classList.toggle("liked");
      let myIp = "";
      await fetch("https://api.ipify.org?format=json")
        .then((x) => x.json())
        .then(({ ip }) => {
          myIp = ip;
        });
      if (this.studentIsLogin == true) {
        if (!this.$cookies.get("key") && this.$cookies.get("refreshToken")) {
          this.refreshToken().then(async (res) => {
            if (res == true) {
              const likeResp = await this.$axios.get(`/api/Course/CommentLike/${id}`, {
                headers: {
                  Authorization: `Bearer ${this.$cookies.get("key")}`,
                },
              });
            }
          });
        } else if (this.$cookies.get("key")) {
          const likeResp = await this.$axios.get(`/api/Course/CommentLike/${id}`, {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          });
        }
      } else {
        const likeResp = await this.$axios.get(
          `/api/Course/CommentLike/${id}?ip=${myIp}`
        );
      }
    },
    async commentLiked(id) {
      let myIp = "";
      await fetch("https://api.ipify.org?format=json")
        .then((x) => x.json())
        .then(({ ip }) => {
          myIp = ip;
        });
      if (this.studentIsLogin == true) {
        if (!this.$cookies.get("key") && this.$cookies.get("refreshToken")) {
          this.refreshToken().then(async (res) => {
            if (res == true) {
              const checkLike = await this.$axios.get(
                `/api/Course/GetCourseLikeList/${id}`,
                {
                  headers: {
                    Authorization: `Bearer ${this.$cookies.get("key")}`,
                  },
                }
              );
              if (
                checkLike.data.statusCode == 200 &&
                checkLike.data.message == "Success"
              ) {
                this.likedComments = checkLike.data.data;
              }
            }
          });
        } else if (this.$cookies.get("key")) {
          const checkLike = await this.$axios.get(`/api/Course/GetCourseLikeList/${id}`, {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          });
          if (checkLike.data.statusCode == 200 && checkLike.data.message == "Success") {
            this.likedComments = checkLike.data.data;
          }
        }
      } else {
        const checkLike = await this.$axios.get(
          `/api/Course/GetCourseLikeList/${id}?ip=${myIp}`
        );
        if (checkLike.data.statusCode == 200 && checkLike.data.message == "Success") {
          this.likedComments = checkLike.data.data;
        }
      }
    },
  },
  watch: {},
};
</script>
<style lang="scss">
@import "@/assets/swal-style.scss";
@import "@/assets/styles/pages/course.scss";
</style>
