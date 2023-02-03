import React from 'react'

import { useLogoutMutation } from '../auth/authApi'

import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { setIsLoggedIn } from 'pages/app/appSlice'
import { Button } from 'UI/button/Button'

export const Packs = () => {
  const [logout, { isSuccess }] = useLogoutMutation()
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
