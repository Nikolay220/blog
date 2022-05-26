export default class SessionStorageService {
  static setToken(token) {
    sessionStorage.setItem('token', token)
  }
  static getToken() {
    return sessionStorage.getItem('token')
  }
  static setTitle(title) {
    sessionStorage.setItem('title', title)
  }
  static setDescription(description) {
    sessionStorage.setItem('description', description)
  }
  static setBody(body) {
    sessionStorage.setItem('body', body)
  }
  static getTitle() {
    return sessionStorage.getItem('title')
  }
  static getDescription() {
    return sessionStorage.getItem('description')
  }
  static getBody() {
    return sessionStorage.getItem('body')
  }
  static removeArticle() {
    sessionStorage.removeItem('title')
    sessionStorage.removeItem('description')
    sessionStorage.removeItem('body')
  }
  static clearStorage() {
    sessionStorage.clear()
  }
}
