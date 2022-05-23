import { combineReducers } from 'redux'

import curPage from './curPage'
import articles from './articles'
import error from './error'
import curArticle from './curArticle'
import commonFetching from './commonFetching'
import curProfile from './curProfile'
import blog_service from './blog_service'
import requestState from './requestState'
import newArticle from './newArticle'
const app = combineReducers({
  curPage,
  articles,
  curArticle,
  error,
  commonFetching,
  curProfile,
  blog_service,
  requestState,
  newArticle,
})
export default app
