import React from 'react'

import { Navigate } from 'react-router-dom'

import { useLogOutMutation } from '../auth/authApi'

import { useTypedSelector } from 'hooks/useTypedSelector'
import { PATH } from 'routes/routes'
import { Button } from 'UI/button/Button'

export const Packs = () => {
  const [logout] = useLogOutMutation()
  const isLoggedIn = useTypedSelector(state => state.app.isLoggedIn)

  const handlerLogout = async () => {
    await logout().unwrap()
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOG_IN} />
  }

  return (
    <div>
      packs
      <Button onClick={handlerLogout}>Log OUT</Button>
    </div>
  )
}
