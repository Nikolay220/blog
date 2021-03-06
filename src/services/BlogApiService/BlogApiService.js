import fetch from 'cross-fetch'

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
  async getArticles(curPage) {
    const response = await fetch(`${this._base_url}/articles?limit=5&offset=${(curPage - 1) * 5}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${SessionStorageService.getToken() ? SessionStorageService.getToken() : ''}`,
      },
    })
    if (response.ok) {
      return await response.json()
    } else {
      throw new Error(response.ok)
    }
  }

  async getArticle(slug) {
    const response = await fetch(`${this._base_url}/articles/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${SessionStorageService.getToken() ? SessionStorageService.getToken() : ''}`,
      },
    })
    if (response.ok) {
      return await response.json()
    } else {
      throw new Error(response.ok)
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
  async editProfile(username, email, token, password = null, image = null) {
    let obj = { username, email }
    if (password) obj.password = password
    if (image) obj.image = image
    const response = await fetch(`${this._base_url}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${SessionStorageService.getToken() ? SessionStorageService.getToken() : ''}`,
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
