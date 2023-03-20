import React, { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'

import s from 'app/App.module.scss'
import { isAuthSelector, isLoadingSelector, isLoggedInSelector } from 'app/appSelectors'
import { setModal, setSkeletonsNumbers } from 'app/appSlice'
import { resizeObserver } from 'common/hooks/resizeObserver'
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
  /*const windowWidth = useTypedSelector(state => state.app.windowWidth)*/

  /*function updateSize(event: any) {
    console.log(event.currentTarget.innerWidth)
     if (windowWidth !== Number(event.currentTarget.innerWidth)) {
    ref.current = event.currentTarget.innerWidth
    console.log(event.currentTarget.innerWidth)
    if (ref.current === 802) {
      console.log('801')
      dispatch(setWindowWidth(Number(event.currentTarget.innerWidth)))
    }
    if (ref.current === 800) {
      console.log('800')
      dispatch(setWindowWidth(Number(event.currentTarget.innerWidth)))
    }
    dispatch(setWindowWidth(Number(event.currentTarget.innerWidth)))
    window.removeEventListener('resize', updateSize)
    const timer = setTimeout(() => {
      window.addEventListener('resize', updateSize)
      clearTimeout(timer)
    }, 1000)
  }

  window.addEventListener('resize', updateSize)*/
  resizeObserver(dispatch)
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
