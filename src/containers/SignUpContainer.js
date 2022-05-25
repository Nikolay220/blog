import { connect } from 'react-redux'

import { updateError, signIn } from '../redux/actions'
import SignUp from '../components/Forms/SignUp'

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
    onAuth: (username, image) => {
      dispatch(signIn(username, image))
    },
    resetError: () => dispatch(updateError(null)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
