import React from 'react'
import {Alert} from 'antd'

import ArticlesListContainer from '../../containers/ArticlesListContainer'
import PaginatorContainer from '../../containers/PaginatorContainer'

export default function ArticlesListPage({location}) {
  return (
    <React.Fragment>
      {location.state && <Alert
        style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: '5' }}
        message="Article is created"
        type="success"
        showIcon
        closable
      />}
      <ArticlesListContainer />
      <PaginatorContainer />
    </React.Fragment>
  )
}
