import React, { useEffect, useState } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import { useSearchParams } from 'react-router-dom'

import { formatDate } from 'common/utils/formatDate'
import { Search } from 'components/search/Search'
import { SortPacks } from 'components/sort/SortPacks'
import { Pack } from 'modules/packs/pack/Pack'
import s from 'modules/packs/Packs.module.scss'
import { useGetPacksQuery } from 'modules/packs/packsApi'
import { paramsHelper } from 'modules/packs/paramsHelper'
import { Button } from 'UI/button/Button'

export const PacksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = paramsHelper({ searchParams })
  const [skip, setSkip] = useState(true)
  const { data: packs, isFetching } = useGetPacksQuery(paramsHelper({ searchParams }), { skip })

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

        <SortPacks onChange={onChangeParamsHandler} />
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
