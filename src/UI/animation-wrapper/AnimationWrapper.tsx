import React, { FC, ReactNode } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import s from './AnimationWrapper.module.scss'

type AnimationWrapperType = {
  children: ReactNode
}

export const AnimationWrapper: FC<AnimationWrapperType> = ({ children }) => {
  return (
    <AnimatePresence>
      <motion.div
        className={s.contentContainer}
        initial={{ y: -500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
