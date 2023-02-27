import React from 'react'

import Skeleton from '@mui/material/Skeleton'
import { useSearchParams } from 'react-router-dom'

import { ReactComponent as ArrowUp } from 'assets/img/icons/arrow-up.svg'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { paramsHelper } from 'common/utils/paramsHelper'
import { Paginator } from 'components/paginator/Paginator'
import { ResetAllFilters } from 'components/resetAllFilters/ResetAllFilters'
import { Search } from 'components/search/Search'
import { MyOtherButtons } from 'modules/packs/my-other-buttons/MyOtherButtons'
import { Packs } from 'modules/packs/Packs'
import { useGetPacksQuery } from 'modules/packs/packsApi'
import { showButtonScrollSelector } from 'modules/packs/packsSelectors'
import { SortPacks } from 'modules/packs/sort/SortPacks'
import s from 'pages/packs-page/PacksPage.module.scss'
import { Button } from 'UI/button/Button'

export const PacksList = () => {
  const [searchParams] = useSearchParams()
  const { data, isFetching } = useGetPacksQuery(paramsHelper(searchParams))
  const showButton = useTypedSelector(showButtonScrollSelector)

  return (
    <div>
      <div className={s.filters}>
        {data ? (
          <Search selector="Packs" param="packName" disabled={isFetching} />
        ) : (
          <div className={s.skeletonSearchContainer}>
            <Skeleton classes={{ root: s.skeletonSearch }} animation="wave" variant="rectangular" />
          </div>
        )}

        {data ? (
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

      <Packs responsePacks={data ? data.cardPacks : null} isFetching={isFetching} />

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
