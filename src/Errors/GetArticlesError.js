import NetworkError from './NetworkError'
export default class GetArticlesError extends NetworkError {
  constructor(message) {
    super(message)
    this.name = 'GetArticlesError'
    this.checksRecommendations = 'No articles loaded, reload please. If it will not help, write message with error screenshot to our-company@gmail.com please. '
  }
}
