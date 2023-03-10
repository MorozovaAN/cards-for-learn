import React from 'react'

import Skeleton from '@mui/material/Skeleton'
import { useSearchParams } from 'react-router-dom'

import s from './Cards.module.scss'

import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { paramsHelper } from 'common/utils/paramsHelper'
import { NotFound } from 'components/not-found/NotFound'
import { Paginator } from 'components/paginator/Paginator'
import { Search } from 'components/search/Search'
import { idSelector } from 'modules/auth/authSelectors'
import { Buttons } from 'modules/cards/buttons/Buttons'
import { CardsList } from 'modules/cards/cards-list/CardsList'
import { useGetCardsQuery } from 'modules/cards/cardsApi'
import { packNameSelector } from 'modules/packs/packsSelectors'

export const Cards = () => {
  const [searchParams] = useSearchParams()
  const packName = useTypedSelector(packNameSelector)
  const { data, isFetching } = useGetCardsQuery(paramsHelper(searchParams))
  const myId = useTypedSelector(idSelector)

  return (
    <div className={s.container}>
      {data ? (
        <p className={s.name}>{packName !== '' ? packName : data.packName}</p>
      ) : (
        <div className={s.skeletonNameContainer}>
          <Skeleton classes={{ root: s.skeletonName }} animation="wave" variant="rectangular" />
        </div>
      )}

      <div className={s.filters}>
        <Buttons
          packId={searchParams.get('cardsPack_id') as string}
          packName={data?.packName ? data?.packName : ''}
          privatePack={data?.packPrivate ? data?.packPrivate : false}
          disabled={isFetching}
          isFetching={!data?.cards}
          cardsCount={data?.cardsTotalCount ? data?.cardsTotalCount : 0}
        />

        <Search disabled={isFetching} selector="Cards" param="cardQuestion" />
      </div>

      {!data?.cards.length && searchParams.has('cardQuestion') ? (
        <NotFound notFound="notFound" />
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
  )
}
