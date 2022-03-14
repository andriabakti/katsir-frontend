<template>
  <vue-final-modal
    v-model="showModal"
    classes="modal-container"
    content-class="modal-content"
  >
    <h3>Checkout</h3>
    <h5>Cashier : {{ user.username }}</h5>
    <div v-for="item in cart" :key="item.id">
      <span>{{ item.name }}</span>
      <span>{{ item.quantity }}x</span>
      <span>Rp. {{ formatPrice(item.price * item.quantity) }}</span>
    </div>
    <div>
      <h5>Ppn 10% Rp. {{ formatPrice(tax) }}</h5>
      <h5>Total : Rp. {{ formatPrice(total) }}</h5>
      <h5>Payment: Cash</h5>
    </div>
    <button type="button" class="btn btn_purchase">Purchase</button>
  </vue-final-modal>
</template>

<script>
// package: vuex
import { mapGetters } from "vuex";
// util: numeral
import { formatPrice } from "@/utils/numeral";

export default {
  name: "ModalPurchase",
  props: {
    isShow: Boolean,
  },
  data: () => ({
    formatPrice,
  }),
  computed: {
    ...mapGetters({
      user: "getterUser",
      cart: "getterCart",
      total: "getterTotal",
      tax: "getterTax",
    }),
    showModal: {
      get() {
        return this.isShow;
      },
      set(value) {
        this.$emit("update:isShow", value);
      },
    },
  },
  methods: {},
};
</script>

<style scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  /* position: relative; */
  display: flex;
  flex-direction: column;
  width: 40%;
  max-height: 90%;
  /* margin: 0 30%; */
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}

.btn_purchase {
  background-color: #f24f8a;
  color: #ffffff;
}
</style>
