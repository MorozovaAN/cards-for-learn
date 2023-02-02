import React from 'react'

import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import s from './Login.module.scss'

import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useLoginMutation } from 'modules/auth/authApi'
import { setIsLoggedIn } from 'pages/app/appSlice'
import { PATH } from 'routes/routes'
import { Box } from 'UI/box/Box'
import { Button } from 'UI/button/Button'
import { Checkbox } from 'UI/checkbox/Checkbox'
import { Input } from 'UI/input/Input'
import { NavLink } from 'UI/nav-link/NavLink'

interface FormikErrorType {
  email?: string
  password?: string
  rememberMe?: boolean
}
export const LogIn = () => {
  const [setLogin, { isSuccess }] = useLoginMutation()
  const dispatch = useTypedDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },

    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Email is required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (!values.password) {
        errors.password = 'Password is required'
      } else if (values.password.length < 8) {
        errors.password = 'Password should be longer then 7 symbols!'
      }

      return errors
    },
    onSubmit: values => {
      setLogin(values)
    },
  })

  if (isSuccess) {
    dispatch(setIsLoggedIn(true))

    return <Navigate to={PATH.PACKS} />
  }

  return (
    <Box className={s.container}>
      <h2>Sign in</h2>

      <form onSubmit={formik.handleSubmit} className={s.form}>
        <Input
          type="email"
          label="Email"
          {...formik.getFieldProps('email')}
          error={formik.touched.email ? formik.errors.email : ''}
        />
        <Input
          type="password"
          label="Password"
          {...formik.getFieldProps('password')}
          error={formik.touched.password ? formik.errors.password : ''}
        />
        <Checkbox {...formik.getFieldProps('rememberMe')} checked={formik.values.rememberMe}>
          Remember me
        </Checkbox>

        <NavLink url={PATH.PASS_RECOVERY} styleType="primary" className={s.link}>
          Forgot password?
        </NavLink>

        <Button
          styleType="primary"
          disabled={
            !!formik.errors.password ||
            !!formik.errors.email ||
            !formik.values.email ||
            !formik.values.password
          }
        >
          Sign in
        </Button>
      </form>

      <div>Don`t have an account?</div>
      <NavLink url={PATH.LOG_UP} styleType="primary">
        Sign Up
      </NavLink>
    </Box>
  )
}
