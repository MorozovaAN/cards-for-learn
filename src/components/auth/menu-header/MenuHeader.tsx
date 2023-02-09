import React from 'react'

import { useNavigate } from 'react-router-dom'

import { ReactComponent as LogoutIcon } from 'assets/img/icons/exit.svg'
import { ReactComponent as PacksIcon } from 'assets/img/icons/packs.svg'
import { ReactComponent as UserIcon } from 'assets/img/icons/user.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { useLogOutMutation } from 'modules'
import { setShowMenu } from 'modules/auth/authSlice'
import { PATH } from 'routes/routes'
import { MenuList } from 'UI/menu-list/MenuList'

export const MenuHeader = () => {
  const open = useTypedSelector(state => state.auth.showMenu)
  const [logOut] = useLogOutMutation()
  const dispatch = useTypedDispatch()
  const navigate = useNavigate()

  const profileNavigateHandler = () => {
    dispatch(setShowMenu(false))
    navigate(PATH.PROFILE)
  }
  const packsNavigateHandler = () => {
    dispatch(setShowMenu(false))
    navigate(PATH.PACKS)
  }

  const logoutHandler = () => {
    logOut().unwrap()
    dispatch(setShowMenu(false))
  }

  return (
    <MenuList open={open}>
      <li onClick={profileNavigateHandler}>
        <UserIcon /> Profile
      </li>

      <li onClick={packsNavigateHandler}>
        <PacksIcon /> Packs
      </li>

      <li onClick={logoutHandler}>
        <LogoutIcon /> Log out
      </li>
    </MenuList>
  )
}
