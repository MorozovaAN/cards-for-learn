import React from 'react'

import s from './LearnCardsPage.module.scss'

import { LearnCards } from 'modules/cards/learn-cards/LearnCards'
import { NavLink } from 'UI/nav-link/NavLink'

export const LearnCardsPage = () => {
  return (
    <div className={s.learnCardsPage}>
      <NavLink styleType="link">
        <p>&lArr; Back</p>
      </NavLink>

      <LearnCards />
    </div>
  )
}
