import React from 'react'

import { Link } from 'react-router-dom'

import s from './Header.module.scss'

import { ReactComponent as LogoutIcon } from 'assets/img/icons/exit.svg'
import logo from 'assets/img/logo.png'
import avatarPlug from 'assets/img/user-avatar-default.svg'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { useLogOutMutation } from 'modules'
import { avatarSelector, idSelector, nameSelector } from 'modules/auth/authSelectors'
import { PATH } from 'routes/routes'
import { Button } from 'UI/button/Button'
import { NavLink } from 'UI/nav-link/NavLink'

export const Header = () => {
  const userName = useTypedSelector(nameSelector)
  const userAvatar = useTypedSelector(avatarSelector)
  const user_id = useTypedSelector(idSelector)
  const avatar = userAvatar ? userAvatar : avatarPlug
  const [logOut] = useLogOutMutation()
  const logoutHandler = () => {
    logOut()
  }

  return (
    <header className={s.headerContainer}>
      <nav className={s.headerContent}>
        <Link to={PATH.PACKS}>
          <h1>
            <img src={logo} className={s.logo} alt="logo" />
          </h1>
        </Link>
        <NavLink styleType={'primary'} url={PATH.PROFILE}>
          <p>Profile</p>
        </NavLink>
        <NavLink styleType={'primary'} url={`/my-packs?user_id=${user_id}`}>
          <p>My packs</p>
        </NavLink>
        <NavLink styleType={'primary'} url={PATH.PACKS}>
          <p>Other packs</p>
        </NavLink>
        <Button onClick={logoutHandler} styleType={'secondary'}>
          <LogoutIcon />
        </Button>

        <div className={s.userInfo}>
          <p className={s.name}>{userName}</p>
          <img src={avatar} className={s.avatar} alt="user avatar" />
        </div>
      </nav>
    </header>
  )
}
