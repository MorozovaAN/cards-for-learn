import React from 'react'

import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'

import { useSetNewPasswordMutation } from 'modules/auth/authApi'
import { ErrorsType } from 'modules/auth/forgotPassword/ForgotPassword'
import s from 'modules/auth/forgotPassword/setNewPassword/SetNewPassword.module.scss'
import { Box } from 'UI/box/Box'
import { Button } from 'UI/button/Button'
import { Input } from 'UI/input/Input'

export const SetNewPassword = () => {
  const [setNewPassword, {}] = useSetNewPasswordMutation()
  const { token } = useParams()

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: values => {
      const errors: ErrorsType = {}

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 8) {
        errors.password = 'Password must be more 7 characters'
      }

      return errors
    },

    onSubmit: values => {
      if (token) {
        setNewPassword({ password: values.password, resetPasswordToken: token })
      }
    },
  })

  return (
    <Box>
      <h2>Create new password?</h2>

      <form onSubmit={formik.handleSubmit} className={s.form}>
        <Input
          type="password"
          error={formik.errors.password}
          placeholder="Password"
          {...formik.getFieldProps('password')}
        />

        <p>Create new password and we will send you further instructions to email</p>

        <Button styleType="primary" disabled={!!formik.errors.password}>
          Create new password
        </Button>
      </form>
    </Box>
  )
}
