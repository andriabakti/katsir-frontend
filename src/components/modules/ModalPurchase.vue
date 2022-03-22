<template>
  <div>
    <vue-final-modal v-model="showModal" classes="modal-container" content-class="modal-content">
      <button class="btn modal_close" @click="eventClose">X</button>
      <div class="modal_header">
        <h5>Checkout</h5>
        <h6>Cashier : {{ user.username }}</h6>
      </div>
      <div class="modal_body">
        <div class="modal_list" v-for="item in cart" :key="item.id">
          <span>{{ item.name }} {{ item.quantity }}x</span>
          <span>Rp. {{ formatPrice(item.price * item.quantity) }}</span>
        </div>
        <div class="modal_tax">
          <span>Ppn 10%</span>
          <span>Rp. {{ formatPrice(tax) }}</span>
        </div>
        <div class="modal_detail">
          <h6>Total : Rp. {{ formatPrice(total + tax) }}</h6>
          <span>Payment: Cash</span>
        </div>
      </div>
      <div class="modal_action">
        <button type="button" class="btn btn_purchase" @click="toggleConfirm">Purchase</button>
      </div>
    </vue-final-modal>
    <ModalConfirm
      :text="cart > 0 ? 'purchase all these items' : 'purchase this item'"
      :text-btn="'Confirm'"
      :show.sync="confirmActive"
      :event-close="toggleConfirm"
      @event-confirm="handlePurchase({ id: user.id, total: total + tax, tax, items: cart })"
    />
  </div>
</template>

<script>
// package: vuex
import { mapGetters, mapActions } from "vuex";
// component: base
import ModalConfirm from "@/components/bases/ModalConfirm";
// util: numeral
import { formatPrice } from "@/utils/numeral";

export default {
  name: "ModalPurchase",
  components: {
    ModalConfirm,
  },
  props: {
    isShow: Boolean,
    eventClose: Function,
  },
  data: () => ({
    confirmActive: false,
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
  methods: {
    ...mapActions(["purchaseOrder"]),
    toggleConfirm() {
      this.confirmActive = !this.confirmActive;
    },
    handlePurchase(payload) {
      this.purchaseOrder(payload);
      this.eventClose();
    },
  },
};
</script>

<style scoped>
::v-deep .modal-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
::v-deep .modal-content {
  width: 50%;
  max-height: 80%;
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #fff;
  color: #000000;
  font-weight: bold;
  padding: 15px 30px;
  overflow-y: auto;
}

.modal_close {
  color: #ffffff;
  border-radius: 10px;
  background-color: crimson;
  position: absolute;
  top: 15px;
  right: 30px;
}
.modal_header {
  margin-bottom: 40px;
}
.modal_header > h5 {
  font-size: 25px;
  font-weight: bold;
}
.modal_header > h6 {
  font-size: 17px;
  font-weight: bold;
}

.modal_body {
  font-size: 20px;
  margin-bottom: 30px;
}

.modal_list {
  display: flex;
  justify-content: space-between;
}
.modal_list > span {
  margin-bottom: 10px;
}
.modal_tax {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.modal_detail > h6 {
  text-align: end;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.modal_action {
  display: flex;
  justify-content: center;
}
.btn_purchase {
  width: 400px;
  border-radius: 10px;
  background-color: #f24f8a;
  font-size: 25px;
  font-weight: 600;
  color: #ffffff;
}
.btn_purchase:hover {
  background-color: #ffc107;
}
</style>
