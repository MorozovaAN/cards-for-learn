import React from 'react'

import s from './LearnCardsPage.module.scss'

import { LearnCards } from 'modules/cards/learn-cards/LearnCards'
import { NavLink } from 'UI/nav-link/NavLink'

export const LearnCardsPage = () => {
  return (
    <div className={s.learnCardsPage}>
      <div className={s.contentContainer}>
        <NavLink styleType="link">&lArr; Back</NavLink>
        <LearnCards />
      </div>
    </div>
  )
}
