import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

import s from './Button.module.scss'

type DefaultButtonType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type ButtonType = DefaultButtonType & {
  styleType?: 'primary' | 'secondary' | 'warn' | 'icon' | 'iconPrimary'
}
export const Button: FC<ButtonType> = ({ styleType, className, ...restProps }) => {
  const finalClassName = `${styleType && s[styleType]} ${className && className} ${
    restProps.disabled ? s.disabled : ''
  }`.trim()

  return (
    <button className={finalClassName} {...restProps}>
      {restProps.children}
    </button>
  )
}
