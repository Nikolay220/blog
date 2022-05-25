import { combineReducers } from 'redux'

import curPage from './curPage'
import articles from './articles'
import error from './error'
import curArticle from './curArticle'
import curProfile from './curProfile'
import blog_service from './blog_service'
import requestState from './requestState'
import newArticle from './newArticle'
const app = combineReducers({
  curPage,
  articles,
  curArticle,
  error,
  curProfile,
  blog_service,
  requestState,
  newArticle,
})
export default app
