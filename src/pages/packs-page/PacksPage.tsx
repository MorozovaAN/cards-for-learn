import React, { useEffect, useState } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import { useSearchParams } from 'react-router-dom'

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
  const params = paramsHelper({ searchParams })
  const [skip, setSkip] = useState(true)
  const { data: packs, isFetching } = useGetPacksQuery(paramsHelper({ searchParams }), { skip })
  const [toggle, setToggle] = useState(false)
  const myPacks = searchParams.get('user_id')

  useEffect(() => {
    if (skip) {
      setSearchParams(params)
      setSkip(false)
    }
  }, [])

  const onChangeParamsHandler = (property: string, value: string) => {
    const newParams = { ...params, [property]: value }

    setSearchParams(newParams)
  }

  return (
    <div>
      <Button styleType="primary" onClick={() => setToggle(!toggle)}>
        Add new Pack
      </Button>

      {toggle && <AddPackModal />}

      <div className={s.filters}>
        <Search selector="Packs" onChange={onChangeParamsHandler} value={params.packName} />
        <MyOtherButtons onChange={onChangeParamsHandler} myPacks={myPacks} />

        <SortPacks onChange={onChangeParamsHandler} />
        <ResetAllFilters disabled={isFetching} />
      </div>

      <div className={s.packsContainer}>
        {isFetching ? (
          <CircularProgress classes={{ root: s.circular }} size={60} />
        ) : (
          <>{packs !== undefined && <Packs packs={packs.cardPacks} myPacks={myPacks} />}</>
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
    </div>
  )
}
