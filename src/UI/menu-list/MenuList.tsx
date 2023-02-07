import React, { FC } from 'react'

import { Navigate } from 'react-router-dom'

import { useTypedSelector } from 'hooks/useTypedSelector'
import { useLogOutMutation } from 'modules/auth/authApi'
import { MenuType } from 'modules/packs/Packs'
import { PATH } from 'routes/routes'

type MenuProps = {
  menu: MenuType[]
}
export const MenuList: FC<MenuProps> = menu => {
  const [logout] = useLogOutMutation()
  const isLoggedIn = useTypedSelector(state => state.app.isLoggedIn)
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
        alert('component Profile')
        break
      case 5:
        logout()
        break
      default:
        alert('Нет таких значений')
    }
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOG_IN} />
  }

  const menuListData = menu.menu.map((i: MenuType) => {
    return (
      <li key={i.id} onClick={() => handleMenuItem(i.id)}>
        <img src={i.img} alt="icon" />
        <h3>{i.title}</h3>
      </li>
    )
  })

  return <ul>{menuListData}</ul>
}
