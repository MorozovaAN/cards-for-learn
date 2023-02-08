import React from 'react'

import s from './CheckEmailPage.module.scss'

import { CheckEmail } from 'modules'

export const CheckEmailPage = () => {
  return (
    <div className={s.contentContainer}>
      <CheckEmail />
    </div>
  )
}
