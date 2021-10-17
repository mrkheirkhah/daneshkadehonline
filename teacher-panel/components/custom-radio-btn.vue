<template>
  <div class="form-row radios-container">
    <div v-for="item in radioBtns" :key="item.index">
      <template>
        <input
          type="radio"
          class="form-radio"
          :name="name"
          :id="item.forId"
          :value="item.val"
          @input="$emit('input', $event.target.value)"
          :checked="item.checked == true"
          :disabled="disable == true"
        />
        <label :for="item.forId">{{ item.text }}</label>
        <label :for="item.forId" class="radio-overlay"></label>
      </template>
    </div>
  </div>
</template>

<script>
import skeleton from "@/components/skeleton-components/skeletonCreator";
export default {
  components: { skeleton },
  name: "radio-btn",
  props: {
    name: {
      type: String,
      required: true,
    },
    radioBtns: {
      type: Array,
      required: true,
    },
    disable: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {};
  },
};
</script>
