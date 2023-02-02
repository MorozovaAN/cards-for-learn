import React from 'react'

import { Button } from '../../UI/button/Button'
import { useLogoutMutation } from '../auth/authApi'

export const Packs = () => {
  const [logout, {}] = useLogoutMutation()

  const handlerLogout = async () => {
    await logout()
  }

  return (
    <div>
      packs
      <Button onClick={handlerLogout}>Log OUT</Button>
    </div>
  )
}
