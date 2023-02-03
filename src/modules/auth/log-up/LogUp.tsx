import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

import { useLogUpMutation } from '../authApi'

import s from './LogUp.module.scss'

import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { setError } from 'pages/app/appSlice'
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
  const [logUp] = useLogUpMutation()
  const dispatch = useTypedDispatch()
  const navigate = useNavigate()

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

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 8) {
        errors.password = 'Password must be more 7 characters'
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Required field'
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords should be identical'
      }

      return errors
    },

    onSubmit: values => {
      logUp({ email: values.email, password: values.password })
        .unwrap()
        .then(() => {
          navigate(PATH.LOG_IN)
        })
        .catch(err => {
          if (err.data.error) dispatch(setError(err.data.error))
          else dispatch(setError('Something went wrong'))
        })
    },
  })

  const buttonDisabled =
    !!formik.errors.email ||
    !!formik.errors.password ||
    !!formik.errors.confirmPassword ||
    !formik.values.email ||
    !formik.values.confirmPassword ||
    !formik.values.password

  return (
    <Box>
      <h2>Sign Up to Cards for learn</h2>

      <form onSubmit={formik.handleSubmit} className={s.form}>
        <Input
          type="email"
          label="Email*"
          error={formik.touched.email && formik.errors.email}
          {...formik.getFieldProps('email')}
        />

        <Input
          type="password"
          label="Password*"
          error={formik.touched.password && formik.errors.password}
          {...formik.getFieldProps('password')}
        />

        <Input
          type="password"
          label="Confirm password*"
          error={formik.touched.confirmPassword && formik.errors.confirmPassword}
          {...formik.getFieldProps('confirmPassword')}
        />

        <Button styleType="primary" disabled={buttonDisabled}>
          Sign Up
        </Button>
      </form>
      <p>Already have an account?</p>

      <NavLink url={PATH.LOG_IN} styleType="primary">
        Sign In
      </NavLink>
    </Box>
  )
}
