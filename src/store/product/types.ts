export interface ProductsInitialState {
  isSideBarOpen: boolean
  products_loading: boolean
  products_error: boolean
  products: Product[]
  featured_products: Product[]
  single_product_loading: boolean
  single_product_error: boolean
  single_product: Product
}

export interface Product {
  id: string
  name: string
  price: number
  image: string
  colors: string[]
  company: string
  description: string
  category: string
  shipping: boolean
  featured: boolean
  stock: number
  stars: number
  reviews: number
  images: Images[]
}

export interface Images {
  filename?: string
  height?: number
  id?: string
  size?: number
  type?: string
  url: string
  width?: number
  thumbnails?: Thumbnails
}

export interface Thumbnails {
  full: URL
  large: URL
  small: URL
}

interface URL {
  url: string
}
