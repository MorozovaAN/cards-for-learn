import { ChangeEvent } from 'react'

import { setNotification } from 'app/appSlice'
import { AppDispatchType } from 'common/hooks/useTypedDispatch'
import { convertFileToBase64 } from 'common/utils/toBase64'

export const uploadImage = (
  e: ChangeEvent<HTMLInputElement>,
  dispatch: AppDispatchType,
  callback: (file64: string) => void
) => {
  if (e.target.files && e.target.files.length) {
    const file = e.target.files[0]

    const extension = file.name.slice(-4)

    if (file.size > 110000) {
      dispatch(setNotification({ message: 'Sorry, max file size - 110 Kb!', type: 'error' }))
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
        callback(file64)
      })
    }
  }
  e.target.value = ''
}
