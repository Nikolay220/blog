import { connect } from 'react-redux'

import { signIn, updateError } from '../redux/actions'
import SignIn from '../components/Forms/SignIn'
const mapStateToProps = (state) => {
  return {
    blog_service: state.blog_service,
    serverErr: state.error,
    username: state.curProfile.username,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onError: (error) => dispatch(updateError(error)),
    onClose: () => {
      dispatch(updateError(null))
    },
    onAuth: (username, image) => {
      dispatch(signIn(username, image))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
