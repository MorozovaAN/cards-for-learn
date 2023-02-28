import React, { FC } from 'react'

import s from './NotFound.module.scss'

type NotFoundProps = {
  notFound: string
}
export const NotFound: FC<NotFoundProps> = ({ notFound }) => {
  return (
    <div className={s.text}>
      {notFound ? (
        <h2>Sorry we didn&apos;t find any results</h2>
      ) : (
        <h2>You don&apos;t have any cards yet. Create them quickly.</h2>
      )}
    </div>
  )
}
