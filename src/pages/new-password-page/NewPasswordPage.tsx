import React from 'react'

import s from './NewPasswordPage.module.scss'

import { SetNewPassword } from 'modules'

export const NewPasswordPage = () => {
  return (
    <div className={s.contentContainer}>
      <SetNewPassword />
    </div>
  )
}
