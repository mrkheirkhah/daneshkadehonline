<template>
  <div class="panel-visitor">
    <div class="panel-visitor-content">
        <div class="coming-soon-box not-found">
          <h1>این صفحه پیدا نشد</h1>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
  //   layout: "default", // you can set a custom layout for the error page
};
</script>
