import React from 'react'

import { useNavigate } from 'react-router-dom'

import checkEmail from 'assets/img/check-email.svg'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import s from 'modules/auth/forgotPassword/checkEmail/CheckEmail.module.scss'
import { currentEmailSelector } from 'modules/auth/selectors'
import { PATH } from 'routes/routes'
import { Box } from 'UI/box/Box'
import { Button } from 'UI/button/Button'

export const CheckEmail = () => {
  const navigate = useNavigate()
  const currentEmail = useTypedSelector(currentEmailSelector)

  return (
    <Box>
      <h2 className={s.title}>Check Email</h2>

      <img src={checkEmail} alt="check email" />

      <p className={s.text}>
        We’ve sent an Email with instructions to
        <span className={s.textEmail}>{currentEmail}</span>
      </p>

      <Button styleType="primary" onClick={() => navigate(PATH.LOG_IN)}>
        Back to login
      </Button>
    </Box>
  )
}
