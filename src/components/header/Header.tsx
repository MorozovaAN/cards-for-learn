import React, { useEffect } from 'react'

import { Link, NavLink } from 'react-router-dom'

import s from './Header.module.scss'

import { burgerSelector } from 'app/appSelectors'
import { setBurger } from 'app/appSlice'
import { ReactComponent as LogoutIcon } from 'assets/img/icons/exit.svg'
import logo from 'assets/img/logo.png'
import avatarPlug from 'assets/img/user-avatar-default.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { MenuHeader } from 'components/auth/menu-header/MenuHeader'
import { useLogOutMutation } from 'modules'
import { avatarSelector, idSelector, nameSelector } from 'modules/auth/authSelectors'
import { PATH } from 'routes/routes'
import { Button } from 'UI/button/Button'

export const Header = () => {
  const [logOut] = useLogOutMutation()
  const menuIsActive = useTypedSelector(burgerSelector)
  const dispatch = useTypedDispatch()
  const userName = useTypedSelector(nameSelector)
  const userAvatar = useTypedSelector(avatarSelector)
  const user_id = useTypedSelector(idSelector)
  const avatar = userAvatar ? userAvatar : avatarPlug
  const burgerAction = `${s.line} ${menuIsActive ? s.active : ''}`

  const scrollHandler = () => dispatch(setBurger(false))

  useEffect(() => {
    menuIsActive && document.addEventListener('scroll', scrollHandler, { once: true })
  }, [menuIsActive])

  const openBurgerMenuHandler = () => {
    dispatch(setBurger(!menuIsActive))
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
          <NavLink to={PATH.PACKS} className={({ isActive }) => (isActive ? s.linkActive : s.link)}>
            Other packs
          </NavLink>

          <NavLink
            to={`/my-packs?user_id=${user_id}`}
            className={({ isActive }) => (isActive ? s.linkActive : s.link)}
          >
            My packs
          </NavLink>

          <NavLink
            to={PATH.PROFILE}
            className={({ isActive }) => (isActive ? s.linkActive : s.link)}
          >
            Profile
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

          <div className={s.burgerBtn} onClick={openBurgerMenuHandler} id="menuIcon">
            <span className={burgerAction}></span>
            <span className={burgerAction}></span>
            <span className={burgerAction}></span>
          </div>

          <MenuHeader />
        </div>
      </nav>
    </header>
  )
}
