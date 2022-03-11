// import Vue from 'vue'

export const storeCart = {
  state: () => ({
    carts: [],
    total: 0,
    tax: 0
  }),
  getters: {
    getterCart: (state) => {
      return state.carts
    },
    getterCount: (state) => {
      return state.carts.length
    },
    getterQty: (state) => (payload) => {
      const cartItem = state.carts.find((item) => {
        return item.id === payload
      })
      return cartItem.quantity
    },
    getterTotal: (state) => {
      const totalPrice = state.carts.reduce((sum, item) => {
        return sum + (item.price * item.quantity)
      }, 0)
      return state.total = totalPrice
    }
  },
  mutations: {
    addToCart: (state, payload) => {
      const isCart = state.carts.find((item) => {
        return item.id === payload.id
      })
      if (!isCart) {
        const item = payload
        item.quantity = 1
        state.carts.push(item)
      }
    },
    removeItem: (state, payload) => {
      const filtered = state.carts.filter((item) => {
        return item.id != payload
      })
      return state.carts = filtered
    },
    decrementQty: (state, payload) => {
      const cartItem = state.carts.map((item) => {
        if (item.id === payload.id) {
          item.quantity -= 1
        }
        return item
      })
      return state.carts = cartItem
    },
    incrementQty: (state, payload) => {
      const cartItem = state.carts.map((item) => {
        if (item.id === payload.id) {
          item.quantity += 1
        }
        return item
      })
      return state.carts = cartItem
    }
  }
}
