<template>
  <div class="panel-visitor">
    <div class="panel-visitor-content">
      <div class="coming-soon-box ban">
        <h1>حساب شما مسدود میباشد</h1>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "default",
  middleware: "ban",
};
</script>
