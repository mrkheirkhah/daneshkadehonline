<template>
  <div>
    <input
      type="text"
      :list="listAndId"
      class="form-input"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :disabled="disable"
    />
    <datalist :id="listAndId">
      <template v-for="option in options">
        <option :value="option.title" :key="option.id" />
      </template>
    </datalist>
  </div>
</template>

<script>
export default {
  name: "dropdown-input",
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    listAndId: {
      type: String,
      required: true,
    },
    value: {
      required: false,
    },
    disable: {
      type: Boolean,
      required: false,
    },
  },
};
</script>
