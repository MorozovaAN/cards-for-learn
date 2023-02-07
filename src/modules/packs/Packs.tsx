import React, { useState } from 'react'

import { useLogOutMutation } from '../auth/authApi'
import teach from 'assets/img/icons/teach.svg'
import trash from 'assets/img/icons/trash.svg'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { Button } from 'UI/button/Button'
import { MenuList } from 'UI/menu-list/MenuList'

export const Packs = () => {
  const [logout] = useLogOutMutation()
  const isLoggedIn = useTypedSelector(state => state.app.isLoggedIn)

  const [toggleV, setToggleV] = useState(false)

  const menuListInPacks = [
    { img: edit, title: 'edit', id: 1 },
    { img: teach, title: 'Delete', id: 2 },
    { img: trash, title: 'learn', id: 3 },
  ]

  const [toggleVP, setToggleVP] = useState(false)

  const menuListInProfile = [
    { img: '', title: 'profile', id: 4 },
    { img: '', title: 'Log out', id: 5 },
  ]

  const handlerLogout = async () => {
    await logout()
  }

  return (
    <div>
      packs
      <Button onClick={handlerLogout}>Log OUT</Button>
      <button onClick={() => setToggleV(!toggleV)}>openInPacks</button>
      {toggleV && <MenuList menu={menuListInPacks} />}
      {/*second toggle*/}
      <button onClick={() => setToggleVP(!toggleVP)}>openInProfile</button>
      {toggleVP && <MenuList menu={menuListInProfile} />}
    </div>
  )
}

export type MenuType = {
  img: string
  title: string
  id: number
}
