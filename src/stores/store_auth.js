import Vue from "vue"
// router: base
import router from "@/routers"
// util: axios
import { apiInstance } from "@/utils/axios"

export const storeAuth = {
	state: () => ({
		user: {},
		token: localStorage.getItem("token") || null
	}),
	getters: {
		isLogin: (state) => {
			return state.token !== null
		},
		getterToken: (state) => {
			return state.token
		},
		getterUser: (state) => {
			return state.user
		}
	},
	mutations: {
		setUser: (state, payload) => {
			state.user = payload
			state.token = payload.token
		},
		setToken: (state, payload) => {
			state.token = payload
		}
	},
	actions: {
		register: async (context, payload) => {
			try {
				const res = await apiInstance.post("/user/register", payload)
				router.push("/login")
				// console.log(res)
				return res
			} catch (err) {
				console.log(err)
				return err
			}
		},
		login: async ({ commit }, payload) => {
			try {
				const res = await apiInstance.post("/user/login", payload)
				commit("setUser", res.data.result)
				localStorage.setItem("token", res.data.result.token)
				router.push("/home")
				Vue.$toast.success("Login success")
				// console.log(res)
				return res
			} catch (err) {
				Vue.$toast.error("Login failed")
				console.log(err)
				return err
			}
		}
	}
}
