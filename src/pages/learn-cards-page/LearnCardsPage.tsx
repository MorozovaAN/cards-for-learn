import React from 'react'

import { useNavigate } from 'react-router-dom'

import s from './LearnCardsPage.module.scss'

import { LearnCards } from 'modules/cards/learn-cards/LearnCards'
import { NavLink } from 'UI/nav-link/NavLink'

export const LearnCardsPage = () => {
  const navigate = useNavigate()

  return (
    <div className={s.learnCardsPage}>
      <NavLink url="" onClick={() => navigate(-1)} styleType="default">
        <p>&lArr; Back</p>
      </NavLink>

      <LearnCards />
    </div>
  )
}
