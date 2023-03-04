import React from 'react'

import { Link } from 'react-router-dom'

import { BtnScrollUp } from 'components/btnScrollUp/BtnScrollUp'
import { Cards } from 'modules/cards/Cards'

export const CardsPage = () => {
  return (
    <div>
      {/*<NavLink url={PATH.PACKS}>*/}
      {/*  <p>&lArr; Back to Packs List</p>*/}
      {/*</NavLink>*/}

      <Link to={'../'}>
        <p>&lArr; Back to Pack List</p>
      </Link>

      <Cards />

      <BtnScrollUp />
    </div>
  )
}
