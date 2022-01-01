import { Product } from '../product/types'

export interface CartInitialState {
  cart: CartItem[]
  total_items: number
  total_amount: number
  shipping_fee: number
}

export interface CartPayload {
  id: string
  mainColor: string
  amount: number
  product: Product
}

export interface CartItem {
  id: string
  name: string
  color: string
  amount: number
  image: string
  price: number
  max: number
}
