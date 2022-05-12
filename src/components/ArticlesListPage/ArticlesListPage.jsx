import React from 'react'

import Header from '../Header'
import ArticlesListContainer from '../../containers/ArticlesListContainer'
import PaginatorContainer from '../../containers/PaginatorContainer'

export default function ArticlesListPage() {
  return (
    <React.Fragment>
      <Header />
      <ArticlesListContainer />
      <PaginatorContainer />
    </React.Fragment>
  )
}
