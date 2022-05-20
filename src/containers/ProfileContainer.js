import { connect } from 'react-redux'

import { updateError, updateUsername, updateReqState } from '../redux/actions'
import Profile from '../components/Forms/Profile'
const mapStateToProps = (state) => {
  return {
    blog_service: state.blog_service,
    serverErr: state.error,
    username: state.curProfile.username,
    requestState: state.requestState,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onError: (error) => dispatch(updateError(error)),
    onCloseErrorWin: () => {
      dispatch(updateError(null))
    },
    onUsernameUpdate: (username) => {
      dispatch(updateUsername(username))
    },
    onSuccess: () => {
      dispatch(updateReqState(true))
    },
    onCloseSuccessWin: () => {
      dispatch(updateReqState(false))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
