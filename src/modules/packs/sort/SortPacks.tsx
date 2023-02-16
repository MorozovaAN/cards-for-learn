import React, { ChangeEvent } from 'react'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import NativeSelect from '@mui/material/NativeSelect'
import { useSearchParams } from 'react-router-dom'

import { sortingPacksMethods } from 'common/constants/sortingMethods'
import { paramsHelper } from 'modules/packs/paramsHelper'
import s from 'modules/packs/sort/SortPacks.module.scss'
import { setSortLabel } from 'modules/packs/sort/utils/setSortLabel'

export const SortPacks = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const myPacks = searchParams.get('user_id')
    ? sortingPacksMethods.desUpdate
    : sortingPacksMethods.desCardsCount
  const sortValue = searchParams.get('sortPacks') ? searchParams.get('sortPacks') : myPacks

  const sortLabel = setSortLabel(sortValue as sortingPacksMethods)

  const selectOnChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ ...paramsHelper(searchParams), sortPacks: e.currentTarget.value })
    if (
      e.currentTarget.value === sortingPacksMethods.desCardsCount ||
      (e.currentTarget.value === sortingPacksMethods.desUpdate && searchParams.has('user_id'))
    ) {
      searchParams.delete('sortPacks')
      setSearchParams(searchParams)
    }
  }

  return (
    <div className={s.select}>
      <FormControl>
        <InputLabel variant="standard">Sort packs by {sortLabel}</InputLabel>

        <NativeSelect value={sortValue} onChange={selectOnChangeHandler}>
          <optgroup label="Sort by pack name">
            <option value={sortingPacksMethods.desName}>from A to Z</option>
            <option value={sortingPacksMethods.ascName}>from Z to A</option>
          </optgroup>

          <optgroup label="Sort by cards count">
            <option value={sortingPacksMethods.desCardsCount}>from largest to smallest</option>
            <option value={sortingPacksMethods.ascCardsCount}>from smallest to largest</option>
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
  )
}
