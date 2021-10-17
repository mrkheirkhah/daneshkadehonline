<template>
  <div></div>
</template>
<script>
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
  mounted() {
    this.$router.push("/coming-soon");
  },
};
</script>
<style lang="scss">
@import "@/assets/styles/swal-style.scss";
</style>
