<template>
  <div class="panel-teacher">
    <div class="panel-teacher-content">
      <div class="coming-soon-box ban">
        <h1>حساب شما مسدود میباشد</h1>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "dashboardLay",
  middleware: "ban",
};
</script>
