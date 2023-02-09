import React, { useEffect, useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

import s from './NotificationBar.module.scss'

import { notificationSelector } from 'app/appSelectors'
import { setNotification } from 'app/appSlice'
import { ReactComponent as Close } from 'assets/img/icons/close.svg'
import { ReactComponent as Error } from 'assets/img/icons/error.svg'
import { ReactComponent as Success } from 'assets/img/icons/success.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'

export const NotificationBar = () => {
  const { type, message } = useTypedSelector(notificationSelector)
  const success = type === 'success'
  const msgContainerClasses = `${s.msgContainer} ${success && s.successMsg}`
  const [open, setOpen] = useState(true)
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
      }, 5000)
    }
  }, [message])

  //if (!open) return null

  return createPortal(
    open ? (
      <AnimatePresence>
        <motion.div
          className={msgContainerClasses}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          // initial={{ height: 0, opacity: 0 }}
          // animate={{ height: 'auto', opacity: 1 }}
          // exit={{ height: 0 }}
          // transition={{ duration: 0.5 }}
        >
          {success ? <Success /> : <Error />}
          <p className={s.text}>{message}</p>
          <Close onClick={handleClose} fill="#fff" className={s.close} />
        </motion.div>
      </AnimatePresence>
    ) : (
      <></>
    ),
    document.querySelector('body') as HTMLElement
  )
}
