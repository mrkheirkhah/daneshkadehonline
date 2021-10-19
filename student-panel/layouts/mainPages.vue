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
