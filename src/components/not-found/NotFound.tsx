import React, { FC } from 'react'

import s from './NotFound.module.scss'

type NotFoundType = {
  notFound?: 'notFound'
}

export const NotFound: FC<NotFoundType> = ({ notFound }) => {
  return (
    <div className={s.text}>
      <h2>{notFound ? `Sorry we didn't find any results` : `You don't have any cards yet`}</h2>
    </div>
  )
}
