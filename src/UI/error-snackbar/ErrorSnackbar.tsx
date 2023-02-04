import React, { FC, forwardRef, memo, useEffect, useState } from 'react'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

type ErrorSnackbarType = {
  newError: string
}
export const ErrorSnackbar: FC<ErrorSnackbarType> = memo(({ newError }) => {
  const [error, setError] = useState<string | undefined>(newError)

  useEffect(() => {
    setError(newError)
  }, [newError])

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setError(undefined)
  }

  return (
    <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
})
