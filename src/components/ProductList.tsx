import { useSelector } from 'react-redux'
import { RootState } from '../store/rootReducer'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const { filtered_products, grid_view } = useSelector(
    (state: RootState) => state.filter
  )
  if (filtered_products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search...
      </h5>
    )
  }
  if (grid_view === false) {
    return <ListView products={filtered_products} />
  }
  return <GridView products={filtered_products} />
}

export default ProductList
