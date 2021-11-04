<template>
  <div class="item">
    <div class="image-container">
      <img
        :src="'https://api.daneshkadeonline.ir/Images/Public/Course/' + img"
        alt="عکس دوره"
      />
    </div>
    <h4 class="course-name">
      <nuxt-link to="/my-courses">
        {{ title }}
      </nuxt-link>
    </h4>
    <p class="course-detail" v-if="detail == null"></p>
    <p class="course-detail" v-else>
      {{ detail.length > 45 ? detail.substring(0, 45) + "..." : detail }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
    };
  },
  name: "aside-items",
  props: ["img", "title", "detail"],
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 4000);
  },
};
</script>
