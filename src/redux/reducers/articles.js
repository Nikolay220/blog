import { RECEIVE_ARTICLES, UPDATE_TOTAL_ARTICLES } from '../actions'
export default function curPage(state = { articles: [], totalArticles: 0 }, action) {
  switch (action.type) {
    case RECEIVE_ARTICLES:
      return Object.assign({}, state, { articles: action.articles })
    case UPDATE_TOTAL_ARTICLES:
      return Object.assign({}, state, { totalArticles: action.totalArticles })
    default:
      return state
  }
}
