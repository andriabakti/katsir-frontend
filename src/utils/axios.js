// package: axios
import axios from 'axios'
// module: router
import router from '../routers/'
// module: store
import store from '../store/'

export const apiInstance = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_URL}`
})

export const interceptorsRequest = () => {
  apiInstance.interceptors.request.use(
    function (config) {
      config.headers = {
        Authorization: `Bearer ${store.getters.getToken}`
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
      console.log(error.response.data.result.message)
      if (error.response.status === 403) {
        console.log(error.response)
        if (error.response.data.message === 'Token is invalid') {
          store.commit('setToken', null)
          localStorage.removeItem('token')
          router.push('/login')
          alert('Anda tidak boleh merubah token')
        } else if (
          error.response.data.message === 'Token is expired'
        ) {
          store.commit('setToken', null)
          localStorage.removeItem('token')
          router.push('/login')
          alert('Session telah habis, silahkan login kembali')
        }
      }
      return Promise.reject(error)
    }
  )
}