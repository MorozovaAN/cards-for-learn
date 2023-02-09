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

const pVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
}

export const NotificationBar = () => {
  const { type, message } = useTypedSelector(notificationSelector)
  const msgContainerClasses = `${s.msgContainer} ${type === 'success' && s.successMsg}`
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
      }, 5000)
    }
  }, [message])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={msgContainerClasses}
          variants={pVariants}
          initial={'hidden'}
          animate={'visible'}
          exit={'exit'}
        >
          {type === 'success' && <Success />}
          {type == 'error' && <Error />}

          <p className={s.text}>{message}</p>

          <Close onClick={handleClose} fill="#fff" className={s.close} />
        </motion.div>
      )}
    </AnimatePresence>,
    document.querySelector('body') as HTMLElement
  )
}
