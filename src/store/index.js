import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { storeAuth } from './module_auth'
import { storeProduct } from './module_product'
import { storeCart } from './module_cart'

Vue.use(Vuex)

export default new Store({
  modules: {
    auth: storeAuth,
    product: storeProduct,
    cart: storeCart
  }
})
