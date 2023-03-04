import React, { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import { useLocation } from 'react-router-dom'

import s from 'app/App.module.scss'
import { isAuthSelector, isLoadingSelector, isLoggedInSelector } from 'app/appSelectors'
import { isPrivatePage } from 'app/utils/isPrivatePage'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { Header, useMeMutation } from 'modules'
import { RoutesComponent } from 'routes/RoutesComponent'
import { LoadingProgress } from 'UI/loading-progress/LoadingProgress'
import { BaseModal } from 'UI/modal/BaseModal'
import { NotificationBar } from 'UI/notification-bar/NotificationBar'

export const App = () => {
  const [me] = useMeMutation()
  let location = useLocation()

  const isAuth = useTypedSelector(isAuthSelector)
  const isLoading = useTypedSelector(isLoadingSelector)
  const isLoggedIn = useTypedSelector(isLoggedInSelector)
  const privetPage = isPrivatePage(location.pathname)
  const appClasses = `${s.appDefault} ${
    !privetPage || location.pathname === '/profile' ? s.appSecondary : ''
  }`
  const sectionClasses = `${s.contentContainer} ${privetPage ? s.contentContainerPrivatePages : ''}`

  useEffect(() => {
    if (!isAuth) {
      me()
    }
  }, [])

  return isAuth ? (
    <div className={appClasses}>
      <NotificationBar />
      <BaseModal />

      {isLoggedIn && <Header />}
      {isLoading && <LoadingProgress privatePage={privetPage} />}

      <section className={sectionClasses}>
        <RoutesComponent />
      </section>
    </div>
  ) : (
    <div className={s.loader}>
      <CircularProgress classes={{ root: s.circular }} size={60} />
    </div>
  )
}
