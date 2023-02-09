import { setNotification } from 'app/appSlice'
import { AppDispatchType } from 'common/hooks/useTypedDispatch'
import { ErrorType } from 'common/types/types'

export const errorHandler = (err: unknown, dispatch: AppDispatchType) => {
  const error = (err as ErrorType)?.error?.data?.error

  if (error) {
    dispatch(setNotification({ message: error, type: 'error' }))
  } else {
    dispatch(setNotification({ message: 'Something went wrong', type: 'error' }))
  }
}
