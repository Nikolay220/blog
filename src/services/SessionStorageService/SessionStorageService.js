export default class SessionStorageService {
  static setToken(token) {
    sessionStorage.setItem('token', token)
  }
  static getToken() {
    return sessionStorage.getItem('token')
  }
  static setEditedArticle(article_id, article) {
    sessionStorage.setItem('art_' + article_id, article)
  }
  static getEditedArticle(article_id) {
    return sessionStorage.getItem('art_' + article_id)
  }
  static setArticleField(article_id, field, field_value) {
    let article = SessionStorageService.getEditedArticle(article_id)
    if (article) article = JSON.parse(article)
    else article = {}
    article[field] = field_value
    SessionStorageService.setEditedArticle(article_id, JSON.stringify(article))
  }

  static setTitle(title, article_id) {
    SessionStorageService.setArticleField(article_id, 'title', title)
  }

  static setDescription(description, article_id) {
    SessionStorageService.setArticleField(article_id, 'description', description)
  }
  static setBody(body, article_id) {
    SessionStorageService.setArticleField(article_id, 'body', body)
  }

  static getArticleField(article_id, field) {
    let article = SessionStorageService.getEditedArticle(article_id)
    if (article) {
      article = JSON.parse(article)
      return article[field]
    } else return null
  }
  static getTitle(article_id) {
    return SessionStorageService.getArticleField(article_id, 'title')
  }
  static getDescription(article_id) {
    return SessionStorageService.getArticleField(article_id, 'description')
  }
  static getBody(article_id) {
    return SessionStorageService.getArticleField(article_id, 'body')
  }
  static removeArticle(article_id) {
    sessionStorage.removeItem('art_' + article_id)
  }
  static removePrevEditedArticle(article_id) {
    for (let i = 0; i < sessionStorage.length; i++) if (sessionStorage.key(i).startsWith('art_') && sessionStorage.key(i) !== 'art_' + article_id) sessionStorage.removeItem(sessionStorage.key(i))
  }
  static clearStorage() {
    sessionStorage.clear()
  }
}
