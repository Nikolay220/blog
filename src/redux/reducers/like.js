import { REQUEST_ADD_LIKE, RECEIVE_ADD_LIKE } from '../actions'
export default function like(state = { liked: false, isFetching: false }, action) {
  switch (action.type) {
    // case ADD_LIKE:
    //   return {...state,...{liked:true}}
    case REQUEST_ADD_LIKE:
      return { ...state, ...{ isFetching: true } }
    case RECEIVE_ADD_LIKE:
      return { ...state, ...{ isFetching: false } }
    default:
      return state
  }
}
