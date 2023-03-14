import React, { FC, ReactNode } from 'react'

import s from 'UI/menu-list/MenuList.module.scss'

type MenuListType = {
  children: ReactNode
}

export const MenuList: FC<MenuListType> = ({ children }) => {
  return <ul className={s.menuList}>{children}</ul>
}
