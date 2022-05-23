import { connect } from 'react-redux'

import ArticlesList from '../components/ArticlesList'
import { finishArticleCreation } from '../redux/actions'
const mapStateToProps = (state) => {
  return {
    articles: state.articles.articles,
    fetching: state.commonFetching,
    error: state.error,
    newArticle: state.newArticle,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCloseSuccessWin: () => {
      dispatch(finishArticleCreation())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList)
