import React, { useMemo, useEffect } from 'react'
import { Button, Alert } from 'antd'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'

import useProfile from '../../containers/useProfile'
import AppController from '../../services/AppController'
import SessionStorageService from '../../services/SessionStorageService'

import classes from './Forms.module.scss'
const Profile = React.memo(function Profile() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm()

  const { resetValidationErrors, editProfile, hideErrorWin, hideSuccessWin, serverErr, curProfile, requestState } = useProfile()

  useEffect(() => {
    if (curProfile.errors)
      for (const [key, value] of Object.entries(curProfile.errors)) {
        setError(key, { type: 'serverError', message: value })
      }
    return () => {
      hideSuccessWin()
      hideErrorWin()
      resetValidationErrors()
    }
  }, [curProfile.errors, hideErrorWin, hideSuccessWin, resetValidationErrors, setError])

  const f = useMemo(() => {
    let contr = new AppController(classes)
    return contr.classesToCssModulesFormat.bind(contr)
  }, [])

  const onSubmit = (data) => {
    resetValidationErrors()
    editProfile(data.username, data.email, SessionStorageService.getToken(), data.password, data.avatar)
  }

  return (
    <React.Fragment>
      {serverErr && (
        <Alert
          style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: '5' }}
          message="Error"
          description={serverErr.message}
          type="error"
          closable
          onClose={() => hideErrorWin()}
        />
      )}
      {requestState && (
        <Alert
          style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: '5' }}
          message="Profile edited"
          type="success"
          showIcon
          closable
          onClose={() => hideSuccessWin()}
        />
      )}
      <div
        className={f(
          'form form__profile ' +
            classNames({
              'form--hidden': Boolean(serverErr || requestState),
            })
        )}
      >
        <div className={f('form-header')}>Edit Profile</div>
        <form onSubmit={handleSubmit(onSubmit)} className={f('form__form')}>
          <label className={f('form__label')} htmlFor="username">
            <div>Username</div>
            <input
              {...register('username', {
                required: 'This input is required.',
              })}
              placeholder="Username"
              className={f(
                'form__input ' +
                  classNames({
                    'form__input--invalid': Boolean(errors.username),
                  })
              )}
              id="username"
              type="text"
            />
          </label>
          {errors.username && <p className={f('error-mess')}>{errors.username.message}</p>}
          <label className={f('form__label')} htmlFor="email">
            <div>Email address</div>
            <input
              {...register('email', {
                required: 'This input is required.',
                pattern: {
                  // eslint-disable-next-line no-useless-escape
                  value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                  message: 'Email must be correct',
                },
              })}
              placeholder="Email address"
              className={f(
                'form__input ' +
                  classNames({
                    'form__input--invalid': Boolean(errors.email),
                  })
              )}
              id="email"
              type="text"
            />
          </label>
          {errors.email && <p className={f('error-mess')}>{errors.email.message}</p>}
          <label className={f('form__label')} htmlFor="password">
            <div>New password</div>
            <input
              {...register('password', {
                minLength: {
                  value: 6,
                  message: 'This input must contain from 6 to 40 characters',
                },
                maxLength: {
                  value: 40,
                  message: 'This input must contain from 6 to 40 characters',
                },
              })}
              type="password"
              placeholder="New password"
              className={f(
                'form__input ' +
                  classNames({
                    'form__input--invalid': Boolean(errors.password),
                  })
              )}
              id="password"
            />
          </label>
          {errors.password && <p className={f('error-mess')}>{errors.password.message}</p>}
          <label className={f('form__label')} htmlFor="avatar">
            <div>Avatar image (url)</div>
            <input
              {...register('avatar', {
                pattern: {
                  value: /^(http|https):\/\/[^ "]+$/,
                  message: 'Input correct URL',
                },
              })}
              placeholder="Avatar image"
              className={f(
                'form__input ' +
                  classNames({
                    'form__input--invalid': Boolean(errors.avatar),
                  })
              )}
              id="avatar"
              type="text"
            />
          </label>
          {errors.avatar && <p className={f('error-mess')}>{errors.avatar.message}</p>}

          <Button className={f('form__btn form__btn--profile')} type="primary" block>
            <input type="submit" value="Save"></input>
          </Button>
        </form>
      </div>
    </React.Fragment>
  )
})

export default Profile
