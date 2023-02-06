import LinearProgress from '@mui/material/LinearProgress'

import s from './LoadingProgress.module.scss'
export const LoadingProgress = () => {
  return (
    <div className={s.linearProgress}>
      <LinearProgress classes={{ root: s.progressBar, bar: s.progress }} />
    </div>
  )
}
