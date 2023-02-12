import React, { ChangeEvent, useState } from 'react'

import edit from 'assets/img/icons/edit.svg'
import teach from 'assets/img/icons/teach.svg'
import trash from 'assets/img/icons/trash.svg'
import { baseQueryParams, BaseQueryParamsType } from 'common/constants/baseQueryParams'
import { useLogOutMutation } from 'modules'
import { Pack } from 'modules/packs/pack/Pack'
import { useGetPacksQuery } from 'modules/packs/packsApi'
import { Button } from 'UI/button/Button'
import { Search } from 'UI/search/Search'

export const Packs = () => {
  const [baseParams, setBaseParams] = useState<BaseQueryParamsType>(baseQueryParams)

  const [logout] = useLogOutMutation()
  const { data: packs } = useGetPacksQuery(baseParams)

  const [toggleV, setToggleV] = useState(false)

  const menuListInPacks = [
    { img: edit, title: 'Edit', id: 1 },
    { img: teach, title: 'Delete', id: 2 },
    { img: trash, title: 'Learn', id: 3 },
  ]

  const handlerLogout = async () => {
    await logout()
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setBaseParams({ ...baseParams, packName: e.currentTarget.value })
  }

  return (
    <div>
      <Search class={'need write here class'} selector={'Packs'} />

      <input type="text" onChange={onChangeHandler} />

      {packs?.cardPacks?.map(pack => {
        return <Pack name={pack.name} key={pack._id} />
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
