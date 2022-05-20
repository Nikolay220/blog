import NetworkError from './NetworkError'
export default class SignInError extends NetworkError {
  constructor(message) {
    super(message)
    this.name = 'SignInError'
  }
}
