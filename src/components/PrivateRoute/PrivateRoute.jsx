import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ children, isAuthenticated, ...rest }) {
  let returnedComponent = isAuthenticated ? (
    children
  ) : (
    <Redirect
      to={{
        pathname: '/sign-in',
      }}
    />
  )
  return <Route {...rest} render={() => returnedComponent} />
}

export default PrivateRoute
