<template>
  <div class="panel-teacher">
    <div class="panel-teacher-content">
      <div class="coming-soon-box">
        <h1>به زودی ...</h1>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "dashboardLay",
  middleware: "userIsNotLog",
};
</script>
