import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import s from './Header.module.scss'

import logo from 'assets/img/logo.svg'
import avatarPlug from 'assets/img/user-avatar-default.svg'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { PATH } from 'routes/routes'


import profileIcon from 'assets/img/icons/profile-user.svg'
import profileLogout from 'assets/img/icons/profile_logout.png'
import { MenuList } from 'UI/menu-list/MenuList'
export const Header = () => {
  const userName = useTypedSelector(state => state.auth.name)
  const userAvatar = useTypedSelector(state => state.auth.avatar)
  const avatar = userAvatar ? userAvatar : avatarPlug

  return (
    <header className={s.headerContainer}>
      <nav className={s.headerContent}>
        <Link to={PATH.PACKS}>
          <img src={logo} alt="logo" />
        </Link>

        <div className={s.userInfoContainer}>
          <p className={s.name}>{userName}</p>
          <img src={avatar} alt="user avatar" className={s.avatar} />
        </div>
      </nav>
    </header>
  )
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
