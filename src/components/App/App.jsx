import React, { useEffect } from 'react'
import { Redirect, Switch, BrowserRouter as Router, Route } from 'react-router-dom'

import SignUpContainer from '../../containers/SignUpContainer'
import SignInContainer from '../../containers/SignInContainer'
import ProfileContainer from '../../containers/ProfileContainer'
import Header from '../Headers/Header'
import HeaderWithUsernameContainer from '../../containers/HeaderWithUsernameContainer'
import HeaderWithSpinner from '../Headers/HeaderWithSpinner'
import 'antd/dist/antd.min.css'
import ArticleItemContainer from '../../containers/ArticleItemContainer'
import ArticlesListPage from '../ArticlesListPage'
import SessionStorageService from '../../services/SessionStorageService'
import NewArticleContainer from '../../containers/NewArticleContainer'
import PrivateRoute from '../PrivateRoute'

import classes from './App.module.scss'

export default function App({ username, blogService, onInit, onUserRequest, userIsFetching }) {
  useEffect(() => {
    let savedToken = SessionStorageService.getToken()
    if (savedToken) {
      onUserRequest()
      blogService
        .getCurUser(savedToken)
        .then((response) => {
          if (response.user) onInit(response.user.username)
        })
        .catch(() => {})
    }
  }, [blogService, onInit, onUserRequest])
  return (
    <div className={classes['app']}>
      <Router>
        {!userIsFetching ? username ? <HeaderWithUsernameContainer /> : <Header /> : <HeaderWithSpinner />}
        <Switch>
          <Route
            path="/articles/:id/edit"
            render={({ match }) => {
              const { id } = match.params
              // console.log(id)

              return <NewArticleContainer itemId={id} />
            }}
          />
          <Route
            path="/articles/:id/"
            render={({ match, location, history }) => {
              if (!location.pathname.endsWith('/')) {
                history.push(location.pathname.trim() + '/')
              }
              const { id } = match.params
              return <ArticleItemContainer history={history} itemId={id} />
            }}
          />
          <PrivateRoute path="/new-article" isAuthenticated={SessionStorageService.getToken()}>
            <NewArticleContainer />
          </PrivateRoute>
          {/* <Route path="/new-article" component={NewArticle} /> */}
          <Route path="/articles" component={ArticlesListPage} />
          <Route path="/sign-up" component={SignUpContainer} />
          <Route path="/sign-in" component={SignInContainer} />
          <Route path="/profile" component={ProfileContainer} />
          {/* <Route path="/create-article" component={Profile} />                    */}
          <Route path="/" component={ArticlesListPage} />
          <Route path="/new-article" component={ArticlesListPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  )
}
