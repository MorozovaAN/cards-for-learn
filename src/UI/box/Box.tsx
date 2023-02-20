import React, { FC, ReactNode } from 'react'

import s from './Box.module.scss'
type BoxType = {
  children: ReactNode
  className?: string
  size: 'L' | 'M'
}
export const Box: FC<BoxType> = ({ children, className, size }) => {
  const boxClasses = `${s.box} ${s[size]} ${className && className}`

  return <div className={boxClasses}>{children}</div>
}
