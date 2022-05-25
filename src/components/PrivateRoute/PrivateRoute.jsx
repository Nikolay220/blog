import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ children, isAuthenticated, ...rest }) {
  let returnedComponent = isAuthenticated ? (
    children
  ) : (
    <Redirect to="/" />
  )
  return <Route {...rest} render={() => returnedComponent} />
}

export default PrivateRoute
