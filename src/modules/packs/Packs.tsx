import React, { useEffect, useState } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import NativeSelect from '@mui/material/NativeSelect'
import { useSearchParams } from 'react-router-dom'

import { sortingPacksMethods } from 'common/constants/sortingMethods'
import { formatDate } from 'common/utils/formatDate'
import { Search } from 'components/search/Search'
import { Pack } from 'modules/packs/pack/Pack'
import s from 'modules/packs/Packs.module.scss'
import { useGetPacksQuery } from 'modules/packs/packsApi'
import { paramsHelper } from 'modules/packs/paramsHelper'
import { Button } from 'UI/button/Button'

export const Packs = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sortPacks, setSortPacks] = useState(sortingPacksMethods.desCardsCount)
  const { data: packs, isFetching } = useGetPacksQuery(paramsHelper({ searchParams }))
  const [sortLabel, setSortLabel] = useState(' by cards count')

  useEffect(() => {
    switch (sortPacks) {
      case sortingPacksMethods.desName:
        setSortLabel(' by pack name')
        break
      case sortingPacksMethods.ascName:
        setSortLabel(' by pack name')
        break
      case sortingPacksMethods.ascCardsCount:
        setSortLabel(' by cards count')
        break
      case sortingPacksMethods.desCardsCount:
        setSortLabel(' by cards count')
        break
      case sortingPacksMethods.ascUpdate:
        setSortLabel(' by latest update')
        break
      case sortingPacksMethods.desUpdate:
        setSortLabel(' by latest update')
        break
      case sortingPacksMethods.desUserName:
        setSortLabel(' by creator name')
        break
      case sortingPacksMethods.ascUserName:
        setSortLabel(' by creator name')
        break
    }
  }, [sortPacks])
  const onChangeParamsHandler = (property: string, value: string) => {
    const params = paramsHelper({ searchParams })
    const newParams = { ...params, [property]: value }

    setSearchParams(newParams)
  }
  /*const onChangeHandler = (packName: string) => {
    setSearchParams({ packName })
  }

  const selectOnChangeHandler = (e: any) => {
    setSortPacks(e.currentTarget.value)
    setSearchParams({ sortPacks: e.currentTarget.value })
  }*/

  return (
    <div>
      <div className={s.filters}>
        <Search selector="Packs" onChange={onChangeParamsHandler} />

        <div className={s.buttonsContainer}>
          <Button styleType="primary" className={s.btnMy}>
            My
          </Button>
          <Button styleType="secondary" className={s.btnOther}>
            Other
          </Button>
        </div>

        <div className={s.select}>
          <FormControl>
            <InputLabel variant="standard">
              Sort packs
              {sortLabel}
            </InputLabel>
            <NativeSelect value={sortPacks}>
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
      </div>

      <div className={s.packsContainer}>
        {isFetching ? (
          <CircularProgress classes={{ root: s.circular }} size={60} />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}
