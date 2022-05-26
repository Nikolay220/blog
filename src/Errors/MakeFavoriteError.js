import NetworkError from './NetworkError'
export default class MakeFavoriteError extends NetworkError {
  constructor(message) {
    super(message)
    this.name = 'MakeFavoriteError'
  }
}
