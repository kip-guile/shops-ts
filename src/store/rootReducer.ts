import { combineReducers } from '@reduxjs/toolkit'
import cartReducer from './cart/cartSlice'
import filterReducer from './filter/filterSlice'
import productReducer from './product/productSlice'
import userReducer from './user/userSlice'


export const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
  cart: cartReducer,
  filter: filterReducer
})

export type RootState = ReturnType<typeof rootReducer>
