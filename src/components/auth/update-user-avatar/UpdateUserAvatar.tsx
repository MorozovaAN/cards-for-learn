import React, { ChangeEvent, FC } from 'react'

import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { uploadImage } from 'common/utils/uploadImage'
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
    uploadImage(e, dispatch, updateAvatarCallback)
  }

  return (
    <label className={s.uploadPhoto}>
      <input
        type="file"
        onChange={uploadHandler}
        className={s.input}
        accept=".jpg,.png,.svg,.jpeg"
        disabled={disabled}
        id={'fileUpload'}
      />
    </label>
  )
}
