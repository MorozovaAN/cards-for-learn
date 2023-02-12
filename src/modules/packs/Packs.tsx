import React, { ChangeEvent, useState } from 'react'

import s from './pack.module.scss'

import { baseQueryParams, BaseQueryParamsType } from 'common/constants/baseQueryParams'
import { formatDate } from 'common/utils/formatDate'
import { Pack } from 'modules/packs/pack/Pack'
import { useGetPacksQuery } from 'modules/packs/packsApi'

export const Packs = () => {
  const [baseParams, setBaseParams] = useState<BaseQueryParamsType>(baseQueryParams)
  const { data: packs } = useGetPacksQuery(baseParams)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setBaseParams({ ...baseParams, packName: e.currentTarget.value })
  }

  return (
    <div>
      <input type="text" onChange={onChangeHandler} />
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
