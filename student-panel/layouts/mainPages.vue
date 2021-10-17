<template>
  <div>
    <mainHeader />
    <Nuxt />
    <mainFooter />
  </div>
</template>
<script>
import mainHeader from "@/components/main-pages/header";
import mainFooter from "@/components/main-pages/footer";
export default {
  components: { mainHeader, mainFooter },
  mounted() {
    document.body.style.backgroundColor = "#fff";
  },
};
</script>
<style lang="scss">
// body {
//   overflow-x: hidden;
// }
// ::-webkit-scrollbar {
//   width: 15px;
//   // position: absolute;
// }

// ::-webkit-scrollbar-thumb {
//   background-clip: padding-box;
//   background-color: #d9d9d9;
// }
</style>
