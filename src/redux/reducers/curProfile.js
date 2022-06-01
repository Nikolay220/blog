import { RESET_VALIDATION_ERRORS, UPDATE_VALIDATION_ERRORS, SIGN_OUT, SIGN_IN, UPDATE_USER_DATA, REQUEST_USER, RECEIVE_USER } from '../actions'

export default function curProfile(state = { username: null, isFetching: false, errors: null }, action) {
  switch (action.type) {
    case UPDATE_USER_DATA:
    case SIGN_IN:
      return { ...state, ...{ username: action.username, image: action.image } }
    case SIGN_OUT:
      return { ...state, ...{ username: null, image: null } }
    case REQUEST_USER:
      return { ...state, ...{ isFetching: true } }
    case RECEIVE_USER:
      return { ...state, ...{ isFetching: false } }
    case UPDATE_VALIDATION_ERRORS:
      return { ...state, ...{ errors: action.errors } }
    case RESET_VALIDATION_ERRORS:
      return { ...state, ...{ errors: null } }
    default:
      return state
  }
}
