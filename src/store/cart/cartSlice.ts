import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartInitialState, CartPayload } from './types'

const getLocalStorage = () => {
  let cart = localStorage.getItem('cart')
  if (cart) {
    return JSON.parse(cart)
  } else {
    return []
  }
}

const cartFromLocalStorage = getLocalStorage()

const initialCartState: CartInitialState = {
  cart: cartFromLocalStorage,
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addToCart: (
      state,
      {
        payload: { id, mainColor: color, amount, product },
      }: PayloadAction<CartPayload>
    ) => {
      const tempItem = state.cart.find((i) => i.id === id + color)
      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max
            }
            return { ...cartItem, amount: newAmount }
          } else {
            return cartItem
          }
        })
        return {
          ...state,
          cart: tempCart,
        }
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        }
        return {
          ...state,
          cart: [...state.cart, newItem],
        }
      }
    },
    removeItem: (state, { payload }: PayloadAction<string>) => {
      const tempCart = state.cart.filter((item) => item.id !== payload)
      return { ...state, cart: tempCart }
    },
    toggleAmount: (
      state,
      { payload: { id, value } }: PayloadAction<{ id: string; value: string }>
    ) => {
      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          if (value === 'inc') {
            let newAmount = item.amount + 1
            if (newAmount > item.max) {
              newAmount = item.max
            }
            return { ...item, amount: newAmount }
          } else {
            let newAmount = item.amount - 1
            if (newAmount < 1) {
              newAmount = 1
            }
            return { ...item, amount: newAmount }
          }
        }
        return item
      })
      return {
        ...state,
        cart: tempCart,
      }
    },
    clearCart: (state) => {
      return {
        ...state,
        cart: [],
      }
    },
  },
  extraReducers: (builder) => {},
})

export const {
  addToCart: addToCartActionCreator,
  removeItem: removeItemActionCreator,
  toggleAmount: toggleAmountActionCreator,
  clearCart: clearCartActionCreator,
} = cartSlice.actions

export default cartSlice.reducer
