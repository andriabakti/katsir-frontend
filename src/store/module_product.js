// module: axios-util
import { apiInstance } from '@/utils/axios'

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
    getProduct: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        apiInstance
          .get(`/product${payload || ''}`)
          .then((res) => {
            // console.log(res)
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
            // console.log(res)
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
    editProduct: async (context, payload) => {
      // console.log('ini update product')
      try {
        const res = await apiInstance
          .patch(`/product/${payload.id}`, payload.data)
        // console.log(res)
        alert('Edit product berhasil')
        return res
      } catch (err) {
        alert('Edit product gagal')
        return err
      }
    }
  },
  deleteProduct: (context, payload) => {
    return new Promise((resolve, reject) => {
      // console.log('ini delete product' + payload)
      apiInstance
        .delete(`/product/${payload}`)
        .then((res) => {
          // console.log(res)
          // alert('Delete product berhasil')
          resolve(res)
        })
        .catch((err) => {
          alert('Delete product gagal')
          reject(err)
        })
    })
  }
}
