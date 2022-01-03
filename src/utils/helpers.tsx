import { CartItem } from '../store/cart/types'

export const formatPrice = (number: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 100)
}

export const getUniqueValues = (data: any, type: any): any => {
  let unique = data.map((item: any) => item[type])
  if (type === 'colors') {
    unique = unique.flat()
  }
  return ['all', ...new Set(unique)]
}

export const getCartTotals = (
  cartArr: CartItem[],
  setNoOfItems: (state: number) => void
): void => {
  const { total_items } = cartArr.reduce(
    (total, cartItem) => {
      const { amount, price } = cartItem
      total.total_items += amount
      total.total_amount += price * amount
      return total
    },
    { total_items: 0, total_amount: 0 }
  )
  setNoOfItems(total_items)
}

export const getTotalAmount = (
  cartArr: CartItem[],
  setTotalAmount: (state: number) => void
): void => {
  const { total_amount } = cartArr.reduce(
    (total, cartItem) => {
      const { amount, price } = cartItem
      total.total_items += amount
      total.total_amount += price * amount
      return total
    },
    { total_items: 0, total_amount: 0 }
  )
  setTotalAmount(total_amount)
}
