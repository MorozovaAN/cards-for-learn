import React, { ChangeEvent } from 'react'

import FileUpload from '@mui/icons-material/FileUpload'
import IconButton from '@mui/material/IconButton'

import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useUpdateProfileMutation } from 'modules/auth/authApi'
import { setError } from 'pages/app/appSlice'
import { convertFileToBase64 } from 'utils/toBase64'

export const FileInput = () => {
  const dispatch = useTypedDispatch()
  const [updateAvatar, { isLoading, isError, error }] = useUpdateProfileMutation()
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 100000) {
        convertFileToBase64(file, (file64: string) => {
          updateAvatar({ name: '', avatar: file64 })
            .unwrap()
            .then(() => {})
            .catch(() => {
              dispatch(setError('Some unexpected error, try again.'))
            })
        })
      } else {
        dispatch(setError('Max file size should be 100 Kb!'))
      }
    }
  }

  return (
    <IconButton component="label" sx={{ width: '30px', height: '30px', background: 'gray' }}>
      <FileUpload />
      <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
    </IconButton>
  )
}
