import NetworkError from './NetworkError'
export default class DeleteArticleError extends NetworkError {
  constructor(message) {
    super(message)
    this.name = 'DeleteArticleError'
  }
}
