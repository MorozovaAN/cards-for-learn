import React from 'react'

import { useNavigate } from 'react-router-dom'

import checkEmail from 'assets/img/check-email.svg'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { currentEmailSelector } from 'modules/auth/selectors'
import { PATH } from 'routes/routes'
import { Button } from 'UI/button/Button'

export const CheckEmail = () => {
  const navigate = useNavigate()
  const currentEmail = useTypedSelector(currentEmailSelector)

  return (
    <div>
      <h2>Check Email</h2>

      <img src={checkEmail} alt="check email" />

      <p>We’ve sent an Email with instructions to {currentEmail}</p>

      <Button styleType="primary" onClick={() => navigate(PATH.LOG_IN)}>
        Back to login
      </Button>
    </div>
  )
}
