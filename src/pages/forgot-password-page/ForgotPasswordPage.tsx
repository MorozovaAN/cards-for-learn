import React from 'react'

import { motion } from 'framer-motion'

import s from './ForgotPasswordPage.module.scss'

import { ForgotPassword } from 'modules'

export const ForgotPasswordPage = () => {
  return (
    <motion.div
      className={s.contentContainer}
      initial={{ y: -500, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ForgotPassword />
    </motion.div>
  )
}
