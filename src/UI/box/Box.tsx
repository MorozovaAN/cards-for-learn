import React, { FC, ReactNode } from 'react'

import { motion } from 'framer-motion'

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
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
      className={boxClasses}
    >
      {children}
    </motion.div>
  ) : (
    <div className={boxClasses}>{children}</div>
  )
}
