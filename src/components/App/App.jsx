import React from 'react'
import { Redirect, Switch, BrowserRouter as Router, Route } from 'react-router-dom'

// import Header from '../Header'
import 'antd/dist/antd.min.css'
// import ArticlesListContainer from '../../containers/ArticlesListContainer'
// import PaginatorContainer from '../../containers/PaginatorContainer'
import ArticlesListPage from '../ArticlesListPage'

import classes from './App.module.scss'

export default function App() {
  return (
    <div className={classes['app']}>
      <Router>
        <Switch>
          <Route path="/articles" component={ArticlesListPage} />
          <Route path="/" component={ArticlesListPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  )
}
