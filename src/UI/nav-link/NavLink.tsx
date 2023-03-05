import React, { FC, ReactNode } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import s from './NavLink.module.scss'

type NavLinkType = {
  url?: string
  children: ReactNode
  styleType: 'default' | 'link' | 'primary' | 'button' | 'buttonSecondary' | 'btnIcon'
  className?: string
  disabled?: boolean
}

export const NavLink: FC<NavLinkType> = ({ url, children, styleType, className, disabled }) => {
  const navigate = useNavigate()
  const linkClasses = ` ${className && className} ${styleType && s[styleType]} ${s.default} ${
    disabled && s.disabled
  }`
  const buttonClasses = `${className && className} ${s.default} ${s.link} ${disabled && s.disabled}`

  return styleType === 'link' ? (
    <button className={buttonClasses} onClick={() => navigate(-1)}>
      {children}
    </button>
  ) : (
    <Link to={url ? url : ''} className={linkClasses}>
      {children}
    </Link>
  )
}
