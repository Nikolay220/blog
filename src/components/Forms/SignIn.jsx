import React, { useMemo, useEffect } from 'react'
import { Button, Alert } from 'antd'
import { Link, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'

import SessionStorageService from '../../services/SessionStorageService'
import SignInError from '../../Errors/SignInError'
import AppController from '../../services/AppController'

import classes from './Forms.module.scss'

export default function SignIn({ blog_service, onError, onClose, onAuth, serverErr, username }) {
  useEffect(() => {
    return () => {
      onClose()
    }
  }, [onClose])
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const f = useMemo(() => {
    let contr = new AppController(classes)
    return contr.classesToCssModulesFormat.bind(contr)
  }, [])
  const onSubmit = (data) => {
    blog_service.signInUser(data.email.toLowerCase(), data.password).then(
      (content) => {
        if (content.errors)
          if (content.errors['email or password']) {
            onError(new SignInError('Email or password is invalid'))
            return
          } else {
            onError(new SignInError('sign in error'))
            return
          }
        SessionStorageService.setToken(content.user.token)
        onAuth(content.user.username, content.user.image)
      },
      (error) => {
        onError(new SignInError(error.message))
      }
    )
  }

  if (username) return <Redirect to="/" />
  return (
    <React.Fragment>
      {serverErr && (
        <Alert
          style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: '5' }}
          message="Error"
          description={serverErr.message}
          type="error"
          closable
          onClose={onClose}
        />
      )}
      <div
        className={f(
          'form form__sign-in ' +
            classNames({
              'form--hidden': Boolean(serverErr),
            })
        )}
      >
        <div className={f('form-header')}>Sign In</div>
        <form className={f('form__form')} onSubmit={handleSubmit(onSubmit)}>
          <label className={f('form__label')} htmlFor="email">
            <div>Email address</div>
            <input
              {...register('email', {
                required: 'This input is required.',
                pattern: {
                  // eslint-disable-next-line no-useless-escape
                  value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                  message: 'Email must be correct', // JS only: <p>error message</p> TS only support string
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
            <div>Password</div>
            <input
              {...register('password', {
                required: 'This input is required.',
              })}
              type="password"
              placeholder="Password"
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

          <Button className={f('form__btn form__btn--sign-in')} type="primary" block>
            <input type="submit" value="Login"></input>
          </Button>
          <div className={f('form__text')}>
            Don’t have an account?{' '}
            <Link to="/sign-up" className={f('link')}>
              Sign Up
            </Link>
            .
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}
