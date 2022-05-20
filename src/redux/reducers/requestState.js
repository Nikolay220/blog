import { UPDATE_REQ_STATE } from '../actions'
export default function requestState(state = false, action) {
  switch (action.type) {
    case UPDATE_REQ_STATE:
      return action.value
    default:
      return state
  }
}
