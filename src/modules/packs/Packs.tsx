import React, { useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import edit from 'assets/img/icons/edit.svg'
import teach from 'assets/img/icons/teach.svg'
import trash from 'assets/img/icons/trash.svg'
import { useLogOutMutation } from 'modules'
import { Pack } from 'modules/packs/pack/Pack'
import s from 'modules/packs/pack.module.scss'
import { useGetPacksQuery } from 'modules/packs/packsApi'
import { Button } from 'UI/button/Button'
import { MenuList } from 'UI/menu-list/MenuList'

export const Packs = () => {
  const [] = useSearchParams()
  const [logout] = useLogOutMutation()
  const { data: packs } = useGetPacksQuery()

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
      {packs?.cardPacks?.map(pack => {
        return <Pack pack={pack} key={pack._id} />
      })}
      <Button onClick={handlerLogout}>Log OUT</Button>
      {/*<div className={s.menuBox}>*/}
      {/*  <button className={s.menuBtn} onClick={() => setToggleV(!toggleV)}></button>*/}
      {/*  <div className={s.menuListBox}>{toggleV && <MenuList menu={menuListInPacks} />}</div>*/}
      {/*</div>*/}
    </div>
  )
}

export type MenuType = {
  img: string
  title: string
  id: number
}
