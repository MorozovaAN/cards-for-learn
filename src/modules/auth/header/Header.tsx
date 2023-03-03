import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import logo from 'assets/img/logo.png'
import avatarPlug from 'assets/img/user-avatar-default.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { MenuHeader } from 'components/auth/menu-header/MenuHeader'
import { avatarSelector, nameSelector } from 'modules/auth/authSelectors'
import { setClickAway } from 'modules/auth/authSlice'
import s from 'modules/auth/header/Header.module.scss'
import { PATH } from 'routes/routes'

export const Header = () => {
  const userName = useTypedSelector(nameSelector)
  const userAvatar = useTypedSelector(avatarSelector)
  const avatar = userAvatar ? userAvatar : avatarPlug
  const [leave, setLeave] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const dispatch = useTypedDispatch()

  const showMenuHandler = () => {
    setShowMenu(!showMenu)
  }

  const mouseLeaveHandler = () => {
    setLeave(true)
    dispatch(setClickAway(false))
  }

  const mouseOverHandler = () => {
    setLeave(false)
  }

  return (
    <header className={s.headerContainer}>
      <nav className={s.headerContent}>
        <Link to={PATH.PACKS}>
          <img src={logo} alt="logo" className={s.logo} />
        </Link>

        <div className={s.userInfo}>
          <p className={s.name}>{userName}</p>
          <img
            src={avatar}
            alt="user avatar"
            className={s.avatar}
            onClick={showMenuHandler}
            onMouseLeave={mouseLeaveHandler}
            onMouseOver={mouseOverHandler}
          />

          <MenuHeader isLeave={leave} setShowMenu={setShowMenu} open={showMenu} />
        </div>
      </nav>
    </header>
  )
}
