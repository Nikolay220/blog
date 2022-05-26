import NetworkError from './NetworkError'
export default class MakeFavoriteError extends NetworkError {
  constructor(message) {
    super(message)
    this.name = 'MakeFavoriteError'
    this.checksRecommendations = 'You can leave likes only after authentication. Sign in or sign up please.'
  }
}
