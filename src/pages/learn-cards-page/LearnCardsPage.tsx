import React from 'react'

import s from './LearnCardsPage.module.scss'

import { LearnCards } from 'modules/cards/learn-cards/LearnCards'

export const LearnCardsPage = () => {
  return (
    <div className={s.learnCardsPage}>
      <div className={s.contentContainer}>
        <LearnCards />
      </div>
    </div>
  )
}
