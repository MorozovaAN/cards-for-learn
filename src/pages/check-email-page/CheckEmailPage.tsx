import React from 'react'

import { motion } from 'framer-motion'

import s from './CheckEmailPage.module.scss'

import { CheckEmail } from 'modules'

export const CheckEmailPage = () => {
  return (
    <motion.div
      className={s.contentContainer}
      initial={{ y: -500, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CheckEmail />
    </motion.div>
  )
}
