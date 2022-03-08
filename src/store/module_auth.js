// module: axios-util
import { apiInstance } from '../utils/axios'
// module: router
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
    setToken: (state, payload) => {
      state.token = payload
    }
  },
  actions: {
    register: (context, payload) => {
      return new Promise((resolve, reject) => {
        apiInstance
          .post('/user/register', payload)
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
    login: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        apiInstance
          .post('/user/login', payload)
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
    toLogout: ({ commit }) => {
      localStorage.removeItem('token')
      commit('setToken', null)
      router.push('/login')
      alert('Logout berhasil')
    }
  },
  getters: {
    isLogin: (state) => {
      return state.token !== null
    },
    getToken: (state) => {
      return state.token
    },
    getUser: (state) => {
      return state.user
    }
  }
}
