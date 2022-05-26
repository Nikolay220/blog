import { connect } from 'react-redux'

import { updateReqState, signIn, receiveUser, requestUser, fetchArticle } from '../redux/actions'
import App from '../components/App'

const mapStateToProps = (state) => {
  return {
    blogService: state.blog_service,
    username: state.curProfile.username,
    userIsFetching: state.curProfile.isFetching,
    curArticle: state.curArticle.article,
    requestState: state.requestState,
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
    hideSuccessWin: () => {
      dispatch(updateReqState(false))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
