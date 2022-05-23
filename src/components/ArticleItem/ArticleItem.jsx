import React, { useEffect, useMemo, useState } from 'react'
import format from 'date-fns/format'
import { Link, Redirect } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Button, Alert } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'

import AppController from '../../services/AppController'
import CustomSpinner from '../CustomSpinner'

import classes from './ArticleItem.module.scss'
let id = 1
export default function ArticleItem({ error, article, itemId, history, fetchArticle, fetching, curArticle, profileUsername, deleteArticle }) {
  let localArticle = itemId ? (curArticle ? curArticle : article) : article
  // eslint-disable-next-line no-debugger
  debugger
  let {
    slug,
    title,
    tagList,
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
            <span key={++id} className={f('tag')}>
              {element}
            </span>
          )
        else
          tagsArr.push(
            <span key={++id} className={f('tag tag--choosed')}>
              {element}
            </span>
          )
    })
    return tagsArr
  }
  const date = useMemo(() => {
    return new Date(createdAt)
  }, [])
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false)
  useEffect(() => {
    if (itemId) fetchArticle(itemId)
  }, [itemId])

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
                <span className={f('article-likes')}>
                  <img src="/images/heart.png" alt="" style={{ marginBottom: '5px' }} />
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
                <span className={f('article-title')}>
                  {title}
                </span>
                <span className={f('article-likes')}>
                  <img src="/images/heart.png" alt="" style={{ marginBottom: '5px' }} />
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
                <Button onClick={()=>history.push('edit')} type="primary" ghost className={f('btn btn__edit')}>
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
  if (fetching) return <CustomSpinner />
  if (!error && isRemoving) return <CustomSpinner />
  if (error)
    return (
      <div style={{ width: '100vw', height: '100vh', position: 'fixed', background: 'rgba(0, 0, 0, 0.1)', top: '0', paddingTop: '120px' }}>
        <Alert
          style={{ maxWidth: '504px', margin: 'auto', marginTop: '10px' }}
          message="Error"
          description={'Recommendations: ' + error.checksRecommendations + '. Mess:' + error.message + '.  Error name: ' + error.name + '.  Error stack: ' + error.stack}
          type="error"
          error={error.message}
          // onClose={onCloseErrorWin}
          // closable
        />
      </div>
    )
  if (isRemoved) return <Redirect to="/" />

  return (
    <React.Fragment>
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
