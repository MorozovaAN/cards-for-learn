import React, { FC } from 'react'

import s from './NotFound.module.scss'

type NotFoundType = {
  notFound: string
}
export const NotFound: FC<NotFoundType> = ({ notFound }) => {
  return (
    <div className={s.text}>
      {notFound ? (
        <h2>Sorry we didn&apos;t find any results</h2>
      ) : (
        <h2>You don&apos;t have any cards yet. </h2>
      )}
    </div>
  )
}
