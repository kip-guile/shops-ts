import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
// will remove later

interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props
  const { user } = useAuth0()
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to='/' />
      }
    />
  )
}
export default PrivateRoute
