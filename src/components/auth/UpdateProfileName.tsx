import React, { useEffect } from 'react'

import { useFormik } from 'formik'

import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { UpdateProfile } from 'modules/auth/authApi'
import { nameSelector } from 'modules/auth/authSelectors'
import { Input } from 'UI/input/Input'
import style from 'UI/input/Input.module.scss'

type ProfileEditNamePropsType = {
  setEditMode: (value: boolean) => void
  updateProfileCallback: (value: UpdateProfile) => void
}

interface FormikErrorType {
  name?: string
  avatar?: string
}

export const UpdateProfileName: React.FC<ProfileEditNamePropsType> = ({
  setEditMode,
  updateProfileCallback,
}) => {
  const userName = useTypedSelector(nameSelector)

  const formik = useFormik({
    initialValues: {
      name: '',
      avatar: '',
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.name.trim()) {
        errors.name = 'Name is required'
      }

      return errors
    },
    onSubmit: values => {
      updateProfileCallback(values)
      setEditMode(false)
      formik.resetForm()
    },
  })

  useEffect(() => {
    formik.setFieldValue('name', userName)
  }, [userName])

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        type="text"
        textChange={true}
        label="Set new nickname:"
        {...formik.getFieldProps('name')}
        textChangeBtnCallback={formik.handleSubmit}
        disableBtn={!!formik.errors.name}
      />
      <span className={style.error}>{formik.errors.name}</span>
    </form>
  )
}
