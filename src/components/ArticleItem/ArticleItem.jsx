import React, { useMemo } from 'react'

import AppController from '../../services/AppController/AppController'

import classes from './ArticleItem.module.scss'

export default function ArticleItem({article}) {
  let {title, tagList, favoritesCount, description,  author:{username,image}}=article

  const f = useMemo(() => {
    let contr = new AppController(classes)
    return contr.classesToCssModulesFormat.bind(contr)
  }, [])
  const tagsMarkup = useMemo(()=>{
    let tagsArr=[]
    tagList.forEach(element => {
      tagsArr.push(<span className={f('tag')}>{element}</span>)
    })
    return tagsArr
  },[])
  // const date=useMemo(()=>{
  //   return new Date(updatedAt)
  // },[])
  return(
    <div className={f('articleItem')}>
      <div className={f('articleItem__leftCol')}>
        <div className={f('article-title')}>
          {title}
          <span className={f('article-likes')}><img src="/images/heart.png" alt="" /></span>
          {favoritesCount}
        </div>
        <div className={f('article-tags')}>
          {tagsMarkup}
        </div>
        <div>{description}</div>
      </div>
      <div className={f('articleItem__rightCol')}>
        <div>
          {username}
          {/* {date} */}
        </div>
        <img src={image} alt="" />
      </div>
    </div>
  )
}
