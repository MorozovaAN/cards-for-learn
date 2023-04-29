import React from 'react'

import { useFormik } from 'formik'
import * as yup from 'yup'

import {
  emailValidationSchema,
  passwordValidationSchema,
} from '../../../common/constants/yup-validation-schemas'

import s from './LogIn.module.scss'

import { useLogInMutation } from 'modules/auth/authApi'
import { PATH } from 'routes/routes'
import { Box } from 'UI/box/Box'
import { Button } from 'UI/button/Button'
import { Checkbox } from 'UI/checkbox/Checkbox'
import { Input } from 'UI/input/Input'
import { NavLink } from 'UI/nav-link/NavLink'

const validationSchema = yup.object().shape({
  email: emailValidationSchema,
  password: passwordValidationSchema,
  rememberMe: yup.boolean(),
})

export const LogIn = () => {
  const [setLogin, { isLoading }] = useLogInMutation()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: validationSchema,

    onSubmit: values => {
      values = { ...values, email: values.email.toLowerCase() }
      setLogin(values)
    },
  })

  const useDemoAcc = () => {
    setLogin({ email: 'mainmaill@inbox.ru', password: 'mainmaill12345', rememberMe: false })
  }

  return (
    <Box size="L" className={s.container}>
      <h2 className={s.title}>Sign in*</h2>

      <form onSubmit={formik.handleSubmit} className={s.form}>
        <Input
          type="email"
          label="Email"
          disabled={isLoading}
          {...formik.getFieldProps('email')}
          error={formik.touched.email ? formik.errors.email : ''}
        />

        <Input
          type="password"
          label="Password"
          disabled={isLoading}
          {...formik.getFieldProps('password')}
          error={formik.touched.password ? formik.errors.password : ''}
        />

        <Checkbox
          {...formik.getFieldProps('rememberMe')}
          checked={formik.values.rememberMe}
          disabled={isLoading}
        >
          Remember me
        </Checkbox>

        <NavLink
          url={PATH.PASS_RECOVERY}
          styleType="primary"
          className={s.link}
          disabled={isLoading}
        >
          Forgot password?
        </NavLink>

        <div className={s.buttonsContainer}>
          <Button
            type="submit"
            styleType="primary"
            disabled={
              !formik.values.email ||
              !formik.values.password ||
              !!(formik.errors.password || formik.errors.email) ||
              isLoading
            }
          >
            Sign in
          </Button>

          <Button styleType="primary" type="button" onClick={useDemoAcc} disabled={isLoading}>
            Demo account
          </Button>
        </div>
      </form>

      <div className={s.navigateContainer}>
        <p className={s.subtitle}>Don`t have an account?</p>
        <NavLink url={PATH.LOG_UP} styleType="primary" disabled={isLoading}>
          Sign Up
        </NavLink>

        <p className={s.note}>*we recommend using the Google Chrome browser</p>
      </div>
    </Box>
  )
}
