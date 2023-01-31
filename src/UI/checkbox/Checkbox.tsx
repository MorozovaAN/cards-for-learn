import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react'

import s from './Checkbox.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type SuperCheckboxPropsType = Omit<DefaultInputPropsType, 'type'> & {
  onChangeChecked?: (checked: boolean) => void
  children?: ReactNode
}

export const Checkbox: React.FC<SuperCheckboxPropsType> = ({
  onChange,
  onChangeChecked,
  className,
  children,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onChangeChecked?.(e.currentTarget.checked)
  }

  const checkboxContainerClasses = `${s.label} ${restProps.disabled && s.disabled} ${
    className && className
  }`

  return (
    <label className={checkboxContainerClasses}>
      <input type="checkbox" onChange={onChangeCallback} className={s.checkbox} {...restProps} />
      <p className={s.checkboxText}>{children}</p>
    </label>
  )
}
