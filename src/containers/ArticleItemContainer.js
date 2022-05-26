import { connect } from 'react-redux'

import ArticleItem from '../components/ArticleItem'
import { fetchArticle, deleteArticle, updateError, makeFavorite, makeUnfavorite } from '../redux/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    article: ownProps.article,
    itemId: ownProps.itemId,
    curArticle: state.curArticle,
    profileUsername: state.curProfile.username,
    error: state.error,
    requestState: state.requestState,
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
    resetError: () => {
      dispatch(updateError(null))
    },
    makeFavorite: (slug) => {
      dispatch(makeFavorite(slug))
    },
    makeUnfavorite: (slug) => {
      dispatch(makeUnfavorite(slug))
    },
    // hideSuccessWin: ()=>{
    //   dispatch(updateReqState(false))
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleItem)
