import { connect } from 'react-redux'

import ArticleItem from '../components/ArticleItem'
import {
  fetchArticle,
  deleteArticle,
  updateAuthError,
  updateArticleItemError,
  makeFavoriteShortArticle,
  makeUnfavoriteShortArticle,
  makeFavoriteFullArticle,
  makeUnfavoriteFullArticle,
} from '../redux/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    article: ownProps.article,
    itemId: ownProps.itemId,
    curArticle: state.curArticle,
    profileUsername: state.curProfile.username,
    articleItemError: state.errors.articleItemError,
    authError: state.errors.authError,
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
    resetErrors: () => {
      dispatch(updateArticleItemError(null))
      dispatch(updateAuthError(null))
    },
    makeFavoriteShortArticle: (slug) => {
      dispatch(makeFavoriteShortArticle(slug))
    },
    makeUnfavoriteShortArticle: (slug) => {
      dispatch(makeUnfavoriteShortArticle(slug))
    },
    makeFavoriteFullArticle: (slug) => {
      dispatch(makeFavoriteFullArticle(slug))
    },
    makeUnfavoriteFullArticle: (slug) => {
      dispatch(makeUnfavoriteFullArticle(slug))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleItem)
