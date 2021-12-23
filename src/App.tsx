import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useThunkDispatch } from './hooks/useThunkDispatch'
import { Navbar, Sidebar, Footer } from './components'
import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  PrivateRoute,
  Products,
} from './pages'
import { getProductsFromServer } from './store/product/productSlice'
import { useEffect } from 'react'

function App() {
  const dispatch = useThunkDispatch()
  useEffect(() => {
    dispatch(getProductsFromServer())
  }, [])
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/products' component={Products} />
        <Route exact path='/products/:id' component={SingleProduct} />
        <Route exact path='/checkout' component={Checkout} />
        <Route exact path='*' component={Error} />
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
