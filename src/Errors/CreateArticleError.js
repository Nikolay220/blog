import NetworkError from './NetworkError'
export default class CreateArticleError extends NetworkError {
  constructor(message) {
    super(message)
    this.name = 'CreateArticleError'
  }
}
