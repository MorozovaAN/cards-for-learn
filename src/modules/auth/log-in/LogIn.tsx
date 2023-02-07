import React from 'react'

import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { useLogInMutation } from 'modules/auth/authApi'
import s from 'modules/auth/log-in/LogIn.module.scss'
import { setIsLoading } from 'pages/app/appSlice'
import { isLoggedInSelector } from 'pages/app/selectors'
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
  const [setLogin, { isLoading }] = useLogInMutation()
  const isLoggedIn = useTypedSelector(isLoggedInSelector)
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
      dispatch(setIsLoading(true))
      setLogin(values)
    },
  })

  if (isLoggedIn) return <Navigate to={PATH.PACKS} />

  return (
    <Box>
      <h2 className={s.title}>Sign in</h2>
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

        <NavLink url={PATH.PASS_RECOVERY} styleType="primary" className={s.link}>
          Forgot password?
        </NavLink>

        <Button
          type="submit"
          styleType="primary"
          disabled={
            !!formik.errors.password ||
            !!formik.errors.email ||
            !formik.values.email ||
            !formik.values.password ||
            isLoading
          }
        >
          Sign in
        </Button>
      </form>

      <div className={s.navigateContainer}>
        <p className={s.subtitle}>Don`t have an account?</p>
        <NavLink url={PATH.LOG_UP} styleType="primary">
          Sign Up
        </NavLink>
      </div>
    </Box>
  )
}
