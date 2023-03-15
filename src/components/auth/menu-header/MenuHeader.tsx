import React, { FC, useEffect } from 'react'

import { AnimatePresence, motion, Variants } from 'framer-motion'
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
  const itemVariants: Variants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, x: 100, transition: { duration: 0.2 } },
  }
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
    <motion.div
      className={open ? s.menuHeader : ''}
      initial={false}
      animate={open ? 'open' : 'closed'}
    >
      <ClickAwayListener onClickAway={clickAwayHandler}>
        <motion.ul
          className={s.menuList}
          variants={{
            open: {
              clipPath: 'inset(0% 0% 0% 0% round 10px)',
              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05,
              },
            },
            closed: {
              clipPath: 'inset(10% 50% 90% 50% round 10px)',
              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
        >
          <motion.li onClick={profileNavigateHandler} variants={itemVariants}>
            <UserIcon /> Profile
          </motion.li>
          <motion.li onClick={packsNavigateHandler} variants={itemVariants}>
            <PacksIcon /> Packs
          </motion.li>
          <motion.li onClick={myPacksNavigateHandler} variants={itemVariants}>
            <MyPacks /> My packs
          </motion.li>
          <motion.li onClick={logoutHandler} variants={itemVariants}>
            <LogoutIcon /> Logout
          </motion.li>
        </motion.ul>
      </ClickAwayListener>
    </motion.div>
  )
}
