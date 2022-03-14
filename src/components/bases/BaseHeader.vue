<template>
  <div class="row">
    <div class="title-bar">
      <button class="btn" id="menu" @click="toProduct"></button>
      <h3>Food Items</h3>
      <button class="btn" id="search"></button>
    </div>
  </div>
</template>

<script>
// package: vuex
import { mapActions } from "vuex";

export default {
  name: "BaseHeader",
  methods: {
    ...mapActions(["getProduct"]),
    toProduct() {
      this.$router.push("/home");
    },
    setSearch(e) {
      const url = `?search=${e.target.value}`;
      this.getProduct(url);
    },
  },
  // mounted() {
  //   this.getProduct();
  // },
};
</script>

<style scoped>
.row {
  height: 80px;
  position: sticky;
  top: 0;
  z-index: 3;
}
.title-bar {
  /* height: 90px; */
  width: 100%;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  background-color: #ffffff;
  border-bottom: 1px solid rgb(0, 0, 0, 0.25);
  box-shadow: 0 4px 3px rgb(0, 0, 0, 0.25);
}
button {
  background-size: 30px 30px;
  background-color: #ffffff;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
}
#menu {
  /* margin-left: 13px; */
  height: 60px;
  width: 60px;
  background-image: url("@/assets/icons/IconMenu.svg");
}
.title-bar h3 {
  font-size: 30px;
  font-weight: bold;
  margin-top: 5px;
  margin-left: auto;
}
#search {
  margin-left: auto;
  /* margin-right: auto; */
  height: 60px;
  width: 60px;
  background-image: url("@/assets/icons/IconSearch.svg");
}
</style>
