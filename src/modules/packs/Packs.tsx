import React, { useState } from 'react'

import edit from 'assets/img/icons/edit.svg'
import teach from 'assets/img/icons/teach.svg'
import trash from 'assets/img/icons/trash.svg'
import { useLogOutMutation } from 'modules/auth/authApi'
import s from 'modules/packs/pack.module.scss'
import { Button } from 'UI/button/Button'
import { MenuList } from 'UI/menu-list/MenuList'

export const Packs = () => {
  const [logout] = useLogOutMutation()

  const [toggleV, setToggleV] = useState(false)

  const menuListInPacks = [
    { img: edit, title: 'Edit', id: 1 },
    { img: teach, title: 'Delete', id: 2 },
    { img: trash, title: 'Learn', id: 3 },
  ]

  const handlerLogout = async () => {
    await logout()
  }

  return (
    <div>
      packs
      <Button onClick={handlerLogout}>Log OUT</Button>
      <div className={s.menuBox}>
        <button className={s.menuBtn} onClick={() => setToggleV(!toggleV)}></button>
        <div className={s.menuListBox}>{toggleV && <MenuList menu={menuListInPacks} />}</div>
      </div>
    </div>
  )
}

export type MenuType = {
  img: string
  title: string
  id: number
}
