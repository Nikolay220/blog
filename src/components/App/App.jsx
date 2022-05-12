import React from 'react'

// import CustomSpinner from '../CustomSpinner'
import Header from '../Header'

import 'antd/dist/antd.min.css'
import classes from './App.module.scss'
import ArticlesList from '../ArticlesList'

export default function App() {
  return (
    <div className={classes['app']}>
      {/* <CustomSpinner /> */}
      <Header />
      <ArticlesList />
    </div>
  )
}
