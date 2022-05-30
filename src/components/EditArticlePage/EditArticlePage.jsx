import React from 'react'
import { withRouter } from 'react-router-dom'

import NewArticleContainer from '../../containers/NewArticleContainer'

const EditArticlePage = ({ match }) => {
  const { id } = match.params
  return <NewArticleContainer itemId={id} />
}

export default withRouter(EditArticlePage)
