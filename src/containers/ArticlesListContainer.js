import { connect } from 'react-redux'

import ArticlesList from '../components/ArticlesList'
import { finishArticleCreation, updateArticleListError, fetchArticles } from '../redux/actions'
const mapStateToProps = (state) => {
  return {
    articles: state.articles.articles,
    fetching: state.articles.areFetching,
    error: state.errors.articleListError,
    newArticle: state.newArticle,
    curPage: state.curPage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCloseSuccessWin: () => {
      dispatch(finishArticleCreation())
      dispatch(updateArticleListError(null))
    },
    fetchArticles: (curPage) => {
      dispatch(fetchArticles(curPage))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList)
