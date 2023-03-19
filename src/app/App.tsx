import React, { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'

import { resizeObserver } from '../common/hooks/resizeObserver'

import s from 'app/App.module.scss'
import { isAuthSelector, isLoadingSelector, isLoggedInSelector } from 'app/appSelectors'
import { setModal, setSkeletonsNumbers, setWindowWidth } from 'app/appSlice'
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
  const dispatch = useTypedDispatch()
  const isAuth = useTypedSelector(isAuthSelector)
  const isLoading = useTypedSelector(isLoadingSelector)
  const isLoggedIn = useTypedSelector(isLoggedInSelector)
  const appClasses = `${s.appDefault} ${!isLoggedIn ? s.appSecondary : ''}`
  const windowWidth = useTypedSelector(state => state.app.windowWidth)

  console.log('app')
  console.log('windowWidth ' + windowWidth)

  function updateSize(event: any) {
    //console.log(event.currentTarget.innerWidth)
    if (windowWidth !== Number(event.currentTarget.innerWidth)) {
      dispatch(setWindowWidth(Number(event.currentTarget.innerWidth)))
      window.removeEventListener('resize', updateSize)

      setTimeout(() => {
        console.log('timer')
        window.addEventListener('resize', updateSize)
      }, 3000)
    }
  }

  window.addEventListener('resize', updateSize)

  useEffect(() => {
    if (!isAuth) {
      me()
    }
  }, [])

  window.addEventListener('popstate', e => {
    dispatch(setModal({ open: false, type: '' }))
    dispatch(setClickAway(true))
    dispatch(setSkeletonsNumbers('6'))
  })

  return isAuth ? (
    <div id="app" className={appClasses}>
      <NotificationBar />
      <BaseModal />

      {isLoggedIn && <Header />}
      {isLoading && <LoadingProgress privatePage={isLoggedIn} />}

      <section>
        <RoutesComponent />
      </section>
    </div>
  ) : (
    <div className={s.loader}>
      <CircularProgress classes={{ root: s.circular }} size={60} />
    </div>
  )
}
