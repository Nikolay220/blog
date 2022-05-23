import { connect } from 'react-redux'

import NewArticle from '../components/Forms/NewArticle'
import { createArticle } from '../redux/actions'

const mapStateToProps = (state) => {
  // eslint-disable-next-line no-debugger
  debugger
  return {
    // article: ownProps.article,
    // itemId: ownProps.itemId,
    // fetching: state.commonFetching,
    // profileUsername: state.curProfile.username,
    newArticle: state.newArticle,
    serverErr: state.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchArticle: (slug) => {
    //   return dispatch(fetchArticle(slug))
    // },
    createArticle: (article) => {
      return dispatch(createArticle(article))
    },
    onCloseSuccessWin: () => {},
    // onCloseErrorWin: () => {
    //   dispatch(updateError(null))
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle)
