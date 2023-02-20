import React, { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import s from './Cards.module.scss'

import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { formatDate } from 'common/utils/formatDate'
import { paramsHelper } from 'common/utils/paramsHelper'
import { Card } from 'components/cards/Card'
import { NotFound } from 'components/notFound/NotFound'
import { Paginator } from 'components/paginator/Paginator'
import { ResetAllFilters } from 'components/resetAllFilters/ResetAllFilters'
import { Search } from 'components/search/Search'
import { useGetCardsQuery } from 'modules/cards/cardsApi'
import { AddCardModal } from 'modules/cards/modals/AddCardModal'
import { Button } from 'UI/button/Button'

export const Cards = () => {
  const cardsPack_id = useTypedSelector(state => state.packs.packId)
  const myId = useTypedSelector(state => state.auth.id)
  const [searchParams, setSearchParams] = useSearchParams()
  const { data, isFetching } = useGetCardsQuery({ cardsPack_id, ...paramsHelper(searchParams) })
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    if (!searchParams.has('cardsPack_id')) {
      setSearchParams({ cardsPack_id: `${cardsPack_id}` })
    }
  }, [])

  return (
    <>
      {data && (
        <div>
          <div className={s.container}>
            <p className={s.name}>{data.packName}</p>

            {data.packUserId === myId ? (
              <Button onClick={() => setToggle(!toggle)} styleType="primary">
                Add new card
              </Button>
            ) : (
              <Button styleType="primary">Learn pack</Button>
            )}
          </div>

          {toggle && <AddCardModal />}

          <div className={s.filters}>
            <Search disabled={isFetching} selector={'Cards'} param={'cardQuestion'} />
            <ResetAllFilters disabled={isFetching} />
          </div>

          {data.cards.length ? (
            data.cards.map(card => (
              <Card
                key={card._id}
                idCard={card._id}
                question={card.question}
                grade={card.grade}
                answer={card.answer}
                updated={formatDate(card.updated)}
                userId={card.user_id}
              />
            ))
          ) : (
            <NotFound />
          )}

          <div className={s.paginator}>
            <Paginator
              pageCount={data.pageCount}
              totalCount={data.cardsTotalCount}
              currentPage={data.page}
              disabled={isFetching}
            />
          </div>
        </div>
      )}
    </>
  )
}
