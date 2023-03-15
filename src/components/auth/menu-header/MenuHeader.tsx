import React from 'react'

import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()
  const dispatch = useTypedDispatch()

  const profileNavigateHandler = () => {
    navigate(PATH.PROFILE)
    dispatch(setBurger(false))
  }

  const packsNavigateHandler = () => {
    navigate(PATH.PACKS)
    dispatch(setBurger(false))
  }

  const myPacksNavigateHandler = () => {
    navigate(`/my-packs?user_id=${myId}`)
    dispatch(setBurger(false))
  }

  return createPortal(
    activeMenu && (
      <div>
        <div className={s.background} onClick={() => dispatch(setBurger(false))}></div>
        <ul className={s.menuList}>
          <li onClick={profileNavigateHandler}>
            <UserIcon /> Profile
          </li>
          <li onClick={packsNavigateHandler}>
            <PacksIcon /> Packs
          </li>
          <li onClick={myPacksNavigateHandler}>
            <MyPacks /> My packs
          </li>
          <li onClick={() => logout()}>
            <LogoutIcon /> Logout
          </li>
        </ul>
      </div>
    ),
    document.querySelector('body') as HTMLElement
  )
}
