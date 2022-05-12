import React, { useMemo } from 'react'
import format from 'date-fns/format'

import AppController from '../../services/AppController/AppController'

import classes from './ArticleItem.module.scss'
let id=1
export default function ArticleItem({ article }) {
  let {
    title,
    tagList,
    favoritesCount,
    description,
    createdAt,
    author: { username },
  } = article

  const f = useMemo(() => {
    let contr = new AppController(classes)
    return contr.classesToCssModulesFormat.bind(contr)
  }, [])
  const tagsMarkup = useMemo(() => {
    let tagsArr = []
    tagList.forEach((element,index) => {
      if(element)
        if(index)
          tagsArr.push(<span key={++id}className={f('tag')}>{element}</span>)
        else
          tagsArr.push(<span key={++id}className={f('tag tag--choosed')}>{element}</span>)
    })
    return tagsArr
  }, [])
  const date=useMemo(()=>{
    return new Date(createdAt)
  },[])
  return (
    <div className={f('articleItem')}>
      <div className={f('articleItem-header')}>
        <div className={f('articleItem__leftCol')}>
          <div className={f('aligned-row')}>
            <span className={f('article-title')}>{title}</span>
            <span className={f('article-likes')}>
              <img src="/images/heart.png" alt="" style={{marginBottom: '5px'}}/>
            </span>
            <span className={f('favorites-count')}>{favoritesCount}</span>          
          </div>
          <div className={f('article-tags')}>{tagsMarkup}</div>        
        </div>
        <div className={f('articleItem__rightCol')}>
          <div style={{marginRight:'12px', textAlign:'right'}}>
            <div className={f('author_name')}>{username}</div>
            <div className={f('article_created')}>{format(date,'PP')}</div>
          </div>
          <img className={f('author-image')} src='/images/author_image.png' alt="" />
        </div>
      </div>
      <div className={f('article-description')}>{description}</div>
    </div>
  )
}
