import { useSelector } from 'react-redux'
import { RootState } from '../store/rootReducer'
import styled from 'styled-components'
import { PageHero, StripeCheckout } from '../components'
// extra imports
import { Link } from 'react-router-dom'

const CheckoutPage = () => {
  const cart = useSelector((state: RootState) => state.cart)
  const { cart: innerCart } = cart
  return (
    <main>
      <PageHero title='checkout' />
      <Wrapper className='page'>
        {innerCart.length < 1 ? (
          <div className='empty'>
            <h2>your cart is empty</h2>
            <Link to='/products' className='btn'>
              fill it
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  )
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`

export default CheckoutPage
