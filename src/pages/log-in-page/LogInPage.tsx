import React from 'react'

import { LogIn } from 'modules/auth/log-in/LogIn'
import s from 'pages/log-up-page/LogUpPage.module.scss'

export const LogInPage = () => {
  return (
    <div className={s.contentContainer}>
      <LogIn />
    </div>
  )
}
