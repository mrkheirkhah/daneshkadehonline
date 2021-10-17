<template>
  <div class="panel-student">
    <div class="panel-student-content">
      <div class="coming-soon-box">
        <h1>به زودی ...</h1>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "dashboard",
  middleware: "userIsNotLog",
};
</script>
