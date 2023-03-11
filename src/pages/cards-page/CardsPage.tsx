import React from 'react'

import s from './CardsPage.module.scss'

import { BtnScrollUp } from 'components/btn-scroll-up/BtnScrollUp'
import { Cards } from 'modules/cards/Cards'

export const CardsPage = () => {
  return (
    <div className={s.cardsPage}>
      <div className={s.contentContainer}>
        <Cards />
        <BtnScrollUp />
      </div>
    </div>
  )
}
