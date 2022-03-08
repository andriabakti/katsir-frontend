// module: axios-util
import { apiInstance } from '../utils/axios'

export const storeProduct = {
  state: () => ({
    products: [],
    pages: null
  }),
  mutations: {
    setProduct: (state, payload) => {
      state.products = payload
    },
    setPagination: (state, payload) => {
      state.pages = payload
    }
  },
  actions: {
    getProduct: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        apiInstance
          .get(`/product${payload || ''}`)
          .then((res) => {
            console.log(res)
            commit('setProduct', res.data.result)
            commit('setPagination', res.data.page_info)
            resolve(res.data.result)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    insertProduct: (context, payload) => {
      return new Promise((resolve, reject) => {
        apiInstance
          .post(`/product`, payload)
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
    editProduct: (context, payload) => {
      return new Promise((resolve, reject) => {
        console.log('ini update product')
        apiInstance
          .patch(`/product/${payload.id}`, payload.data)
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
    deleteProduct: (context, payload) => {
      return new Promise((resolve, reject) => {
        console.log('ini delete product' + payload)
        apiInstance
          .delete(`/product/${payload}`)
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
    products: (state) => {
      return state.products
    },
    getPage: (state) => {
      return state.pages
    }
  }
}
