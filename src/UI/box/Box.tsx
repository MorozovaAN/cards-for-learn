import React, { FC, ReactNode } from 'react'

import { motion } from 'framer-motion'

import { animateVariants, initialVariants, transitionOptions } from './animation-variants-constants'
import s from './Box.module.scss'

type BoxType = {
  children: ReactNode
  className?: string
  size: 'L' | 'M'
}

export const Box: FC<BoxType> = ({ children, className, size }) => {
  const boxClasses = `${s.box} ${s[size]} ${className && className}`

  return size === 'M' ? (
    <motion.div
      initial={initialVariants}
      animate={animateVariants}
      transition={transitionOptions}
      className={boxClasses}
    >
      {children}
    </motion.div>
  ) : (
    <div className={boxClasses}>{children}</div>
  )
}
