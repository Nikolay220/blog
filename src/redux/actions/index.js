import BlogApiService from '../../services/BlogApiService'
export const CHANGE_SORT_FILTER = 'CHANGE_SORT_FILTER'
export const UPDATE_STOPS_CHECKBOXES = 'UPDATE_STOPS_CHECKBOXES'
export const UPDATE_CHECK_ALL_CHECKBOX = 'UPDATE_CHECK_ALL_CHECKBOX'

export const CHOOSE_OTHER_PAGE = 'CHOOSE_OTHER_PAGE'
export function chooseOtherPage(page) {
  return {
    type: CHOOSE_OTHER_PAGE,
    page,
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

export function fetchArticles() {
  return (dispatch) => {
    getArticles(dispatch)
  }
}
