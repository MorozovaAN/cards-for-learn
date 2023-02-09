import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import logo from 'assets/img/logo.svg'
import avatarPlug from 'assets/img/user-avatar-default.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { MenuHeader } from 'components/auth/menu-header/MenuHeader'
import { avatarSelector, nameSelector } from 'modules/auth/authSelectors'
import { setClickAway, setShowMenu } from 'modules/auth/authSlice'
import s from 'modules/auth/header/Header.module.scss'
import { PATH } from 'routes/routes'

export const Header = () => {
  const userName = useTypedSelector(nameSelector)
  const userAvatar = useTypedSelector(avatarSelector)
  const showMenu = useTypedSelector(state => state.auth.showMenu)
  const avatar = userAvatar ? userAvatar : avatarPlug
  const dispatch = useTypedDispatch()
  const [leave, setLeave] = useState(false)
  const showMenuHandler = () => {
    dispatch(setShowMenu(!showMenu))
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
          <img src={logo} alt="logo" />
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
          <MenuHeader isLeave={leave} />
        </div>
      </nav>
    </header>
  )
}
