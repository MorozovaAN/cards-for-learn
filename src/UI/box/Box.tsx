import React, { FC, ReactNode } from 'react'

import s from './Box.module.scss'
type BoxType = {
  children: ReactNode
  className?: string
}
export const Box: FC<BoxType> = ({ children, className }) => {
  const boxClasses = `${s.box} ${className && className}`

  return <div className={boxClasses}>{children}</div>
}
