import { connect } from 'react-redux'

import ArticleItem from '../components/ArticleItem'
import { fetchArticle } from '../redux/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    article: ownProps.article,
    itemId: ownProps.itemId,
    fetching: state.commonFetching,
    curArticle: state.curArticle,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticle: (slug) => {
      return dispatch(fetchArticle(slug))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleItem)
