import React, { useEffect, useMemo } from 'react'
import format from 'date-fns/format'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import AppController from '../../services/AppController'
import CustomSpinner from '../CustomSpinner'

import classes from './ArticleItem.module.scss'
let id = 1
export default function ArticleItem({ article, itemId, fetchArticle, fetching, curArticle }) {
  let localArticle = itemId ? (curArticle ? curArticle.article : article) : article

  let {
    slug,
    title,
    tagList,
    favoritesCount,
    description,
    createdAt,
    author: { username, image },
    body,
  } = localArticle
  const f = useMemo(() => {
    let contr = new AppController(classes)
    return contr.classesToCssModulesFormat.bind(contr)
  }, [])
  const tagsMarkup = useMemo(() => {
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
  }, [])
  const date = useMemo(() => {
    return new Date(createdAt)
  }, [])

  useEffect(() => {
    if (itemId) fetchArticle(itemId)
  }, [itemId])

  let shortItem = (
    <div className={f('article-item')}>
      <div className={f('article-item-header')}>
        <div className={f('article-item__leftCol')}>
          <div className={f('aligned-row')}>
            <Link to={`/articles/${slug}`} className={f('article-title')}>
              {title}
            </Link>
            <span className={f('article-likes')}>
              <img src="/images/heart.png" alt="" style={{ marginBottom: '5px' }} />
            </span>
            <span className={f('favorites-count')}>{favoritesCount}</span>
          </div>
          <div className={f('article-tags')}>{tagsMarkup}</div>
        </div>
        <div className={f('article-item__rightCol')}>
          <div style={{ marginRight: '12px', textAlign: 'right' }}>
            <div className={f('author_name')}>{username}</div>
            <div className={f('article_created')}>{format(date, 'PP')}</div>
          </div>
          <img className={f('author-image')} src={image} alt="" />
        </div>
      </div>
      <div className={f('article-description')}>{description}</div>
    </div>
  )

  let fullItem = (
    <div className={f('article-item article-item--full')}>
      <div className={f('article-item-header')}>
        <div className={f('article-item__leftCol')}>
          <div className={f('aligned-row')}>
            <Link to={`/articles/${slug}`} className={f('article-title')}>
              {title}
            </Link>
            <span className={f('article-likes')}>
              <img src="/images/heart.png" alt="" style={{ marginBottom: '5px' }} />
            </span>
            <span className={f('favorites-count')}>{favoritesCount}</span>
          </div>
          <div className={f('article-tags')}>{tagsMarkup}</div>
        </div>
        <div className={f('article-item__rightCol')}>
          <div style={{ marginRight: '12px', textAlign: 'right' }}>
            <div className={f('author_name')}>{username}</div>
            <div className={f('article_created')}>{format(date, 'PP')}</div>
          </div>
          <img className={f('author-image')} src={image} alt="" />
        </div>
      </div>
      <div className={f('article-description')}>{description}</div>
      <div className={f('article-body')}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  )
  if (fetching) return <CustomSpinner />
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
