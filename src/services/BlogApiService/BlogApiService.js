import fetch from 'cross-fetch'

import GetArticlesError from '../../Errors/GetArticlesError'
import GetArticleError from '../../Errors/GetArticleError'
import SessionStorageService from '../SessionStorageService'

class BlogApiService {
  constructor() {
    this._base_url = 'https://kata.academy:8021/api'
    this.token = SessionStorageService.getToken() ? SessionStorageService.getToken() : null
  }
  async createArticle(article) {
    const response = await fetch(`${this._base_url}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${SessionStorageService.getToken()}`,
      },
      body: JSON.stringify({ article }),
    })
    const content = await response.json()

    return content
  }
  async updateArticle(article, slug) {
    const response = await fetch(`${this._base_url}/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${SessionStorageService.getToken()}`,
      },
      body: JSON.stringify({ article }),
    })
    const content = await response.json()
    return content
  }
  async deleteArticle(slug) {
    const response = await fetch(`${this._base_url}/articles?${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${SessionStorageService.getToken()}`,
      },
    })
    return await response.json()
  }
  async getArticles() {
    try {
      const response = await fetch(`${this._base_url}/articles?limit=5`)
      if (response.ok) {
        return await response.json()
      } else {
        throw new GetArticlesError(response.ok)
      }
    } catch (error) {
      throw new GetArticlesError(error.message)
    }
  }

  async getArticle(slug) {
    try {
      const response = await fetch(`${this._base_url}/articles/${slug}`)
      if (response.ok) {
        return await response.json()
      } else {
        throw new GetArticleError(response.ok)
      }
    } catch (error) {
      throw new GetArticleError(error.message)
    }
  }

  async signUpUser(username, email, password) {
    const response = await fetch(`${this._base_url}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user: { username, email, password } }),
    })
    const content = await response.json()

    return content
  }
  async signInUser(email, password) {
    const response = await fetch(`${this._base_url}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user: { email, password } }),
    })
    const content = await response.json()

    return content
  }
  async editProfile(username, email, token, password = null, avatarUrl = null) {
    let obj = { username, email }
    if (password) obj.password = password
    if (avatarUrl) obj.avatarUrl = avatarUrl
    const response = await fetch(`${this._base_url}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ user: obj }),
    })
    const content = await response.json()

    return content
  }
  async getCurUser(token) {
    const response = await fetch(`${this._base_url}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
    return await response.json()
  }

  async makeFavorite(slug) {
    const response = await fetch(`${this._base_url}/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${SessionStorageService.getToken()}`,
      },
    })
    const content = await response.json()

    return content
  }

  async makeUnfavorite(slug) {
    const response = await fetch(`${this._base_url}/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${SessionStorageService.getToken()}`,
      },
    })
    const content = await response.json()
    return content
  }
}
export default BlogApiService
