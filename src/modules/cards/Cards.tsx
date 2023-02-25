import React, { useEffect } from 'react'

import Skeleton from '@mui/material/Skeleton'
import { useSearchParams } from 'react-router-dom'

import s from './Cards.module.scss'

import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { paramsHelper } from 'common/utils/paramsHelper'
import { NotFound } from 'components/notFound/NotFound'
import { Paginator } from 'components/paginator/Paginator'
import { Search } from 'components/search/Search'
import { idSelector } from 'modules/auth/authSelectors'
import { Buttons } from 'modules/cards/buttons/Buttons'
import { CardsList } from 'modules/cards/cards-list/CardsList'
import { useGetCardsQuery } from 'modules/cards/cardsApi'
import { packIdSelector } from 'modules/packs/packsSelectors'

export const Cards = () => {
  const cardsPack_id = useTypedSelector(packIdSelector)
  const myId = useTypedSelector(idSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const { data, isFetching } = useGetCardsQuery({ cardsPack_id, ...paramsHelper(searchParams) })

  useEffect(() => {
    if (!searchParams.has('cardsPack_id')) {
      setSearchParams({ cardsPack_id: `${cardsPack_id}` })
    }
  }, [])

  return (
    <>
      <div>
        <div className={s.container}>
          {data ? (
            <p className={s.name}>{data.packName}</p>
          ) : (
            <div className={s.skeletonNameContainer}>
              <Skeleton classes={{ root: s.skeletonName }} animation="wave" variant="rectangular" />
            </div>
          )}

          <div className={s.filters}>
            <Buttons
              myCards={data?.packUserId === myId}
              packId={cardsPack_id}
              packName={data?.packName ? data?.packName : ''}
              privatePack={data?.packPrivate ? data?.packPrivate : false}
              disabled={isFetching}
              isFetching={!data?.cards}
            />

            <Search disabled={isFetching} selector="Cards" param="cardQuestion" />
          </div>

          {!data?.cards.length && searchParams.has('cardQuestion') ? (
            <NotFound />
          ) : (
            <CardsList
              cards={data?.cards ? data.cards : null}
              myCards={data?.packUserId === myId}
              isFetching={isFetching}
            />
          )}

          {data ? (
            <div className={s.paginator}>
              <Paginator
                pageCount={data.pageCount}
                totalCount={data.cardsTotalCount}
                currentPage={data.page}
                disabled={isFetching}
              />
            </div>
          ) : (
            <div className={s.skeletonPaginationContainer}>
              <Skeleton
                classes={{ root: s.skeletonPagination }}
                animation="wave"
                variant="rectangular"
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
