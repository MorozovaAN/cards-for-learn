import React, { DetailedHTMLProps, FC, TextareaHTMLAttributes } from 'react'

import s from './Textarea.module.scss'

type DefaultTextareaPropsType = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

type TextareaType = Omit<DefaultTextareaPropsType, 'type'> & {
  label: string
  error?: string
  limit?: number
  symbols?: number
}

export const Textarea: FC<TextareaType> = ({ label, error, symbols = 0, limit, ...restProps }) => {
  return (
    <div className={s.container}>
      <p className={s.label}>{label}</p>

      <textarea className={s.textarea} {...restProps} />
      {limit && <p className={s.limit}>{`${symbols}/${limit}`}</p>}
    </div>
  )
}
