<template>
  <div class="btn card">
    <div class="img">
      <img :src="data.image" :class="{ active: active }" @click="$emit('event-select')" />
    </div>
    <div class="text">
      <h3>{{ data.name }}</h3>
      <p>Rp. {{ formatPrice(data.price) }}</p>
    </div>
    <div class="card_btn" v-if="user.role === 'admin'">
      <button class="btn btn-primary me-3" @click="$emit('event-update')">Update</button>
      <button class="btn btn-warning" @click="$emit('event-delete')">Delete</button>
    </div>
  </div>
</template>

<script>
// package: vuex
import { mapGetters } from "vuex";
// util: numeral
import { formatPrice } from "@/utils/numeral";

export default {
  name: "CardProduct",
  data: () => ({
    formatPrice: formatPrice,
  }),
  props: {
    data: Object,
    active: Object,
    eventDelete: Function,
  },
  computed: {
    ...mapGetters({
      user: "getterUser",
    }),
  },
};
</script>

<style scoped>
.card {
  min-height: 240px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-content: center;
  margin-bottom: 10px;
  margin-top: 25px;
  border-radius: 10px 10px 0 0;
  border: 0;
  background: none;
  /* font-family: "Montserrat", sans-serif !important; */
}
.img {
  width: 250px;
  height: 165px;
  cursor: pointer;
}
.img > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

.active {
  filter: brightness(50%);
  /* filter: url('@/assets/icons/IconTick.png'); */
  /* background-origin: ; */
}
.text {
  width: 80%;
}
.text h3 {
  font-size: 22px;
  font-weight: normal;
  margin: 5px 0 0 0;
}
.text p {
  font-size: 22px;
  font-weight: bold;
  margin: 0;
}

/* .card_btn {
  display: flex;
  justify-content: space-between;
} */
</style>
