import { connect } from 'react-redux'

import { editProfile, updateError, updateUsername, updateReqState, updateValidationErrors } from '../redux/actions'
import Profile from '../components/Forms/Profile'
const mapStateToProps = (state) => {
  return {
    blog_service: state.blog_service,
    serverErr: state.error,
    curProfile: state.curProfile,
    requestState: state.requestState,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addValidationErrors: (errors) => dispatch(updateValidationErrors(errors)),
    resetValidationErrors: () => dispatch(updateValidationErrors(null)),
    editProfile: (username, email, token, password, avatarUrl) => {
      dispatch(editProfile(username, email, token, password, avatarUrl))
    },
    onError: (error) => dispatch(updateError(error)),
    hideErrorWin: () => {
      dispatch(updateError(null))
    },
    onUsernameUpdate: (username) => {
      dispatch(updateUsername(username))
    },
    onSuccess: () => {
      dispatch(updateReqState(true))
    },
    hideSuccessWin: () => {
      dispatch(updateReqState(false))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
