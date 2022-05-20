import { ADD_BLOG_SERVICE } from '../actions'
export default function blog_service(state = null, action) {
  switch (action.type) {
    case ADD_BLOG_SERVICE:
      return action.blog_service
    default:
      return state
  }
}
