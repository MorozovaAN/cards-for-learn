import React, { ChangeEvent, useState } from 'react'

import s from './pack.module.scss'
import { useSearchParams } from 'react-router-dom'
import { baseQueryParams, BaseQueryParamsType } from 'common/constants/baseQueryParams'
import { formatDate } from 'common/utils/formatDate'
import { Search } from 'components/search/Search'
import { AddPackModal } from 'modules/packs/modals/AddPackModal'
import { Pack } from 'modules/packs/pack/Pack'
import { useGetPacksQuery } from 'modules/packs/packsApi'
import { paramsHelper } from 'modules/packs/paramsHelper'
import { Button } from 'UI/button/Button'

export const Packs = () => {
  const [toggle, setToggle] = useState(false)
  const [baseParams, setBaseParams] = useState<BaseQueryParamsType>(baseQueryParams)
  const [searchParams, setSearchParams] = useSearchParams()
  const [baseParams, setBaseParams] = useState<BaseQueryParamsType>(paramsHelper({ searchParams }))
  const params = paramsHelper({ searchParams })
  const [logout] = useLogOutMutation()
  const { data: packs } = useGetPacksQuery(baseParams)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ packName: e.currentTarget.value })
    setBaseParams({ ...params, packName: e.currentTarget.value })
  }

  return (
    <div>
      <Button styleType="primary" onClick={() => setToggle(!toggle)}>
        Add new Pack
      </Button>
      {toggle && <AddPackModal />}

      <Search class={'need write here class'} selector={'Packs'} />

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
