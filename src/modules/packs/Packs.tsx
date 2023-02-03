import React from 'react'

import { useNavigate } from 'react-router-dom'

import { useLogOutMutation } from '../auth/authApi'

import { PATH } from 'routes/routes'
import { Button } from 'UI/button/Button'

export const Packs = () => {
  const [logout, { isSuccess }] = useLogOutMutation()
  const navigate = useNavigate()

  const handlerLogout = async () => {
    await logout().unwrap()
  }

  if (isSuccess) navigate(PATH.LOG_IN)

  return (
    <div>
      packs
      <Button onClick={handlerLogout}>Log OUT</Button>
    </div>
  )
}
