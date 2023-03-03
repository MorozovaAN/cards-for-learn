import React from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import s from './LogUpPage.module.scss'

import { LogUp } from 'modules'

export const LogUpPage = () => {
  return (
    <AnimatePresence>
      <motion.div
        className={s.contentContainer}
        initial={{ y: -500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <LogUp />
      </motion.div>
    </AnimatePresence>
  )
}
