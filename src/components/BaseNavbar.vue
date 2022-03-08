<template>
  <nav class="side">
    <div class="up">
      <button class="btn" id="product" @click="toHome"></button>
      <button class="btn" id="history" @click="toHistory"></button>
      <button class="btn" id="addition" @click="$emit('toggle-active')"></button>
    </div>
    <div class="down">
      <button class="btn" id="exit" @click="$emit('toggle-exit')"></button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "BaseNavbar",
  methods: {
    toHome() {
      this.$router.push("/home");
    },
    toHistory() {
      alert("Halaman history belum tersedia");
    },
  },
};
</script>

<style scoped>
.side {
  width: 80px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}
.up {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.down {
  margin-bottom: 20px;
  position: sticky;
  bottom: 20px;
}
button {
  height: 60px;
  width: 60px;
  margin: 20px 0 0;
  background-size: 40px 40px;
  background-color: #ffffff;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
}
#product {
  background-image: url("../assets/icons/IconFood.svg");
}
#history {
  background-image: url("../assets/icons/IconReport.svg");
}
#addition {
  background-image: url("../assets/icons/IconAdd.svg");
}
#exit {
  background-image: url("../assets/icons/IconExit.png");
}
</style>
