import React from 'react'
import { Pagination } from 'antd'

import './Paginator.scss'
import styles from './Paginator.module.scss'

export default function Paginator({ curPage, totalArticles, onCurPageChange, error }) {
  if (!error)
    return (
      <div className={styles['paginator-container']}>
        <Pagination
          className={styles['paginator']}
          size="small"
          total={totalArticles}
          showSizeChanger={false}
          defaultPageSize={5}
          onChange={(page) => {
            onCurPageChange(page)
          }}
          current={curPage}
        />
      </div>
    )
}
