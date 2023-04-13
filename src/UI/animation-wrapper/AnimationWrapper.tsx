import React, { FC, ReactNode } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import { animateVariants, initialVariants, transitionOptions } from './animation-variants-constants'
import s from './AnimationWrapper.module.scss'

type AnimationWrapperType = {
  children: ReactNode
}

export const AnimationWrapper: FC<AnimationWrapperType> = ({ children }) => {
  return (
    <AnimatePresence>
      <motion.div
        className={s.contentContainer}
        initial={initialVariants}
        animate={animateVariants}
        transition={transitionOptions}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
