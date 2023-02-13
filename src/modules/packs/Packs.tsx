import React, { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import s from './pack.module.scss'

import { BaseQueryParamsType } from 'common/constants/baseQueryParams'
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

  return (
    <div>
      <Button styleType="primary" onClick={() => setToggle(!toggle)}>
        Add new Pack
      </Button>

      {toggle && <AddPackModal />}

      <Search class={'need write here class'} selector={'Packs'} onChange={onChangeHandler} />

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
