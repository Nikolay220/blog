import NetworkError from './NetworkError'
export default class SignUpError extends NetworkError {
  constructor(message) {
    super(message)
    this.name = 'SignUpError'
  }
}
