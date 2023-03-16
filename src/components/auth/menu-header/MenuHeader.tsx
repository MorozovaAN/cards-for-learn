import React from 'react'

import { createPortal } from 'react-dom'
import { NavLink } from 'react-router-dom'

import s from './MenuHeader.module.scss'

import { burgerSelector } from 'app/appSelectors'
import { setBurger } from 'app/appSlice'
import { ReactComponent as LogoutIcon } from 'assets/img/icons/exit.svg'
import { ReactComponent as MyPacks } from 'assets/img/icons/my-packs.svg'
import { ReactComponent as PacksIcon } from 'assets/img/icons/packs.svg'
import { ReactComponent as UserIcon } from 'assets/img/icons/user.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { useLogOutMutation } from 'modules'
import { idSelector } from 'modules/auth/authSelectors'
import { PATH } from 'routes/routes'

export const MenuHeader = () => {
  const activeMenu = useTypedSelector(burgerSelector)
  const myId = useTypedSelector(idSelector)
  const [logout] = useLogOutMutation()
  const dispatch = useTypedDispatch()

  const toggleLinkHandler = () => {
    dispatch(setBurger(false))
  }

  const logoutHandler = () => {
    toggleLinkHandler()
    logout()
  }

  return createPortal(
    activeMenu && (
      <div>
        <div className={s.background} onClick={() => dispatch(setBurger(false))}></div>
        <ul className={s.menuList}>
          <li onClick={toggleLinkHandler}>
            <NavLink
              to={PATH.PROFILE}
              className={({ isActive }) => (isActive ? s.linkActive : s.link)}
            >
              <UserIcon /> Profile
            </NavLink>
          </li>

          <li onClick={toggleLinkHandler}>
            <NavLink
              to={PATH.PACKS}
              className={({ isActive }) => (isActive ? s.linkActive : s.link)}
            >
              <PacksIcon /> Other packs
            </NavLink>
          </li>

          <li onClick={toggleLinkHandler}>
            <NavLink
              to={`/my-packs?user_id=${myId}`}
              className={({ isActive }) => (isActive ? s.linkActive : s.link)}
            >
              <MyPacks /> My packs
            </NavLink>
          </li>

          <li onClick={logoutHandler} className={s.link}>
            <LogoutIcon /> Logout
          </li>
        </ul>
      </div>
    ),
    document.querySelector('body') as HTMLElement
  )
}
