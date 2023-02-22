import React, { useEffect } from 'react'

import Skeleton from '@mui/material/Skeleton'
import { useSearchParams } from 'react-router-dom'

import s from './PacksPage.module.scss'

import { ReactComponent as ArrowUp } from 'assets/img/icons/arrow-up.svg'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { errorHandler } from 'common/utils/errorHandler'
import { paramsHelper } from 'common/utils/paramsHelper'
import { Paginator } from 'components/paginator/Paginator'
import { ResetAllFilters } from 'components/resetAllFilters/ResetAllFilters'
import { Search } from 'components/search/Search'
import { MyOtherButtons } from 'modules/packs/my-other-buttons/MyOtherButtons'
import { Packs } from 'modules/packs/Packs'
import { useGetPacksQuery } from 'modules/packs/packsApi'
import { showButtonScrollSelector } from 'modules/packs/packsSelectors'
import { setShowButton } from 'modules/packs/packsSlise'
import { SortPacks } from 'modules/packs/sort/SortPacks'
import { Button } from 'UI/button/Button'

export const PacksPage = () => {
  const [searchParams] = useSearchParams()
  const { data: responsePacks, isFetching, error } = useGetPacksQuery(paramsHelper(searchParams))
  const showButton = useTypedSelector(showButtonScrollSelector)
  const dispatch = useTypedDispatch()

  useEffect(() => {
    const scrollHandler = () => {
      const top = window.scrollY

      if (top >= 300) {
        dispatch(setShowButton(true))
      } else {
        dispatch(setShowButton(false))
      }
    }

    window.addEventListener('scroll', scrollHandler)

    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  useEffect(() => {
    error && errorHandler(error, dispatch)
  }, [error])

  return (
    <div>
      <div className={s.filters}>
        {responsePacks ? (
          <Search selector="Packs" param="packName" disabled={isFetching} />
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

      {responsePacks ? (
        <Paginator
          pageCount={responsePacks.pageCount}
          totalCount={responsePacks.cardPacksTotalCount}
          currentPage={responsePacks.page}
          disabled={isFetching}
        />
      ) : (
        <div className={s.skeletonPaginationContainer}>
          <Skeleton
            classes={{ root: s.skeletonPagination }}
            animation="wave"
            variant="rectangular"
          />
        </div>
      )}

      {showButton && (
        <Button
          className={s.scrollBtn}
          styleType="icon"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          <ArrowUp width="19" height="23" />
        </Button>
      )}
    </div>
  )
}
