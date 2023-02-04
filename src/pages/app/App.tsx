import { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'

import s from './App.module.scss'

import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { useMeMutation } from 'modules/auth/authApi'
import { setIsAuth, setIsLoggedIn } from 'pages/app/appSlice'
import { RoutesComponent } from 'routes/RoutesComponent'

export const App = () => {
  const [me, { isLoading }] = useMeMutation()
  const dispatch = useTypedDispatch()

  const isAuth = useTypedSelector(state => state.app.isAuth)

  useEffect(() => {
    if (!isAuth) {
      me()
        .then(() => {
          dispatch(setIsLoggedIn(true))
        })
        .finally(() => dispatch(setIsAuth()))
    }
  }, [])

  if (isLoading) return <CircularProgress classes={{ root: s.circular }} />

  return (
    <div className={s.app}>
      <section className={s.contentContainer}>
        <RoutesComponent />
      </section>
    </div>
  )
}
