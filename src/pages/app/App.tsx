import React, { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress'

import s from './App.module.scss'

import { useTypedSelector } from 'hooks/useTypedSelector'
import { useMeMutation } from 'modules/auth/authApi'
import { isAuthSelector, isLoadingSelector } from 'pages/app/selectors'
import { RoutesComponent } from 'routes/RoutesComponent'
import { ErrorSnackbar } from 'UI/error-snackbar/ErrorSnackbar'

export const App = () => {
  const [me] = useMeMutation()
  const isAuth = useTypedSelector(isAuthSelector)
  const isLoading = useTypedSelector(isLoadingSelector)

  useEffect(() => {
    if (!isAuth) {
      me()
    }
  }, [])

  if (!isAuth) return <CircularProgress classes={{ root: s.circular }} />

  return (
    <div className={s.app}>
      <ErrorSnackbar />

      {isLoading && (
        <div className={s.linearProgress}>
          <LinearProgress classes={{ root: s.progressBar, bar: s.progress }} />
        </div>
      )}

      <section className={s.contentContainer}>
        <RoutesComponent />
      </section>
    </div>
  )
}
