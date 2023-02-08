import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import s from './Header.module.scss'

import profileLogout from 'assets/img/icons/logout.svg'
import profileIcon from 'assets/img/icons/profile-user.svg'
import logo from 'assets/img/logo.svg'
import avatarPlug from 'assets/img/user-avatar-default.svg'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { useLogOutMutation } from 'modules/auth/authApi'
import { avatarSelector, nameSelector } from 'modules/auth/authSelectors'
import { PATH } from 'routes/routes'
import { MenuList } from 'UI/menu-list/MenuList'
export const Header = () => {
  const userName = useTypedSelector(nameSelector)
  const userAvatar = useTypedSelector(avatarSelector)
  const avatar = userAvatar ? userAvatar : avatarPlug

  return (
    <header className={s.headerContainer}>
      <nav className={s.headerContent}>
        <Link to={PATH.PACKS}>
          <img src={logo} alt="logo" />
        </Link>

        <div className={s.userInfoContainer}>
          <p className={s.name}>{userName}</p>
          <img
            src={avatar}
            alt="user avatar"
            className={s.avatar}
            onClick={() => setOpenMenu(!openMenu)}
          />
        </div>
      </nav>
    </header>
  )
}
