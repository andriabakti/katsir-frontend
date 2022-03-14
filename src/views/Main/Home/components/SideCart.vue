<template>
  <div class="wrapper">
    <div class="cart_bar">
      <h3>Cart</h3>
      <span class="cart_badge">{{ count }}</span>
    </div>
    <div class="cart_list">
      <div class="cart_empty" v-if="count === 0">
        <img src="@/assets/images/ImgEmpty.png" />
        <h3>Your cart is empty</h3>
        <p>Please add some items from the menu</p>
      </div>
      <div class="cart_item" v-if="count > 0">
        <div class="item_card" v-for="item in cart" :key="item.id">
          <div class="item_image">
            <img :src="item.image" class="mr-3" />
          </div>
          <div class="item_detail">
            <h6>{{ item.name }}</h6>
            <div class="item_count">
              <div class="count_box">
                <button class="btn" @click="decrementQty(item)">-</button>
                <div>{{ quantity(item.id) }}</div>
                <button class="btn" @click="incrementQty(item)">+</button>
              </div>
              <span>Rp. {{ formatPrice(item.price * item.quantity) }}</span>
            </div>
          </div>
          <button class="btn" @click="removeItem(item.id)">x</button>
        </div>
      </div>
      <div class="cart_detail" v-if="count > 0">
        <div class="detail_total">
          <h6>Total:</h6>
          <span>Rp. {{ formatPrice(total) }}*</span>
        </div>
        <span>*Belum termasuk ppn</span>
        <button class="btn btn_checkout" @click="showModal">Checkout</button>
        <button class="btn btn_cancel">Cancel</button>
      </div>
    </div>
    <ModalPurchase :is-show.sync="modalActive" />
  </div>
</template>

<script>
// package: vuex
import { mapGetters, mapMutations } from "vuex";
// component: module
import ModalPurchase from "@/components/modules/ModalPurchase";
// util: numeral
import { formatPrice } from "@/utils/numeral";

export default {
  name: "SideCart",
  components: {
    ModalPurchase,
  },
  data: () => ({
    formatPrice: formatPrice,
    modalActive: false,
  }),
  computed: {
    ...mapGetters({
      cart: "getterCart",
      count: "getterCount",
      quantity: "getterQty",
      total: "getterTotal",
    }),
  },
  methods: {
    ...mapMutations(["removeItem", "decrementQty", "incrementQty"]),
    showModal() {
      this.modalActive = !this.modalActive;
    },
  },
};
</script>

<style scoped>
/* base: wrapper */
.wrapper {
  padding: 0;
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* section: cart-bar */
.cart_bar {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgb(0, 0, 0, 0.25);
  box-shadow: 0 4px 0px rgb(0, 0, 0, 0.25);
  position: sticky;
  background-color: #ffffff;
  top: 0;
  z-index: 2;
}
.cart_bar > h3 {
  font-size: 25px;
  font-weight: bold;
  margin-top: 10px;
}

.cart_badge {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  height: 30px;
  width: 30px;
  border-radius: 100%;
  background: #57cad5;
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
  /* margin-top: 17px; */
  margin-left: 5px;
}
/* section: cart-list */
.cart_list {
  width: 100%;
  height: calc(100vh - 80px);
  /* background-color: cornflowerblue; */
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid #cecece;
}

/* content: cart-empty */
.cart_empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}
.cart_empty > img {
  width: 150px;
}
.cart_empty > h3 {
  margin-top: -25px;
  font-size: 25px;
  font-weight: bold;
}
.cart_empty > p {
  margin-top: -5px;
  font-size: 15px;
  font-weight: bold;
  color: #cecece;
}

/* content: cart-item */
.cart_item {
  overflow: auto;
}

.item_card {
  display: flex;
  align-items: center;
  padding: 10px;
}

.item_image {
  width: 70px;
  height: 70px;
  margin-right: 10px;
}
.item_image > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.item_detail {
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 80px);
  /* background: teal; */
}

.item_count {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: crimson; */
}
/*  */
.count_box {
  /* width: 100%; */
  height: 30px;
  display: flex;
  flex-direction: row;
  /* background: tan; */
  color: #82de3a;
}
.count_box > button {
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 30px; */
  background-color: rgba(130, 222, 58, 0.2);
  border: 1px solid #82de3a;
  border-radius: 0;
}
.count_box div {
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  text-align: center;
  border-top: 1px solid #82de3a;
  border-bottom: 1px solid #82de3a;
}

/* section: cart-detail */
.cart_detail {
  width: 100%;
  min-height: 30%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: auto;
  /* background: coral; */
  /* position: relative;
  bottom: 0; */
}

.detail_total {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
}

/* content: bottom */
.cart_detail > button {
  height: 50px;
  color: #ffffff;
  font-weight: 600;
  margin-top: 20px;
}
.btn_checkout {
  background-color: #57cad5;
}
.btn_cancel {
  background-color: #f24f8a;
}
</style>
