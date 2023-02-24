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

      const extension = file.name.slice(-4)

      if (file.size > 112000) {
        dispatch(setNotification({ message: 'Sorry, max file size - 112 Kb!', type: 'error' }))
      } else if (
        extension !== '.jpg' &&
        extension !== '.png' &&
        extension !== '.svg' &&
        extension !== 'jpeg'
      ) {
        dispatch(
          setNotification({
            message: 'Sorry, correct extensions .jpg, .png, .svg, .jpeg',
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
