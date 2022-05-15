import { RECEIVE_ARTICLE } from '../actions'
export default function curArticle(state = null, action) {
  switch (action.type) {
    case RECEIVE_ARTICLE:
      return action.curArticle
    default:
      return state
  }
}
