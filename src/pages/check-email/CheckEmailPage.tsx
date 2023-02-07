import React from 'react'

import { CheckEmail } from 'modules/auth/forgotPassword/checkEmail/CheckEmail'
import s from 'pages/forgot-password-page/ForgotPasswordPage.module.scss'

export const CheckEmailPage = () => {
  return (
    <div className={s.container}>
      <CheckEmail />
    </div>
  )
}
