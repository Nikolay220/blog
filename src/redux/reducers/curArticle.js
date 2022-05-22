import { RECEIVE_ARTICLE, REQUEST_ARTICLE_DELETE, RECEIVE_ARTICLE_DELETE } from '../actions'
export default function curArticle(state = null, action) {
  switch (action.type) {
    case REQUEST_ARTICLE_DELETE:
      return { ...state, ...{ isRemoving: true } }
    case RECEIVE_ARTICLE_DELETE:
      return { ...state, ...{ isRemoving: false }, ...{ isRemoved: true } }
    case RECEIVE_ARTICLE:
      return action.curArticle
    default:
      return state
  }
}
