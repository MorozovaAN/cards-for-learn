import React, { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import s from './Cards.module.scss'

import { ModalType, setModal } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { formatDate } from 'common/utils/formatDate'
import { paramsHelper } from 'common/utils/paramsHelper'
import { Card } from 'components/cards/Card'
import { NotFound } from 'components/notFound/NotFound'
import { Paginator } from 'components/paginator/Paginator'
import { ResetAllFilters } from 'components/resetAllFilters/ResetAllFilters'
import { Search } from 'components/search/Search'
import { idSelector } from 'modules/auth/authSelectors'
import { useGetCardsQuery } from 'modules/cards/cardsApi'
import { packIdSelector } from 'modules/packs/packsSelectors'
import { Button } from 'UI/button/Button'

export const Cards = () => {
  const cardsPack_id = useTypedSelector(packIdSelector)
  const myId = useTypedSelector(idSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const { data, isFetching } = useGetCardsQuery({ cardsPack_id, ...paramsHelper(searchParams) })
  const dispatch = useTypedDispatch()

  useEffect(() => {
    if (!searchParams.has('cardsPack_id')) {
      setSearchParams({ cardsPack_id: `${cardsPack_id}` })
    }
  }, [])

  const openCardModalHandler = (type: ModalType) => {
    dispatch(setModal({ open: true, type }))
  }

  return (
    <>
      {data && (
        <div>
          <div className={s.container}>
            <p className={s.name}>{data.packName}</p>

            {data.packUserId === myId ? (
              <Button onClick={() => openCardModalHandler('Add new card')} styleType="primary">
                Add new card
              </Button>
            ) : (
              <Button styleType="primary">Learn pack</Button>
            )}
          </div>

          <div className={s.filters}>
            <Search disabled={isFetching} selector="Cards" param="cardQuestion" />
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
                questionImg={card.questionImg}
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
