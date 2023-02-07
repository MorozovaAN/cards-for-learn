import React from 'react'

import s from './NewPasswordPage.module.scss'

import { SetNewPassword } from 'modules/auth/forgotPassword/setNewPassword/SetNewPassword'

export const NewPasswordPage = () => {
  return (
    <div className={s.contentContainer}>
      <SetNewPassword />
    </div>
  )
}
