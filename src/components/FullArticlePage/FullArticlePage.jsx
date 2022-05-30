import React from 'react'
import { withRouter } from 'react-router-dom'

import ArticleItemContainer from '../../containers/ArticleItemContainer'

const FullArticlePage = ({ match, location, history }) => {
  if (!location.pathname.endsWith('/')) {
    history.push(location.pathname.trim() + '/')
  }
  const { id } = match.params
  return <ArticleItemContainer history={history} itemId={id} />
}

export default withRouter(FullArticlePage)
