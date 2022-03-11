<template>
  <div class="container-fluid">
    <div class="row">
      <TitleBar />
    </div>
    <div class="body row">
      <BaseMenu />
      <div class="content col-md-11">
        <CardHistory />
        <CardHistory />
        <CardHistory />
      </div>
    </div>
  </div>
</template>

<script>
import BaseMenu from "@/components/BaseMenu";
import TitleBar from "@/components/History/TitleBar";
import CardHistory from "@/components/History/CardHistory";

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
    BaseMenu,
    TitleBar,
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
