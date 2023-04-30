import React from 'react'

import Skeleton from '@mui/material/Skeleton'
import { useSearchParams } from 'react-router-dom'

import s from './Packs.module.scss'

import { paramsHelper } from 'common/utils/paramsHelper'
import { Paginator } from 'components/paginator/Paginator'
import { ResetFilters } from 'components/reset-filters/ResetFilters'
import { Search } from 'components/search/Search'
import { PacksList } from 'modules/packs/packs-list/PacksList'
import { useGetPacksQuery } from 'modules/packs/packsApi'
import { SortPacks } from 'modules/packs/sort/SortPacks'

export const Packs = () => {
  const [searchParams] = useSearchParams()
  const { data, isFetching } = useGetPacksQuery(paramsHelper(searchParams))

  return (
    <>
      <div className={s.filters}>
        {data ? (
          <div className={s.search}>
            <Search selector="Packs" param="packName" disabled={isFetching} />
          </div>
        ) : (
          <div className={s.skeletonSearchContainer}>
            <Skeleton classes={{ root: s.skeletonSearch }} animation="wave" variant="rectangular" />
          </div>
        )}

        {data ? (
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

        {data ? (
          <ResetFilters disabled={isFetching} />
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

      <div className={s.packsContainer}>
        <PacksList responsePacks={data ? data.cardPacks : null} isFetching={isFetching} />
      </div>

      {data ? (
        <Paginator
          pageCount={data.pageCount}
          totalCount={data.cardPacksTotalCount}
          currentPage={data.page}
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
    </>
  )
}
