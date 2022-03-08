export const storeCart = {
  state: () => ({
    carts: []
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
      } else {
        state.carts = state.carts.filter((item) => {
          return item.id !== payload.id
        })
      }
    }
  },
  getters: {
    getCart: (state) => {
      return state.carts
    },
    countCart: (state) => {
      return state.carts.length
    }
  }
}
