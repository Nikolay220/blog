import React from 'react'
import { Redirect, Switch, BrowserRouter as Router, Route } from 'react-router-dom'

import SignUp from '../SignUp'
import Header from '../Header'
import 'antd/dist/antd.min.css'
// import ArticlesListContainer from '../../containers/ArticlesListContainer'
// import PaginatorContainer from '../../containers/PaginatorContainer'
import ArticleItemContainer from '../../containers/ArticleItemContainer'
import ArticlesListPage from '../ArticlesListPage'

import classes from './App.module.scss'

export default function App() {
  return (
    <div className={classes['app']}>
      <Router>
        <Header />
        <Switch>
          <Route
            path="/articles/:id"
            render={({ match }) => {
              const { id } = match.params
              return <ArticleItemContainer itemId={id} />
            }}
          />
          <Route path="/articles" component={ArticlesListPage} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/" component={ArticlesListPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  )
}
