import React, { useEffect } from 'react'

import Skeleton from '@mui/material/Skeleton'
import { useSearchParams } from 'react-router-dom'

import s from './Cards.module.scss'

import { ModalType, setModal } from 'app/appSlice'
import { ReactComponent as LearnIcon } from 'assets/img/icons/learn.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { paramsHelper } from 'common/utils/paramsHelper'
import { Paginator } from 'components/paginator/Paginator'
import { Search } from 'components/search/Search'
import { idSelector } from 'modules/auth/authSelectors'
import { useGetCardsQuery } from 'modules/cards/cardsApi'
import { CardsList } from 'modules/cards/cardsList/CardsList'
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
            {data?.packUserId === myId ? (
              <Button
                styleType="secondary"
                className={s.button}
                onClick={() => openCardModalHandler('Add new card')}
              >
                Add new card
              </Button>
            ) : (
              <Button styleType="secondary" className={s.button}>
                <p>Learn pack</p>
                <LearnIcon className={s.learnIcon} stroke="#000" />
              </Button>
            )}
            <Search disabled={isFetching} selector="Cards" param="cardQuestion" />
          </div>

          <CardsList cards={data?.cards ? data.cards : null} isFetching={isFetching} />

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
