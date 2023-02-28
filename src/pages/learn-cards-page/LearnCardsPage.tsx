import React from 'react'

import { useNavigate } from 'react-router-dom'

import s from './LearnCardsPage.module.scss'

import { LearnCards } from 'modules/cards/learn-cards/LearnCards'

export const LearnCardsPage = () => {
  const navigate = useNavigate()

  return (
    <div className={s.contentContainer}>
      {/*<NavLink*/}
      {/*  to={`/cards?cardsPack_id=${id}`}*/}
      {/*  className={`${s.link} ${isLoading ? s.linkDisabled : ''}`}*/}
      {/*>*/}
      {/*  <p>&lArr; Back to Pack List</p>*/}
      {/*</NavLink>*/}

      <div onClick={() => navigate(-1)}>
        <p>&lArr; Back to Pack List</p>
      </div>

      <LearnCards />
    </div>
  )
}
