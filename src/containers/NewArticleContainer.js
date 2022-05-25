import { connect } from 'react-redux'

import NewArticle from '../components/Forms/NewArticle'
import { createArticle, updateArticle, fetchArticle, updateError } from '../redux/actions'

const mapStateToProps = (state, ownProps) => {
  // eslint-disable-next-line no-debugger
  debugger
  return {
    // article: ownProps.article,
    itemId: ownProps.itemId,
    // profileUsername: state.curProfile.username,
    newArticle: state.newArticle,
    serverErr: state.error,
    curArticle: state.curArticle,
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
    onCloseSuccessWin: () => {},
    resetError: () => {
      dispatch(updateError(null))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle)
