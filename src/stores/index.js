import Vue from "vue"
// package: vuex
import Vuex, { Store } from "vuex"
// package: vuex-persistedstate
import createPersistedState from "vuex-persistedstate"
// store: module
import { storeAuth } from "@/stores/store_auth"
import { storeProduct } from "@/stores/store_product"
import { storeCategory } from "@/stores/store_category"
import { storeCart } from "@/stores/store_cart"

Vue.use(Vuex)

export default new Store({
	modules: {
		auth: storeAuth,
		product: storeProduct,
		category: storeCategory,
		cart: storeCart
	},
	plugins: [
		createPersistedState({
			paths: ["auth", "product", "category", "cart"]
		})
	]
})
