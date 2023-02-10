import React, { FC, ReactNode } from 'react'

import { motion } from 'framer-motion'

import s from 'UI/menu-list/MenuList.module.scss'

type MenuListType = {
  children: ReactNode
}

export const MenuList: FC<MenuListType> = ({ children }) => {
  return (
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
      {children}
    </motion.ul>
  )
}
