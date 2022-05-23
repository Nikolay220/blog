import React, { useCallback, useEffect } from 'react'
import { Alert } from 'antd'

import CustomSpinner from '../CustomSpinner'
import ArticleItemContainer from '../../containers/ArticleItemContainer'
const articlesPerPage = 5
let id = 1
export default function ArticlesList({ newArticle, articles, fetching, error, onCloseSuccessWin }) {
  let generateArticlesList = useCallback((articles) => {
    let articlesItems = []
    for (let i = 0; i < articlesPerPage; i++) articlesItems.push(<ArticleItemContainer key={++id} article={articles[i]} />)
    return articlesItems
  }, [])

  useEffect(() => {
    return () => onCloseSuccessWin()
  }, [])

  if (error)
    return (
      <Alert
        style={{ maxWidth: '504px', margin: 'auto', marginTop: '10px' }}
        message="Error"
        description={'Recommendations: ' + error.checksRecommendations + '. Mess:' + error.message + '.  Error name: ' + error.name + '.  Error stack: ' + error.stack}
        type="error"
        error={error.message}
      />
    )
  if (fetching) return <CustomSpinner />
  return (
    <div>
      {newArticle.isCreated && (
        <Alert
          style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: '5' }}
          message="New article is created"
          type="success"
          showIcon
          closable
          onClose={onCloseSuccessWin}
        />
      )}
      {generateArticlesList(articles)}
    </div>
  )
}
