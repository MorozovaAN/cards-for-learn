import React from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { BtnScrollUp } from 'components/btn-scroll-up/BtnScrollUp'
import { Cards } from 'modules/cards/Cards'

export const CardsPage = () => {
  const navigate = useNavigate()

  return (
    <div>
      {/*<NavLink url={PATH.PACKS}>*/}
      {/*  <p>&lArr; Back to Packs List</p>*/}
      {/*</NavLink>*/}

      <Link to={''} onClick={() => navigate(-1)}>
        <p>&lArr; Back to Pack List</p>
      </Link>

      <Cards />

      <BtnScrollUp />
    </div>
  )
}
