import NetworkError from './NetworkError'
export default class UpdateArticleError extends NetworkError {
  constructor(message) {
    super(message)
    this.name = 'UpdateArticleError'
  }
}
