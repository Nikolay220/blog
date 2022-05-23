import React, { useMemo } from 'react'
import { Alert, Button } from 'antd'
// import { Link, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'

import SessionStorageService from '../../services/SessionStorageService'
import SignUpError from '../../Errors/SignUpError'
import AppController from '../../services/AppController'

import classes from './Forms.module.scss'

export default function NewArticle({ blog_service, onError, serverErr, onAuth }) {
  // const checkboxCont = useRef(null)
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm()

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
      <Alert
        style={{ maxWidth: '504px', margin: 'auto', marginTop: '10px' }}
        message="Error"
        description={'Recommendations: ' + serverErr.checksRecommendations + '. Mess:' + serverErr.message + '.  Error name: ' + serverErr.name + '.  Error stack: ' + serverErr.stack}
        type="error"
        error={serverErr.message}
      />
    )
  // if (username) return <Redirect to="/" />
  return (
    <div className={f('form form__newArticle')}>
      <div className={f('form-header')}>Create new article</div>
      <form onSubmit={handleSubmit(onSubmit)} className={f('form__form')}>
        <label className={f('form__label')} htmlFor="title">
          <div>Title</div>
          <input
            {...register('title', {
              required: 'This input is required.',
            })}
            placeholder="Title"
            className={f(
              'form__input input__newArticle ' +
                classNames({
                  'input__newArticle--invalid': Boolean(errors.title),
                })
            )}
            id="title"
            type="text"
          />
        </label>
        {errors.title && <p className={f('error-mess')}>{errors.title.message}</p>}
        <label className={f('form__label')} htmlFor="description">
          <div>Short description</div>
          <input
            {...register('description', {
              required: 'This input is required.',
            })}
            placeholder="Title"
            className={f(
              'form__input input__newArticle ' +
                classNames({
                  'input__newArticle--invalid': Boolean(errors.description),
                })
            )}
            id="description"
            type="text"
          />
        </label>
        {errors.description && <p className={f('error-mess')}>{errors.description.message}</p>}
        <label className={f('form__label')} htmlFor="body">
          <div>Text</div>
          <textarea
            {...register('body', {
              required: 'This input is required.',
            })}
            placeholder="Text"
            className={f(
              'form__input form__textarea input__newArticle ' +
                classNames({
                  'input__newArticle--invalid': Boolean(errors.body),
                })
            )}
            id="body"
            type="text"
          />
        </label>
        {errors.body && <p className={f('error-mess')}>{errors.body.message}</p>}
        <label className={f('form__label')} htmlFor="tag">
          Tags
        </label>
        <div>
          <input className={f('form__input input__tag')} type="text" value="default" disabled />
          <Button ghost danger className={f('btn btn__delete')} type="primary">
            Delete
          </Button>
        </div>
        <div>
          <input className={f('form__input input__tag')} type="text" id="tag" name="tag" placeholder="Tag" />
          <Button ghost danger className={f('btn btn__delete')} type="primary">
            Delete
          </Button>
          <Button ghost danger className={f('btn btn__add-tag')} type="primary">
            Add tag
          </Button>
        </div>

        <Button className={f('form__btn btn__send')} type="primary" block>
          <input type="submit" value="Send"></input>
        </Button>
      </form>
    </div>
  )
}
