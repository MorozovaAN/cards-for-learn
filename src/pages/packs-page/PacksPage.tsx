import React, { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import { useSearchParams } from 'react-router-dom'

import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { paramsHelper } from 'common/utils/paramsHelper'
import { MyOtherButtons } from 'components/packs/my-other-buttons/MyOtherButtons'
import { Paginator } from 'components/paginator/Paginator'
import { ResetAllFilters } from 'components/resetAllFilters/ResetAllFilters'
import { Search } from 'components/search/Search'
import { Packs } from 'modules/packs/Packs'
import s from 'modules/packs/Packs.module.scss'
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

  return responsePacks ? (
    <div>
      <div className={s.filters}>
        <Search disabled={isFetching} selector={'Packs'} param={'packName'} />
        <MyOtherButtons disabled={isFetching} />
        <SortPacks disabled={isFetching} />
        <ResetAllFilters disabled={isFetching} />
      </div>

      <div className={s.packsContainer}>
        {isFetching ? (
          <CircularProgress classes={{ root: s.circular }} size={60} />
        ) : (
          <Packs responsePacks={responsePacks.cardPacks} />
        )}
      </div>

      <Paginator
        pageCount={responsePacks.pageCount}
        totalCount={responsePacks.cardPacksTotalCount}
        currentPage={responsePacks.page}
        disabled={isFetching}
      />
      {showButton && (
        <div className={s.scrollBtn}>
          <ButtonScroll />
        </div>
      )}
    </div>
  ) : (
    <CircularProgress classes={{ root: s.circular }} size={60} />
  )
}
