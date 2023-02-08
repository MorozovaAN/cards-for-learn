import React from 'react'

import s from './ForgotPasswordPage.module.scss'

import { ForgotPassword } from 'modules'

export const ForgotPasswordPage = () => {
  return (
    <div className={s.contentContainer}>
      <ForgotPassword />
    </div>
  )
}
