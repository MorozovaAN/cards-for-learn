import React, { ChangeEvent, FC } from 'react'

import { setNotification } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { convertFileToBase64 } from 'common/utils/toBase64'
import s from 'components/auth/update-user-avatar/UpdateUserAvatar.module.scss'

type UpdateProfileAvatarType = {
  updateAvatarCallback: (avatar: string) => void
}

export const UpdateUserAvatar: FC<UpdateProfileAvatarType> = ({ updateAvatarCallback }) => {
  const dispatch = useTypedDispatch()

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      convertFileToBase64(file, (file64: string) => {
        updateAvatarCallback(file64)
      })
    }
  }

  return (
    <label className={s.uploadPhoto}>
      <input type="file" onChange={uploadHandler} className={s.input} />
    </label>
  )
}
