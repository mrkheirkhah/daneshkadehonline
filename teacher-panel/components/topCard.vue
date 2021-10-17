<template>
  <button class="finanical-btn box-item">
    <div v-html="require(`@/static/panel-teacher-icons/${icon}.svg?raw`)" />
    <span class="finanical-btn_title">
      <template>
        {{ title }}
        <br />
        <small>{{ smallTitle }}</small>
      </template>
    </span>
    <p class="persian-number">
      <span>
        {{ Number(text).toLocaleString() }}
      </span>
    </p>
  </button>
</template>

<script>
import skeleton from "@/components/skeleton-components/skeletonCreator";
export default {
  components: { skeleton },
  name: "topCard",
  props: ["icon", "title", "smallTitle", "text"],
  data() {
    return {
      loading: true,
    };
  },
};
</script>
