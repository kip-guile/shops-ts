import { Product } from '../product/types'

export interface FilterInitialState {
  filtered_products: Product[]
  all_products: Product[]
  grid_view: boolean
  sort: string
  filters: Filter
}

export interface Filter {
  text: string
  company: string
  category: string
  color: string
  min_price: number
  max_price: number
  price: number
  shipping: boolean
}
