import React from 'react'

import { Link } from 'react-router-dom'

import s from './Header.module.scss'

import { setBurger, setHeaderClickAway } from 'app/appSlice'
import { ReactComponent as LogoutIcon } from 'assets/img/icons/exit.svg'
import logo from 'assets/img/logo.png'
import avatarPlug from 'assets/img/user-avatar-default.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { ClickAwayListener } from 'common/utils/сlickAwayListener'
import { MenuHeader } from 'components/auth/menu-header/MenuHeader'
import { useLogOutMutation } from 'modules'
import { avatarSelector, idSelector, nameSelector } from 'modules/auth/authSelectors'
import { PATH } from 'routes/routes'
import { Button } from 'UI/button/Button'
import { NavLink } from 'UI/nav-link/NavLink'

export const Header = () => {
  const [logOut] = useLogOutMutation()
  const activeMenu = useTypedSelector(state => state.app.burger)
  const dispatch = useTypedDispatch()
  const userName = useTypedSelector(nameSelector)
  const userAvatar = useTypedSelector(avatarSelector)
  const user_id = useTypedSelector(idSelector)
  const avatar = userAvatar ? userAvatar : avatarPlug
  const openBurgerMenuHandler = () => {
    dispatch(setBurger(!activeMenu))
  }
  const burgerAction = `${s.line} ${activeMenu ? s.active : ''}`
  const onClickAway = () => {
    dispatch(setHeaderClickAway(true))
  }

  return (
    <header className={s.headerContainer}>
      <nav className={s.headerContent}>
        <Link to={PATH.PACKS}>
          <h1>
            <img src={logo} className={s.logo} alt="logo" />
          </h1>
        </Link>

        <div className={s.linksContainer}>
          <NavLink styleType="primary" url={PATH.PACKS}>
            <p>Other packs</p>
          </NavLink>

          <NavLink styleType="primary" url={`/my-packs?user_id=${user_id}`}>
            <p>My packs</p>
          </NavLink>

          <NavLink styleType="primary" url={PATH.PROFILE}>
            <p>Profile</p>
          </NavLink>
        </div>

        <div>
          <div className={s.userInfoContainer}>
            <div className={s.userInfo}>
              <p className={s.name}>{userName}</p>
              <img src={avatar} className={s.avatar} alt="user avatar" />
            </div>

            <Button onClick={() => logOut()} styleType="icon">
              <LogoutIcon />
            </Button>
          </div>

          <ClickAwayListener onClickAway={onClickAway}>
            <div className={s.burgerBtn} onClick={openBurgerMenuHandler}>
              <span className={burgerAction}></span>
              <span className={burgerAction}></span>
              <span className={burgerAction}></span>
            </div>
          </ClickAwayListener>
          <MenuHeader open={activeMenu} />
        </div>
      </nav>
    </header>
  )
}
