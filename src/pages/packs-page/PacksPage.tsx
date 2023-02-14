import React, { useEffect, useState } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import { useSearchParams } from 'react-router-dom'

import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { MyOtherButtons } from 'components/packs/my-other-buttons/MyOtherButtons'
import { Paginator } from 'components/paginator/Paginator'
import { Search } from 'components/search/Search'
import { Packs } from 'modules/packs/Packs'
import s from 'modules/packs/Packs.module.scss'
import { useGetPacksQuery } from 'modules/packs/packsApi'
import { setShowButton } from 'modules/packs/packsSlise'
import { paramsHelper } from 'modules/packs/paramsHelper'
import { SortPacks } from 'modules/packs/sort/SortPacks'
import { ButtonScroll } from 'UI/button/ButtonScroll'

export const PacksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = paramsHelper({ searchParams })
  const [skip, setSkip] = useState(true)
  const { data: packs, isFetching } = useGetPacksQuery(paramsHelper({ searchParams }), { skip })
  const showButton = useTypedSelector(state => state.packs.isShowButtonScroll)
  const dispatch = useTypedDispatch()

  // const monitorHeight = window.screen.height
  // console.log(`The height is ${monitorHeight}px.`)
  //
  // const windowHeight = window.innerHeight
  // console.log(`The height is ${windowHeight}px.`)

  // const visibleHeight = document.documentElement.clientHeight
  // console.log(`The height is ${visibleHeight}px.`)

  // const screenHeight = window.screen.height
  // console.log(screenHeight)

  useEffect(() => {
    if (skip) {
      setSearchParams(params)
      setSkip(false)
    }
  }, [])

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

  const onChangeParamsHandler = (property: string, value: string) => {
    const newParams = { ...params, [property]: value }

    setSearchParams(newParams)
  }

  return (
    <div>
      <div className={s.filters}>
        <Search selector="Packs" onChange={onChangeParamsHandler} />
        <MyOtherButtons />
        <SortPacks onChange={onChangeParamsHandler} />
      </div>

      <div className={s.packsContainer}>
        {isFetching ? (
          <CircularProgress classes={{ root: s.circular }} size={60} />
        ) : (
          <>{packs !== undefined && <Packs packs={packs.cardPacks} />}</>
        )}
      </div>
      {packs && (
        <Paginator
          pageCount={packs.pageCount}
          totalCount={packs.cardPacksTotalCount}
          currentPage={packs.page}
          setPageCallback={onChangeParamsHandler}
          setRowCallback={onChangeParamsHandler}
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
