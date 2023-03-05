import React from 'react'

import s from './CardsPage.module.scss'

import { BtnScrollUp } from 'components/btn-scroll-up/BtnScrollUp'
import { Cards } from 'modules/cards/Cards'
import { NavLink } from 'UI/nav-link/NavLink'

export const CardsPage = () => {
  return (
    <div className={s.cardsPage}>
      <NavLink styleType="link">
        <p>&lArr; Back</p>
      </NavLink>

      <Cards />

      <BtnScrollUp />
    </div>
  )
}
