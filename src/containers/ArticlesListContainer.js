import { connect } from 'react-redux'

import ArticlesList from '../components/ArticlesList'
import { finishArticleCreation, updateError, fetchArticles } from '../redux/actions'
const mapStateToProps = (state) => {
  return {
    articles: state.articles.articles,
    fetching: state.articles.areFetching,
    error: state.error,
    newArticle: state.newArticle,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCloseSuccessWin: () => {
      dispatch(finishArticleCreation())
      dispatch(updateError(null))
    },
    fetchArticles: () => {
      dispatch(fetchArticles())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList)
