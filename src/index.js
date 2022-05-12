import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { Offline, Online } from 'react-detect-offline'
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux'
import { Alert } from 'antd'

import app from './redux/reducers'
import '@babel/polyfill'
import App from './components/App'
import { fetchArticles } from './redux/actions'

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose
const store = createStore(app, composeEnhancers(applyMiddleware(thunkMiddleware)))
store.dispatch(fetchArticles())
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.Fragment>
    <Offline>
      <Alert message="Error" description={'Recommendation: you are offline, check your internet connection.'} type="error" showIcon />
    </Offline>
    <Online>
      <Provider store={store}>
        <App />
      </Provider>
    </Online>
  </React.Fragment>
)
