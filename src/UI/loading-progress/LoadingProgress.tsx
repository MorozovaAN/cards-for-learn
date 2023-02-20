import { FC } from 'react'

import LinearProgress from '@mui/material/LinearProgress'

import s from './LoadingProgress.module.scss'

type LoadingProgressType = {
  privatePage: boolean
}

export const LoadingProgress: FC<LoadingProgressType> = ({ privatePage }) => {
  const classes = `${s.linearProgress} ${privatePage ? s.linearProgressPrivatePage : ''}`

  return (
    <div className={classes}>
      <LinearProgress classes={{ root: s.progressBar, bar: s.progress }} />
    </div>
  )
}
