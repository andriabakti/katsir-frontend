import Vue from "vue"
// package: axios
import axios from "axios"
// router: base
import router from "@/routers"
// store: base
import store from "@/stores"

export const apiInstance = axios.create({
	baseURL: `${process.env.VUE_APP_BASE_URL}`
})

export const interceptorsRequest = () => {
	apiInstance.interceptors.request.use(
		function (config) {
			config.headers = {
				Authorization: `Bearer ${store.getters.getterToken}`
			}
			return config
		},
		function (error) {
			return Promise.reject(error)
		}
	)
}

export const interceptorsResponse = () => {
	apiInstance.interceptors.response.use(
		function (response) {
			return response
		},
		function (error) {
			console.log(error.response)
			if (error.response.status === 403) {
				console.log(error.response.data)
				if (error.response.data.message === "Token is invalid") {
					store.commit("setToken", null)
					localStorage.removeItem("token")
					router.push("/login")
					Vue.$toast.warning("Your session is over, please login again")
				} else if (error.response.data.message === "Token is expired") {
					store.commit("setToken", null)
					localStorage.removeItem("token")
					router.push("/login")
					Vue.$toast.warning("You not allowed to change token")
				}
			}
			return Promise.reject(error)
		}
	)
}