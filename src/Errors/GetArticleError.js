import NetworkError from './NetworkError'
export default class GetArticleError extends NetworkError {
  constructor(message) {
    super(message)
    this.name = 'GetArticleError'
    this.checksRecommendations = 'Article is not loaded, reload please. If it will not help, write message with error screenshot to our-company@gmail.com please. '
  }
}
