import * as yup from 'yup'

export const emailValidationSchema = yup
  .string()
  .email('Invalid email address')
  .required('Required field')

export const passwordValidationSchema = yup
  .string()
  .trim()
  .min(8, 'Password should be 8 symbols at less')
  .required('Required field')
