import React, { useMemo, useCallback, useState, useRef, useEffect } from 'react'
import { Alert, Button } from 'antd'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { v4 as uuidv4 } from 'uuid'
import { Redirect } from 'react-router-dom'

import AppController from '../../services/AppController'
import CustomSpinner from '../CustomSpinner'
import SessionStorageService from '../../services/SessionStorageService'

import classes from './Forms.module.scss'

export default function NewArticle({ hideSuccessWin, requestState, resetError, updateArticle, itemId, newArticle, serverErr, createArticle, curArticle }) {
  const [tagsList, updateTagsList] = useState(itemId ? (curArticle.article ? curArticle.article.tagList : []) : [])
  const [title, setTitle] = useState(itemId ? (curArticle.article ? curArticle.article.title : SessionStorageService.getTitle(itemId) ? SessionStorageService.getTitle(itemId) : '') : '')
  const [description, setDescription] = useState(
    itemId ? (curArticle.article ? curArticle.article.description : SessionStorageService.getDescription(itemId) ? SessionStorageService.getDescription(itemId) : '') : ''
  )
  const [body, setBody] = useState(itemId ? (curArticle.article ? curArticle.article.body : SessionStorageService.getBody(itemId) ? SessionStorageService.getBody(itemId) : '') : '')
  SessionStorageService.setTitle(title, itemId)
  SessionStorageService.setDescription(description, itemId)
  SessionStorageService.setBody(body, itemId)
  const addTagInput = useRef(null)
  useEffect(() => {
    SessionStorageService.removePrevEditedArticle(itemId)
    return () => {
      hideSuccessWin()
      resetError()
    }
  }, [hideSuccessWin, resetError, itemId])
  const f = useMemo(() => {
    let contr = new AppController(classes)
    return contr.classesToCssModulesFormat.bind(contr)
  }, [])
  let generateTagsRows = useCallback(
    (tagsList) => {
      let tagRows = []
      tagsList.forEach((value, index) => {
        tagRows.push(
          <div key={uuidv4()}>
            <input className={f('form__input input__tag')} type="text" value={value} disabled />
            <Button
              onClick={() => {
                updateTagsList((arr) => {
                  return arr.filter((word, inIndex) => inIndex !== index)
                })
              }}
              ghost
              danger
              className={f('btn btn__delete')}
              type="primary"
            >
              Delete
            </Button>
          </div>
        )
      })
      return tagRows
    },
    [f]
  )
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  if (curArticle.isFetching) return <CustomSpinner />

  const onSubmit = (data) => {
    SessionStorageService.removeArticle(itemId)
    if (itemId) updateArticle({ title: data.title, description: data.description, body: data.body }, itemId)
    else createArticle({ title: data.title, description: data.description, body: data.body, tagList: tagsList })
  }

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
  let updateTagsFields
  if (!itemId)
    updateTagsFields = (
      <React.Fragment>
        <label className={f('form__label')} htmlFor="tag">
          Tags
        </label>
        {tagsList.length > 0 && generateTagsRows(tagsList)}
        <div>
          <input ref={addTagInput} className={f('form__input input__tag')} type="text" id="tag" name="tag" placeholder="Tag" />
          <Button
            onClick={() => {
              addTagInput.current.value = ''
            }}
            ghost
            danger
            className={f('btn btn__delete')}
            type="primary"
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              if (addTagInput.current.value.trim())
                updateTagsList((arr) => {
                  let arrCopy = [...arr]
                  arrCopy.push(addTagInput.current.value.trim())
                  addTagInput.current.value = ''
                  return arrCopy
                })
            }}
            ghost
            danger
            className={f('btn btn__add-tag')}
            type="primary"
          >
            Add tag
          </Button>
        </div>
      </React.Fragment>
    )

  if (newArticle.isCreating || curArticle.isUpdating) return <CustomSpinner />

  return (
    <React.Fragment>
      {requestState && newArticle.isCreated && (
        <React.Fragment>
          <Alert
            style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: '5' }}
            message="Article is created"
            type="success"
            showIcon
            closable
            onClose={hideSuccessWin}
          />
          <Redirect
            to={{
              pathname: '/',
              state: { referrer: '' },
            }}
          />
        </React.Fragment>
      )}
      {requestState && curArticle.isUpdated && (
        <Alert
          style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: '5' }}
          message="Article is updated"
          type="success"
          showIcon
          closable
          onClose={hideSuccessWin}
        />
      )}
      <div className={f('form form__newArticle')}>
        <div className={f('form-header')}>{itemId ? 'Edit article' : 'Create new article'}</div>
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
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                SessionStorageService.setTitle(e.target.value, itemId)
              }}
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
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
                SessionStorageService.setDescription(e.target.value, itemId)
              }}
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
              value={body}
              onChange={(e) => {
                setBody(e.target.value)
                SessionStorageService.setBody(e.target.value, itemId)
              }}
            />
          </label>
          {errors.body && <p className={f('error-mess')}>{errors.body.message}</p>}
          {!itemId && updateTagsFields}
          <Button className={f('form__btn btn__send')} type="primary" block>
            <input type="submit" value="Send"></input>
          </Button>
        </form>
      </div>
    </React.Fragment>
  )
}
