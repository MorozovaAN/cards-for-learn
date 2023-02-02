import React from 'react'

import { Navigate } from 'react-router-dom'

import { useLogoutMutation } from '../auth/authApi'

import { PATH } from 'routes/routes'
import { Button } from 'UI/button/Button'

export const Packs = () => {
  const [logout, { isSuccess }] = useLogoutMutation()

  const handlerLogout = async () => {
    await logout().unwrap()
  }

  if (isSuccess) {
    return <Navigate to={PATH.LOG_IN} />
  }

  return (
    <div>
      packs
      <Button onClick={handlerLogout}>Log OUT</Button>
    </div>
  )
}
