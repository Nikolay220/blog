import { RECEIVE_ARTICLE, REQUEST_ARTICLE, REQUEST_ARTICLES, RECEIVE_ARTICLES } from '../actions'
export default function curArticle(state = false, action) {
  switch (action.type) {
    case REQUEST_ARTICLE:
    case REQUEST_ARTICLES:
      return true
    case RECEIVE_ARTICLE:
    case RECEIVE_ARTICLES:
      return false
    default:
      return state
  }
}
