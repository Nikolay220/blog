import { REQUEST_ARTICLES, RECEIVE_ARTICLES, UPDATE_TOTAL_ARTICLES } from '../actions'
export default function curPage(state = { areFetching: false, articles: [], totalArticles: 0 }, action) {
  switch (action.type) {
    case REQUEST_ARTICLES:
      return Object.assign({}, state, { areFetching: true })
    case RECEIVE_ARTICLES:
      return Object.assign({}, state, { articles: action.articles, areFetching: false })
    case UPDATE_TOTAL_ARTICLES:
      return Object.assign({}, state, { totalArticles: action.totalArticles })
    default:
      return state
  }
}
