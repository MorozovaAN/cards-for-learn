import React from 'react'

import { Link } from 'react-router-dom'

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
    </div>
  )
}
