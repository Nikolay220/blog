import { connect } from 'react-redux'

import { signIn, receiveUser, requestUser } from '../redux/actions'
import App from '../components/App'

const mapStateToProps = (state) => {
  return {
    blogService: state.blog_service,
    username: state.curProfile.username,
    userIsFetching: state.curProfile.isFetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUserRequest: () => {
      dispatch(requestUser())
    },
    onInit: (username) => {
      dispatch(receiveUser())
      dispatch(signIn(username))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
