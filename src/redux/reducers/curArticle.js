import {
  RECEIVE_ARTICLE,
  REQUEST_ARTICLE_DELETE,
  RECEIVE_ARTICLE_DELETE,
  REQUEST_ARTICLE_UPDATE,
  RECEIVE_ARTICLE_UPDATE,
  FINISH_ARTICLE_UPDATE,
  REQUEST_ARTICLE,
  ARTICLE_UPDATE_IS_FAILED,
} from '../actions'
export default function curArticle(state = { isFetching: false, isUpdating: false, isRemoving: false, isUpdated: false, isRemoved: false }, action) {
  switch (action.type) {
    case REQUEST_ARTICLE_DELETE:
      return { ...state, ...{ isRemoving: true } }
    case RECEIVE_ARTICLE_DELETE:
      return { ...state, ...{ isRemoving: false }, ...{ isRemoved: true } }
    case REQUEST_ARTICLE_UPDATE:
      return { ...state, ...{ isUpdating: true } }
    case RECEIVE_ARTICLE_UPDATE:
      return { ...state, ...{ isUpdating: false }, ...{ isUpdated: true }, ...action.curArticle }
    case FINISH_ARTICLE_UPDATE:
      return { ...state, ...{ isUpdated: false } }
    case ARTICLE_UPDATE_IS_FAILED:
      return { ...state, ...{ isUpdating: false }, ...{ isUpdated: false } }
    case REQUEST_ARTICLE:
      return { ...state, ...{ isFetching: true } }
    case RECEIVE_ARTICLE:
      return { ...state, ...{ article: action.curArticle }, ...{ isFetching: false } }
    default:
      return state
  }
}
