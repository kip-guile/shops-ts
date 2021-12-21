import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {ProductsInitialState} from './types'
import axios from 'axios'

export const initialProductsState: ProductsInitialState = {
  isSideBarOpen: false
}

const productSlice = createSlice({
  name: 'products',
  initialState: initialProductsState,
  reducers: {
    openSidebar: (action) => {
      action.isSideBarOpen = true
    },
    closeSidebar: (action) => {
      action.isSideBarOpen = false
    },
  },
  extraReducers: (builder) => {

  },
})

export const {
  openSidebar: openSideBarActionCreator,
  closeSidebar: closeSideBarActionCreator
} = productSlice.actions

export default productSlice.reducer