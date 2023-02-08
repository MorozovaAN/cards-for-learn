import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import s from './Header.module.scss'

import profileLogout from 'assets/img/icons/logout.svg'
import profileIcon from 'assets/img/icons/profile-user.svg'
import logo from 'assets/img/logo.svg'
import avatarPlug from 'assets/img/user-avatar-default.svg'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { avatarSelector, nameSelector } from 'modules/auth/authSelectors'
import { PATH } from 'routes/routes'
import { MenuList } from 'UI/menu-list/MenuList'
export const Header = () => {
  const [toggleV, setToggleVP] = useState(false)
  const userName = useTypedSelector(nameSelector)
  const userAvatar = useTypedSelector(avatarSelector)
  const avatar = userAvatar ? userAvatar : avatarPlug

  const menuListInProfile = [
    { img: profileIcon, title: 'Profile', id: 4 },
    { img: profileIcon, title: 'Packs', id: 6 },
    { img: profileIcon, title: 'Cards', id: 7 },
    { img: profileLogout, title: 'Log out', id: 5 },
  ]

  return (
    <header className={s.headerContainer}>
      <nav className={s.headerContent}>
        <Link to={PATH.PACKS}>
          <img src={logo} alt="logo" />
        </Link>

        <div className={s.userInfoContainer} onClick={() => setToggleVP(!toggleV)}>
          <p className={s.name}>{userName}</p>
          <img src={avatar} alt="user avatar" className={s.avatar} />
          <div className={s.menuListBox}>{toggleV && <MenuList menu={menuListInProfile} />}</div>
        </div>
      </nav>
    </header>
  )
}
