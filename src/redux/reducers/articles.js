import { UPDATE_ARTICLE_ITEM, RECEIVE_ARTICLES, UPDATE_TOTAL_ARTICLES, REQUEST_ARTICLES } from '../actions'
export default function curPage(state = { articles: [], totalArticles: 0, areFetching: false, updatedArticle: null, error: null }, action) {
  switch (action.type) {
    case REQUEST_ARTICLES:
      return Object.assign({}, state, { areFetching: true })
    case RECEIVE_ARTICLES:
      return Object.assign({}, state, { articles: action.articles }, { areFetching: false })
    case UPDATE_TOTAL_ARTICLES:
      return Object.assign({}, state, { totalArticles: action.totalArticles })
    case UPDATE_ARTICLE_ITEM: {
      let newArr = state.articles.map((article) => {
        if (article.slug !== action.updatedArticle.slug) return { ...article }
        else return action.updatedArticle
      })
      return Object.assign({}, state, { articles: newArr })
    }
    default:
      return state
  }
}
