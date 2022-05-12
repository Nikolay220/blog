import fetch from 'cross-fetch'

import GetArticlesError from '../../Errors/GetArticlesError'
class BlogApiService {
  constructor() {
    this._searchId = null
  }

  async getArticles() {
    try {
      let data = null
      const response = await fetch('https://kata.academy:8021/api/articles?limit=5')
      if (response.ok) {
        data = await response.json()
        return data
      } else {
        throw new GetArticlesError(response.ok)
      }
    } catch (error) {
      throw new GetArticlesError(error.message)
    }
  }
}
export default BlogApiService
