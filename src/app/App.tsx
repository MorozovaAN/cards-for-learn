import React, { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import { useLocation } from 'react-router-dom'

import s from 'app/App.module.scss'
import { isAuthSelector, isLoadingSelector, isLoggedInSelector } from 'app/appSelectors'
import { setModal, setSkeletonsNumbers } from 'app/appSlice'
import { isAppSecondaryClass } from 'app/utils/isAppSecondaryClass'
import { isPrivatePage } from 'app/utils/isPrivatePage'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { BaseModal } from 'components/modal/BaseModal'
import { Header, useMeMutation } from 'modules'
import { setClickAway } from 'modules/auth/authSlice'
import { RoutesComponent } from 'routes/RoutesComponent'
import { LoadingProgress } from 'UI/loading-progress/LoadingProgress'
import { NotificationBar } from 'UI/notification-bar/NotificationBar'

export const App = () => {
  const [me] = useMeMutation()
  /*const location = useLocation()*/
  const dispatch = useTypedDispatch()
  const isAuth = useTypedSelector(isAuthSelector)
  const isLoading = useTypedSelector(isLoadingSelector)
  const isLoggedIn = useTypedSelector(isLoggedInSelector)
  const privetPage = isPrivatePage(location.pathname)
  const appClasses = `${s.appDefault} ${
    isAppSecondaryClass(location.pathname) ? s.appSecondary : ''
  }`
  const sectionClasses = `${s.contentContainer} ${privetPage ? s.contentContainerPrivatePages : ''}`

  useEffect(() => {
    if (!isAuth) {
      me()
    }
  }, [])

  window.addEventListener('popstate', () => {
    dispatch(setModal({ open: false, type: '' }))
    dispatch(setClickAway(true))
    dispatch(setSkeletonsNumbers('6'))
  })

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
