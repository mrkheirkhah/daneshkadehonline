<template>
  <div>
    <div class="news">
      <div class="panel-table">
        <div class="box-header">
          <h3>نظرات دوره ها</h3>
          <form action="">
            <div class="filter floated-list-container" @click="toggleDropdown">
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
                <div>پاسخ به :</div>
                <input
                  type="text"
                  readonly
                  :value="replayTo"
                  placeholder="نام و نام خانوادگی"
                />
                <textarea
                  class="message"
                  v-model="replayCommentText"
                  placeholder="نظر شما"
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
    <div class="question-answer-list">
      <div class="panel-table">
        <div class="box-header">
          <h3>پرسش و پاسخ</h3>
          <form action="">
            <div class="filter floated-list-container" @click.prevent="toggleDropdown">
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
            <label for="question-answer-search-btn" class="search-box" tabindex="0">
              <input
                type="search"
                placeholder="جستجو کنید"
                class="search-btn"
                id="question-answer-search-btn"
              />
              <img src="@/static/icons/search-icon-orange.png" alt="آیکون سرچ" />
            </label>
          </form>
        </div>
      </div>
      <div class="panel-admin-content-item question-answer">
        <section class="course-content question-answer">
          <div class="messages-box">
            <div class="messages custom-scrollbar">
              <div
                class="person-message-box"
                v-for="messageBox in messageGroups"
                :key="messageBox.index"
              >
                <template v-for="message in messageBox">
                  <div
                    class="person-message"
                    :class="{
                      'replied-message':
                        message.sendBy == 'Teacher' || message.sendBy == 'Admin',
                    }"
                    :key="message.questionId"
                  >
                    <img
                      v-if="message.sendBy == 'Student'"
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
                        <span v-if="message.sendBy == 'Admin'">ادمین:</span>
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
                        <input type="file" id="upload-file-to-user-21" />
                        <button
                          type="button"
                          class="confirm"
                          v-if="message.parentId == null"
                          @click.prevent="seeResponses(message.questionId)"
                        >
                          مشاهده پاسخ ها
                        </button>
                        <button
                          type="button"
                          class="reject"
                          @click.prevent="deleteQuestion(message.questionId)"
                        >
                          حذف
                        </button>

                        <button
                          type="button"
                          class="confirm"
                          @click.prevent="changeStatus(message.questionId, 'true')"
                        >
                          تائید
                        </button>
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
                            message.parentId == null && messageBox[0].status != 'Closed'
                          "
                          type="button"
                          class="reply-btn"
                          @click="replayToQuestion(message.questionId, message.name)"
                        >
                          پاسخ
                        </button>
                      </form>
                    </div>
                  </div>
                </template>
                <footer>
                  <!-- <button
                    v-if="messageBox[0].status != 'Closed'"
                    type="button"
                    class="end-conversation-btn"
                    @click="endChat(messageBox[0].questionId)"
                  >
                    پایان دادن به این گفتگو
                  </button> -->
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
          <footer
            class="indicators mt-4"
            v-if="questionsFilter != '' && questionsFilter.endPage != 0"
          >
            <a
              href=""
              type="button"
              class="prev"
              @click.prevent="Number(goTo) > 1 ? (goTo = Number(goTo) - 1) : {}"
              ><img src="@/static/icons/chevron-bottom.svg" title="قبلی" alt="قبلی"
            /></a>
            <a
              href=""
              type="button"
              class="persian-number"
              v-if="questionsFilter.activePage > 1"
              @click.prevent="goToPage"
              >{{ Number(questionsFilter.activePage) - 1 }}</a
            >
            <a href="" type="button" class="persian-number active">{{
              questionsFilter.activePage
            }}</a>
            <a
              href=""
              type="button"
              @click.prevent="goToPage"
              class="persian-number"
              v-if="Number(questionsFilter.activePage) + 1 < questionsFilter.endPage"
              >{{ Number(questionsFilter.activePage) + 1 }}</a
            >
            <span
              v-if="
                questionsFilter.endPage > 4 &&
                Number(questionsFilter.activePage) + 1 < questionsFilter.endPage
              "
              >...</span
            >
            <a
              href=""
              type="button"
              class="persian-number"
              @click.prevent="goToPage"
              v-if="questionsFilter.activePage != questionsFilter.endPage"
              >{{ questionsFilter.endPage }}</a
            >
            <a
              href=""
              type="button"
              class="next"
              @click.prevent="
                Number(goTo) < questionsFilter.endPage ? (goTo = Number(goTo) + 1) : {}
              "
              ><img src="@/static/icons/chevron-bottom.svg" title="بعدی" alt="بعدی"
            /></a>
          </footer>
        </section>
        <section class="course-content answer-form-box">
          <div class="aside">پرسش خود را اینجا مطرح کنید</div>
          <form action="">
            <div>پاسخ به :</div>
            <input
              type="text"
              readonly
              :value="replayQuestionName"
              placeholder="نام و نام خانوادگی"
            />
            <div class="form-row">
              <div for="" class="form-row-col darken-color">
                <div class="separator pseudo-form-input">
                  <input
                    type="file"
                    id="upload-file-for-question"
                    @change="uploadAttchedImage"
                  />
                  <span v-if="attachedImgName == ''">بارگذاری عکس ضمیمه</span>
                  <span v-else>{{ attachedImgName }}</span>
                  <span>
                    <label for="upload-file-for-question" class="cover-btn">انتخاب</label>
                  </span>
                </div>
              </div>
              <label for="" class="form-row-col record-voice-box">
                <button
                  type="button"
                  class="record-btn endR"
                  v-if="recordedVoice == ''"
                  @mousedown="startRecord"
                  @touchstart="startRecord"
                >
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
                  <audio :src="recordedVoice" id="voicePlayer" controls></audio>
                  <span class="voice-timer persian-number"
                    >{{ mins < 10 ? "0" + mins : mins }}:{{
                      secs < 10 ? "0" + secs : secs
                    }}</span
                  >
                  <div class="btn-container">
                    <button type="button" class="play-btn" @click="playAudio">
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
                    <button
                      type="button"
                      class="delete-btn"
                      @click="
                        recordedVoice = '';
                        mins = 0;
                        secs = 0;
                        timerInterval = null;
                      "
                      v-if="recordedVoice != ''"
                    >
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
            <textarea
              class="message"
              placeholder="نظر شما"
              v-model="replayQuestionText"
            ></textarea>
            <button class="submit-comment" @click.prevent="sendQuestionAnswer">
              ثبت پاسخ
            </button>
          </form>
        </section>
        <!-- </div>
        </div> -->
      </div>
    </div>
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
import skeleton from "@/components/skeleton-creator";
export default {
  components: { skeleton },
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  data() {
    return {
      filter: "",
      coursesComments: "",
      messageGroups: [],
      commentGroups: [],
      audioBase64Data: "",
      questionsFilter: "",
      goTo: "",

      // replay comment
      replayToId: "",
      replayTo: "",
      replayCommentText: "",

      // voice recorder
      recordedVoice: "",
      selectedAttachImage: "",
      attachedImgName: "",
      replayQuestionName: "",
      replayQuestionId: "",
      replayQuestionText: "",
      secs: 0,
      mins: 0,
      timerInterval: null,
    };
  },
  async mounted() {
    if (this.$route.params.id != undefined && !isNaN(this.$route.params.id)) {
      await Promise.all([
        this.getCoursesQuestionsById(this.$route.params.id),
        this.getCoursesCommentsById(this.$route.params.id),
      ]);
    } else {
      await Promise.all([this.getCoursesQuestions(), this.getCoursesComments()]);
    }
  },
  methods: {
    goToPage(event) {
      this.goTo = event.target.innerHTML;
    },
    async getCoursesQuestions() {
      this.messageGroups = [];
      const questions = await this.$axios.get(`/api/Admin/AdminQuestion/GetQuestions`, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("key")}`,
        },
      });
      // console.log(questions);
      this.questionsFilter = questions.data.data.filter;
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
    async getCoursesQuestionsById(id) {
      this.messageGroups = [];
      const questions = await this.$axios.get(
        `/api/Admin/AdminQuestion/GetQuestions?courseId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      // console.log(questions);
      this.questionsFilter = questions.data.data.filter;
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
    async getCoursesCommentsById(id) {
      this.commentGroups = [];
      const coursesComments = await this.$axios.get(
        `/api/Admin/AdminComment/GetCourseComments?findId=${this.$route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      // console.log(coursesComments);
      if (
        coursesComments.data.statusCode == 200 &&
        coursesComments.data.message == "Success"
      ) {
        for (const comment of coursesComments.data.data) {
          if (comment.parentId == null) {
            let group = [];
            group.push(comment);
            this.commentGroups.push(group);
          }
        }
        for (const comment of coursesComments.data.data) {
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
      // console.log(this.commentGroups);
    },
    async seeResponses(id) {
      const msgResp = await this.$axios.get(
        `/api/Admin/AdminQuestion/GetQuestionResponses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      // console.log(msgResp);
      for (let i of this.messageGroups) {
        if (i[0].questionId == Number(id)) {
          i.splice(1);
          for (const j of msgResp.data.data) {
            i.push(j);
          }
        }
      }
    },
    async downloadAttachAudio(id) {
      const audioresp = await this.$axios.get(
        "/api/Admin/AdminQuestion/GetQuestionAudioBase64/" + id,
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
    async downloadAttachFile(id) {
      const download = await this.$axios.get(
        "/api/Admin/AdminQuestion/GetQuestionAttachImageBase64/" + id,
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
    closePlayer() {
      const audioPlayerModal = document.querySelector(".audioPlayerModal");
      this.audioBase64Data = "";
      audioPlayerModal.style.display = "none";
    },
    async getCoursesComments() {
      this.commentGroups = [];
      const coursesComments = await this.$axios.get(
        "/api/Admin/AdminComment/GetCourseComments",
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("key")}`,
          },
        }
      );
      // console.log(coursesComments);
      if (
        coursesComments.data.statusCode == 200 &&
        coursesComments.data.message == "Success"
      ) {
        for (const comment of coursesComments.data.data) {
          if (comment.parentId == null) {
            let group = [];
            group.push(comment);
            this.commentGroups.push(group);
          }
        }
        for (const comment of coursesComments.data.data) {
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
    seeAll() {
      const table = document.getElementById("courses-table");
      table.style.overflowY = "scroll";
      const footer = (document.querySelector(".table-footer").style.display = "none");
    },
    toggleDropdown() {
      event.stopPropagation();
      event.target.closest(".floated-list-container").classList.toggle("show");
    },
    async deleteQuestion(id) {
      const deleteResp = await this.$axios.delete(
        `/api/Admin/AdminQuestion/RemoveQuestion/${id}`,
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
        if (this.$route.params.id != undefined && !isNaN(this.$route.params.id)) {
          this.getCoursesQuestionsById(this.$route.params.id);
        } else {
          this.getCoursesQuestions();
        }
      }
    },
    async changeStatus(id, type) {
      // const changeStatusResp = await this.$axios.get(
      //   `/api/Admin/AdminComment/UpdateCourseCommentStatus/${id}/${type}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${this.$cookies.get("key")}`,
      //     },
      //   }
      // );
      // console.log(changeStatusResp);
    },
    async confirmComment(id) {
      const changeStatusResp = await this.$axios.get(
        `/api/Admin/AdminComment/UpdateCourseCommentStatus/${id}/true`,
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
        if (this.$route.params.id != undefined && !isNaN(this.$route.params.id)) {
          this.getCoursesCommentsById(this.$route.params.id);
        } else {
          this.getCoursesComments();
        }
      }
    },
    async deleteComment(id) {
      const deleteResp = await this.$axios.delete(
        `/api/Admin/AdminComment/DeleteCourseCommentStatus/${id}`,
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
        if (this.$route.params.id != undefined && !isNaN(this.$route.params.id)) {
          this.getCoursesCommentsById(this.$route.params.id);
        } else {
          this.getCoursesComments();
        }
      }
    },
    replayComment(id, name) {
      this.replayTo = name;
      this.replayToId = id;
    },
    async sendReplay() {
      const replayResp = await this.$axios.post(
        "/api/Admin/AdminComment/AddCourseComment",
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
        if (this.$route.params.id != undefined && !isNaN(this.$route.params.id)) {
          this.getCoursesCommentsById(this.$route.params.id);
        } else {
          this.getCoursesComments();
        }
      }
    },

    // record and voice player
    startRecord() {
      this.timerInterval = setInterval(() => {
        this.secs = this.secs + 1;
        if (this.secs == 60) {
          this.mins = this.mins + 1;
        }
      }, 1000);
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        const audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", (event) => {
          audioChunks.push(event.data);
        });
        const endBut = document.querySelector(".endR");
        endBut.addEventListener("mouseup", () => {
          clearInterval(this.timerInterval);
          mediaRecorder.stop();
          stream
            .getTracks() // get all tracks from the MediaStream
            .forEach((track) => track.stop());
        });
        document.addEventListener("touchend", () => {
          clearInterval(this.timerInterval);
          mediaRecorder.stop();
          stream
            .getTracks() // get all tracks from the MediaStream
            .forEach((track) => track.stop());
        });
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          this.createDownloadLink(audioBlob);
        });
      });
    },
    createDownloadLink(blob) {
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        let base64 = reader.result;
        base64 = base64.replace("application/octet-stream;", "audio/mp3;");
        this.recordedVoice = base64;
      };
    },
    async playAudio() {
      const player = document.getElementById("voicePlayer");
      // while (player.duration === Infinity) {
      //   await new Promise((r) => setTimeout(r, 1000));
      //   player.currentTime = 10000000 * Math.random();
      // }
      // let duration = player.duration;
      // console.log(duration);
      player.play();
    },
    uploadAttchedImage(event) {
      const attachedImg = event.target.files[0];
      this.attachedImgName = event.target.files[0].name;
      this.createBase64Image(attachedImg);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedAttachImage = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },
    replayToQuestion(id, name) {
      this.replayQuestionId = id;
      this.replayQuestionName = name;
    },
    async sendQuestionAnswer() {
      if (this.replayQuestionId != "") {
        const sendAnswerResp = await this.$axios.post(
          "/api/Admin/AdminQuestion/SendQuestionResponse",
          {
            parentId: Number(this.replayQuestionId),
            text: this.replayQuestionText,
            attachImageBase64: this.selectedAttachImage,
            audioFileBase64: this.recordedVoice,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("key")}`,
            },
          }
        );
        console.log(sendAnswerResp);
      }
    },
  },

  watch: {
    goTo: {
      async handler() {
        const questions = await this.$axios.get(
          this.$route.params.id != undefined
            ? `/api/Admin/AdminComment/GetCourseComments?pageId=${this.goTo}`
            : `/api/Admin/AdminComment/GetCourseComments?pageId=${this.goTo}&courseId=${this.$route.params.id}`
        );
        if (questions.data.statusCode == 200 && questions.data.message == "Success") {
          this.questionsFilter = questions.data.data.filter;
          this.messageGroups = [];
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
