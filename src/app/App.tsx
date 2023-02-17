import React, { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import { useLocation } from 'react-router-dom'

import { appBackgroundSwitch } from './utils/appBackgroundSwitch'

import s from 'app/App.module.scss'
import { isAuthSelector, isLoadingSelector, isLoggedInSelector } from 'app/appSelectors'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { Header, useMeMutation } from 'modules'
import { RoutesComponent } from 'routes/RoutesComponent'
import { LoadingProgress } from 'UI/loading-progress/LoadingProgress'
import { NotificationBar } from 'UI/notification-bar/NotificationBar'

export const App = () => {
  const [me] = useMeMutation()
  let location = useLocation()
  const isAuth = useTypedSelector(isAuthSelector)
  const isLoading = useTypedSelector(isLoadingSelector)
  const isLoggedIn = useTypedSelector(isLoggedInSelector)
  const appClass = appBackgroundSwitch(location.pathname) ? s.appSecondary : s.appDefault

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
    <div className={appClass}>
      <NotificationBar />

      {isLoggedIn && <Header />}

      {isLoading && <LoadingProgress />}

      <section className={s.contentContainer}>
        <RoutesComponent />
      </section>
    </div>
  )
}
