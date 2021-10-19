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
<style lang="scss">

::-webkit-scrollbar {
  width: 10px;
  height: 5px;
  border-radius: 20px;
  background-color: #70707030;
  padding: 0 10px;
}

::-webkit-scrollbar-thumb {
  background-color: #e13535;
  border-radius: 20px;
}
</style>