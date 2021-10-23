<template>
  <div>
    <div class="container-fluid px-md-5">
      <div class="row landing">
        <div class="col-md-6 col-sm-10 col-12 landing-content">
          <h1 class="landing-content-title">
            <template v-if="loading">
              <skeleton class="skeleton" width="280px" height="40px" borderRadius="5px" />
              <br />

              <skeleton
                class="skeleton mt"
                width="200px"
                height="40px"
                borderRadius="5px"
              />
            </template>
            <template v-else>
              {{ headContent.title }}
            </template>
          </h1>
          <p class="landing-content-detail">
            <skeleton
              v-if="loading"
              class="skeleton mt"
              width="280px"
              height="25px"
              borderRadius="5px"
            />
            <br />
            <skeleton
              v-if="loading"
              class="skeleton mt"
              width="200px"
              height="25px"
              borderRadius="5px"
            />
            <template v-else>
              {{ headContent.description }}
            </template>
          </p>
          <a :href="headContent.buttonLink" class="get-signup" v-if="!loading">{{
            headContent.buttonName
          }}</a>
        </div>
        <div class="col-md-6 d-none d-md-flex landing-image">
          <skeleton
            v-if="loading"
            class="skeleton"
            width="560px"
            height="300px"
            borderRadius="5px"
          />
          <img
            v-else
            :src="
              'https://api.daneshkadeonline.ir/Images/Public/LandingContent/' +
              headContent.vectorName
            "
            alt="بنر صفحه فرود"
          />
        </div>
      </div>
    </div>
    <main class="container-fluid px-md-5">
      <template v-if="loading">
        <div class="row" id="newest">
          <div class="col-12">
            <div class="school-slider">
              <div class="header">
                <h4 class="title">
                  <skeleton
                    class="skeleton"
                    width="95px"
                    height="35px"
                    borderRadius="5px"
                  />
                </h4>
              </div>
              <div
                class="swiper-container newest-courses"
                v-swiper:mySwipper2="newestOption"
              >
                <article class="items-container swiper-wrapper">
                  <section class="course swiper-slide" v-for="i in 4" :key="i">
                    <div class="image-container">
                      <skeleton
                        class="skeleton"
                        width="260px"
                        height="180px"
                        borderRadius="5px"
                      />
                    </div>
                    <h4 class="course-name">
                      <skeleton
                        class="skeleton"
                        width="120px"
                        height="25px"
                        borderRadius="5px"
                      />
                    </h4>
                    <p class="course-detail">
                      <skeleton
                        class="skeleton"
                        width="180px"
                        height="15px"
                        borderRadius="5px"
                      />
                      <br />
                      <skeleton
                        class="skeleton"
                        width="130px"
                        height="15px"
                        borderRadius="5px"
                      />
                    </p>
                    <span class="course-teacher">
                      <span class="teacher-name"
                        ><skeleton
                          class="skeleton"
                          width="150px"
                          height="20px"
                          borderRadius="5px"
                      /></span>
                    </span>
                  </section>
                </article>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="!loading">
        <template v-if="amazingAd.isActive">
          <div class="row" v-if="amazingCourses.length > 0" id="shegeft">
            <div class="col-12">
              <div class="school-slider">
                <div class="header">
                  <h4 class="title">دوره های شگفت انگیز</h4>
                  <div class="options">
                    <nuxt-link to="/courses-list">مشاهده همه</nuxt-link>
                    <div class="controls">
                      <button class="amazing-to-first">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8.004"
                          height="14.705"
                          viewBox="0 0 8.004 14.705"
                        >
                          <path
                            data-name="Path 88161"
                            d="M7.388,7.386l-6.7,6.7a.4.4,0,0,1-.569-.569L6.534,7.1.118.688a.4.4,0,0,1,0-.569A.4.4,0,0,1,.4,0,.392.392,0,0,1,.684.119l6.7,6.7A.4.4,0,0,1,7.388,7.386Z"
                            transform="translate(0.25 0.25)"
                            fill="#6d7682"
                            stroke="#6d7682"
                            stroke-width="0.5"
                          />
                        </svg>
                      </button>
                      <button class="amazing-to-end">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8.004"
                          height="14.705"
                          viewBox="0 0 8.004 14.705"
                        >
                          <path
                            data-name="Path 88161"
                            d="M7.388,7.386l-6.7,6.7a.4.4,0,0,1-.569-.569L6.534,7.1.118.688a.4.4,0,0,1,0-.569A.4.4,0,0,1,.4,0,.392.392,0,0,1,.684.119l6.7,6.7A.4.4,0,0,1,7.388,7.386Z"
                            transform="translate(0.25 0.25)"
                            fill="#6d7682"
                            stroke="#6d7682"
                            stroke-width="0.5"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="swiper-container amazing-courses"
                  v-swiper:mySwipper1="amazingOption"
                >
                  <article class="items-container swiper-wrapper" id="dd">
                    <section
                      class="course swiper-slide"
                      v-for="course in amazingCourses"
                      :key="course.courseId"
                    >
                      <nuxt-link
                        :to="'/course/' + course.courseId"
                        class="image-container"
                      >
                        <img
                          :src="
                            'https://api.daneshkadeonline.ir/Images/Public/Course/' +
                            course.courseImageName
                          "
                          alt="عکس دوره"
                        />
                        <span class="course-duration">
                          <span class="persian-number">{{ course.courseTime }}</span>
                          <img
                            src="@/static/images/main-page-images/wall-clock.svg"
                            alt="زمان"
                          />
                        </span>
                        <span
                          class="on-performing-sign"
                          v-if="course.courseStatus == 'InProgress'"
                          >در حال برگزاری</span
                        >
                        <span
                          class="on-performing-sign"
                          v-else-if="course.courseStatus == 'Completed'"
                          >تمام شده</span
                        >
                        <span class="on-performing-sign" v-else>نامعلوم(موقتی)</span>
                      </nuxt-link>
                      <h4 class="course-name">
                        <nuxt-link :to="'/course/' + course.courseId">{{
                          course.courseName
                        }}</nuxt-link>
                      </h4>
                      <p class="course-detail">
                        {{ course.courseShortDescription.substr(0, 50) + "..." }}
                      </p>
                      <span class="course-teacher">
                        مدرس:
                        <span class="teacher-name"> {{ course.teacherName }} </span>
                      </span>
                      <span class="course-viewers">
                        بیننده
                        <span class="count persian-number">{{
                          course.courseVisitCount
                        }}</span>
                        نفر
                      </span>
                    </section>
                  </article>
                </div>
              </div>
            </div>
          </div>
          <div class="row my-5">
            <div class="col-12">
              <a href="#" class="linked-banner" title="دروس پر طرفدار">
                <img
                  :src="
                    'https://api.daneshkadeonline.ir/Images/Public/Ads/' +
                    amazingAd.imageName
                  "
                  alt="دروس پر طرفدار"
                />
              </a>
            </div>
          </div>
        </template>
        <template v-if="newestAd.isActive">
          <div class="row" id="newest">
            <div class="col-12">
              <div class="school-slider">
                <div class="header">
                  <h4 class="title">جدید ترین دوره ها</h4>
                  <div class="options" v-if="!loading">
                    <nuxt-link to="/courses-list">مشاهده همه</nuxt-link>
                    <div class="controls">
                      <button class="newest-to-first">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8.004"
                          height="14.705"
                          viewBox="0 0 8.004 14.705"
                        >
                          <path
                            data-name="Path 88161"
                            d="M7.388,7.386l-6.7,6.7a.4.4,0,0,1-.569-.569L6.534,7.1.118.688a.4.4,0,0,1,0-.569A.4.4,0,0,1,.4,0,.392.392,0,0,1,.684.119l6.7,6.7A.4.4,0,0,1,7.388,7.386Z"
                            transform="translate(0.25 0.25)"
                            fill="#6d7682"
                            stroke="#6d7682"
                            stroke-width="0.5"
                          />
                        </svg>
                      </button>
                      <button class="newest-to-end">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8.004"
                          height="14.705"
                          viewBox="0 0 8.004 14.705"
                        >
                          <path
                            data-name="Path 88161"
                            d="M7.388,7.386l-6.7,6.7a.4.4,0,0,1-.569-.569L6.534,7.1.118.688a.4.4,0,0,1,0-.569A.4.4,0,0,1,.4,0,.392.392,0,0,1,.684.119l6.7,6.7A.4.4,0,0,1,7.388,7.386Z"
                            transform="translate(0.25 0.25)"
                            fill="#6d7682"
                            stroke="#6d7682"
                            stroke-width="0.5"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="swiper-container newest-courses"
                  v-swiper:mySwipper2="newestOption"
                >
                  <article class="items-container swiper-wrapper">
                    <section
                      class="course swiper-slide"
                      v-for="course in newestCourses"
                      :key="course.courseId"
                    >
                      <nuxt-link
                        :to="'/course/' + course.courseId"
                        class="image-container"
                      >
                        <img
                          :src="
                            'https://api.daneshkadeonline.ir/Images/Public/Course/' +
                            course.courseImageName
                          "
                          alt="عکس دوره"
                        />
                        <span class="course-duration">
                          <span class="persian-number">{{ course.courseTime }}</span>
                          <img
                            src="@/static/images/main-page-images/wall-clock.svg"
                            alt="زمان"
                          />
                        </span>
                        <span
                          class="on-performing-sign"
                          v-if="course.courseStatus == 'InProgress'"
                          >در حال برگزاری</span
                        >
                        <span
                          class="on-performing-sign"
                          v-else-if="course.courseStatus == 'Completed'"
                          >تمام شده</span
                        >
                        <span class="on-performing-sign" v-else>نامعلوم(موقتی)</span>
                      </nuxt-link>
                      <h4 class="course-name">
                        <nuxt-link :to="'/course/' + course.courseId">{{
                          course.courseName
                        }}</nuxt-link>
                      </h4>
                      <p class="course-detail">
                        {{ course.courseShortDescription.substr(0, 50) + "..." }}
                      </p>
                      <span class="course-teacher">
                        مدرس:
                        <span class="teacher-name"> {{ course.teacherName }} </span>
                      </span>
                      <span class="course-viewers">
                        بیننده
                        <span class="count persian-number">{{
                          course.courseVisitCount
                        }}</span>
                        نفر
                      </span>
                    </section>
                  </article>
                </div>
              </div>
            </div>
          </div>
          <div class="row my-5">
            <div class="col-12">
              <a href="#" class="linked-banner" title="دروس جدید">
                <img
                  :src="
                    'https://api.daneshkadeonline.ir/Images/Public/Ads/' +
                    newestAd.imageName
                  "
                  alt="دروس جدید"
                />
              </a>
            </div>
          </div>
        </template>
        <template v-if="favoritesAd.isActive">
          <div class="row" v-if="favoriteCourses.length > 0" id="popular">
            <div class="col-12">
              <div class="school-slider">
                <div class="header">
                  <h4 class="title">محبوب ترین دوره ها</h4>
                  <div class="options">
                    <nuxt-link to="/courses-list">مشاهده همه</nuxt-link>
                    <div class="controls">
                      <button class="popular-to-first">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8.004"
                          height="14.705"
                          viewBox="0 0 8.004 14.705"
                        >
                          <path
                            data-name="Path 88161"
                            d="M7.388,7.386l-6.7,6.7a.4.4,0,0,1-.569-.569L6.534,7.1.118.688a.4.4,0,0,1,0-.569A.4.4,0,0,1,.4,0,.392.392,0,0,1,.684.119l6.7,6.7A.4.4,0,0,1,7.388,7.386Z"
                            transform="translate(0.25 0.25)"
                            fill="#6d7682"
                            stroke="#6d7682"
                            stroke-width="0.5"
                          />
                        </svg>
                      </button>
                      <button class="popular-to-end">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8.004"
                          height="14.705"
                          viewBox="0 0 8.004 14.705"
                        >
                          <path
                            data-name="Path 88161"
                            d="M7.388,7.386l-6.7,6.7a.4.4,0,0,1-.569-.569L6.534,7.1.118.688a.4.4,0,0,1,0-.569A.4.4,0,0,1,.4,0,.392.392,0,0,1,.684.119l6.7,6.7A.4.4,0,0,1,7.388,7.386Z"
                            transform="translate(0.25 0.25)"
                            fill="#6d7682"
                            stroke="#6d7682"
                            stroke-width="0.5"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="swiper-container most-popular"
                  v-swiper:mySwipper3="popularOption"
                >
                  <article class="items-container swiper-wrapper">
                    <section
                      class="course swiper-slide"
                      v-for="course in favoriteCourses"
                      :key="course.courseId"
                    >
                      <nuxt-link
                        :to="'/course/' + course.courseId"
                        class="image-container"
                      >
                        <img
                          :src="
                            'https://api.daneshkadeonline.ir/Images/Public/Course/' +
                            course.courseImageName
                          "
                          alt="عکس دوره"
                        />
                        <span class="course-duration">
                          <span class="persian-number">{{ course.courseTime }}</span>
                          <img
                            src="@/static/images/main-page-images/wall-clock.svg"
                            alt="زمان"
                          />
                        </span>
                        <span
                          class="on-performing-sign"
                          v-if="course.courseStatus == 'InProgress'"
                          >در حال برگزاری</span
                        >
                        <span
                          class="on-performing-sign"
                          v-else-if="course.courseStatus == 'Completed'"
                          >تمام شده</span
                        >
                        <span class="on-performing-sign" v-else>نامعلوم(موقتی)</span>
                      </nuxt-link>
                      <h4 class="course-name">
                        <nuxt-link :to="'/course/' + course.courseId">{{
                          course.courseName
                        }}</nuxt-link>
                      </h4>
                      <p class="course-detail">
                        {{ course.courseShortDescription.substr(0, 50) + "..." }}
                      </p>
                      <span class="course-teacher">
                        مدرس:
                        <span class="teacher-name"> {{ course.teacherName }} </span>
                      </span>
                      <span class="course-viewers">
                        بیننده
                        <span class="count persian-number">{{
                          course.courseVisitCount
                        }}</span>
                        نفر
                      </span>
                    </section>
                  </article>
                </div>
              </div>
            </div>
          </div>
          <div class="row my-5">
            <div class="col-12">
              <a href="#" class="linked-banner" title="دروس محبوب">
                <img
                  :src="
                    'https://api.daneshkadeonline.ir/Images/Public/Ads/' +
                    favoritesAd.imageName
                  "
                  alt="دروس محبوب"
                />
              </a>
            </div>
          </div>
        </template>
        <div class="row our-features justify-content-evenly d-flex">
          <div class="col-lg-3 col-md-4 col-10 my-4 my-md-0 feature">
            <img
              src="@/static/images/main-page-images/onlilne-tutorial.png"
              alt="آموزش آنلاین"
            />
            <h3 class="title blue">آموزش آنلاین</h3>
            <p class="feature-detail">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            </p>
          </div>
          <div class="col-lg-3 col-md-4 col-10 my-4 my-md-0 feature">
            <img
              src="@/static/images/main-page-images/easy-learning.png"
              alt="یادگیری آسان"
            />
            <h3 class="title red">یادگیری آسان</h3>
            <p class="feature-detail">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            </p>
          </div>
          <div class="col-lg-3 col-md-4 col-10 my-4 my-md-0 feature">
            <img
              src="@/static/images/main-page-images/simple-progress.png"
              alt="پیشرفت راحت"
            />
            <h3 class="title gold">پیشرفت راحت</h3>
            <p class="feature-detail">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            </p>
          </div>
        </div>

        <template v-if="mostVisitAd.isActive">
          <div class="row" v-if="mostVisitCourses.length > 0" id="visited">
            <div class="col-12">
              <div class="school-slider">
                <div class="header">
                  <h4 class="title">پر بازدید ترین دوره ها</h4>
                  <div class="options">
                    <nuxt-link to="/courses-list">مشاهده همه</nuxt-link>
                    <div class="controls">
                      <button class="visited-to-first">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8.004"
                          height="14.705"
                          viewBox="0 0 8.004 14.705"
                        >
                          <path
                            data-name="Path 88161"
                            d="M7.388,7.386l-6.7,6.7a.4.4,0,0,1-.569-.569L6.534,7.1.118.688a.4.4,0,0,1,0-.569A.4.4,0,0,1,.4,0,.392.392,0,0,1,.684.119l6.7,6.7A.4.4,0,0,1,7.388,7.386Z"
                            transform="translate(0.25 0.25)"
                            fill="#6d7682"
                            stroke="#6d7682"
                            stroke-width="0.5"
                          />
                        </svg>
                      </button>
                      <button class="visited-to-end">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8.004"
                          height="14.705"
                          viewBox="0 0 8.004 14.705"
                        >
                          <path
                            data-name="Path 88161"
                            d="M7.388,7.386l-6.7,6.7a.4.4,0,0,1-.569-.569L6.534,7.1.118.688a.4.4,0,0,1,0-.569A.4.4,0,0,1,.4,0,.392.392,0,0,1,.684.119l6.7,6.7A.4.4,0,0,1,7.388,7.386Z"
                            transform="translate(0.25 0.25)"
                            fill="#6d7682"
                            stroke="#6d7682"
                            stroke-width="0.5"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="swiper-container most-visited"
                  v-swiper:mySwipper4="visitedOption"
                >
                  <article class="items-container swiper-wrapper">
                    <section
                      class="course swiper-slide"
                      v-for="course in mostVisitCourses"
                      :key="course.courseId"
                    >
                      <nuxt-link
                        :to="'/course/' + course.courseId"
                        class="image-container"
                      >
                        <img
                          :src="
                            'https://api.daneshkadeonline.ir/Images/Public/Course/' +
                            course.courseImageName
                          "
                          alt="عکس دوره"
                        />
                        <span class="course-duration">
                          <span class="persian-number">{{ course.courseTime }}</span>
                          <img
                            src="@/static/images/main-page-images/wall-clock.svg"
                            alt="زمان"
                          />
                        </span>
                        <span
                          class="on-performing-sign"
                          v-if="course.courseStatus == 'InProgress'"
                          >در حال برگزاری</span
                        >
                        <span
                          class="on-performing-sign"
                          v-else-if="course.courseStatus == 'Completed'"
                          >تمام شده</span
                        >
                        <span class="on-performing-sign" v-else>نامعلوم(موقتی)</span>
                      </nuxt-link>
                      <h4 class="course-name">
                        <nuxt-link :to="'/course/' + course.courseId">{{
                          course.courseName
                        }}</nuxt-link>
                      </h4>
                      <p class="course-detail">
                        {{ course.courseShortDescription.substr(0, 50) + "..." }}
                      </p>
                      <span class="course-teacher">
                        مدرس:
                        <span class="teacher-name"> {{ course.teacherName }} </span>
                      </span>
                      <span class="course-viewers">
                        بیننده
                        <span class="count persian-number">{{
                          course.courseVisitCount
                        }}</span>
                        نفر
                      </span>
                    </section>
                  </article>
                </div>
              </div>
            </div>
          </div>
          <div class="row my-5">
            <div class="col-12">
              <a href="#" class="linked-banner" title="دروس پربازدید">
                <img
                  :src="
                    'https://api.daneshkadeonline.ir/Images/Public/Ads/' +
                    mostVisitAd.imageName
                  "
                  alt="دروس پربازدید"
                />
              </a>
            </div>
          </div>
        </template>
        <template v-if="packageAd.isActive">
          <div class="row" v-if="packages.length > 0" id="packages-part">
            <div class="col-12">
              <div class="school-slider">
                <div class="header">
                  <h4 class="title">پکیج ها</h4>
                  <div class="options">
                    <nuxt-link to="/courses-list?isPackage=true">مشاهده همه</nuxt-link>
                    <div class="controls">
                      <button class="visited-to-first">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8.004"
                          height="14.705"
                          viewBox="0 0 8.004 14.705"
                        >
                          <path
                            data-name="Path 88161"
                            d="M7.388,7.386l-6.7,6.7a.4.4,0,0,1-.569-.569L6.534,7.1.118.688a.4.4,0,0,1,0-.569A.4.4,0,0,1,.4,0,.392.392,0,0,1,.684.119l6.7,6.7A.4.4,0,0,1,7.388,7.386Z"
                            transform="translate(0.25 0.25)"
                            fill="#6d7682"
                            stroke="#6d7682"
                            stroke-width="0.5"
                          />
                        </svg>
                      </button>
                      <button class="visited-to-end">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8.004"
                          height="14.705"
                          viewBox="0 0 8.004 14.705"
                        >
                          <path
                            data-name="Path 88161"
                            d="M7.388,7.386l-6.7,6.7a.4.4,0,0,1-.569-.569L6.534,7.1.118.688a.4.4,0,0,1,0-.569A.4.4,0,0,1,.4,0,.392.392,0,0,1,.684.119l6.7,6.7A.4.4,0,0,1,7.388,7.386Z"
                            transform="translate(0.25 0.25)"
                            fill="#6d7682"
                            stroke="#6d7682"
                            stroke-width="0.5"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="swiper-container most-visited"
                  v-swiper:mySwipper5="packageOption"
                >
                  <article class="items-container swiper-wrapper">
                    <section
                      class="course swiper-slide"
                      v-for="course in packages"
                      :key="course.courseId"
                    >
                      <nuxt-link
                        :to="'/course/' + course.courseId"
                        class="image-container"
                      >
                        <img
                          :src="
                            'https://api.daneshkadeonline.ir/Images/Public/Course/' +
                            course.courseImageName
                          "
                          alt="عکس دوره"
                        />
                        <span class="course-duration">
                          <span class="persian-number">{{ course.courseTime }}</span>
                          <img
                            src="@/static/images/main-page-images/wall-clock.svg"
                            alt="زمان"
                          />
                        </span>
                        <span
                          class="on-performing-sign"
                          v-if="course.courseStatus == 'InProgress'"
                          >در حال برگزاری</span
                        >
                        <span
                          class="on-performing-sign"
                          v-else-if="course.courseStatus == 'Completed'"
                          >تمام شده</span
                        >
                        <span class="on-performing-sign" v-else>نامعلوم(موقتی)</span>
                      </nuxt-link>
                      <h4 class="course-name">
                        <nuxt-link :to="'/course/' + course.courseId">{{
                          course.courseName
                        }}</nuxt-link>
                      </h4>
                      <p class="course-detail">
                        {{ course.courseShortDescription.substr(0, 50) + "..." }}
                      </p>
                      <span class="course-teacher">
                        مدرس:
                        <span class="teacher-name"> {{ course.teacherName }} </span>
                      </span>
                      <span class="course-viewers">
                        بیننده
                        <span class="count persian-number">{{
                          course.courseVisitCount
                        }}</span>
                        نفر
                      </span>
                    </section>
                  </article>
                </div>
              </div>
            </div>
          </div>
          <div class="row my-5">
            <div class="col-12">
              <a href="#" class="linked-banner" title="پکیج">
                <img
                  :src="
                    'https://api.daneshkadeonline.ir/Images/Public/Ads/' +
                    packageAd.imageName
                  "
                  alt="پکیج"
                />
              </a>
            </div>
          </div>
        </template>
      </template>
    </main>
    <template v-if="!loading">
      <div class="container-fluid px-4 px-md-5 latest-news" id="latest-news">
        <div class="row">
          <div class="school-slider">
            <div class="header">
              <h4 class="title">آخرین اخبار</h4>
              <div class="options">
                <nuxt-link to="/articles-list">مشاهده همه</nuxt-link>
                <div class="controls">
                  <button class="news-to-first">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8.004"
                      height="14.705"
                      viewBox="0 0 8.004 14.705"
                    >
                      <path
                        data-name="Path 88161"
                        d="M7.388,7.386l-6.7,6.7a.4.4,0,0,1-.569-.569L6.534,7.1.118.688a.4.4,0,0,1,0-.569A.4.4,0,0,1,.4,0,.392.392,0,0,1,.684.119l6.7,6.7A.4.4,0,0,1,7.388,7.386Z"
                        transform="translate(0.25 0.25)"
                        fill="#6d7682"
                        stroke="#6d7682"
                        stroke-width="0.5"
                      />
                    </svg>
                  </button>
                  <button class="news-to-end">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8.004"
                      height="14.705"
                      viewBox="0 0 8.004 14.705"
                    >
                      <path
                        data-name="Path 88161"
                        d="M7.388,7.386l-6.7,6.7a.4.4,0,0,1-.569-.569L6.534,7.1.118.688a.4.4,0,0,1,0-.569A.4.4,0,0,1,.4,0,.392.392,0,0,1,.684.119l6.7,6.7A.4.4,0,0,1,7.388,7.386Z"
                        transform="translate(0.25 0.25)"
                        fill="#6d7682"
                        stroke="#6d7682"
                        stroke-width="0.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="swiper-container news" v-swiper:mySwipper6="newsOption">
              <article class="items-container swiper-wrapper">
                <nuxt-link
                  :to="'news/' + anyNews.newsId"
                  class="news swiper-slide"
                  v-for="anyNews in news"
                  :key="anyNews.newsId"
                >
                  <a href="" class="image-container">
                    <img
                      :src="
                        'https://api.daneshkadeonline.ir/Images/Public/News/' +
                        anyNews.newsImageName
                      "
                      alt="خبر"
                    />
                  </a>
                  <div class="title">{{ anyNews.newsTitle }}</div>
                </nuxt-link>
              </article>
            </div>
          </div>
        </div>
      </div>
      <div class="row landing center d-flex justify-content-between">
        <div class="col-md-8 col-12 center landing-content">
          <h1 class="landing-content-title">
            {{ footerContent.title }}
          </h1>
          <p class="landing-content-detail">
            {{ footerContent.description }}
          </p>
          <a :href="footerContent.buttonLink" class="get-signup">{{
            footerContent.buttonName
          }}</a>
        </div>
        <div class="col-md-4 d-none d-md-flex landing-image">
          <img
            :src="
              'https://api.daneshkadeonline.ir/Images/Public/LandingContent/' +
              footerContent.vectorName
            "
            alt="بنر صفحه فرود"
          />
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import skeleton from "@/components/skeleto-creator";
export default {
  head() {
    return {
      title: "دانشکده آنلاین",
    };
  },
  components: { skeleton },
  layout: "mainPages",
  data() {
    return {
      amazingAd: "",
      favoritesAd: "",
      newestAd: "",
      mostVisitAd: "",
      packageAd: "",
      headContent: "",
      footerContent: "",
      newestCourses: "",
      mostVisitCourses: "",
      favoriteCourses: "",
      amazingCourses: "",
      packages: "",
      loading: true,
      news: "",
      test: {
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          570: {
            slidesPerView: 2,
          },
          900: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 3,
          },
          1150: {
            slidesPerView: 4,
          },
          1800: {
            slidesPerView: 5,
          },
          2000: {
            slidesPerView: 6,
          },
          2500: {
            slidesPerView: 7,
          },
        },
        direction: "horizontal",
        slidesPerView: "auto",
      },
    };
  },
  mounted() {},
  async beforeMount() {
    const indexDetails = await this.$axios.get("/api/Home/Index");
    // console.log(indexDetails);
    if (indexDetails.data.statusCode == 200 && indexDetails.data.message == "Success") {
      this.newestCourses = indexDetails.data.data.newestCourses;
      this.mostVisitCourses = indexDetails.data.data.mostVisitCourses;
      this.favoriteCourses = indexDetails.data.data.favoriteCourses;
      this.amazingCourses = indexDetails.data.data.amazingCourses;
      this.packages = indexDetails.data.data.packages;
      this.news = indexDetails.data.data.news;
      for (const content1 of indexDetails.data.data.landingContents) {
        if (content1.location == "Header") {
          this.headContent = content1;
        } else {
          this.footerContent = content1;
        }
      }
      const ads = indexDetails.data.data.ads;
      for (const ad in ads) {
        if (ads[ad].section == "Amazing") {
          this.amazingAd = ads[ad];
        } else if (ads[ad].section == "Favorites") {
          this.favoritesAd = ads[ad];
        } else if (ads[ad].section == "Newest") {
          this.newestAd = ads[ad];
        } else if (ads[ad].section == "MostVisit") {
          this.mostVisitAd = ads[ad];
        } else if (ads[ad].section == "Package") {
          this.packageAd = ads[ad];
        }
      }
    }
    this.loading = false;
  },
  computed: {
    amazingOption() {
      return {
        ...this.test,
        spaceBetween: 5,
        navigation: {
          nextEl: ".amazing-to-end",
          prevEl: ".amazing-to-first",
        },
        autoplay: {
          delay: 4000,
        },
      };
    },
    newestOption() {
      return {
        ...this.test,
        spaceBetween: 5,
        navigation: {
          nextEl: ".newest-to-end",
          prevEl: ".newest-to-first",
        },
        autoplay: {
          delay: 4000,
        },
      };
    },
    popularOption() {
      return {
        ...this.test,
        spaceBetween: 5,
        navigation: {
          nextEl: ".popular-to-end",
          prevEl: ".popular-to-first",
        },
        autoplay: {
          delay: 4000,
        },
      };
    },
    visitedOption() {
      return {
        ...this.test,
        spaceBetween: 5,
        navigation: {
          nextEl: ".visited-to-end",
          prevEl: ".visited-to-first",
        },
        autoplay: {
          delay: 4000,
        },
      };
    },
    packageOption() {
      return {
        ...this.test,
        spaceBetween: 5,
        navigation: {
          nextEl: ".news-to-end",
          prevEl: ".news-to-first",
        },
        autoplay: {
          delay: 4000,
        },
      };
    },
    newsOption() {
      return {
        ...this.test,
        spaceBetween: 15,
        navigation: {
          nextEl: ".news-to-end",
          prevEl: ".news-to-first",
        },
        autoplay: {
          delay: 4000,
        },
      };
    },
  },
  methods: {
    swiperImages(courseImageName) {
      if (courseImageName != undefined) return;
      "https://api.daneshkadeonline.ir/Images/Public/Course/" + courseImageName;
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/pages/index.scss";
@import "@/assets/swal-style.scss";
html {
  scroll-behavior: smooth;
}
</style>
