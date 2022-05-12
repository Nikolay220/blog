import React from 'react'
import { Button } from 'antd'

import classes from './Header.module.scss'
import './Header.scss'

export default function Header() {
  return (
    <div className={classes['header']}>
      <div className={classes['header__left-col']}>Realworld Blog</div>
      <div className={classes['header__right-col']}>
        <Button type="text" className={`${classes['btn']} ${classes['btn__sign-in']}`}>
          Sign In
        </Button>
        <Button type="primary" ghost className={`${classes['btn']} ${classes['btn__sign-up']}`}>
          Sign Up
        </Button>
      </div>
    </div>
  )
}
