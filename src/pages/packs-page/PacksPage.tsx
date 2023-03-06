import React from 'react'

import s from './PacksPage.module.scss'

import { BtnScrollUp } from 'components/btn-scroll-up/BtnScrollUp'
import { Packs } from 'modules'

export const PacksPage = () => {
  return (
    <div className={s.packsPage}>
      <div className={s.contentContainer}>
        <Packs />
        <BtnScrollUp />
      </div>
    </div>
  )
}
