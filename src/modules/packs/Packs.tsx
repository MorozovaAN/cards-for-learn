import React, { useEffect, useState } from 'react'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import NativeSelect from '@mui/material/NativeSelect'
import { useSearchParams } from 'react-router-dom'

import s from './pack.module.scss'

import { BaseQueryParamsType } from 'common/constants/baseQueryParams'
import { sortingPacksMethods } from 'common/constants/sortingMethods'
import { formatDate } from 'common/utils/formatDate'
import { Search } from 'components/search/Search'
import { AddPackModal } from 'modules/packs/modals/AddPackModal'
import { Pack } from 'modules/packs/pack/Pack'
import { useGetPacksQuery } from 'modules/packs/packsApi'
import { paramsHelper } from 'modules/packs/paramsHelper'
import { Button } from 'UI/button/Button'

export const Packs = () => {
  const [toggle, setToggle] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: packs } = useGetPacksQuery(paramsHelper({ searchParams }))

  const onChangeHandler = (packName: string) => {
    setSearchParams({ packName })
  }
  const [sortPacks, setSortPacks] = useState(sortingPacksMethods.ascCardsCount)
  const selectOnChangeHandler = (e: any) => {
    setSortPacks(e.currentTarget.value)
    setBaseParams({ ...params, sortPacks })
  }

  return (
    <div>
      {/*<Button styleType="primary" onClick={() => setToggle(!toggle)}>*/}
      {/*  Add new Pack*/}
      {/*</Button>*/}

      {toggle && <AddPackModal />}
      <div className={s.filters}>
        <Search selector="Packs" onChange={onChangeHandler} />

        <div className={s.select}>
          <FormControl>
            <InputLabel variant="standard">Sort packs</InputLabel>
            <NativeSelect value={sortPacks} onChange={selectOnChangeHandler}>
              <optgroup label="Sort by pack name">
                <option value={sortingPacksMethods.desName}>from A to Z</option>
                <option value={sortingPacksMethods.ascName}>from Z to A</option>
              </optgroup>
              <optgroup label="Sort by cards count">
                <option value={sortingPacksMethods.ascCardsCount}>from largest to smallest</option>
                <option value={sortingPacksMethods.desCardsCount}>from smallest to largest</option>
              </optgroup>
              <optgroup label="Sort by latest update">
                <option value={sortingPacksMethods.ascUpdate}>late to early</option>
                <option value={sortingPacksMethods.desUpdate}>early to late</option>
              </optgroup>
              <optgroup label="Sort by creator name">
                <option value={sortingPacksMethods.desUserName}>from A to Z</option>
                <option value={sortingPacksMethods.ascUserName}>from Z to A</option>
              </optgroup>
            </NativeSelect>
          </FormControl>
        </div>
      </div>

      <div className={s.packsContainer}>
        {packs?.cardPacks?.map(p => {
          const dateUpdate = formatDate(p.updated)

          return (
            <Pack
              key={p._id}
              packId={p._id}
              name={p.name}
              cardsCount={p.cardsCount}
              author={p.user_name}
              updated={dateUpdate}
            />
          )
        })}
      </div>
    </div>
  )
}
