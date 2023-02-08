import React, { useEffect, useState } from 'react'

import { createPortal } from 'react-dom'

import { notificationSelector } from 'app/appSelectors'
import { setNotification } from 'app/appSlice'
import { ReactComponent as Close } from 'assets/img/icons/close.svg'
import { ReactComponent as Error } from 'assets/img/icons/error.svg'
import { ReactComponent as Success } from 'assets/img/icons/success.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import s from 'UI/notification-bar/NotificationBar.module.scss'
export const NotificationBar = () => {
  const { type, message } = useTypedSelector(notificationSelector)
  const success = type === 'success'
  const msgContainerClasses = `${s.msgContainer} ${success && s.successMsg}`
  const [open, setOpen] = useState(false)
  const dispatch = useTypedDispatch()

  const handleClose = () => {
    setOpen(false)
    dispatch(setNotification({ message: '', type: '' }))
  }

  useEffect(() => {
    if (message) {
      setOpen(true)

      setTimeout(() => {
        handleClose()
      }, 4000)
    }
  }, [message])

  if (!open) return null

  return createPortal(
    <div className={msgContainerClasses}>
      {success ? <Success /> : <Error />}
      <p className={s.text}>{message}</p>
      <Close onClick={handleClose} fill="#fff" className={s.close} />
    </div>,
    document.querySelector('body') as HTMLElement
  )
}
