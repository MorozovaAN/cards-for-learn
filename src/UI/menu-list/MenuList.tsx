import React, { FC, ReactNode } from 'react'

import { Navigate, useNavigate } from 'react-router-dom'

import { isLoggedInSelector } from 'app/appSelectors'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { useLogOutMutation } from 'modules/auth/authApi'
import { MenuType } from 'modules/packs/Packs'
import { PATH } from 'routes/routes'
import s from 'UI/menu-list/MenuList.module.scss'

type MenuListType = {
  children: ReactNode
  open: boolean
}
export const MenuList: FC<MenuListType> = ({ children, open }) => {
  const [logout] = useLogOutMutation()
  const isLoggedIn = useTypedSelector(isLoggedInSelector)
  const navigate = useNavigate()

  if (!open) return null

  return <div className={s.menuList}>{children}</div>
  // const handleMenuItem = (id: number) => {
  //   switch (id) {
  //     case 1:
  //       alert('modal Edit')
  //       break
  //     case 2:
  //       alert('modal Delete')
  //       break
  //     case 3:
  //       alert('modal learn')
  //       break
  //     case 4:
  //       navigate(PATH.PROFILE)
  //       break
  //     case 5:
  //       logout()
  //       break
  //     case 6:
  //       alert('modal packs')
  //       break
  //     case 7:
  //       alert('modal cards')
  //       break
  //     default:
  //       alert("Don't have value")
  //   }
  // }
  //
  // if (!isLoggedIn) {
  //   return <Navigate to={PATH.LOG_IN} />
  // }

  // const menuListData = menu.menu.map((i: MenuType) => {
  //   return (
  //     <li className={s.item} key={i.id} onClick={() => handleMenuItem(i.id)}>
  //       <img src={i.img} alt="icon" />
  //       <h3 className={s.title}>{i.title}</h3>
  //     </li>
  //   )
  // })
  //
  // return <ul className={s.items}>{menuListData}</ul>
}
