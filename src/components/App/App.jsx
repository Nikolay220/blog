import React, { useEffect } from 'react'
import { Redirect, Switch, BrowserRouter as Router, Route } from 'react-router-dom'

import SignUpContainer from '../../containers/SignUpContainer'
import SignInContainer from '../../containers/SignInContainer'
import Profile from '../Forms/Profile'
import Header from '../Headers/Header'
import HeaderWithUsernameContainer from '../../containers/HeaderWithUsernameContainer'
import HeaderWithSpinner from '../Headers/HeaderWithSpinner'
import 'antd/dist/antd.min.css'
import ArticlesListPage from '../ArticlesListPage'
import EditArticlePage from '../EditArticlePage'
import FullArticlePage from '../FullArticlePage'
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
          <PrivateRoute path="/articles/:id/edit" isAuthenticated={SessionStorageService.getToken()}>
            <EditArticlePage />
          </PrivateRoute>
          <Route path="/articles/:id/" component={FullArticlePage}/>
          <PrivateRoute path="/new-article" isAuthenticated={SessionStorageService.getToken()}>
            <NewArticleContainer />
          </PrivateRoute>
          <Route path="/articles" component={ArticlesListPage} />
          <Route path="/sign-up" component={SignUpContainer} />
          <Route path="/sign-in" component={SignInContainer} />
          <PrivateRoute path="/profile" isAuthenticated={SessionStorageService.getToken()}>
            <Profile/>
          </PrivateRoute>
          <Route path="/" component={ArticlesListPage} />          
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  )
}
