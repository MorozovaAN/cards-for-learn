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

      if (file.size < 100000) {
        convertFileToBase64(file, (file64: string) => {
          updateAvatarCallback(file64)
        })
      } else {
        dispatch(setNotification({ message: 'Max file size should be 100 Kb!', type: 'error' }))
      }
    }
  }

  return (
    <label className={s.uploadPhoto}>
      <input type="file" onChange={uploadHandler} className={s.input} />
    </label>
  )
}
