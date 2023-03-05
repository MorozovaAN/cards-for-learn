import React from 'react'

import { useNavigate } from 'react-router-dom'

import s from './CardsPage.module.scss'

import { BtnScrollUp } from 'components/btn-scroll-up/BtnScrollUp'
import { Cards } from 'modules/cards/Cards'
import { NavLink } from 'UI/nav-link/NavLink'

export const CardsPage = () => {
  const navigate = useNavigate()

  return (
    <div className={s.contentContainer}>
      <NavLink url="" onClick={() => navigate(-1)} styleType="default">
        <p>&lArr; Back</p>
      </NavLink>

      <Cards />

      <BtnScrollUp />
    </div>
  )
}
