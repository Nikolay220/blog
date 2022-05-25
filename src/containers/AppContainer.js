import { connect } from 'react-redux'

import { signIn, receiveUser, requestUser, fetchArticle } from '../redux/actions'
import App from '../components/App'

const mapStateToProps = (state) => {
  return {
    blogService: state.blog_service,
    username: state.curProfile.username,
    userIsFetching: state.curProfile.isFetching,
    curArticle: state.curArticle.article,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticle: (slug) => {
      return dispatch(fetchArticle(slug))
    },
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
