import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from 'react'

import { Button } from '../button/Button'

import s from './Input.module.scss'

import { ReactComponent as VisibilityOff } from 'assets/img/icons/visibility-off.svg'
import { ReactComponent as VisibilityOn } from 'assets/img/icons/visibility-on.svg'

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
  disableBtn?: boolean
}
export const Input: React.FC<SuperInputTextPropsType> = ({
  type,
  label,
  error,
  textChange,
  textChangeBtnCallback,
  className,
  inputContainerClassName,
  disableBtn,
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

  const inputClasses = `${s.input} ${className ? className : ''} ${type && s[type]} ${
    textChange && s.inputWithBtn
  }`

  const inputContainerClasses = `${s.inputContainer} ${
    inputContainerClassName && inputContainerClassName
  }`

  const visibilityIconClasses = `${s.visibilityIcon} ${
    restProps.disabled && s.visibilityIconDisable
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
        {type === 'password' &&
          (passwordVisible ? (
            <VisibilityOn
              onClick={togglePasswordVisible}
              className={visibilityIconClasses}
              fill="#676665"
              alt="password visibility icon"
            />
          ) : (
            <VisibilityOff
              onClick={togglePasswordVisible}
              className={visibilityIconClasses}
              fill="#676665"
              alt="password visibility icon"
            />
          ))}
      </div>
      {textChange && (
        <Button
          type="submit"
          styleType="primary"
          className={s.saveButton}
          onMouseDown={textChangeBtnCallbackHandle}
          disabled={disableBtn}
        >
          SAVE
        </Button>
      )}

      <div className={s.errorContainer}>{error && <p className={s.error}>{error}</p>}</div>
    </div>
  )
}
