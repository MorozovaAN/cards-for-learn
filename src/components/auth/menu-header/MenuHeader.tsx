import React, { FC, useEffect } from 'react'

import { motion, Variants } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import s from './MenuHeader.module.scss'

import { setBurger, setHeaderClickAway } from 'app/appSlice'
import { ReactComponent as LogoutIcon } from 'assets/img/icons/exit.svg'
import { ReactComponent as PacksIcon } from 'assets/img/icons/packs.svg'
import { ReactComponent as UserIcon } from 'assets/img/icons/user.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { ClickAwayListener } from 'common/utils/сlickAwayListener'
import { clickAwaySelector } from 'modules/auth/authSelectors'
import { setClickAway } from 'modules/auth/authSlice'
import { PATH } from 'routes/routes'
import { MenuList } from 'UI/menu-list/MenuList'

type MenuHeaderType = {
  open: boolean
}

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 0, transition: { duration: 0.2 } },
}

export const MenuHeader: FC<MenuHeaderType> = ({ open }) => {
  const clickAway = useTypedSelector(clickAwaySelector)
  const headerClickAway = useTypedSelector(state => state.app.headerClickAway)

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

  const clickAwayHandler = () => {
    dispatch(setClickAway(true))
  }

  useEffect(() => {
    if (clickAway && headerClickAway) {
      dispatch(setBurger(false))
      dispatch(setHeaderClickAway(false))
    }
  }, [clickAway, headerClickAway])

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

          <motion.li variants={itemVariants}>
            <LogoutIcon /> Logout
          </motion.li>
        </MenuList>
      </ClickAwayListener>
    </motion.div>
  )
}
