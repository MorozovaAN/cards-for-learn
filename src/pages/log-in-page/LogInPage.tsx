import React from 'react'

import { LogIn } from 'modules/auth/logIn/LogIn'
import s from 'pages/log-in-page/LoginPage.module.scss'

export const LogInPage = () => {
  return (
    <div className={s.container}>
      <LogIn />
    </div>
  )
}
