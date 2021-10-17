<template>
  <div class="panel-student">
    <sidebar />
    <div class="panel-student-content">
      <pagesHeader />
      <Nuxt />
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    document.body.style.backgroundColor="#f3f3f3"
  },
}
</script>