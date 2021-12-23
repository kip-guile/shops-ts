import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ProductsInitialState, Product } from './types'
import axios from 'axios'
import { products_url as url } from '../../utils/constants'

export const initialProductsState: ProductsInitialState = {
  isSideBarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {
    id: '',
    name: '',
    price: 0,
    image: '',
    colors: ['', ''],
    company: '',
    description: '',
    category: '',
    shipping: false,
    featured: false,
    stock: 0,
    stars: 0,
    reviews: 0,
    images: [],
  },
}

export const getProductsFromServer = createAsyncThunk(
  'products/getProductsFromServer',
  async () => {
    const res = await axios.get<Product[]>(url)
    return res.data
  }
)

export const getSingleProductFromServer = createAsyncThunk(
  'products/getSingleProductFromServer',
  async (url: string) => {
    const res = await axios.get<Product>(url)
    return res.data
  }
)

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
    builder.addCase(getProductsFromServer.pending, (state, action) => {
      return {
        ...state,
        products_loading: true,
      }
    })
    builder.addCase(getProductsFromServer.fulfilled, (state, action) => {
      const featured_products = action.payload.filter(
        (productSlice) => productSlice.featured === true
      )
      return {
        ...state,
        products_loading: false,
        products: action.payload,
        featured_products,
      }
    })
    builder.addCase(getProductsFromServer.rejected, (state, action) => {
      return {
        ...state,
        products_loading: false,
        products_error: true,
      }
    })
    builder.addCase(getSingleProductFromServer.pending, (state, action) => {
      return {
        ...state,
        single_product_loading: true,
        single_product_error: false,
      }
    })
    builder.addCase(getSingleProductFromServer.fulfilled, (state, action) => {
      return {
        ...state,
        single_product_loading: false,
        single_product: action.payload,
      }
    })
    builder.addCase(getSingleProductFromServer.rejected, (state, action) => {
      return {
        ...state,
        single_product_loading: false,
        single_product_error: true,
      }
    })
  },
})

export const {
  openSidebar: openSideBarActionCreator,
  closeSidebar: closeSideBarActionCreator,
} = productSlice.actions

export default productSlice.reducer
