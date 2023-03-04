import React from 'react'

import { useNavigate } from 'react-router-dom'

import { BtnScrollUp } from 'components/btnScrollUp/BtnScrollUp'
import { Cards } from 'modules/cards/Cards'

export const CardsPage = () => {
  const navigate = useNavigate()

  return (
    <div>
      {/*<NavLink url={PATH.PACKS}>*/}
      {/*  <p>&lArr; Back to Packs List</p>*/}
      {/*</NavLink>*/}

      <div onClick={() => navigate('../')}>
        <p>&lArr; Back to Pack List</p>
      </div>

      <Cards />

      <BtnScrollUp />
    </div>
  )
}
