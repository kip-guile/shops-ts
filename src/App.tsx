import { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useThunkDispatch } from './hooks/useThunkDispatch'
import { useSelector } from 'react-redux'
import { RootState } from './store/rootReducer'
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
  AuthWrapper,
} from './pages'
import { getProductsFromServer } from './store/product/productSlice'

function App() {
  const cart = useSelector((state: RootState) => state.cart)
  const thunkDispatch = useThunkDispatch()
  useEffect(() => {
    thunkDispatch(getProductsFromServer())
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart.cart))
  }, [cart])
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/products' component={Products} />
          <Route exact path='/products/:id' component={SingleProduct} />
          <PrivateRoute exact path='/checkout' component={Checkout} />
          <Route exact path='*' component={Error} />
        </Switch>
        <Footer />
      </Router>
    </AuthWrapper>
  )
}

export default App
