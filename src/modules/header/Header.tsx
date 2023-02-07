import React, { useState } from 'react'

import s from './Header.module.scss'

import profileIcon from 'assets/img/icons/profile-user.svg'
import profileLogout from 'assets/img/icons/profile_logout.png'
import { MenuList } from 'UI/menu-list/MenuList'
export const Header = () => {
  const [toggleV, setToggleVP] = useState(false)

  const menuListInProfile = [
    { img: profileIcon, title: 'Profile', id: 4 },
    { img: profileLogout, title: 'Log out', id: 5 },
  ]

  return (
    <div className={s.headerColor}>
      <button className={s.menuBox} onClick={() => setToggleVP(!toggleV)}>
        openInProfile
      </button>
      {toggleV && <MenuList menu={menuListInProfile} />}
    </div>
  )
}
