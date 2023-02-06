import React from 'react'

import { useLogOutMutation } from '../auth/authApi'

import { Button } from 'UI/button/Button'

export const Packs = () => {
  const [logout, {}] = useLogOutMutation()
  const handlerLogout = async () => {
    await logout().unwrap()
  }

  return (
    <div>
      packs
      <Button onClick={handlerLogout}>Log OUT</Button>
    </div>
  )
}
