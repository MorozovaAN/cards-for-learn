import React, { FC, ReactNode } from 'react'

import { Link } from 'react-router-dom'

import s from './NavLink.module.scss'

type NavLinkType = {
  url: string | ''
  children: ReactNode
  styleType: 'primary' | 'default' | 'button' | 'buttonSecondary' | 'btnIcon'
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export const NavLink: FC<NavLinkType> = ({
  url,
  children,
  styleType,
  className,
  onClick,
  disabled,
}) => {
  const linkClasses = ` ${className && className} ${s.link} ${styleType && s[styleType]} ${
    disabled && s.disabled
  }`

  return (
    <Link to={url} className={linkClasses} onClick={onClick}>
      {children}
    </Link>
  )
}
