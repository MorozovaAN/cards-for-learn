import React, { FC, ReactNode } from 'react'

import s from 'UI/menu-list/MenuList.module.scss'

type MenuListType = {
  open: boolean
  children: ReactNode
}

export const MenuList: FC<MenuListType> = ({ open, children }) => {
  return open ? <ul className={s.menuList}>{children}</ul> : null
}
