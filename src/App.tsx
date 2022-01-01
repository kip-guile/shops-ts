import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useThunkDispatch } from './hooks/useThunkDispatch'
import { useSelector, useDispatch } from 'react-redux'
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
} from './pages'
import { getProductsFromServer } from './store/product/productSlice'
import { countCartTotalsActionCreator } from './store/cart/cartSlice'

function App() {
  const cart = useSelector((state: RootState) => state.cart)
  const thunkDispatch = useThunkDispatch()
  // const dispatch = useDispatch()
  useEffect(() => {
    thunkDispatch(getProductsFromServer())
  }, [])
  useEffect(() => {
    // dispatch(countCartTotalsActionCreator())
    localStorage.setItem('cart', JSON.stringify(cart.cart))
  }, [cart])
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
