import React, { FC } from 'react'

import { Navigate, useNavigate } from 'react-router-dom'

import { isLoggedInSelector } from 'app/appSelectors'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { useLogOutMutation } from 'modules/auth/authApi'
import { MenuType } from 'modules/packs/Packs'
import { PATH } from 'routes/routes'
import s from 'UI/menu-list/MenuList.module.scss'

type MenuProps = {
  menu: MenuType[]
}
export const MenuList: FC<MenuProps> = menu => {
  const [logout] = useLogOutMutation()
  const isLoggedIn = useTypedSelector(isLoggedInSelector)
  const navigate = useNavigate()

  const handleMenuItem = (id: number) => {
    switch (id) {
      case 1:
        alert('modal Edit')
        break
      case 2:
        alert('modal Delete')
        break
      case 3:
        alert('modal learn')
        break
      case 4:
        navigate(PATH.PROFILE)
        break
      case 5:
        logout()
        break
      default:
        alert("Don't have value")
    }
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOG_IN} />
  }

  const menuListData = menu.menu.map((i: MenuType) => {
    return (
      <li className={s.item} key={i.id} onClick={() => handleMenuItem(i.id)}>
        <img src={i.img} alt="icon" />
        <h3 className={s.title}>{i.title}</h3>
      </li>
    )
  })

  return <ul className={s.items}>{menuListData}</ul>
}
