import React from 'react'

import { Navigate } from 'react-router-dom'

import { useLogOutMutation } from '../auth/authApi'

import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { setIsLoggedIn } from 'pages/app/appSlice'
import { Button } from 'UI/button/Button'

export const Packs = () => {
  const [logout, { isSuccess }] = useLogOutMutation()
 const dispatch = useTypedDispatch()
  const handlerLogout = async () => {
    await logout().unwrap()
  }

  if (isSuccess) {
    dispatch(setIsLoggedIn(false))
  }

  return (
    <div>
      packs
      <Button onClick={handlerLogout}>Log OUT</Button>
    </div>
  )
}
