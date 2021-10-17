<template>
  <div class="panel-student">
    <div class="panel-student-content">
      <div class="coming-soon-box not-found">
        <h1>این صفحه پیدا نشد</h1>
        <br />
        <h5 class="green">
          بازگشت به
          <nuxt-link to="/">صفحه اصلی</nuxt-link>
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "default", // you can set a custom layout for the error page
};
</script>
