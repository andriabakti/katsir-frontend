<template>
  <div class="cart">
    <div class="cart-bar">
      <h3>Cart</h3>
      <!-- <div> -->
      <span class="badge">{{ countCart }}</span>
      <!-- </div> -->
    </div>
    <div class="empty" v-if="countCart == 0">
      <img src="../../assets/images/ImgEmpty.png" />
      <h3>Your cart is empty</h3>
      <p>Please add some items from the menu</p>
    </div>
    <ul class="list-unstyled card" v-if="countCart > 0">
      <li class="media" v-for="item in getCart" :key="item.id">
        <div class="container-img">
          <img :src="item.image" class="mr-3" />
        </div>
        <div class="media-body">
          <h6 class="mt-0 mb-1">{{ item.name }}</h6>
          <div class="cart-body">
            <div class="count-box">
              <button @click="setMin">-</button>
              <input type="number" name="count" value="1" disabled />
              <button @click="setAdd">+</button>
            </div>
            <h5>
              Rp.
              {{ formatPrice(item.price) }}
            </h5>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// package: vuex
import { mapGetters } from "vuex";
// module: util-numeral
import { formatPrice } from "../../utils/numeral";

export default {
  name: "SideCart",
  data: () => ({
    formatPrice: formatPrice,
  }),
  computed: {
    ...mapGetters(["getCart", "countCart"]),
  },
};
</script>

<style scoped>
.cart {
  padding: 0;
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: cornflowerblue;
  /* border-left: 1px solid #CECECE; */
  /* overflow: auto; */
}

.cart-bar {
  width: 100%;
  height: 80px;
  background-color: crimson;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgb(0, 0, 0, 0.25);
  box-shadow: 0 4px 0px rgb(0, 0, 0, 0.25);
  position: sticky;
  top: 0;
  z-index: 3;
}
.cart-bar h3 {
  font-size: 25px;
  font-weight: bold;
  margin-top: 10px;
}
.badge {
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
  margin-top: 17px;
  margin-left: 5px;
}

.card {
  position: absolute;
  width: 100%;
  height: 50vh;
  overflow: auto;
  /* display: flex; */
  /* align-items: center; */
  /* background-color: coral; */
}
/* .media {
	border-bottom: 1px solid #CECECE;
} */
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}
.empty img {
  width: 150px;
}
.empty h3 {
  margin-top: -25px;
  font-size: 25px;
  font-weight: bold;
}
.empty p {
  margin-top: -5px;
  font-size: 15px;
  font-weight: bold;
  color: #cecece;
}
.count-box input {
  width: 30px;
  font-size: 12px;
}
.cart-body {
  display: flex;
  justify-content: space-between;
}
.container-img {
  width: 70px;
  height: 70px;
  margin-right: 10px;
}
.container-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.media {
  /* margin-bottom: 20px; */
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #cecece;
}
.count-box button {
  border-style: none;
  border: 1px solid green;
  color: green;
}
/* .count-box input {
	text-align: center;
} */
</style>
