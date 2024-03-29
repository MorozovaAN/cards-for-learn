import React, { useEffect } from 'react'

import { LoadingCircular } from '../UI/loading-circular/LoadingCircular'

import s from 'app/App.module.scss'
import { isAuthSelector, isLoadingSelector, isLoggedInSelector } from 'app/appSelectors'
import { resetParams, setWindowWidth } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { resizeObserver } from 'common/utils/resizeObserver'
import { BaseModal } from 'components/modal/BaseModal'
import { Header, useMeMutation } from 'modules'
import { RoutesComponent } from 'routes/RoutesComponent'
import { LoadingProgress } from 'UI/loading-progress/LoadingProgress'
import { NotificationBar } from 'UI/notification-bar/NotificationBar'

export const App = () => {
  const [me] = useMeMutation()
  const dispatch = useTypedDispatch()
  const isAuth = useTypedSelector(isAuthSelector)
  const isLoading = useTypedSelector(isLoadingSelector)
  const isLoggedIn = useTypedSelector(isLoggedInSelector)
  const appClasses = `${s.appDefault} ${!isLoggedIn ? s.appSecondary : ''}`

  useEffect(() => {
    dispatch(setWindowWidth(window.innerWidth))
    resizeObserver(dispatch)
    if (!isAuth) {
      me()
    }
  }, [])

  window.addEventListener('popstate', () => {
    dispatch(resetParams())
  })

  if (!isAuth) return <LoadingCircular />

  return (
    <div id="app" className={appClasses}>
      <NotificationBar />
      <BaseModal />

      {isLoggedIn && <Header />}
      {isLoading && <LoadingProgress privatePage={isLoggedIn} />}

      <section>
        <RoutesComponent />
      </section>
    </div>
  )
}
