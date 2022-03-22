<template>
  <nav class="side">
    <div class="up">
      <button class="btn" id="product" @click="toHome"></button>
      <button class="btn" id="history" @click="openModal"></button>
      <button v-if="user.role === 'admin'" class="btn" id="addition" @click="$emit('toggle-active')"></button>
    </div>
    <div class="down">
      <button class="btn" id="exit" @click="showModal"></button>
    </div>
    <ModalInfo :is-show.sync="modalInfo" :event-close="openModal" />
    <ModalConfirm
      :text="'logout'"
      :text-btn="'Logout'"
      :show.sync="exitActive"
      :event-close="showModal"
      @event-confirm="toLogout"
    />
  </nav>
</template>

<script>
import Vue from "vue";
// package: vuex
import { mapGetters, mapMutations } from "vuex";
// router: base
import router from "@/routers";
// store: base
import store from "@/stores";
// component: base
import ModalInfo from "@/components/bases/ModalInfo";
import ModalConfirm from "@/components/bases/ModalConfirm";

export default {
  name: "BaseSidebar",
  components: {
    ModalInfo,
    ModalConfirm,
  },
  data: () => ({
    modalInfo: false,
    exitActive: false,
  }),
  computed: {
    ...mapGetters({
      user: "getterUser",
    }),
  },
  methods: {
    ...mapMutations(["setToken"]),
    toHome() {
      this.$router.push("/home");
    },
    toHistory() {
      this.$router.push("/history");
    },
    openModal() {
      this.modalInfo = !this.modalInfo;
    },
    showModal() {
      this.exitActive = !this.exitActive;
    },
    toLogout: () => {
      localStorage.removeItem("token");
      store.commit("setToken", null);
      router.push("/login");
      Vue.$toast.info("Logout success");
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
  background-image: url("@/assets/icons/IconExit.svg");
}
</style>
