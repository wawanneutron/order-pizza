import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  carts: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.carts.push(action.payload)
    },

    deleteItem(state, action) {
      const itemIndex = state.carts.findIndex(
        (item) => item.pizzaId === action.payload
      )
      if (itemIndex !== -1) {
        state.carts.splice(itemIndex, 1)
      }
    },

    increaseItemQuantity(state, action) {
      const item = state.carts.find((item) => item.pizzaId === action.payload)
      if (item) {
        item.quantity++
        item.totalPrice = item.quantity * item.unitPrice
      }
    },

    decreaseItemQuantity(state, action) {
      const item = state.carts.find((item) => item.pizzaId === action.payload)
      if (item) {
        item.quantity--
        item.totalPrice = item.quantity * item.unitPrice

        if (item.quantity === 0)
          cartSlice.caseReducers.deleteItem(state, action)
      }
    },

    clearCarts(state) {
      state.carts = []
    }
  }
})

export const {
  addItem,
  deleteItem,
  clearCarts,
  increaseItemQuantity,
  decreaseItemQuantity
} = cartSlice.actions

export default cartSlice.reducer

export const getCarts = (state) => state.cart.carts

export const getTotalCartPrice = (state) =>
  state.cart.carts.reduce((sum, item) => sum + item.totalPrice, 0)

export const getTotalCartQuantity = (state) =>
  state.cart.carts.reduce((sum, item) => sum + item.quantity, 0)

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.carts.find((item) => item.pizzaId === id)?.quantity ?? 0
