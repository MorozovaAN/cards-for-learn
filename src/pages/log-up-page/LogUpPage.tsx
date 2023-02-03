import React from 'react'

import s from './LogUpPage.module.scss'

import { LogUp } from 'modules/auth/log-up/LogUp'

export const LogUpPage = () => {
  return (
    <div className={s.container}>
      <LogUp />
    </div>
  )
}
