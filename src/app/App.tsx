import React, { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'

import s from 'app/App.module.scss'
import { isAuthSelector, isLoadingSelector, isLoggedInSelector } from 'app/appSelectors'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { Header, useMeMutation } from 'modules'
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

  if (!isAuth)
    return (
      <div className={s.loader}>
        <CircularProgress classes={{ root: s.circular }} size={60} />
      </div>
    )

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
