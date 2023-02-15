import React, { ChangeEvent, FC } from 'react'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import NativeSelect from '@mui/material/NativeSelect'
import { useSearchParams } from 'react-router-dom'

import { sortingPacksMethods } from 'common/constants/sortingMethods'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { paramsHelper } from 'modules/packs/paramsHelper'
import s from 'modules/packs/sort/SortPacks.module.scss'
import { setSortLabel } from 'modules/packs/sort/sortPacksSlice'

type SortPacksType = {
  //onChange: (property: string, value: string) => void
}

const setSortLabelFunc = (value: string) => {
  const obj = {
    [sortingPacksMethods.ascName]: 'pack name',
    [sortingPacksMethods.desName]: 'pack name',
    [sortingPacksMethods.ascCardsCount]: 'cards count',
    [sortingPacksMethods.desCardsCount]: 'cards count',
    [sortingPacksMethods.ascUpdate]: 'latest update',
    [sortingPacksMethods.desUpdate]: 'latest update',
    [sortingPacksMethods.ascUserName]: 'creator name',
    [sortingPacksMethods.desUserName]: 'creator name',
  }

  // @ts-ignore //todo fix
  return obj[value]
}

export const SortPacks: FC<SortPacksType> = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const sortValue = searchParams.get('sortPacks')
    ? searchParams.get('sortPacks')
    : sortingPacksMethods.desCardsCount
  // @ts-ignore //todo fix
  const sortLabel = setSortLabelFunc(sortValue)

  const selectOnChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ ...paramsHelper({ searchParams }), sortPacks: e.currentTarget.value })
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
