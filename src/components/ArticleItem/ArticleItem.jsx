import React, { useEffect, useMemo, useState } from 'react'
import format from 'date-fns/format'
import { Link, Redirect } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Button, Alert } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'

import AppController from '../../services/AppController'
import CustomSpinner from '../CustomSpinner'

import classes from './ArticleItem.module.scss'
export default function ArticleItem({
  resetErrors,
  makeFavoriteShortArticle,
  makeFavoriteFullArticle,
  makeUnfavoriteShortArticle,
  makeUnfavoriteFullArticle,
  authError,
  articleItemError,
  article,
  itemId,
  history,
  fetchArticle,
  curArticle,
  profileUsername,
  deleteArticle,
}) {
  let localArticle = itemId ? (curArticle.article ? curArticle.article : article) : article
  let {
    slug,
    title,
    tagList,
    favorited,
    favoritesCount,
    description,
    createdAt,
    author: { username, image },
    body,
    isRemoved,
    isRemoving,
  } = localArticle
  const f = useMemo(() => {
    let contr = new AppController(classes)
    return contr.classesToCssModulesFormat.bind(contr)
  }, [])

  const tagsMarkup = () => {
    let tagsArr = []
    tagList.forEach((element, index) => {
      if (element)
        if (index)
          tagsArr.push(
            <span key={uuidv4()} className={f('tag')}>
              {element}
            </span>
          )
        else
          tagsArr.push(
            <span key={uuidv4()} className={f('tag tag--choosed')}>
              {element}
            </span>
          )
    })
    return tagsArr
  }
  const date = useMemo(() => {
    return new Date(createdAt)
  }, [createdAt])
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false)
  useEffect(() => {
    if (itemId) fetchArticle(itemId)
    return () => {
      resetErrors()
    }
  }, [itemId, fetchArticle, resetErrors])

  let shortItem = (
    <div className={f('article-item')}>
      <div className={f('article-item__container')}>
        <div className={f('article-item-header')}>
          <div className={f('article-item-header__row')}>
            <div className={f('article-item__leftCol')}>
              <div className={f('aligned-row')}>
                <Link to={`/articles/${slug}/`} className={f('article-title')}>
                  {title}
                </Link>
                <span
                  onClick={() => {
                    if (!favorited && slug) makeFavoriteShortArticle(slug)
                    else if (favorited && slug) makeUnfavoriteShortArticle(slug)
                  }}
                  className={f('article-likes')}
                >
                  <img src={favorited ? '/images/red-heart.png' : '/images/heart.png'} alt="" style={{ marginBottom: '5px' }} />
                </span>
                <span className={f('favorites-count')}>{favoritesCount}</span>
              </div>
              <div className={f('article-tags')}>{tagsMarkup()}</div>
            </div>
            <div className={f('article-item__rightCol rightCol')}>
              <div className={f('rightCol__first-row')}>
                <div style={{ marginRight: '12px', textAlign: 'right' }}>
                  <div className={f('author_name')}>{username}</div>
                  <div className={f('article_created')}>{format(date, 'PP')}</div>
                </div>
                <img className={f('author-image')} src={image} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className={f('article-description')}>{description}</div>
      </div>
    </div>
  )

  let fullItem = (
    <div className={f('article-item ')}>
      <div className={f('article-item__container article-item--full')}>
        <div className={f('article-item-header')}>
          <div className={f('article-item-header__row article-item-header__row--first')}>
            <div className={f('article-item__leftCol')}>
              <div className={f('aligned-row')}>
                <span className={f('article-title')}>{title}</span>
                <span
                  onClick={() => {
                    if (!favorited && slug) makeFavoriteFullArticle(slug)
                    else if (favorited && slug) makeUnfavoriteFullArticle(slug)
                  }}
                  className={f('article-likes')}
                >
                  <img src={favorited ? '/images/red-heart.png' : '/images/heart.png'} alt="" style={{ marginBottom: '5px' }} />
                </span>
                <span className={f('favorites-count')}>{favoritesCount}</span>
              </div>
              <div className={f('article-tags')}>{tagsMarkup()}</div>
            </div>
            <div className={f('article-item__rightCol rightCol')}>
              <div style={{ marginRight: '12px', textAlign: 'right' }}>
                <div className={f('author_name')}>{username}</div>
                <div className={f('article_created')}>{format(date, 'PP')}</div>
              </div>
              <img className={f('author-image')} src={image} alt="" />
            </div>
          </div>
          <div className={f('article-item-header__row')}>
            <div className={f('article-item__leftCol')}>
              <div className={f('article-description')}>{description}</div>
            </div>
            {profileUsername && (
              <div className={f('article-item__rightCol article-item__btns')}>
                <Button onClick={() => setIsDeleteModalShown(true)} ghost danger className={f('btn btn__delete')}>
                  Delete
                </Button>
                {isDeleteModalShown && (
                  <div className={f('modal modal__on-delete-btn')}>
                    <img src="/images/arrow.png" alt="" className={f('modal__arrow')} />
                    <span style={{ whiteSpace: 'wrap' }}>
                      <ExclamationCircleFilled style={{ color: '#FAAD14' }} /> Are you sure to delete this article?
                    </span>
                    <div className={f('modal__btns')}>
                      <Button onClick={() => setIsDeleteModalShown(false)} type="primary" ghost className={f('modal__btn modal__btn--no')}>
                        No
                      </Button>
                      <Button
                        onClick={() => {
                          setIsDeleteModalShown(false)
                          deleteArticle(slug)
                        }}
                        type="primary"
                        className={f('modal__btn modal__btn--yes')}
                      >
                        Yes
                      </Button>
                    </div>
                  </div>
                )}
                <Button onClick={() => history.push('edit')} type="primary" ghost className={f('btn btn__edit')}>
                  Edit
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className={f('article-body')}>
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
  if (curArticle.isFetching) return <CustomSpinner />
  if (!articleItemError && isRemoving) return <CustomSpinner />
  if (articleItemError)
    return (
      <Alert
        style={{ maxWidth: '504px', margin: 'auto', marginTop: '10px' }}
        message="Error"
        description={
          'Recommendations: ' + articleItemError.checksRecommendations + '. Mess:' + articleItemError.message + '.  Error name: ' + articleItemError.name + '.  Error stack: ' + articleItemError.stack
        }
        type="error"
        error={articleItemError.message}
      />
    )
  if (isRemoved) return <Redirect to="/" />

  return (
    <React.Fragment>
      {authError && (
        <Alert
          style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: '5' }}
          message={authError.checksRecommendations}
          type="warning"
          showIcon
          closable
          onClose={() => resetErrors()}
        />
      )}
      {itemId && fullItem}
      {!itemId && shortItem}
    </React.Fragment>
  )
}

ArticleItem.defaultProps = {
  article: {
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
    createdAt: '2021-11-24T12:11:08.212Z',
    updatedAt: '2021-11-24T12:11:08.212Z',
    favorited: false,
    favoritesCount: 2285,
    author: {
      username: 'Gerome',
      bio: null,
      image: 'https://api.realworld.io/images/demo-avatar.png',
      following: false,
    },
  },
  itemId: '',
  fetchArticle: false,
}
