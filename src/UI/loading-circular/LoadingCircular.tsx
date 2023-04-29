import React from 'react'

import CircularProgress from '@mui/material/CircularProgress'

import s from './CircularProgress.module.scss'

export const LoadingCircular = () => {
  return (
    <div className={s.loaderContainer}>
      <CircularProgress classes={{ root: s.circular }} size={60} />
    </div>
  )
}
