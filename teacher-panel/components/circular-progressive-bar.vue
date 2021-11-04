<template>
  <div class="chart" :class="color">
    <p class="chart-title">{{ title }}</p>
    <div class="pie-container">
      <svg>
        <circle cx="88" cy="88" class="shadow-bar" r="75"></circle>
        <circle
          cx="88"
          class="filled-bar"
          :style="{ strokeDashoffset: percent }"
          cy="88"
          r="75"
        ></circle>
      </svg>
      <p class="status">
        <span class="consumed persian-number">
          {{ remaining }}
        </span>
        {{type}}
        <br />
        باقی مانده از
        <br />
        <span class="remaining persian-number">
          {{ consumed }}
        </span>
        {{type}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "circular-progressive-bar",
  data() {
    return {
      percent: null,
    };
  },
  props: {
    consumed: {
      type: Number,
      required: true,
    },
    type:{
      type: String,
      required: true,
    },  
    remaining: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
  },
  mounted() {
    let percent = (this.remaining * 100) / this.consumed;
    this.percent = 464 - (464 * percent) / 100;
  },
};
</script>
