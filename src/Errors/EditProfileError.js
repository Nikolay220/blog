import NetworkError from './NetworkError'
export default class EditProfileError extends NetworkError {
  constructor(message) {
    super(message)
    this.name = 'EditProfileError'
  }
}
