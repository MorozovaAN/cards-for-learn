import React from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import { useSearchParams } from 'react-router-dom'

import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { MyOtherButtons } from 'components/packs/my-other-buttons/MyOtherButtons'
import { Paginator } from 'components/paginator/Paginator'
import { ResetAllFilters } from 'components/resetAllFilters/ResetAllFilters'
import { Search } from 'components/search/Search'
import { Packs } from 'modules/packs/Packs'
import s from 'modules/packs/Packs.module.scss'
import { useGetPacksQuery } from 'modules/packs/packsApi'
import { paramsHelper } from 'modules/packs/paramsHelper'
import { SortPacks } from 'modules/packs/sort/SortPacks'

export const PacksPage = () => {
  const [searchParams] = useSearchParams()
  const { data: responsePacks, isFetching } = useGetPacksQuery(paramsHelper(searchParams))
  const myId = useTypedSelector(state => state.auth.id)
  const myPacks = searchParams.has('user_id')
  const packs = responsePacks?.cardPacks?.filter(p => p.user_id !== myId)

  return responsePacks ? (
    <div>
      <div className={s.filters}>
        <Search selector="Packs" disabled={isFetching} />
        <MyOtherButtons />

        <SortPacks />
        <ResetAllFilters disabled={isFetching} />
      </div>

      <div className={s.packsContainer}>
        {isFetching ? (
          <CircularProgress classes={{ root: s.circular }} size={60} />
        ) : (
          <Packs packs={myPacks ? responsePacks.cardPacks : packs} myPacks={myPacks} />
        )}
      </div>

      <Paginator
        pageCount={responsePacks.pageCount}
        totalCount={responsePacks.cardPacksTotalCount}
        currentPage={responsePacks.page}
        disabled={isFetching}
      />
    </div>
  ) : (
    <CircularProgress classes={{ root: s.circular }} size={60} />
  )
}
