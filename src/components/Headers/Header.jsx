import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

import classes from './Header.module.scss'

export default function Header() {
  return (
    <div className={classes['header']}>
      <Link to="/">
        <div className={classes['header__left-col']}>Realworld Blog</div>
      </Link>
      <div className={classes['header__right-col']}>
        <Button type="text" className={`${classes['btn']} ${classes['btn__sign-in']}`}>
          <Link to="/sign-in">Sign In</Link>
        </Button>
        <Button type="primary" ghost className={`${classes['btn']} ${classes['btn__sign-up']}`}>
          <Link to="/sign-up">Sign Up</Link>
        </Button>
      </div>
    </div>
  )
}
