import React, { FC, ReactNode } from 'react'

import { Link } from 'react-router-dom'

import s from './NavLink.module.scss'

type NavLinkType = {
  url: string
  children: ReactNode
  styleType?: 'primary'
  className?: string
}

export const NavLink: FC<NavLinkType> = ({ url, children, styleType, className }) => {
  const linkClasses = `${s.link} ${styleType && s[styleType]} ${className && className}`

  return (
    <Link to={url} className={linkClasses}>
      {children}
    </Link>
  )
}
