import axios from 'axios'

export const storeProduct = {
  state: () => ({
    products: [],
    paginations: null
  }),
  mutations: {
    setProducts(state, payload) {
      state.products = payload
    },
    setPaginations(state, payload) {
      state.paginations = payload
    }
  },
  actions: {
    getProducts({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_BASE_URL}/product${payload || ''}`)
          .then((res) => {
            console.log(res)
            commit('setProducts', res.data.result)
            commit('setPaginations', res.data.paginations)
            resolve(res.data.result)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    insertProducts(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_BASE_URL}/product`, payload)
          .then((res) => {
            console.log(res)
            alert('Add product berhasil')
            resolve(res)
          })
          .catch((err) => {
            console.log(err)
            alert('Add product gagal')
            reject(err)
          })
      })
    },
    editProducts(context, payload) {
      return new Promise((resolve, reject) => {
        console.log('ini update product')
        axios
          .patch(
            `${process.env.VUE_APP_BASE_URL}/product/${payload.id}`,
            payload.data
          )
          .then((res) => {
            console.log(res)
            alert('Edit product berhasil')
            resolve(res)
          })
          .catch((err) => {
            alert('Edit product gagal')
            reject(err)
          })
      })
    },
    deleteProducts(context, payload) {
      return new Promise((resolve, reject) => {
        console.log('ini delete product' + payload)
        axios
          .delete(`${process.env.VUE_APP_BASE_URL}/product/${payload}`)
          .then((res) => {
            console.log(res)
            // alert('Delete product berhasil')
            resolve(res)
          })
          .catch((err) => {
            alert('Delete product gagal')
            reject(err)
          })
      })
    }
  },
  getters: {
    products(state) {
      return state.products
    },
    getPage(state) {
      return state.paginations
    }
  }
}
