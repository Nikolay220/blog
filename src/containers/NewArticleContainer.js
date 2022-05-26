import { connect } from 'react-redux'

import NewArticle from '../components/Forms/NewArticle'
import { createArticle, updateArticle, fetchArticle, updateError, updateReqState, finishArticleUpdate } from '../redux/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    itemId: ownProps.itemId,
    newArticle: state.newArticle,
    serverErr: state.error,
    curArticle: state.curArticle,
    requestState: state.requestState,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticle: (slug) => {
      return dispatch(fetchArticle(slug))
    },
    createArticle: (article) => {
      return dispatch(createArticle(article))
    },
    updateArticle: (article, slug) => {
      return dispatch(updateArticle(article, slug))
    },
    resetError: () => {
      dispatch(updateError(null))
    },
    hideSuccessWin: () => {
      dispatch(updateReqState(false))
      dispatch(finishArticleUpdate())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle)
