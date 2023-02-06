import React, { ChangeEvent, FC } from 'react'

import s from './UpdateProfileAvatar.module.scss'

import updateAva from 'assets/img/icons/updatePhoto.svg'
import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { UpdateProfile } from 'modules/auth/authApi'
import { setError } from 'pages/app/appSlice'
import { convertFileToBase64 } from 'utils/toBase64'

type UpdateProfileAvatarType = {
  updateProfileCallback: (value: UpdateProfile) => void
}
export const UpdateProfileAvatar: FC<UpdateProfileAvatarType> = ({ updateProfileCallback }) => {
  const dispatch = useTypedDispatch()

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 100000) {
        convertFileToBase64(file, (file64: string) => {
          updateProfileCallback({ name: '', avatar: file64 })
        })
      } else {
        dispatch(setError('Max file size should be 100 Kb!'))
      }
    }
  }

  return (
    <label className={s.uploadPhoto}>
      <input type="file" onChange={uploadHandler} />
    </label>
  )
}
