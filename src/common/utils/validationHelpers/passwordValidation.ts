type CommonType = {
  email: string
  password: string
  confirmPassword: string
  name: string
  rememberMe?: boolean
}

export const passwordValidation = (values: Partial<CommonType>, errors: Partial<CommonType>) => {
  if (!values.email) {
    errors.email = 'Required field'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password?.trim()) {
    errors.password = 'Required field'
  } else if (values.password?.trim().length < 8) {
    errors.password = 'Password should be longer then 7 symbols!'
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required field'
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords should be identical'
  }
  if (!values.name?.trim()) {
    errors.name = 'Name is required'
  }
}
