// import Vue from 'vue'

export const storeCart = {
  state: () => ({
    carts: [],
    total: 0,
    tax: 0
  }),
  mutations: {
    addToCart: (state, payload) => {
      const isCart = state.carts.find((item) => {
        return item.id === payload.id
      })
      if (!isCart) {
        const item = payload
        item.count = 1
        state.carts.push(item)
      }
    },
    removeItem: (state, payload) => {
      const filtered = state.carts.filter((item) => {
        return item.id != payload
      })
      return state.carts = filtered
    },
    decreaseCount: (state, payload) => {
      // const cartItem = state.carts.find((item) => {
      //   return item.id === payload
      // })
      return payload -= 1
    },
    increaseCount: (state, payload) => {
      // const cartItem = state.carts.find((item) => {
      //   return item.id === payload.id
      // })
      return payload.count += 1
      // Object.assign(cartItem, { ...cartItem, count: increase })
      // Vue.set(cartItem, 'count', increase)
    }
  },
  getters: {
    getCart: (state) => {
      return state.carts
    },
    countCart: (state) => {
      return state.carts.length
    },
    getQuantity: (state) => (payload) => {
      const cartItem = state.carts.find((item) => {
        return item.id === payload
      })
      return cartItem.count
    },
    getTotal: ({ carts, total }) => {
      if (carts.length > 0) {
        const totalPrice = carts.reduce((sum, item) => {
          return sum + (item.price * item.count)
        }, 0)
        return total = totalPrice
      } else {
        return total
      }
    }
  }
}
