import React from 'react'

import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useForgotPasswordMutation } from 'modules/auth/authApi'
import { forgotPasswordCurrentEmail } from 'modules/auth/authSlice'
import s from 'modules/auth/forgotPassword/ForgotPassword.module.scss'
import { setError } from 'pages/app/appSlice'
import { PATH } from 'routes/routes'
import { Box } from 'UI/box/Box'
import { Button } from 'UI/button/Button'
import { Input } from 'UI/input/Input'
import { NavLink } from 'UI/nav-link/NavLink'

export type ErrorsType = {
  email?: string
  password?: string
}

const payload = {
  form: 'test-front-admin <ai73a@yandex.by>',
  message: `<div style="background-color: #d6f3d7; padding: 30px; font-weight: 600; width: 230px; border: 1px solid green; color: #026c60">
            password recovery link: <a style="text-decoration: none; font-weight: 900; color: black;" href='http://localhost:3000/#/set-new-password/$token$'>follow me</a>
        </div>`,
}

export const ForgotPassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [forgotPassword] = useForgotPasswordMutation()

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: values => {
      const errors: ErrorsType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      return errors
    },

    onSubmit: values => {
      forgotPassword({ email: values.email, ...payload })
        .unwrap()
        .then(() => {
          dispatch(forgotPasswordCurrentEmail(values.email))
          navigate(PATH.CHECK_EMAIL)
        })
        .catch(err => {
          if (err.data.error) dispatch(setError(err.data.error))
          else dispatch(setError('Something went wrong'))
        })
    },
  })

  return (
    <Box>
      <h2>Forgot your password?</h2>

      <form onSubmit={formik.handleSubmit} className={s.form}>
        <Input
          placeholder="Email"
          type="email"
          error={formik.touched.email ? formik.errors.email : ''}
          {...formik.getFieldProps('email')}
        />

        <p>Enter your email address and we will send you further instructions </p>

        <Button
          type="submit"
          styleType="primary"
          disabled={formik.values.email === '' || !!formik.errors.email}
        >
          Send Instructions
        </Button>
      </form>

      <p>Did your remember your password?</p>

      <NavLink url={PATH.LOG_IN} styleType="primary">
        Try to logging in
      </NavLink>
    </Box>
  )
}
