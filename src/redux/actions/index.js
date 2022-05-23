import BlogApiService from '../../services/BlogApiService'
import DeleteArticleError from '../../Errors/DeleteArticleError'
import CreateArticleError from '../../Errors/CreateArticleError'

export const CHANGE_SORT_FILTER = 'CHANGE_SORT_FILTER'
export const UPDATE_STOPS_CHECKBOXES = 'UPDATE_STOPS_CHECKBOXES'
export const UPDATE_CHECK_ALL_CHECKBOX = 'UPDATE_CHECK_ALL_CHECKBOX'

export const SIGN_OUT = 'SIGN_OUT'
export function signOut() {
  return {
    type: SIGN_OUT,
  }
}

export const SIGN_IN = 'SIGN_IN'
export function signIn(username, image) {
  return {
    type: SIGN_IN,
    username,
    image,
  }
}

export const CHOOSE_OTHER_PAGE = 'CHOOSE_OTHER_PAGE'
export function chooseOtherPage(page) {
  return {
    type: CHOOSE_OTHER_PAGE,
    page,
  }
}

export const FINISH_ARTICLE_CREATION = 'FINISH_ARTICLE_CREATION'
export function finishArticleCreation() {
  return {
    type: FINISH_ARTICLE_CREATION,
  }
}

export const REQUEST_ARTICLE_CREATION = 'REQUEST_ARTICLE_CREATION'
function requestArticleCreation() {
  return {
    type: REQUEST_ARTICLE_CREATION,
  }
}

export const RECEIVE_ARTICLE_CREATION = 'RECEIVE_ARTICLE_CREATION'
function receiveArticleCreation() {
  return {
    type: RECEIVE_ARTICLE_CREATION,
  }
}

export const REQUEST_ARTICLE_DELETE = 'REQUEST_ARTICLE_DELETE'
function requestArticleDelete() {
  return {
    type: REQUEST_ARTICLE_DELETE,
  }
}

export const RECEIVE_ARTICLE_DELETE = 'RECEIVE_ARTICLE_DELETE'
function receiveArticleDelete() {
  return {
    type: RECEIVE_ARTICLE_DELETE,
  }
}

export const ADD_BLOG_SERVICE = 'ADD_BLOG_SERVICE'
export function addBlogService(blog_service) {
  return {
    type: ADD_BLOG_SERVICE,
    blog_service,
  }
}

export const REQUEST_ARTICLES = 'REQUEST_ARTICLES'
function requestArticles() {
  return {
    type: REQUEST_ARTICLES,
  }
}

export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES'
function receiveArticles(articles) {
  return {
    type: RECEIVE_ARTICLES,
    articles,
  }
}

export const REQUEST_ARTICLE = 'REQUEST_ARTICLE'
function requestArticle() {
  return {
    type: REQUEST_ARTICLE,
  }
}

export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE'
function receiveArticle(curArticle) {
  curArticle.isRemoved = false
  curArticle.isRemoving = false
  return {
    type: RECEIVE_ARTICLE,
    curArticle,
  }
}

export const UPDATE_TOTAL_ARTICLES = 'UPDATE_TOTAL_ARTICLES'
export function updateTotalArticles(totalArticles) {
  return {
    type: UPDATE_TOTAL_ARTICLES,
    totalArticles,
  }
}

export const ERROR_OCCURED = 'ERROR_OCCURED'
export function updateError(error) {
  return { type: ERROR_OCCURED, error }
}

export const UPDATE_USERNAME = 'UPDATE_USERNAME'
export function updateUsername(username) {
  return { type: UPDATE_USERNAME, username }
}

export const UPDATE_REQ_STATE = 'UPDATE_REQ_STATE'
export function updateReqState(value) {
  return { type: UPDATE_REQ_STATE, value }
}

export const REQUEST_USER = 'REQUEST_USER'
export function requestUser() {
  return {
    type: REQUEST_USER,
  }
}

export const RECEIVE_USER = 'RECEIVE_USER'
export function receiveUser() {
  return {
    type: RECEIVE_USER,
  }
}
const apiService = new BlogApiService()

async function getArticles(dispatch) {
  dispatch(requestArticles())
  let articles
  try {
    articles = await apiService.getArticles()
  } catch (error) {
    dispatch(updateError(error))
  }
  dispatch(updateTotalArticles(articles.articlesCount))
  dispatch(receiveArticles(articles.articles))
}

async function getArticle(dispatch, slug) {
  dispatch(requestArticle())
  let article
  try {
    article = await apiService.getArticle(slug)
  } catch (error) {
    dispatch(updateError(error))
  }
  dispatch(receiveArticle(article.article))
}

export function fetchArticles() {
  return (dispatch) => {
    getArticles(dispatch)
  }
}

export function fetchArticle(slug) {
  return (dispatch) => {
    return getArticle(dispatch, slug)
  }
}

export function deleteArticle(slug) {
  return (dispatch) => {
    dispatch(requestArticleDelete())
    apiService.deleteArticle(slug).then(
      (content) => {
        // eslint-disable-next-line no-debugger
        debugger
        if (content.errors) {
          dispatch(updateError(new DeleteArticleError(content.errors.message)))
        } else {
          dispatch(receiveArticleDelete())
        }
      },
      (error) => {
        dispatch(updateError(new DeleteArticleError(error.message)))
      }
    )
  }
}

export function createArticle(article) {
  return (dispatch) => {
    dispatch(requestArticleCreation())
    apiService.createArticle(article).then(
      (content) => {
        // eslint-disable-next-line no-debugger
        debugger
        if (content.errors) {
          dispatch(updateError(new CreateArticleError(content.errors.message)))
        } else {
          dispatch(receiveArticleCreation())
        }
      },
      (error) => {
        dispatch(updateError(new CreateArticleError(error.message)))
      }
    )
  }
}
