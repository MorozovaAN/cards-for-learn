import React, { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { Card } from 'components/cards/Card'
import { useGetCardsQuery } from 'modules/cards/cardsApi'

export const Cards = () => {
  const cardsPack_id = useTypedSelector(state => state.packs.packId)
  const [searchParams, setSearchParams] = useSearchParams()
  const { data } = useGetCardsQuery({ cardsPack_id })
  const cards = data?.cards

  useEffect(() => {
    setSearchParams({ cardsPack_id: `${cardsPack_id}` })
  }, [])

  return (
    <div>
      {cards?.map(card => (
        <Card key={card._id} question={card.question} />
      ))}
    </div>
  )
}
