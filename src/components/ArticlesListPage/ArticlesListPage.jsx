import React from 'react'

import ArticlesListContainer from '../../containers/ArticlesListContainer'
import PaginatorContainer from '../../containers/PaginatorContainer'

export default function ArticlesListPage() {
  return (
    <React.Fragment>
      <ArticlesListContainer />
      <PaginatorContainer />
    </React.Fragment>
  )
}
