import React, { useCallback, useEffect } from 'react'
import { Alert } from 'antd'
import { v4 as uuidv4 } from 'uuid'

import CustomSpinner from '../CustomSpinner'
import ArticleItemContainer from '../../containers/ArticleItemContainer'

const articlesPerPage = 5
export default function ArticlesList({ fetchArticles, curPage, articles, fetching, error, onCloseSuccessWin }) {
  let generateArticlesList = useCallback((articles) => {
    let articlesItems = []
    for (let i = 0; i < articlesPerPage; i++) articlesItems.push(<ArticleItemContainer key={uuidv4()} article={articles[i]} />)
    return articlesItems
  }, [])

  useEffect(() => {
    fetchArticles(curPage)
    return () => onCloseSuccessWin()
  }, [onCloseSuccessWin, fetchArticles, curPage])

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
  return <div>{generateArticlesList(articles)}</div>
}
