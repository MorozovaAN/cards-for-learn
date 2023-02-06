import React, { useEffect } from 'react'

import { useFormik } from 'formik'

import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { UpdateProfile, useUpdateProfileMutation } from 'modules/auth/authApi'
import { nameSelector } from 'modules/auth/authSelectors/authSelectors'
import s from 'modules/auth/profile/Profile.module.scss'
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
  const profileName = useTypedSelector(nameSelector)

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

  //нужно чтоб в инпуте сохранялось имя прошлое при обновлении
  useEffect(() => {
    formik.setFieldValue('name', profileName)
  }, [profileName])

  return (
    <form onSubmit={formik.handleSubmit} className={s.profile_form}>
      <Input
        type="text"
        textChange={true}
        label="Nickname"
        {...formik.getFieldProps('name')}
        textChangeBtnCallback={formik.handleSubmit}
        disableBtn={!!formik.errors.name}
      />
      <span className={style.error}>{formik.errors.name}</span>
    </form>
  )
}
