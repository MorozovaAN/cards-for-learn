import React, { forwardRef } from 'react'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { setError, setSuccess } from 'pages/app/appSlice'
import { errorSelector, successSelector } from 'pages/app/selectors'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const ErrorSnackbar = () => {
  const error = useTypedSelector(errorSelector)
  const success = useTypedSelector(successSelector)
  const severity = error ? 'error' : 'success'
  const isOpen = error ? !!error : !!success
  const dispatch = useTypedDispatch()
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(severity === 'error' ? setError('') : setSuccess(''))
  }

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {severity === 'error' ? error : success}
      </Alert>
    </Snackbar>
  )
}
