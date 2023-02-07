import React from 'react'

import { Link } from 'react-router-dom'

import s from './Header.module.scss'

import logo from 'assets/img/logo.svg'
import avatarPlug from 'assets/img/user-avatar-default.svg'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { PATH } from 'routes/routes'

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
}
