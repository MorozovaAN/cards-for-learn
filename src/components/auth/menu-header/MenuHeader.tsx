import React, { FC, useEffect } from 'react'

import { motion, Variants } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import s from './MenuHeader.module.scss'

import { ReactComponent as LogoutIcon } from 'assets/img/icons/exit.svg'
import { ReactComponent as PacksIcon } from 'assets/img/icons/packs.svg'
import { ReactComponent as UserIcon } from 'assets/img/icons/user.svg'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { ClickAwayListener } from 'common/utils/ClickAwayListener'
import { useLogOutMutation } from 'modules'
import { setClickAway } from 'modules/auth/authSlice'
import { PATH } from 'routes/routes'
import { MenuList } from 'UI/menu-list/MenuList'

type MenuHeaderType = {
  isLeave: boolean
  open: boolean
  setShowMenu: (showMenu: boolean) => void
}

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 0, transition: { duration: 0.2 } },
}

export const MenuHeader: FC<MenuHeaderType> = ({ isLeave, open, setShowMenu }) => {
  const clickAway = useTypedSelector(state => state.auth.clickAway)
  const [logOut] = useLogOutMutation()
  const navigate = useNavigate()

  const profileNavigateHandler = () => {
    setShowMenu(false)
    navigate(PATH.PROFILE)
  }

  const packsNavigateHandler = () => {
    setShowMenu(false)
    navigate(PATH.PACKS)
  }

  const logoutHandler = () => {
    logOut().unwrap()
    setShowMenu(false)
  }
  const clickAwayHandler = () => {
    setClickAway(true)
  }

  useEffect(() => {
    if (open && isLeave && clickAway) {
      setShowMenu(false)
    }
  }, [open, isLeave, clickAway])

  return (
    <motion.div
      initial={false}
      animate={open ? 'open' : 'closed'}
      className={open ? s.menuHeader : ''}
    >
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
