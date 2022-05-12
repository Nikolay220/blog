import { connect } from 'react-redux'

import ArticlesList from '../components/ArticlesList'

const mapStateToProps = (state) => {
  return {
    articles: state.articles.articles,
    areFetching: state.articles.areFetching,
    error: state.error,
  }
}

export default connect(mapStateToProps)(ArticlesList)
