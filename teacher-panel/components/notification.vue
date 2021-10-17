<template>
  <div class="notification-item">
    <p class="text">{{ notifText }}</p>

    <span class="time">{{ time }} ساعت قبل</span>
    <span class="close-icon" @click="$parent.deleteAlert(id)"> &times; </span>
  </div>
</template>

<script>
export default {
  name: "notification",
  props: {
    time: {
      type: Number,
      required: true,
    },
    notifText: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {},
};
</script>
