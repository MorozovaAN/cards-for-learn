import React, { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { paramsHelper } from 'common/utils/paramsHelper'
import { Card } from 'components/cards/Card'
import { NotFound } from 'components/notFound/NotFound'
import { Paginator } from 'components/paginator/Paginator'
import { ResetAllFilters } from 'components/resetAllFilters/ResetAllFilters'
import { Search } from 'components/search/Search'
import { useGetCardsQuery } from 'modules/cards/cardsApi'

export const Cards = () => {
  const cardsPack_id = useTypedSelector(state => state.packs.packId)
  const [searchParams, setSearchParams] = useSearchParams()
  const { data, isFetching } = useGetCardsQuery(paramsHelper(searchParams, cardsPack_id))

  useEffect(() => {
    if (!searchParams.has('cardsPack_id')) {
      setSearchParams({ cardsPack_id: `${cardsPack_id}` })
    }
  }, [])

  return (
    <>
      {data && (
        <div>
          <Search disabled={isFetching} selector={'Cards'} param={'cardQuestion'} />
          <ResetAllFilters disabled={isFetching} />
          {data.cards.length ? (
            data.cards.map(card => <Card key={card._id} question={card.question} />)
          ) : (
            <NotFound />
          )}

          <Paginator
            pageCount={data.pageCount}
            totalCount={data.cardsTotalCount}
            currentPage={data.page}
            disabled={isFetching}
          />
        </div>
      )}
    </>
  )
}
