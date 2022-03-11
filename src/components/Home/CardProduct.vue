<template>
  <div class="btn card">
    <div class="img">
      <img
        :src="data.image"
        @click="$emit('toggle-event')"
        :class="active ? 'active' : ''"
      />
    </div>
    <div class="text">
      <h3>{{ data.name }}</h3>
      <p>Rp. {{ formatPrice(data.price) }}</p>
      <div v-if="user.role === 'admin'">
        <button class="btn btn-active" @click="$emit('event-update', data)">Edit</button>
        <button class="btn btn-warning" @click="$emit('toggle-delete', data.id)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// package: vuex
import { mapGetters } from "vuex";
// module: util-numeral
import { formatPrice } from "@/utils/numeral";

export default {
  name: "CardProduct",
  data: () => ({
    formatPrice: formatPrice,
  }),
  props: {
    data: {
      type: Object,
    },
    active: {
      type: Boolean,
    },
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
  height: 240px;
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
  min-height: 165px;
  cursor: pointer;
}
.img > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}
.text {
  width: 200px;
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

.active {
  filter: brightness(50%);
  /* filter: url('@/assets/icons/IconTick.png'); */
  /* background-origin: ; */
}
</style>
