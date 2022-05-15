import { connect } from 'react-redux'

import ArticlesList from '../components/ArticlesList'

const mapStateToProps = (state) => {
  return {
    articles: state.articles.articles,
    fetching: state.commonFetching,
    error: state.error,
  }
}

export default connect(mapStateToProps)(ArticlesList)
