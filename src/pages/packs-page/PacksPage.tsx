import React, { useEffect, useLayoutEffect, useState } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import { useSearchParams } from 'react-router-dom'

import { sortingPacksMethods } from 'common/constants/sortingMethods'
import { MyOtherButtons } from 'components/packs/my-other-buttons/MyOtherButtons'
import { Paginator } from 'components/paginator/Paginator'
import { ResetAllFilters } from 'components/resetAllFilters/ResetAllFilters'
import { Search } from 'components/search/Search'
import { AddPackModal } from 'modules/packs/modals/AddPackModal'
import { Packs } from 'modules/packs/Packs'
import s from 'modules/packs/Packs.module.scss'
import { useGetPacksQuery } from 'modules/packs/packsApi'
import { paramsHelper } from 'modules/packs/paramsHelper'
import { SortPacks } from 'modules/packs/sort/SortPacks'
import { Button } from 'UI/button/Button'

export const PacksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const myPacks = searchParams.has('user_id')
  const { data: packs, isFetching } = useGetPacksQuery(paramsHelper({ searchParams }))

  return packs ? (
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
          <Packs packs={packs.cardPacks} myPacks={myPacks} />
        )}
      </div>

      <Paginator
        pageCount={packs.pageCount}
        totalCount={packs.cardPacksTotalCount}
        currentPage={packs.page}
        disabled={isFetching}
      />
    </div>
  ) : (
    <CircularProgress classes={{ root: s.circular }} size={60} />
  )
}
