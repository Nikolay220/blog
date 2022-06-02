import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

import classes from './Header.module.scss'

export default function HeaderWithUsername({ signOut, username, image }) {
  return (
    <div className={classes['header']}>
      <Link to="/">
        <div className={classes['header__left-col']}>Realworld Blog</div>
      </Link>
      <div className={classes['header__right-col']}>
        <Button type="primary" ghost className={`${classes['btn']} ${classes['btn__create-article']}`}>
          <Link to="/new-article">Create article</Link>
        </Button>
        <Link style={{ display: 'flex', alignItems: 'center' }} to="/profile">
          <span className={classes['header__username']}>{username}</span>
          <div className={classes['author-image']} style={{ backgroundImage: `url(${image})` }}></div>
        </Link>
        <Button
          onClick={() => {
            signOut()
          }}
          ghost
          className={`${classes['btn']} ${classes['btn__log-out']}`}
        >
          <Link to="/">Log Out</Link>
        </Button>
      </div>
    </div>
  )
}
