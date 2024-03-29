import React from 'react'

import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import { useLogUpMutation } from '../authApi'

import s from './LogUp.module.scss'

import { PATH } from 'routes/routes'
import { Box } from 'UI/box/Box'
import { Button } from 'UI/button/Button'
import { Input } from 'UI/input/Input'
import { NavLink } from 'UI/nav-link/NavLink'

type LogUpErrorType = {
  email?: string
  password?: string
  confirmPassword?: string
}

export const LogUp = () => {
  const [logUp, { isSuccess, isLoading }] = useLogUpMutation()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: values => {
      const errors: LogUpErrorType = {}

      if (!values.email) {
        errors.email = 'Required field'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (!values.password.trim()) {
        errors.password = 'Required field'
      } else if (values.password.trim().length < 8) {
        errors.password = 'Password should be 8 symbols at less'
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Required field'
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords should be identical'
      }

      return errors
    },

    onSubmit: values => {
      logUp({ email: values.email.toLowerCase(), password: values.password })
    },
  })

  if (isSuccess) return <Navigate to={PATH.LOG_IN} />

  const buttonDisabled =
    !!formik.errors.email ||
    !!formik.errors.password ||
    !!formik.errors.confirmPassword ||
    !formik.values.email ||
    !formik.values.confirmPassword ||
    !formik.values.password

  return (
    <Box size="L" className={s.container}>
      <h2 className={s.title}>Sign Up to Cards for learn*</h2>

      <form onSubmit={formik.handleSubmit} className={s.form}>
        <Input
          type="email"
          label="Email"
          disabled={isLoading}
          error={formik.touched.email && formik.errors.email}
          {...formik.getFieldProps('email')}
        />

        <Input
          type="password"
          label="Password"
          disabled={isLoading}
          error={formik.touched.password && formik.errors.password}
          {...formik.getFieldProps('password')}
        />

        <Input
          type="password"
          label="Confirm password"
          disabled={isLoading}
          error={formik.touched.confirmPassword && formik.errors.confirmPassword}
          {...formik.getFieldProps('confirmPassword')}
        />

        <Button type="submit" styleType="primary" disabled={buttonDisabled}>
          Sign Up
        </Button>
      </form>

      <div className={s.navigateContainer}>
        <p className={s.subtitle}>Already have an account?</p>
        <NavLink url={PATH.LOG_IN} styleType="primary" disabled={isLoading}>
          Sign In
        </NavLink>
      </div>

      <p className={s.note}>*we recommend using the Google Chrome browser</p>
    </Box>
  )
}
