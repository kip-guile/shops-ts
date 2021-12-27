import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { CartInitialState } from './types'

const initialCartStage: CartInitialState = {
  cart: [],
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartStage,
  reducers: {},
  extraReducers: (builder) => {},
})

export default cartSlice.reducer
