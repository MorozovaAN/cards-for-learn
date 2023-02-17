import React, { useEffect } from 'react'

import Skeleton from '@mui/material/Skeleton'
import { useSearchParams } from 'react-router-dom'

import s from './PacksPage.module.scss'

import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { paramsHelper } from 'common/utils/paramsHelper'
import { MyOtherButtons } from 'components/packs/my-other-buttons/MyOtherButtons'
import { Paginator } from 'components/paginator/Paginator'
import { ResetAllFilters } from 'components/resetAllFilters/ResetAllFilters'
import { Search } from 'components/search/Search'
import { Packs } from 'modules/packs/Packs'
import { useGetPacksQuery } from 'modules/packs/packsApi'
import { setShowButton } from 'modules/packs/packsSlise'
import { SortPacks } from 'modules/packs/sort/SortPacks'
import { ButtonScroll } from 'UI/button/ButtonScroll'

export const PacksPage = () => {
  const [searchParams] = useSearchParams()
  const { data: responsePacks, isFetching } = useGetPacksQuery(paramsHelper(searchParams))
  const showButton = useTypedSelector(state => state.packs.isShowButtonScroll)
  const dispatch = useTypedDispatch()

  useEffect(() => {
    function handleScroll() {
      const top = window.scrollY

      if (top >= 300) {
        dispatch(setShowButton(true))
      } else {
        dispatch(setShowButton(false))
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
      <div className={s.filters}>
        {responsePacks ? (
          <Search selector="Packs" disabled={isFetching} />
        ) : (
          <div className={s.skeletonSearchContainer}>
            <Skeleton classes={{ root: s.skeletonSearch }} animation="wave" variant="rectangular" />
          </div>
        )}

        {responsePacks ? (
          <MyOtherButtons disabled={isFetching} />
        ) : (
          <div className={s.skeletonButtonsContainer}>
            <Skeleton
              classes={{ root: s.skeletonButtons }}
              animation="wave"
              variant="rectangular"
            />
          </div>
        )}

        {responsePacks ? (
          <SortPacks disabled={isFetching} />
        ) : (
          <div className={s.skeletonSortPacksContainer}>
            <Skeleton
              classes={{ root: s.skeletonSortPacks }}
              animation="wave"
              variant="rectangular"
            />
          </div>
        )}

        {responsePacks ? (
          <ResetAllFilters disabled={isFetching} />
        ) : (
          <div className={s.skeletonResetFiltersContainer}>
            <Skeleton
              classes={{ root: s.skeletonResetFilters }}
              animation="wave"
              variant="rectangular"
            />
          </div>
        )}
      </div>

      <Packs
        responsePacks={responsePacks ? responsePacks.cardPacks : null}
        isFetching={isFetching}
      />

      {responsePacks && (
        <Paginator
          pageCount={responsePacks.pageCount}
          totalCount={responsePacks.cardPacksTotalCount}
          currentPage={responsePacks.page}
          disabled={isFetching}
        />
      )}

      {showButton && (
        <div className={s.scrollBtn}>
          <ButtonScroll />
        </div>
      )}
    </div>
  )
}
