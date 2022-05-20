import { connect } from 'react-redux'

import { signOut } from '../redux/actions'
import HeaderWithUsername from '../components/Headers/HeaderWithUsername'
import SessionStorageService from '../services/SessionStorageService'

const mapStateToProps = (state) => {
  return {
    username: state.curProfile.username,
    image: state.curProfile.image,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => {
      SessionStorageService.clearStorage()
      dispatch(signOut())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWithUsername)
