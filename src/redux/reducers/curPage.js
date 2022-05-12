import { CHOOSE_OTHER_PAGE } from '../actions'
export default function curPage(state = 1, action) {
  switch (action.type) {
    case CHOOSE_OTHER_PAGE:
      return action.page
    default:
      return state
  }
}
