import { useEffect } from 'react'

import { useMeMutation } from '../modules/auth/authApi'

import s from 'app/App.module.scss'
export const App = () => {
  const [initializeApp, { isLoading, error }] = useMeMutation()

  useEffect(() => {
    initializeApp({}).unwrap()
  }, [])

  return isLoading ? <h2>loading</h2> : <div>success</div>
}
