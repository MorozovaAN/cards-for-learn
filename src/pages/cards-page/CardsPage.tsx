import React from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { Cards } from 'modules/cards/Cards'

export const CardsPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  console.log(location)
  //console.log('cards page')

  return (
    <div>
      {/*<NavLink url={PATH.PACKS}>*/}
      {/*  <p>&lArr; Back to Packs List</p>*/}
      {/*</NavLink>*/}

      <div onClick={() => navigate('/packs', { replace: true })}>
        <p>&lArr; Back to Pack List</p>
      </div>

      <Cards />
    </div>
  )
}
