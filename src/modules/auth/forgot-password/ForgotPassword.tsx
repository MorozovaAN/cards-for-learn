import React from 'react'

import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'
import * as yup from 'yup'

import { emailValidationSchema } from '../../../common/constants/yup-validation-schemas'

import s from './ForgotPassword.module.scss'

import { useForgotPasswordMutation } from 'modules/auth/authApi'
import { PATH } from 'routes/routes'
import { Box } from 'UI/box/Box'
import { Button } from 'UI/button/Button'
import { Input } from 'UI/input/Input'
import { NavLink } from 'UI/nav-link/NavLink'

const validationSchema = yup.object().shape({
  email: emailValidationSchema,
})

export const ForgotPassword = () => {
  const [forgotPassword, { isSuccess, isLoading }] = useForgotPasswordMutation()
  const index = window.location.href.lastIndexOf('/')
  const location = window.location.href.slice(0, index)

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,

    onSubmit: values => {
      let payload = {
        form: 'test-front-admin <ai73a@yandex.by>',
        message: `<div style="background-color: #d6f3d7; padding: 30px; font-weight: 600; width: 230px; border: 1px solid green; color: black">
            Password recovery link: <a style="text-decoration: none; font-weight: 900; color: #026c60;" href=\`${location}/set-new-password/$token$\`>follow me</a>
        </div>`,
      }

      forgotPassword({ email: values.email, ...payload })
    },
  })

  if (isSuccess) return <Navigate to={PATH.CHECK_EMAIL} />

  return (
    <Box size="L">
      <h2 className={s.headline}>Forgot your password?</h2>

      <p className={s.title}>Enter your email address and we will send you further instructions</p>

      <form onSubmit={formik.handleSubmit} className={s.form}>
        <Input
          placeholder="Email"
          type="email"
          disabled={isLoading}
          error={formik.touched.email ? formik.errors.email : ''}
          {...formik.getFieldProps('email')}
        />

        <Button
          type="submit"
          styleType="primary"
          disabled={formik.values.email === '' || !!formik.errors.email || isLoading}
        >
          Send Instructions
        </Button>
      </form>

      <div className={s.navigateContainer}>
        <p className={s.subtitle}>Do you remember your password?</p>
        <NavLink url={PATH.LOG_IN} styleType="primary" disabled={isLoading}>
          Try to log in
        </NavLink>
      </div>
    </Box>
  )
}
