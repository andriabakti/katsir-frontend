<template>
  <div class="container-fluid">
    <div class="row">
      <BaseHeader />
    </div>
    <div class="body row">
      <BaseSidebar />
      <div class="content col-md-11">
        <CardHistory />
        <CardHistory />
        <CardHistory />
      </div>
    </div>
  </div>
</template>

<script>
// component: base
import BaseHeader from "@/components/bases/BaseHeader";
import BaseSidebar from "@/components/bases/BaseSidebar";
// component: module
import CardHistory from "@/components/modules/CardHistory";

export default {
  metaInfo: {
    title: "History",
    titleTemplate: "%s - Katsir",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },
  name: "PageHistory",
  components: {
    BaseSidebar,
    BaseHeader,
    CardHistory,
  },
};
</script>

<style scoped>
.container-fluid {
  background-color: rgba(190, 195, 202, 0.3);
}
.content {
  height: 545px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px 0 15px 0;
  overflow: auto;
}
</style>
