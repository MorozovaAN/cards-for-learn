import React from 'react'

import { useNavigate } from 'react-router-dom'

import s from './CheckEmail.module.scss'

import checkEmail from 'assets/img/check-email.svg'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { emailSelector } from 'modules/auth/authSelectors'
import { PATH } from 'routes/routes'
import { Box } from 'UI/box/Box'
import { Button } from 'UI/button/Button'

export const CheckEmail = () => {
  const navigate = useNavigate()
  const email = useTypedSelector(emailSelector)

  return (
    <Box>
      <h2 className={s.title}>Check Email</h2>

      <img src={checkEmail} alt="check email" />

      <p className={s.subtitle}>
        We’ve sent an Email with instructions to&nbsp;
        <span className={s.email}>{email}</span>
      </p>

      <Button styleType="primary" onClick={() => navigate(PATH.LOG_IN)} className={s.button}>
        Back to login
      </Button>
    </Box>
  )
}
