import { ARTICLE_ITEM_ERROR_OCCURED, ARTICLE_LIST_ERROR_OCCURED, AUTH_ERROR_OCCURED } from '../actions'
export default function errors(state = { articleItemError: null, articleListError: null, authError: null }, action) {
  switch (action.type) {
    case ARTICLE_ITEM_ERROR_OCCURED:
      return { ...state, ...{ articleItemError: action.error } }
    case ARTICLE_LIST_ERROR_OCCURED:
      return { ...state, ...{ articleListError: action.error } }
    case AUTH_ERROR_OCCURED:
      return { ...state, ...{ authError: action.error } }
    default:
      return state
  }
}
