import React, { FC, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import s from './MenuHeader.module.scss'

import { setBurger, setHeaderClickAway } from 'app/appSlice'
import { ReactComponent as LogoutIcon } from 'assets/img/icons/exit.svg'
import { ReactComponent as MyPacks } from 'assets/img/icons/my_packs.svg'
import { ReactComponent as PacksIcon } from 'assets/img/icons/packs.svg'
import { ReactComponent as UserIcon } from 'assets/img/icons/user.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { ClickAwayListener } from 'common/utils/сlickAwayListener'
import { useLogOutMutation } from 'modules'
import { clickAwaySelector, idSelector } from 'modules/auth/authSelectors'
import { setClickAway } from 'modules/auth/authSlice'
import { PATH } from 'routes/routes'

type MenuHeaderType = {
  open: boolean
}

export const MenuHeader: FC<MenuHeaderType> = ({ open }) => {
  const clickAway = useTypedSelector(clickAwaySelector)
  const headerClickAway = useTypedSelector(state => state.app.headerClickAway)
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

  const clickAwayHandler = () => {
    dispatch(setClickAway(true))
  }
  const logoutHandler = () => {
    logout()
  }

  useEffect(() => {
    if (clickAway && headerClickAway) {
      dispatch(setBurger(false))
      dispatch(setHeaderClickAway(false))
    }
  }, [clickAway, headerClickAway])

  return (
    <div className={s.menuHeader}>
      <ClickAwayListener onClickAway={clickAwayHandler}>
        <ul className={open ? `${s.menuList} ${s.active}` : s.menuList}>
          <li onClick={profileNavigateHandler}>
            <UserIcon /> Profile
          </li>
          <li onClick={packsNavigateHandler}>
            <PacksIcon /> Packs
          </li>
          <li onClick={myPacksNavigateHandler}>
            <MyPacks /> My packs
          </li>
          <li onClick={logoutHandler}>
            <LogoutIcon /> Logout
          </li>
        </ul>
      </ClickAwayListener>
    </div>
  )
}
