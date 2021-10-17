<template>
  <div class="table-row">
    <span class="course-image">
      <img :src="getImage" alt="عکس دوره" />
    </span>
    <span class="course-name-content">
      <span class="course-name">
        {{ courseName }}
      </span>
      <br />
      <span class="course-detail">
        {{ coueseDetail }}
      </span>
    </span>
    <span class="persian-number">{{ date }}</span>
    <span class="persian-number">{{ courseCount }}</span>
    <span class="persian-number">{{ price }}</span>
    <span class="persian-number">{{ discount }}%</span>
    <span>
      <button class="delete btn" @click.prevent="$parent.deleteCourse(id)">حذف</button>
    </span>
    <span>
      <button class="edit btn" @click.prevent="$parent.getEditCourse(id)">ویرایش</button>
    </span>
    <span>
      <button class="edit btn" @click.prevent="$parent.addVideos(id)">افزودن</button>
    </span>
    <span class="green" v-if="isAccept == true"> تایید شده </span>
    <span class="red" v-else-if="isAccept == false"> رد شده </span>
    <span class="yellow" v-else-if="isAccept == null"> در انتظار تایید </span>
  </div>
</template>

<script>
export default {
  name: "courses-table",
  props: {
    courseName: {
      type: String,
      required: true,
    },
    coueseDetail: {
      type: String,
      required: true,
    },
    courseCount: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: false,
      default: "0",
    },
    id: {
      type: Number,
      required: false,
    },
    imageName: {
      type: String,
      required: false,
    },
    isAccept: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    getImage() {
      return "https://api.daneshkadeonline.ir/Images/Public/Course/" + this.imageName;
    },
  },
  methods: {},
};
</script>
