import { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'

import { useTypedDispatch } from '../../hooks/useTypedDispatch'
import { CustomizedError, useMeMutation } from '../../modules/auth/authApi'

import { setError } from './appSlice'

import { ErrorSnackbar } from 'UI/error-snackbar/ErrorSnackbar'

export const App = () => {
  const [initializeApp, { isLoading, error, isSuccess, isError }] = useMeMutation()
  const err = error as CustomizedError
  const dispatch = useTypedDispatch()

  useEffect(() => {
    initializeApp({}).unwrap()
  }, [])

  useEffect(() => {
    if (error) dispatch(setError(err.data.error))
  }, [error])

  if (!isSuccess && !isError) {
    return <CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }} />
  }

  return (
    <div>
      <ErrorSnackbar />
    </div>
  )
}
