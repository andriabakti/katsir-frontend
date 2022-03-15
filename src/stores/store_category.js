// util: axios
import { apiInstance } from "@/utils/axios"

export const storeCategory = {
	state: () => ({
		category: []
	}),
	getters: {
		getterCategory: (state) => {
			return state.category
		}
	},
	mutations: {
		setCategory: (state, payload) => {
			state.category = payload
		}
	},
	actions: {
		getCategory: async ({ commit }) => {
			try {
				const res = await apiInstance.get(`/category`)
				commit("setCategory", res.data.result)
				// console.log(res)
				return res
			} catch (err) {
				console.log(err)
				return err
			}
		}
	}
}
