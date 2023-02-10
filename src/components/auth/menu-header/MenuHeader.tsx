import React, { FC, useEffect } from 'react'

import { motion, Variants } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as LogoutIcon } from 'assets/img/icons/exit.svg'
import { ReactComponent as PacksIcon } from 'assets/img/icons/packs.svg'
import { ReactComponent as UserIcon } from 'assets/img/icons/user.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { ClickAwayListener } from 'common/utils/ClickAwayListener'
import { useLogOutMutation } from 'modules'
import { setClickAway, setShowMenu } from 'modules/auth/authSlice'
import { PATH } from 'routes/routes'
import { MenuList } from 'UI/menu-list/MenuList'
type MenuHeaderType = {
  isLeave: boolean
}
export const MenuHeader: FC<MenuHeaderType> = ({ isLeave }) => {
  const open = useTypedSelector(state => state.auth.showMenu)
  const clickAway = useTypedSelector(state => state.auth.clickAway)
  const [logOut] = useLogOutMutation()
  const dispatch = useTypedDispatch()
  const navigate = useNavigate()

  const itemVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 0, transition: { duration: 0.2 } },
  }
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
  const clickAwayHandler = () => {
    dispatch(setClickAway(true))
  }

  useEffect(() => {
    if (open && isLeave && clickAway) {
      dispatch(setShowMenu(false))
    }
  }, [open, isLeave, clickAway])

  return (
    <motion.div initial={false} animate={open ? 'open' : 'closed'}>
      <ClickAwayListener onClickAway={clickAwayHandler}>
        <MenuList>
          <motion.li onClick={profileNavigateHandler} variants={itemVariants}>
            <UserIcon /> Profile
          </motion.li>

          <motion.li onClick={packsNavigateHandler} variants={itemVariants}>
            <PacksIcon /> Packs
          </motion.li>

          <motion.li onClick={logoutHandler} variants={itemVariants}>
            <LogoutIcon /> Log out
          </motion.li>
        </MenuList>
      </ClickAwayListener>
    </motion.div>
  )
}
