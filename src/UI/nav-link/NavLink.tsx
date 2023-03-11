import React, { FC, ReactNode } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import s from './NavLink.module.scss'

type NavLinkType = {
  url?: string
  children: ReactNode
  styleType: 'default' | 'primary' | 'button' | 'buttonSecondary' | 'btnIcon'
  className?: string
  disabled?: boolean
}

export const NavLink: FC<NavLinkType> = ({ url, children, styleType, className, disabled }) => {
  const linkClasses = ` ${className && className} ${styleType && s[styleType]} ${s.default} ${
    disabled && s.disabled
  }`

  return (
    <Link to={url ? url : ''} className={linkClasses}>
      {children}
    </Link>
  )
}
