import React from 'react'

import { SetNewPassword } from 'modules/auth/forgotPassword/setNewPassword/SetNewPassword'
import s from 'pages/new-password-page/SetNewPasswordPage.module.scss'

export const NewPasswordPage = () => {
  return (
    <div className={s.container}>
      <SetNewPassword />
    </div>
  )
}
