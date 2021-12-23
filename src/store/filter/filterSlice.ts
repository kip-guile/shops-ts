import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getProductsFromServer } from '../product/productSlice'
import { FilterInitialState } from './types'

export const initialFilterState: FilterInitialState = {
  filtered_products: [],
  all_products: [],
  grid_view: false,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: '',
    category: '',
    color: '',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialFilterState,
  reducers: {
    setGridView: (action) => {
      action.grid_view = true
    },
    setListView: (action) => {
      action.grid_view = false
    },
    updateSort: (state, { payload }: PayloadAction<string>) => {
      state.sort = payload
      let tempProducts = [...state.filtered_products]
      if (state.sort === 'price-lowest') {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price)
      }
      if (state.sort === 'price-highest') {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price)
      }
      if (state.sort === 'name-a') {
        tempProducts = tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
      }
      if (state.sort === 'name-z') {
        tempProducts = tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name)
        })
      }
      state.filtered_products = tempProducts
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsFromServer.fulfilled, (state, action) => {
      const maxPriceArr = action.payload.map((p) => p.price)
      let maxPrice = Math.max(...maxPriceArr)
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: {
          ...state.filters,
          max_price: maxPrice,
          price: maxPrice,
        },
      }
    })
  },
})

export const {
  setGridView: setGridViewActionCreator,
  setListView: setListViewActionCreator,
  updateSort: updateSortActionCreator,
} = filterSlice.actions

export default filterSlice.reducer
