import { REQUEST_ARTICLE_CREATION, RECEIVE_ARTICLE_CREATION, FINISH_ARTICLE_CREATION } from '../actions'
export default function curArticle(state = { isCreating: false, isCreated: false }, action) {
  switch (action.type) {
    case REQUEST_ARTICLE_CREATION:
      return { ...state, ...{ isCreating: true } }
    case RECEIVE_ARTICLE_CREATION:
      return { ...state, ...{ isCreating: false }, ...{ isCreated: true } }
    case FINISH_ARTICLE_CREATION:
      return { ...state, ...{ isCreating: false }, ...{ isCreated: false } }
    default:
      return state
  }
}
