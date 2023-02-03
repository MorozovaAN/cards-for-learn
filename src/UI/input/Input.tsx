import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from 'react'

import { Button } from '../button/Button'

import s from './Input.module.scss'

import visibilityOff from 'assets/img/icons/visibility-off.svg'
import visibilityOn from 'assets/img/icons/visibility-on.svg'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
type SuperInputTextPropsType = Omit<DefaultInputPropsType, 'type'> & {
  type: string
  label?: string
  error?: string | false | undefined
  textChange?: boolean
  textChangeBtnCallback?: (e: any) => void
  className?: string
  inputContainerClassName?: string
}
export const Input: React.FC<SuperInputTextPropsType> = ({
  type,
  label,
  error,
  textChange,
  textChangeBtnCallback,
  className,
  inputContainerClassName,
  ...restProps
}) => {
  const [typeLabel, setTypeLabel] = useState(type)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [currentValue, setCurrentValue] = useState('')

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.currentTarget.value)
  }
  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible)
  }
  const textChangeBtnCallbackHandle = () => {
    textChangeBtnCallback?.(currentValue)
  }

  useEffect(() => {
    passwordVisible ? setTypeLabel('text') : setTypeLabel(type)
  }, [passwordVisible])

  const showError = !textChange && type !== 'search'

  const inputClasses = `${s.input} ${className ? className : ''} ${type && s[type]}`

  const inputContainerClasses = `${s.inputContainer} ${
    inputContainerClassName && inputContainerClassName
  }`

  return (
    <div className={inputContainerClasses}>
      {label && (
        <label htmlFor={label} className={s.label}>
          {label}
        </label>
      )}
      <input
        value={currentValue}
        type={typeLabel}
        className={inputClasses}
        id={label}
        onChange={inputOnChange}
        {...restProps}
      />
      <div>
        {type === 'password' && (
          <img
            alt="password visibility icon"
            className={s.visibilityIcon}
            src={passwordVisible ? visibilityOff : visibilityOn}
            onClick={togglePasswordVisible}
          />
        )}
      </div>
      {textChange && (
        <Button
          styleType="primary"
          className={s.saveButton}
          onClick={textChangeBtnCallbackHandle}
          disabled={restProps.disabled}
        >
          SAVE
        </Button>
      )}
      {showError && (
        <div className={s.errorContainer}>{error && <p className={s.error}>{error}</p>}</div>
      )}
    </div>
  )
}
