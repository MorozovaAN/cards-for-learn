import React from 'react'

import { ForgotPassword } from 'modules/auth/forgotPassword/ForgotPassword'
import s from 'pages/forgot-password-page/ForgotPasswordPage.module.scss'

export const ForgotPasswordPage = () => {
  return (
    <div className={s.container}>
      <ForgotPassword />
    </div>
  )
}
