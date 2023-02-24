import React, { ChangeEvent, FC } from 'react'

import { setNotification } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { convertFileToBase64 } from 'common/utils/toBase64'
import s from 'components/auth/update-user-avatar/UpdateUserAvatar.module.scss'

type UpdateProfileAvatarType = {
  updateAvatarCallback: (avatar: string) => void
  disabled: boolean
}

export const UpdateUserAvatar: FC<UpdateProfileAvatarType> = ({
  updateAvatarCallback,
  disabled,
}) => {
  const dispatch = useTypedDispatch()
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size >= 110000) {
        dispatch(setNotification({ message: 'Sorry, max file size - 110 Kb!', type: 'error' }))
      } else if (file.name.slice(-4) !== '.jpg' && file.name.slice(-4) !== '.png') {
        console.log(file.name.slice(-4))
        dispatch(
          setNotification({
            message: 'Sorry,file extension can be .jpg or .png only',
            type: 'error',
          })
        )
      } else {
        convertFileToBase64(file, (file64: string) => {
          updateAvatarCallback(file64)
        })
      }
    }
    e.target.value = ''
  }

  return (
    <label className={s.uploadPhoto}>
      <input
        type="file"
        onChange={uploadHandler}
        className={s.input}
        accept=".jpg,.png"
        disabled={disabled}
        id={'fileUpload'}
      />
    </label>
  )
}
