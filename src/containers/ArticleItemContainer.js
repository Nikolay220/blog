import { connect } from 'react-redux'

import ArticleItem from '../components/ArticleItem'
import { fetchArticle, deleteArticle } from '../redux/actions'

const mapStateToProps = (state, ownProps) => {
  // eslint-disable-next-line no-debugger
  debugger
  return {
    article: ownProps.article,
    itemId: ownProps.itemId,
    fetching: state.commonFetching,
    curArticle: state.curArticle,
    profileUsername: state.curProfile.username,
    error: state.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticle: (slug) => {
      return dispatch(fetchArticle(slug))
    },
    deleteArticle: (slug) => {
      return dispatch(deleteArticle(slug))
    },
    // onCloseErrorWin: () => {
    //   dispatch(updateError(null))
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleItem)
