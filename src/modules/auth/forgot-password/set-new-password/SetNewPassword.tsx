import React from 'react'

import { useFormik } from 'formik'
import { Navigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { passwordValidationSchema } from '../../../../common/constants/yup-validation-schemas'

import s from './SetNewPassword.module.scss'

import { useSetNewPasswordMutation } from 'modules/auth/authApi'
import { PATH } from 'routes/routes'
import { Box } from 'UI/box/Box'
import { Button } from 'UI/button/Button'
import { Input } from 'UI/input/Input'

const validationSchema = yup.object().shape({
  password: passwordValidationSchema,
})

export const SetNewPassword = () => {
  const [setNewPassword, { isSuccess, isLoading }] = useSetNewPasswordMutation()
  const { token } = useParams()

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: validationSchema,

    onSubmit: values => {
      if (token) {
        setNewPassword({ password: values.password, resetPasswordToken: token })
      }
    },
  })

  if (isSuccess) return <Navigate to={PATH.LOG_IN} />

  return (
    <Box size="L">
      <h2 className={s.title}>Create new password?</h2>

      <p className={s.subtitle}>
        Create new password and we will send you further instructions to email
      </p>

      <form onSubmit={formik.handleSubmit} className={s.form}>
        <Input
          type="password"
          disabled={isLoading}
          error={formik.touched.password && formik.errors.password}
          placeholder="Password"
          {...formik.getFieldProps('password')}
        />

        <Button
          type="submit"
          styleType="primary"
          disabled={!!formik.errors.password || !formik.values.password || isLoading}
        >
          Create new password
        </Button>
      </form>
    </Box>
  )
}
