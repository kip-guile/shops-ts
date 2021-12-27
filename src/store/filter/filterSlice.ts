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
    company: 'all',
    category: 'all',
    color: 'all',
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
    updateFilters: (
      state,
      {
        payload: { name, value },
      }: PayloadAction<{ name: string; value: string | number | boolean }>
    ) => {
      const { text, category, company, color, price, shipping } = state.filters
      let tempProducts = [...state.all_products]
      if (text) {
        tempProducts = tempProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text)
        })
      }
      if (category !== 'all') {
        tempProducts = tempProducts.filter((product) => {
          return product.category === category
        })
      }
      if (company !== 'all') {
        tempProducts = tempProducts.filter((product) => {
          return product.company === company
        })
      }
      if (color !== 'all') {
        tempProducts = tempProducts.filter((product) => {
          return product.colors.find((c) => c === color)
        })
      }
      if (price) {
        tempProducts = tempProducts.filter((product) => {
          return product.price <= price
        })
      }
      if (shipping) {
        tempProducts = tempProducts.filter((product) => {
          return product.shipping === true
        })
      }
      return {
        ...state,
        filtered_products: tempProducts,
        filters: {
          ...state.filters,
          [name]: value,
        },
      }
    },
    clearFilters: (state) => {
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      }
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
  updateFilters: updateFiltersActionCreator,
  clearFilters: clearFiltersActionCreator,
} = filterSlice.actions

export default filterSlice.reducer
