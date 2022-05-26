import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { editProfile, updateError, updateUsername, updateReqState, updateValidationErrors } from '../redux/actions'
export default function useProfile() {
  const dispatch = useDispatch()
  return {
    addValidationErrors: useCallback((errors) => dispatch(updateValidationErrors(errors)), [dispatch]),
    resetValidationErrors: useCallback(() => dispatch(updateValidationErrors(null)), [dispatch]),
    editProfile: useCallback((username, email, token, password, avatarUrl) => dispatch(editProfile(username, email, token, password, avatarUrl)), [dispatch]),
    onError: useCallback((error) => dispatch(updateError(error)), [dispatch]),
    hideErrorWin: useCallback(() => dispatch(updateError(null)), [dispatch]),
    onUsernameUpdate: useCallback((username) => dispatch(updateUsername(username)), [dispatch]),
    onSuccess: useCallback(() => dispatch(updateReqState(true)), [dispatch]),
    hideSuccessWin: useCallback(() => dispatch(updateReqState(false)), [dispatch]),
    blog_service: useSelector((state) => state.blog_service),
    serverErr: useSelector((state) => state.error),
    curProfile: useSelector((state) => state.curProfile),
    requestState: useSelector((state) => state.requestState),
  }
}
