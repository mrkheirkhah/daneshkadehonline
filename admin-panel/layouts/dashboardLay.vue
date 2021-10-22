<template>
  <div class="panel-admin">
    <sidebar />
    <div class="panel-admin-content">
      <pagesHeader />
      <Nuxt />
    </div>
  </div>
</template>

<style lang="scss">
.panel-admin {
  padding: 12px;
  background-color: #f3f3f3;
}

::-webkit-scrollbar {
  width: 7px;
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
