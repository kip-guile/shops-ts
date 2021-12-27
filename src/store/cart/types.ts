import { Product } from '../product/types'

export interface CartInitialState {
  cart: Product[]
  total_items: Number
  total_amount: Number
  shipping_fee: Number
}
