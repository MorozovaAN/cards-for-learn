import React from 'react'

import { Cards } from 'modules/cards/Cards'
import { PATH } from 'routes/routes'
import { NavLink } from 'UI/nav-link/NavLink'

export const CardsPage = () => {
  return (
    <div>
      <NavLink url={PATH.PACKS}>
        <p>&lArr; Back to Packs List</p>
      </NavLink>

      <Cards />
    </div>
  )
}
