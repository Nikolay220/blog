import React, { useMemo, useRef, useEffect } from 'react'
import { Button, Alert } from 'antd'
import { Link, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'

import SessionStorageService from '../../services/SessionStorageService'
import SignUpError from '../../Errors/SignUpError'
import AppController from '../../services/AppController'

import classes from './Forms.module.scss'

export default function SignUp({ resetError, blog_service, onError, serverErr, onAuth, username }) {
  const checkboxCont = useRef(null)
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm()
  useEffect(() => {
    return () => resetError()
  }, [resetError])
  const onSubmit = (data) => {
    if (data.password2 !== data.password) {
      setError('password2', { type: 'custom', message: 'Passwords must match' })
      return
    }
    blog_service.signUpUser(data.username, data.email, data.password).then(
      (content) => {
        if (content.errors)
          if (content.errors.message) {
            onError(new SignUpError(content.errors.message))
            return
          } else {
            for (const [key, value] of Object.entries(content.errors)) {
              setError(key, { type: 'serverError', message: value })
            }
            return
          }
        SessionStorageService.setToken(content.user.token)
        onAuth(content.user.username, content.user.image)
      },
      (error) => {
        onError(new SignUpError(error.message))
      }
    )
  }
  const f = useMemo(() => {
    let contr = new AppController(classes)
    return contr.classesToCssModulesFormat.bind(contr)
  }, [])
  if (serverErr)
    return (
      <div style={{ width: '100vw', height: '100vh', position: 'fixed', background: 'rgba(0, 0, 0, 0.1)', top: '0', paddingTop: '120px' }}>
        <Alert
          style={{ maxWidth: '504px', margin: 'auto', marginTop: '10px' }}
          message="Error"
          description={'Recommendations: ' + serverErr.checksRecommendations + '. Mess:' + serverErr.message + '.  Error name: ' + serverErr.name + '.  Error stack: ' + serverErr.stack}
          type="error"
          error={serverErr.message}
        />
      </div>
    )
  if (username) return <Redirect to="/" />
  return (
    <div className={f('form')}>
      <div className={f('form-header')}>Create new account</div>
      <form onSubmit={handleSubmit(onSubmit)} className={f('form__form')}>
        <label className={f('form__label')} htmlFor="username">
          <div>Username</div>
          <input
            {...register('username', {
              required: 'This input is required.',
              minLength: {
                value: 3,
                message: 'This input must contain from 3 to 20 characters',
              },
              maxLength: {
                value: 20,
                message: 'This input must contain from 3 to 20 characters',
              },
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
          <div>Password</div>
          <input
            {...register('password', {
              required: 'This input is required.',
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

        <label className={f('form__label')} htmlFor="password2">
          <div>Repeat Password</div>
          <input
            {...register('password2', {
              required: 'This input is required.',
              minLength: {
                value: 6,
                message: 'This input must contain from 6 to 40 characters',
              },
              maxLength: {
                value: 40,
                message: 'This input must contain from 6 to 40 characters',
              },
            })}
            placeholder="Password"
            className={f(
              'form__input ' +
                classNames({
                  'form__input--invalid': Boolean(errors.password2),
                })
            )}
            id="password2"
            type="password"
          />
        </label>
        {errors.password2 && <p className={f('error-mess')}>{errors.password2.message}</p>}
        <div className={f('hor-line')}></div>
        <label className={'ant-checkbox-wrapper ' + f('form__checkbox')} htmlFor="Agreement">
          <span ref={checkboxCont} className="ant-checkbox">
            <input
              {...register('Agreement', {
                required: 'Accept the agreement',
              })}
              onChange={(e) => {
                if (e.target.checked) checkboxCont.current.classList.add('ant-checkbox-checked')
                else checkboxCont.current.classList.remove('ant-checkbox-checked')
              }}
              type="checkbox"
              className="ant-checkbox-input"
              id="Agreement"
            />
            <span className="ant-checkbox-inner"></span>
          </span>
          <span>I agree to the processing of my personal information</span>
        </label>
        {errors.Agreement && <p className={f('error-mess')}>{errors.Agreement.message}</p>}
        <Button className={f('form__btn')} type="primary" block>
          <input type="submit" value="Create"></input>
        </Button>
        <div className={f('form__text')}>
          Already have an account?{' '}
          <Link to="/sign-in" className={f('link')}>
            Sign In
          </Link>
          .
        </div>
      </form>
    </div>
  )
}
