import { useEffect } from 'react'

import { CustomizedFetchBaseQueryError, useMeMutation } from '../modules/auth/authApi'

export const App = () => {
  const [initializeApp, { data, isLoading, error, isError, isSuccess }] = useMeMutation()
  const err = error as CustomizedFetchBaseQueryError

  useEffect(() => {
    initializeApp({}).unwrap()
  }, [])

  if (isError) {
    return <div>{err.data.error}</div>
  }

  return <div>{'Success'}</div>
}
