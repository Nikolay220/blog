import { connect } from 'react-redux'

import { chooseOtherPage, fetchArticles } from '../redux/actions'
import Paginator from '../components/Paginator'

const mapStateToProps = (state) => {
  return {
    curPage: state.curPage,
    totalArticles: state.articles.totalArticles,
    error: state.error,
    articleItemError: state.errors.articleItemError,
    articleListError: state.errors.articleListError,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onCurPageChange: (new_page) => {
      dispatch(chooseOtherPage(new_page))
      dispatch(fetchArticles())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginator)
