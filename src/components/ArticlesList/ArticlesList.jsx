import React, { useCallback } from 'react'
import { Alert } from 'antd'

import CustomSpinner from '../CustomSpinner'
import ArticleItem from '../ArticleItem'
const articlesPerPage = 5
let id = 1
export default function ArticlesList({articles,areFetching, error}) {
  let generateArticlesList = useCallback((articles) => {
    let articlesItems = []
    for (let i = 0; i < articlesPerPage; i++) articlesItems.push(<ArticleItem key={++id} article={articles[i]} />)
    return articlesItems 
  }, [])
  if(error) return <Alert
    style={{ maxWidth: '504px', margin:'auto', marginTop:'10px'}}
    message="Error"
    description={'Recommendations: ' + error.checksRecommendations + '. Mess:' + error.message + '.  Error name: ' + error.name + '.  Error stack: ' + error.stack}
    type="error"
    error={error.message}
  />
  if(areFetching) return <CustomSpinner/>
  return <div>{generateArticlesList(articles)}</div>
}
