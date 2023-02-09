import React, { useEffect } from 'react'

import { useFormik } from 'formik'

import { isLoadingSelector } from 'app/appSelectors'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import s from 'components/auth/update-user-name/UpdateUserName.module.css'
import { UpdateProfile } from 'modules/auth/authApi'
import { nameSelector } from 'modules/auth/authSelectors'
import { Input } from 'UI/input/Input'

type ProfileEditNamePropsType = {
  setEditMode: (value: boolean) => void
  updateProfileCallback: (value: UpdateProfile) => void
  editMode: boolean
}

interface FormikErrorType {
  name?: string
  avatar?: string
}

export const UpdateUserName: React.FC<ProfileEditNamePropsType> = ({
  setEditMode,
  updateProfileCallback,
  editMode,
}) => {
  const userName = useTypedSelector(nameSelector)
  const isLoading = useTypedSelector(isLoadingSelector)

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

  const onBlurHandler = () => {
    setEditMode(false)
  }

  return (
    <form onSubmit={formik.handleSubmit} className={s.form}>
      <Input
        type="text"
        textChange={true}
        label="Set new nickname:"
        {...formik.getFieldProps('name')}
        textChangeBtnCallback={formik.handleSubmit}
        disableBtn={!!formik.errors.name || isLoading}
        onBlur={onBlurHandler}
        autoFocus={editMode}
        error={formik.errors.name}
      />
    </form>
  )
}
