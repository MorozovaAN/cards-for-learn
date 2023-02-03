import { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'

import s from './App.module.scss'
import { setError } from './appSlice'

import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useMeMutation } from 'modules/auth/authApi'
import { RoutesComponent } from 'routes/RoutesComponent'
import { ErrorSnackbar } from 'UI/error-snackbar/ErrorSnackbar'

export const App = () => {
  const [initializeApp, { isLoading, error, isSuccess, isError }] = useMeMutation()

  const dispatch = useTypedDispatch()

  useEffect(() => {
    initializeApp({})
      .unwrap()
      .then()
      .catch(err => err.data.error && dispatch(setError(err.data.error)))
  }, [])

  if (!isSuccess && !isError) {
    return <CircularProgress classes={{ root: s.circular }} />
  }

  return (
    <div className={s.app}>
      <ErrorSnackbar />

      <section className={s.contentContainer}>
        <RoutesComponent />
      </section>
    </div>
  )
}
