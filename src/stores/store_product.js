import Vue from "vue"
// util: axios
import { apiInstance } from "@/utils/axios"

export const storeProduct = {
	state: () => ({
		products: [],
		pages: null
	}),
	getters: {
		getterProduct: (state) => {
			return state.products
		},
		getterPage: (state) => {
			return state.pages
		}
	},
	mutations: {
		setProduct: (state, payload) => {
			state.products = payload
		},
		setPagination: (state, payload) => {
			state.pages = payload
		}
	},
	actions: {
		getProduct: async ({ commit }, payload) => {
			try {
				const res = await apiInstance.get(`/product${payload || ""}`)
				commit("setProduct", res.data.result)
				commit("setPagination", res.data.page_info)
				// console.log(res)
				return res
			} catch (err) {
				console.log(err)
				return err
			}
		},
		insertProduct: async (context, payload) => {
			try {
				const res = await apiInstance.post(`/product`, payload)
				Vue.$toast.success("New product added successfully")
				// console.log(res)
				return res
			} catch (err) {
				Vue.$toast.error("Failed to add new product")
				console.log(err)
				return err
			}
		},
		editProduct: async (context, payload) => {
			try {
				const res = await apiInstance.patch(`/product/${payload.id}`, payload.data)
				Vue.$toast.success("Product updated successfully")
				// console.log(res)
				return res
			} catch (err) {
				Vue.$toast.error("Failed to update product")
				console.log(err)
				return err
			}
		},
		deleteProduct: async (context, payload) => {
			try {
				const res = await apiInstance.delete(`/product/${payload}`)
				Vue.$toast.success("Product deleted successfully")
				// console.log(res)
				return res
			} catch (err) {
				Vue.$toast.error("Failed to delete product")
				console.log(err)
				return err
			}
		}
	}
}
