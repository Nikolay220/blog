import React from 'react'
import { Spin } from 'antd'

import classes from './Header.module.scss'

export default function HeaderWithSpinner() {
  return (
    <div className={classes['header']}>
      <Spin style={{ margin: 'auto' }} />
    </div>
  )
}
