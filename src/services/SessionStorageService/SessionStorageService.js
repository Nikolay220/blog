export default class SessionStorageService {
  static setToken(token) {
    sessionStorage.setItem('token', token)
  }
  static getToken() {
    return sessionStorage.getItem('token')
  }
  static clearStorage() {
    sessionStorage.clear()
  }
}
