import axios from 'axios'
import router from '../routers/index'

export const storeAuth = {
  state: () => ({
    user: {},
    token: localStorage.getItem('token') || null
  }),
  mutations: {
    setUser: (state, payload) => {
      state.user = payload
      state.token = payload.token
    },
    setToken(state, payload) {
      state.token = payload
    }
  },
  actions: {
    register: (context, payload) => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_BASE_URL}/user/register`, payload)
          .then((res) => {
            console.log(res)
            router.push('/login')
            alert('Registrasi akun berhasil')
            resolve(res.data.result)
          })
          .catch((err) => {
            console.log(err)
            alert('Registrasi akun gagal')
            reject(err)
          })
      })
    },
    login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_BASE_URL}/user/login`, payload)
          .then((res) => {
            console.log(res)
            commit('setUser', res.data.result)
            localStorage.setItem('token', res.data.result.token)
            router.push('/home')
            alert('Login berhasil')
            resolve(res.data.result[0])
          })
          .catch((err) => {
            console.log(err)
            alert('Login gagal')
            reject(err)
          })
      })
    },
    toLogout({ commit }) {
      localStorage.removeItem('token')
      commit('setToken', null)
      router.push('/login')
      alert('Logout berhasil')
    },
    interceptorsRequest(context) {
      axios.interceptors.request.use(
        function (config) {
          config.headers.Authorization = `Bearer ${context.state.token}`
          return config
        },
        function (error) {
          return Promise.reject(error)
        }
      )
    },
    interceptorsResponse({ commit }) {
      axios.interceptors.response.use(
        function (response) {
          return response
        },
        function (error) {
          console.log(error.response.data.result.message)
          if (error.response.status === 401) {
            console.log(error.response)
            if (error.response.data.result.message === 'Token is invalid') {
              commit('setToken', null)
              localStorage.removeItem('token')
              router.push('/login')
              alert('Anda tidak boleh merubah token')
            } else if (
              error.response.data.result.message === 'Token is expired'
            ) {
              commit('setToken', null)
              localStorage.removeItem('token')
              router.push('/login')
              alert('Session telah habis, silahkan login kembali')
            }
          }
          return Promise.reject(error)
        }
      )
    }
  },
  getters: {
    isLogin: (state) => {
      return state.token !== null
    }
  }
}
