import React, { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'

import s from './App.module.scss'

import { useTypedSelector } from 'hooks/useTypedSelector'
import { useMeMutation } from 'modules/auth/authApi'
import { Header } from 'modules/header/Header'
import { isAuthSelector, isLoadingSelector, isLoggedInSelector } from 'pages/app/selectors'
import { RoutesComponent } from 'routes/RoutesComponent'
import { LoadingProgress } from 'UI/loading-progress/LoadingProgress'
import { NotificationBar } from 'UI/notification-bar/NotificationBar'

export const App = () => {
  const [me] = useMeMutation()
  const isAuth = useTypedSelector(isAuthSelector)
  const isLoading = useTypedSelector(isLoadingSelector)
  const isLoggedIn = useTypedSelector(isLoggedInSelector)

  useEffect(() => {
    if (!isAuth) {
      me()
    }
  }, [])

  if (!isAuth) return <CircularProgress classes={{ root: s.circular }} />

  return (
    <div className={s.app}>
      {isLoggedIn && <Header />}
      <NotificationBar />

      {isLoading && <LoadingProgress />}

      <section className={s.contentContainer}>
        <RoutesComponent />
      </section>
    </div>
  )
}
