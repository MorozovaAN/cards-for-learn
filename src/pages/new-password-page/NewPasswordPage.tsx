import React from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import s from './NewPasswordPage.module.scss'

import { SetNewPassword } from 'modules'

export const NewPasswordPage = () => {
  return (
    <AnimatePresence>
      <motion.div
        className={s.contentContainer}
        initial={{ y: -500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SetNewPassword />
      </motion.div>
    </AnimatePresence>
  )
}
