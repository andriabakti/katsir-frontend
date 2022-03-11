<template>
  <nav class="side">
    <div class="up">
      <button class="btn" id="product" @click="toHome"></button>
      <button class="btn" id="history" @click="toHistory"></button>
      <button class="btn" id="addition" @click="$emit('toggle-active')"></button>
    </div>
    <div class="down">
      <button class="btn" id="exit" @click="showModal"></button>
    </div>
    <ModalConfirm
      :text="'logout'"
      :show.sync="exitActive"
      :event-close="showModal"
      :event-confirm="toLogout"
    />
  </nav>
</template>

<script>
// module: vuex
import { mapMutations } from "vuex";
// component:
import ModalConfirm from "@/components/ModalConfirm";

export default {
  name: "BaseNavbar",
  components: {
    ModalConfirm,
  },
  data: () => ({
    exitActive: false,
  }),
  methods: {
    ...mapMutations(["setToken"]),
    toHome() {
      this.$router.push("/home");
    },
    toHistory() {
      alert("Halaman history belum tersedia");
    },
    showModal() {
      this.exitActive = !this.exitActive;
    },
    toLogout: () => {
      localStorage.removeItem("token");
      this.$store.commit("setToken", null);
      this.$router.push("/login");
      alert("Logout berhasil");
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
  background-image: url("@/assets/icons/IconFood.svg");
}
#history {
  background-image: url("@/assets/icons/IconReport.svg");
}
#addition {
  background-image: url("@/assets/icons/IconAdd.svg");
}
#exit {
  background-image: url("@/assets/icons/IconExit.png");
}
</style>
