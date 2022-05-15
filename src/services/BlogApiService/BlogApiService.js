import fetch from 'cross-fetch'

import GetArticlesError from '../../Errors/GetArticlesError'
import GetArticleError from '../../Errors/GetArticleError'

class BlogApiService {
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

  async getArticle(slug) {
    try {
      let data = null
      const response = await fetch(`https://kata.academy:8021/api/articles/${slug}`)
      if (response.ok) {
        data = await response.json()
        return data.article
      } else {
        throw new GetArticleError(response.ok)
      }
    } catch (error) {
      throw new GetArticleError(error.message)
    }
  }
}
export default BlogApiService
