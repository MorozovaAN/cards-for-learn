import { DetailedHTMLProps, FC, TextareaHTMLAttributes } from 'react'

import s from './Textarea.module.scss'

type DefaultTextareaPropsType = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

type TextareaType = Omit<DefaultTextareaPropsType, 'type'> & {
  label: string
}

export const Textarea: FC<TextareaType> = ({ label, ...restProps }) => {
  return (
    <div className={s.container}>
      <p className={s.label}>{label}</p>
      <textarea className={s.textarea} {...restProps} />
    </div>
  )
}
