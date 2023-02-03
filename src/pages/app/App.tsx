import { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'

import { setError, setIsLoggedIn } from './appSlice'

import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useMeMutation } from 'modules/auth/authApi'
import { setAuthData } from 'modules/auth/authSlice'
import { RoutesComponent } from 'routes/RoutesComponent'
import { ErrorSnackbar } from 'UI/error-snackbar/ErrorSnackbar'

export const App = () => {
  const [initializeApp, { isLoading, error, isSuccess, isError, data }] = useMeMutation()
  const dispatch = useTypedDispatch()

  useEffect(() => {
    initializeApp({}).unwrap()
  }, [])

  useEffect(() => {
    if (error && 'data' in error) {
      if (error.data.error === 'you are not authorized /ᐠ-ꞈ-ᐟ\\') {
        dispatch(setError(null))
      } else {
        dispatch(setError(error.data.error))
      }
    }
  }, [error])
  if (isSuccess && data) {
    dispatch(setIsLoggedIn(true))
    dispatch(setAuthData(data))
  }

  if (!isSuccess && !isError) {
    return <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
  }

  return (
    <div>
      <ErrorSnackbar />
      <RoutesComponent />
    </div>
  )
}
