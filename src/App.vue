<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { interceptorsRequest, interceptorsResponse } from "./utils/axios";

export default {
  name: "App",
  created() {
    interceptorsRequest();
    interceptorsResponse();
  },
};
</script>

<style>
#app {
  font-family: "Montserrat", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
